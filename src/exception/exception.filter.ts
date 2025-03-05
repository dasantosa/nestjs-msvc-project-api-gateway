import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

const httpStatusDescriptions: { [key: number]: string } = {
  400: 'BAD_REQUEST',
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  409: 'CONFLICT',
  500: 'INTERNAL_SERVER_ERROR',
  503: 'SERVICE_UNAVAILABLE',
  504: 'GATEWAY_TIMEOUT',
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const errorMessage =
      typeof message === 'string'
        ? message
        : (message as any)?.message || 'Internal server error';

    const statusCodeDescription =
      httpStatusDescriptions[httpStatus] || 'Internal server error';

    const responseBody = {
      error: statusCodeDescription,
      status_code: httpStatus,
      message: errorMessage,
      timestamp: new Date().toISOString(),
    };

    Logger.error(`${responseBody.status_code}. ${responseBody.message}`);

    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
