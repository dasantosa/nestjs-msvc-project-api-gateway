import { Module } from '@nestjs/common';
import { OtherController } from './other.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';
import { AuthModule } from '../auth/auth.module';
import {
  OTHER_PORT,
  OTHER_URL,
  OTHER_MICROSERVICE_NAME,
} from 'src/config/config';
import { OtherService } from './other.service';

@Module({
  imports: [
    AuthModule,
    ClientsModule.registerAsync([
      {
        name: OTHER_MICROSERVICE_NAME,
        useFactory: async () => ({
          transport: Transport.TCP,
          options: {
            host: OTHER_URL,
            port: OTHER_PORT,
          },
        }),
      },
    ]),
  ],
  controllers: [OtherController],
  providers: [
    OtherService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [OtherService],
})
export class OtherModule {}
