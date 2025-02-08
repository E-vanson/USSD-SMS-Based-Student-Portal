import { PartialType } from "@nestjs/swagger";
import { CreateAdminDto } from "src/admin/dto/create-admin.dto";

export class UpdateUnitDto extends PartialType(CreateAdminDto){}