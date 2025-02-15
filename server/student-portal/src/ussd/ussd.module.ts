import { Module } from '@nestjs/common';
import { UssdService } from './ussd.service';
import { UssdController } from './ussd.controller';

@Module({
  providers: [UssdService],
  controllers: [UssdController]
})
export class UssdModule {}
