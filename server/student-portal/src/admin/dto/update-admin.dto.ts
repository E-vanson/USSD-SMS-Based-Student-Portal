import { OmitType } from "@nestjs/swagger";
import { CreateAdminDto } from "../dto/create-admin.dto";

export class UpdateAdminDto extends OmitType(CreateAdminDto,['password'] as const){}

