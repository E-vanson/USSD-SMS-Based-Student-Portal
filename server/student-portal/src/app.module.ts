import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { UnitModule } from './unit/unit.module';
import { PaymentModule } from './payment/payment.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ResultsModule } from './results/results.module';

@Module({
  imports: [
    // MongooseModule.forRoot(process.env.DATABASE_URI!, { dbName: process.env.DATABASE_NAME,}),
    AdminModule, StudentModule, CourseModule, UnitModule, PaymentModule, NotificationsModule, ResultsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
