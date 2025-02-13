import { IsString } from "class-validator";

export class AdminSignInDto{

    @IsString()
    email: string;

    @IsString()
    password: string;
}