import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ModelNotFoundException } from './utils/exceptions/model-not-found.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new ModelNotFoundException());
  setupKafkaConsumer(app);
  setupSwagger(app);
  app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();


function setupKafkaConsumer(app: INestApplication) {
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_BROKER],
      },
      consumer: {
        groupId: !process.env.KAFKA_CONSUMER_GROUP_ID ||
          process.env.KAFKA_CONSUMER_GROUP_ID === ''
          ? 'my-consumer-' + Math.random()
          : process.env.KAFKA_CONSUMER_GROUP_ID,
      },
    },
  });
}

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Api Bank - NestJS')
    .setDescription('Aplicação para manipular os bancos do nosso sistema de microserviços')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

