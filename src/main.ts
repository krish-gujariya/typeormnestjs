import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiOperation, DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Problem Solving Platform')
    .setDescription('Lists of problem solving platform apis')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
  await app.listen(3000);
}
bootstrap();
