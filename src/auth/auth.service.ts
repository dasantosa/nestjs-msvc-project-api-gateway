import { Injectable, HttpException, Body, Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { LoginDTO } from './entities/login.dto';
import { SignUpDTO } from '././entities/signup.dto';
import { AUTH_MICROSERVICE_NAME } from 'src/config/config';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_MICROSERVICE_NAME) private readonly authClient: ClientProxy,
  ) {}

  async login(@Body() loginDTO: LoginDTO) {
    try {
      const result = await firstValueFrom(
        this.authClient.send({ cmd: 'login' }, loginDTO),
      );
      return result;
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new HttpException('/auth/login Service Unavailable', 503);
      }
      if (error.code === 'ETIMEDOUT' || error.message.includes('timeout')) {
        throw new HttpException('/auth/login Request timed out', 504);
      }
      throw new HttpException(error.message, error.error.status);
    }
  }

  async signup(@Body() signupDTO: SignUpDTO) {
    try {
      const result = await firstValueFrom(
        this.authClient.send({ cmd: 'signup' }, signupDTO),
      );
      return result;
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new HttpException('/auth/signup Service Unavailable', 503);
      }
      if (error.code === 'ETIMEDOUT' || error.message.includes('timeout')) {
        throw new HttpException('/auth/signup Request timed out', 504);
      }
      throw new HttpException(error.message, error.error.status);
    }
  }

  async checkAuthSVCHealth() {
    try {
      const result = await firstValueFrom(
        this.authClient.send({ cmd: 'auth_health' }, {}),
      );
      return result;
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new HttpException('/others Service Unavailable', 503);
      }
      if (error.code === 'ETIMEDOUT' || error.message.includes('timeout')) {
        throw new HttpException('/others Request timed out', 504);
      }
      throw new HttpException(error.message, error.error.status);
    }
  }
}
