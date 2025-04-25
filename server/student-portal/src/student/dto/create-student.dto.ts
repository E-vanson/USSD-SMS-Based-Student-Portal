import { IsArray, IsString } from "class-validator";


export class CreateStudentDto{
    @IsString()
    fullName: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    phoneNo: string;

    @IsString()
    regNo: string;

    @IsString()
    course: string;

    @IsString()
    courseName: string;
    
    @IsArray()
    units: string[];

    @IsArray()
    notifications: string[];
}