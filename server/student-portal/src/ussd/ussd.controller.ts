import { Controller, Get, Post, Req, Res} from '@nestjs/common';
import { UssdService } from './ussd.service';
import { Request, Response } from 'express';
import { Public } from 'src/decorators/auth.decorator';

@Public()
@Controller({path:'ussd', version: '1'})
export class UssdController {
    constructor(private ussdService: UssdService) { }
    
    @Post('menu')
    async menu(@Req() req: Request, @Res() res: Response) {
        // const menu = this.ussdService.getMenu()
        // return menu.run(req.body, (result: any) => res.send(result));

        return this.ussdService.menuStates(req, res);
    }

    @Get('test')
    test() {
        return "Test Successfull";
    }

}
