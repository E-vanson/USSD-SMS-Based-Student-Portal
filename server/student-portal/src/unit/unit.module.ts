import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';
import { Units, UnitsSchema } from './schema/unit.schema';


@Module({
  imports: [MongooseModule.forFeature([{name: Units.name, schema: UnitsSchema}])],
  providers: [UnitService],
  controllers: [UnitController]
})
export class UnitModule {}
