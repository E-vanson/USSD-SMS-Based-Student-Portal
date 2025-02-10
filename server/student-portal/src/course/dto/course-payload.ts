import { PartialType } from "@nestjs/swagger";
import { Courses } from "../schema/course.schema";

export class CoursePayload extends PartialType(Courses) {
    createdAt?: string;
    updatedAt?: string;
}