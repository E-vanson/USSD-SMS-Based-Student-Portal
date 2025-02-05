import { IsArray, IsString } from "class-validator";

export class CreateAdminDto{

    @IsString()
    fullName: string;

    @IsString()
    email: string;

    @IsString()
    phoneNo: string;

    @IsArray()
    notifications: string[];
}