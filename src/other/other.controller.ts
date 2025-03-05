import {
  Controller,
  Get,
  Logger,
  Post,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { OtherDTO } from './entities/other.dto';
import { ApiBody } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { OtherService } from './other.service';

@Controller('other')
@UseGuards(ThrottlerGuard)
export class OtherController {
  constructor(private readonly otherService: OtherService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllOthers() {
    Logger.log('Get all others');
    this.otherService.getAllOthers();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getOtherById(@Param('id') id: string) {
    Logger.log('Get other by id');
    this.otherService.getOtherById(id);
  }

  @ApiBody({ type: OtherDTO })
  @HttpCode(HttpStatus.OK)
  @Post()
  async createOther(@Body() otherDTO: OtherDTO) {
    Logger.log('Create other');
    this.otherService.createOther(otherDTO);
  }

  @ApiBody({ type: OtherDTO })
  @HttpCode(HttpStatus.OK)
  @Put()
  async updateOther(@Body() otherDTO: OtherDTO) {
    Logger.log('Update other');
    this.otherService.updateOther(otherDTO);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteOther(@Param('id') id: string) {
    Logger.log('Delete other');
    this.otherService.deleteOther(id);
  }
}
