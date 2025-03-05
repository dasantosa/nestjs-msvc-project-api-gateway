import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const buildSwagger = (app) => {
  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('The API Gateway description')
    .setVersion('1.0')
    .build();
  return SwaggerModule.createDocument(app, config);
};

export const setupSwagger = (app) => {
  const document = buildSwagger(app);
  SwaggerModule.setup('api', app, document);
};
