import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';

import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';
import { AuthModule } from '../auth/auth.module';
import { OtherModule } from 'src/other/other.module';

@Module({
  imports: [AuthModule, OtherModule],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class HealthModule {}
