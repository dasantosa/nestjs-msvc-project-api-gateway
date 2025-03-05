import { Injectable, HttpException, Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { OtherDTO } from './entities/other.dto';
import { OTHER_MICROSERVICE_NAME } from 'src/config/config';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OtherService {
  constructor(
    @Inject(OTHER_MICROSERVICE_NAME) private readonly otherClient: ClientProxy,
  ) {}

  async getAllOthers() {
    try {
      const result = await firstValueFrom(
        this.otherClient.send({ cmd: 'get_all_other' }, {}),
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

  async getOtherById(id: string) {
    try {
      const result = await firstValueFrom(
        this.otherClient.send({ cmd: 'get_other_by_id' }, { id }),
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

  async createOther(otherDTO: OtherDTO) {
    try {
      const result = await firstValueFrom(
        this.otherClient.send({ cmd: 'create_other' }, { otherDTO }),
      );
      return result;
    } catch (error) {
      console.log(error);
      if (error.code === 'ECONNREFUSED') {
        throw new HttpException('/others Service Unavailable', 503);
      }
      if (error.code === 'ETIMEDOUT' || error.message.includes('timeout')) {
        throw new HttpException('/others Request timed out', 504);
      }
      throw new HttpException(error.message, error.error.status);
    }
  }

  async updateOther(otherDTO: OtherDTO) {
    try {
      const result = await firstValueFrom(
        this.otherClient.send({ cmd: 'update_other' }, { otherDTO }),
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

  async deleteOther(id: string) {
    try {
      const result = await firstValueFrom(
        this.otherClient.send({ cmd: 'delete_other' }, { id }),
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

  async checkOtherSVCHealth() {
    try {
      const result = await firstValueFrom(
        this.otherClient.send({ cmd: 'other_health' }, {}),
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
