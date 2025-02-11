import { IsString } from "class-validator";

export class SignInDto{

    @IsString()
    variant: string;

    @IsString()
    password: string;
}