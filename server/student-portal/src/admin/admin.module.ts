import { Module } from '@nestjs/common';
import { AdminController } from './admin/admin.controller';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
