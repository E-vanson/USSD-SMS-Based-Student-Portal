import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { CourseModule } from 'src/course/course.module';
import { Student, StudentSchema } from './schema/student.schema';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name: Student.name, schema:StudentSchema}]), CourseModule],
  providers: [StudentService],
  controllers: [StudentController],
  exports: [StudentService]
})
export class StudentModule {}
