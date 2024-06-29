import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware для обработки CORS
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://cryptocurrency-front-end-fb4n.vercel.app',
      'https://crypto-mu-eight.vercel.app',
      'http://romancf5.beget.tech',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Разрешение отправки cookie и аутентификации через CORS
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'x-custom-header',
    ],
  });

  // Создание Swagger документации
  const config = new DocumentBuilder()
    .setTitle('API testing documentation')
    .setDescription('This API is for testing documentation')
    .setVersion('1.0')
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Получение порта из конфигурации
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  // Запуск приложения
  console.log(`Application is running on: http://localhost:${port}`);
  await app.listen(port);
}

bootstrap();
