import { Module } from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';

@Module({
  providers: [UnitService],
  controllers: [UnitController]
})
export class UnitModule {}
