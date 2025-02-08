import { IsArray, IsEnum, IsString } from "class-validator";

export class CreateUnitDto{
    @IsString()
    name: string;

    @IsString()
    credits: string;

    @IsString()
    code: string;

    @IsEnum({ enum: ['!registered', 'registered', 'eRegistered', 'supp', 'retake', 'completed'] })
    status: string;
}