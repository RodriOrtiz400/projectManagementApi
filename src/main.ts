import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Server } from 'https';
import configCors from './config/cors/cors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1'); // In case it's needed
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const server: Server = app.getHttpAdapter().getHttpServer();
  server.headersTimeout = 965000;
  server.keepAliveTimeout = 905000;
  app.enableCors({
    origin: function (origin, callback) {
      const match = configCors.allowedOrigins.find((domain) => {
        return origin?.match(`${domain}`);
      });
      if (!origin || match) {
        return callback(null, true);
      } else {
        console.log('Blocked cors for: ', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });
  swaggerInit(app);

  await app.listen(3000);
}

function swaggerInit(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Project Management Challenge Api')
    .setDescription('')
    .setVersion(process.env.VERSION)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Access Token',
        in: 'header',
      },
      'access_token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
}

bootstrap();
