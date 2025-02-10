import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Courses, CoursesSchema } from './schema/course.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Courses.name, schema: CoursesSchema}])],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
