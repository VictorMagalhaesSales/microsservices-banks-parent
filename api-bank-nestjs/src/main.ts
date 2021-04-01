import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ModelNotFoundException } from './utils/exceptions/model-not-found.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new ModelNotFoundException());

  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();


function setupSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('Api Bank - NestJS')
    .setDescription('Aplicação para manipular os bancos do nosso sistema de microserviços')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

