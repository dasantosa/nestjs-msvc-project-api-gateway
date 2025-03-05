import {
  Body,
  Controller,
  Logger,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { LoginDTO } from './entities/login.dto';
import { SignUpDTO } from '././entities/signup.dto';
import { ApiBody } from '@nestjs/swagger';
import { isPublic } from '../decorators/public.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
@UseGuards(ThrottlerGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @isPublic()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: LoginDTO })
  async login(@Body() loginDTO: LoginDTO) {
    /**
     * The AuthController class is responsible for handling incoming requests to the /auth/login endpoint.
     */
    Logger.log(`Received login request for ${loginDTO.email}`);
    return this.authService.login(loginDTO);
  }

  @isPublic()
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: SignUpDTO })
  async signup(@Body() signupDTO: SignUpDTO) {
    /*
     * The register method is responsible for handling incoming requests to the /auth/signup endpoint.
     */

    Logger.log(`Received signup request for ${signupDTO.username} user`);
    return this.authService.signup(signupDTO);
  }

  async checkAuthSVCHealth() {
    Logger.log('Check auth health');
    this.authService.checkAuthSVCHealth();
  }
}
