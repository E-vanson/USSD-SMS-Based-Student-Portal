import { IsString } from "class-validator";

export class UserSigninDto{

    @IsString()
    regNo: string;

    @IsString()
    password: string;
}