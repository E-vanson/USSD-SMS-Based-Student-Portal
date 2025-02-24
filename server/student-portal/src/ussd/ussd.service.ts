import { Injectable, Inject } from '@nestjs/common';
import * as UssdMenuBuilder from 'ussd-menu-builder';
import { Request, Response } from 'express';
import { StudentService } from 'src/student/student.service';
import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class UssdService {
    constructor(@Inject('USSD_MENU') private menu: UssdMenuBuilder, private studentService:StudentService, private authService:AuthService) {
        this.initializeMenu()
     }
    
    private initializeMenu() {
        let regNo: string;

    this.menu.startState({
      run: () => {
        this.menu.con(
          "Welcome To Student Portal" +
          "\n1. Login" +
          "\n2. Terms and Condition" +
          "\n3. Contact Support"
        );
      },
      next: {
        '1': 'Login',
        '2': 'Terms and Condition',
        '3': 'Contact Support',
      }
    });                
        
        this.menu.state("Login", {
            run: () => {
                this.menu.con("Enter your Registration Number: ")
            },
            next: {                
        '*[a-zA-Z0-9]+': 'validateRegNo'
            }
        })    

        this.menu.state("validateRegNo", {
            run: async () => {                
                const regNoo = this.menu.val; 
                regNo = regNoo;
                const student = await this.studentService.getStudentByRegNo(regNoo);
        
                if (!student) {            
                    this.menu.end("Invalid Credentials");                    
                } else {                                   
                    // this.menu.session.set("regNo", regNoo);                    
                    this.menu.con("Enter your password:");                    
                }                                
            },            
            next: {                        
                '*[a-zA-Z0-9]+': 'validatePassword'                
            }            
        })


        this.menu.state("validatePassword", {            
            run: async () => {                
                // const regNo = await this.menu.session.get("regNo"); 
                const regNoo = regNo
                const password = this.menu.val;    
                const credentials = {
                    regNo: regNoo,
                    password: password
                }
                const student = await this.authService.studentSignIn(credentials);        
                if (!student) {            
                    this.menu.end("Invalid Credentials");                    
                } else {                    
                    this.menu.con(                
                        "Select a service: " +                        
                        "\n1. Get Examination Results" +                        
                        "\n2. Pay Fees" +                        
                        "\n3. Get Latest Updates"                        
                    );                    
                }                
            },            
            next: {        
                1: "Get Examination Results",                
                2: "Pay Fees",        
                3: "Get Latest Updates"        
            }            
        });        

        this.menu.state("Get Examination Results", {
            run: () => {
                this.menu.con(
                    "Select Year and semester: " +
                    "\n1. 1.1 " +
                    "\n2. 1.2 " +
                    "\n3. 2.1 " +
                    "\n4. 2.2 " +
                    "\n5. 3.1 " +
                    "\n6. 3.2 "
                )
            },
            next: {
                1: "1.1",
                2: "1.2",
                3: "2.1",
                4: "2.2",
                5: "3.1",
                6: "3.2"                
            },
            defaultNext: "Invalid Option"
        })

        this.menu.state("1.1", {
            run: () => {                
                this.menu.end("Your request is being processed kindly wait for a sms message");                
            },            
        });        

        this.menu.state("Get Latest Updates", {
            run: () => {
                this.menu.con(
                    "Choose Update Type: " +
                    "\n1. Academic " +
                    "\n2. Financial " +
                    "\n3. General"
                )                
            },
            next: {
                1: "Academic",
                2: "Financial ", 
                3: "General"
            },
            defaultNext: "Invalid Option"
        })

        this.menu.state("Academic", {
            run: () => {                
                this.menu.end("Your request is being processed kindly wait for a sms message");                
            },            
        });     

        this.menu.state("Financial", {
            run: () => {                
                this.menu.end("Your request is being processed kindly wait for a sms message");                
            },            
        });     

        this.menu.state("General", {
            run: () => {                
                this.menu.end("Your request is being processed kindly wait for a sms message");                
            },            
        });     
  }
    
    
    async menuStates(req: Request, res: Response) {
    this.menu.run(req.body, (error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(result);
      }
    });
  }
}
