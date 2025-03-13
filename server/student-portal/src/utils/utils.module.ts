import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from 'src/admin/schema/admin.schema';
import { UtilsService } from './utils.service';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [
    forwardRef(() => AdminModule),
     MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  ],
  providers: [UtilsService],
  exports: [UtilsService]
})
export class UtilsModule {}
