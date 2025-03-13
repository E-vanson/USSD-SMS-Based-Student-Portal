import { IsString, IsEmail } from "class-validator";
import { OmitType } from "@nestjs/swagger";
import { CreateAdminDto } from "src/admin/dto/create-admin.dto";

export class AdminSignUpDto extends OmitType(CreateAdminDto, ['notifications']  as const){}