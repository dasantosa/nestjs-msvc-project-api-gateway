import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import { AllExceptionsFilter } from './exception/exception.filter';
import { HttpAdapterHost } from '@nestjs/core';
import { PORT, HOST } from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.use(bodyParser.json({ limit: '1kb' }));
  app.use(bodyParser.urlencoded({ limit: '1kb', extended: true }));
  app.use(helmet());
  await app.listen(PORT);
  Logger.log(`🚀 Api gateway is running on: ${HOST}:${PORT}`);
}
bootstrap();
