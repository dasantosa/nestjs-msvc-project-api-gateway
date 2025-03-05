import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { OtherModule } from './other/other.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { RATE_LIMIT_MAX, RATE_MAX_TTL } from './config/config';

@Module({
  imports: [
    AuthModule,
    OtherModule,
    HealthModule,
    ThrottlerModule.forRoot([
      {
        ttl: RATE_MAX_TTL,
        limit: RATE_LIMIT_MAX,
      },
    ]),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
