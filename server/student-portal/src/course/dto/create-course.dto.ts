import { IsString, IsArray } from "class-validator";

export class CreateCourseDto{
    @IsString()
    name: string;

    @IsString()
    code: string;

    @IsArray()
    units: string[]
}
