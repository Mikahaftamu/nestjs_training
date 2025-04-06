// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);

//   app.setGlobalPrefix('api');
//   app.enableCors();

//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,            // Remove properties not in DTO
//       forbidNonWhitelisted: true, // Throw error on extra properties
//       transform: true,            // Auto-convert payloads
//     }),
//   );

 
  
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
