import { Injectable, Inject } from '@nestjs/common';
import * as UssdMenuBuilder from 'ussd-menu-builder';
import { Request, Response } from 'express';
@Injectable()
export class UssdService {
    constructor(@Inject('USSD_MENU') private menu: UssdMenuBuilder) {
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
