import {
  Controller,
  Get,
  UseGuards,
  HttpCode,
  Logger,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { isPublic } from 'src/decorators/public.decorator';
import { AuthService } from 'src/auth/auth.service';
import { OtherService } from 'src/other/other.service';

@Controller()
@UseGuards(ThrottlerGuard)
export class HealthController {
  constructor(
    private readonly authService: AuthService,
    private readonly otherService: OtherService,
  ) {}

  @isPublic()
  @Get('health')
  @HttpCode(200)
  async getHealth(): Promise<any> {
    Logger.log('Check health');
    return 'API Gateway is running! 🚀';
  }

  @isPublic()
  @Get('status')
  @HttpCode(200)
  async getStatus(): Promise<any> {
    Logger.log('Checking System status');

    let authStatus = '';
    let otherStatus = '';
    let httpsStatusCode: HttpStatus = HttpStatus.OK;

    try {
      authStatus = await this.authService.checkAuthSVCHealth();
    } catch (error) {
      Logger.error('Auth Service is down 😢');
      authStatus = 'Auth Service is down 😢';
      httpsStatusCode = HttpStatus.SERVICE_UNAVAILABLE;
    }

    try {
      otherStatus = await this.otherService.checkOtherSVCHealth();
    } catch (error) {
      Logger.error('Other Service is down 😢');
      otherStatus = 'Other Service is down 😢';
      httpsStatusCode = HttpStatus.SERVICE_UNAVAILABLE;
    }

    const healthResponse = {
      'api-gateway': 'API Gateway is running 🚀!',
      'auth-service': authStatus,
      'other-service': otherStatus,
    };

    if (httpsStatusCode === HttpStatus.SERVICE_UNAVAILABLE) {
      throw new HttpException(
        {
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          message: healthResponse,
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
    return {
      status: 'OK',
      message: healthResponse,
      timestamp: new Date().toISOString(),
    };
  }
}
