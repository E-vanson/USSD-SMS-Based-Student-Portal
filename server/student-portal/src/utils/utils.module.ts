import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [AdminModule],
  providers: [UtilsService],
  exports: [UtilsService]
})
export class UtilsModule {}
