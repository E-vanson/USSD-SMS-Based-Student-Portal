import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
    imports: [UtilsModule],
    providers: [
  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
],
})
export class RolesModule {}
