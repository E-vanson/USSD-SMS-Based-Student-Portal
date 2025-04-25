import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { UnitModule } from './unit/unit.module';
import { PaymentModule } from './payment/payment.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ResultsModule } from './results/results.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { UtilsModule } from './utils/utils.module';
import { UssdModule } from './ussd/ussd.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), ///for global env configuration
    JwtModule.registerAsync({
          global: true,
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '1hr' },
          }),
        }),
    MongooseModule.forRoot(process.env.DATABASE_URI!, { dbName: process.env.DATABASE_NAME,}), 
    AdminModule, StudentModule, CourseModule, UnitModule, PaymentModule, NotificationsModule, ResultsModule, AuthModule, RolesModule, UtilsModule, UssdModule],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {}
