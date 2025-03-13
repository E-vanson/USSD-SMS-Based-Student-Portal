import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin, AdminSchema } from './schema/admin.schema';
import { AuthModule } from 'src/auth/auth.module';
import { UtilsModule } from 'src/utils/utils.module';
import { Student, StudentSchema } from 'src/student/schema/student.schema';
import { Courses, CoursesSchema } from 'src/course/schema/course.schema';
import { Units, UnitsSchema } from 'src/unit/schema/unit.schema';
import { StudentModule } from 'src/student/student.module';


@Module({
  imports: [
    StudentModule,
    forwardRef(() => UtilsModule),
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
      { name: Student.name, schema: StudentSchema },
      { name: Courses.name, schema: CoursesSchema },
      { name: Units.name, schema:UnitsSchema}
    ]),
    ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService, MongooseModule]
})
export class AdminModule {}
