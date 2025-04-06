import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('users apis')
    .setDescription('my first swagger ui documention for users apis')
    .setVersion('1.0')
    // .addTag('users')
    .build();
  const documentFactory = () =>  SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // Set global prefix to make the routes start with /api
  app.setGlobalPrefix('api');

  // Enable CORS for public access (you can restrict to certain domains if needed)
  app.enableCors();

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              // Remove extra fields not in DTO
      forbidNonWhitelisted: true,   // Throw error on extra fields
      transform: true,              // Auto-convert payloads (e.g., strings to numbers)
    }),
  );

  // Start the application and listen on port 3000
  await app.listen(3000);
  console.log('🚀 Server running at http://localhost:3000/api');
}

bootstrap();
