import { Injectable, Inject } from '@nestjs/common';
import * as UssdMenuBuilder from 'ussd-menu-builder';
import { Request, Response } from 'express';
import { StudentService } from 'src/student/student.service';
@Injectable()
export class UssdService {
    constructor(@Inject('USSD_MENU') private menu: UssdMenuBuilder, private studentService:StudentService) {
        this.initializeMenu()
     }
    
    private initializeMenu() {
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
        '*[a-zA-Z]+': 'registration.no'
            }
        })    

        this.menu.state("registration.no", {
            run: () => {
                let regNo = this.menu.val;
                const stude = this.studentService.getStudentByRegNo(regNo);
                if (!stude) {
                    this.menu.end("Invalid Credentials")
                }

                this.menu.con("Enter your password:") 
            },
            next: {
        '*[a-zA-Z0-9]+': 'registration.password'
            }            
        })

        this.menu.state("registration.password", {
            run: () => {
                this.menu.con(
                    "Select a service: " + 
                    "\n1. Get Examination Results" +
                    "\n2. Pay Fees" +
                    "\n3. Get Latest Updates"
                )
            },
            next: {
                1: "Get Examination Results",
                2: "Pay Fees",
                3: "Get Latest Updates"
            },
            defaultNext: "invalidOption",
        })

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
