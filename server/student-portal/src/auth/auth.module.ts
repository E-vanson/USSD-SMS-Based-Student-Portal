import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '120s' },
      }),
    }),
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
