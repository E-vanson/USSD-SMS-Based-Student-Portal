import { PartialType } from "@nestjs/swagger";
import { CreateAdminDto } from "../dto/create-admin.dto";

export class UpdateAdminDto extends PartialType(CreateAdminDto){}

