import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { StudentModule } from 'src/student/student.module';
import { AdminModule } from 'src/admin/admin.module';
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [
    AdminModule,
    StudentModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
  ],
  exports: [AuthService]
}) 
export class AuthModule {}
