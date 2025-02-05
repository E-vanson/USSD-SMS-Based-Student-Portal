import { PartialType } from '@nestjs/swagger';
import { Admin } from '../schema/admin.schema';

export class AdminPayload extends PartialType(Admin) {
    createdAt?: string;
    updatedAt?: string;
}
