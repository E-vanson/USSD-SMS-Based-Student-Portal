import { PartialType } from '@nestjs/swagger';
import { Student } from '../schema/student.schema';

export class StudentPayload extends PartialType(Student) {
    createdAt?: string;
    updatedAt?: string;
}
