import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import {
  AUTH_MICROSERVICE_NAME,
  JWT_EXPIRES_IN,
  JWT_ISSUER,
  JWT_SECRET,
  AUTH_URL,
  AUTH_PORT,
} from 'src/config/config';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: JWT_EXPIRES_IN,
        issuer: JWT_ISSUER,
      },
    }),
    ClientsModule.registerAsync([
      {
        name: AUTH_MICROSERVICE_NAME,
        useFactory: async () => ({
          transport: Transport.TCP,
          options: {
            host: AUTH_URL,
            port: AUTH_PORT,
          },
        }),
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthGuard, AuthService],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
