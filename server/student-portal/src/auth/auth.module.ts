import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { StudentModule } from 'src/student/student.module';
import { AdminModule } from 'src/admin/admin.module';
import { APP_GUARD } from '@nestjs/core';
import { UtilsModule } from 'src/utils/utils.module';


@Module({
  imports: [
    AdminModule,
    StudentModule,
    UtilsModule
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
