import { Module } from '@nestjs/common';
import { UssdService } from './ussd.service';
import { UssdController } from './ussd.controller';
import * as UssdMenuBuilder from 'ussd-menu-builder';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [StudentModule],
  providers: [
    UssdService,
    {
      provide: 'USSD_MENU',
      useFactory: () => {
        return new UssdMenuBuilder(); 
      },
    },
  ],
  controllers: [UssdController],
  exports: [UssdService]
})
export class UssdModule {}
