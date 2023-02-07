import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { AllExceptionsFilter } from 'src/exceptions/all-exceptions-filter';
import { ErrorCode } from 'src/exceptions/error-code';
import { LogicalException } from 'src/exceptions/logical-exception';
import { parseBoolean, readJsonFile } from './core/helpers/utils';
import { AppModule } from './modules/app/app-module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const descriptions: Record<string, string[]> = {};
        errors.forEach((error) => {
          if (error.constraints) {
            const constraintDescription: string[] = [];
            const constraints = Object.keys(error.constraints);
            for (const constraint of constraints) {
              constraintDescription.push(error.constraints[`${constraint}`]);
            }
            descriptions[`${error.property}`] = constraintDescription;
          }
        });
        throw new LogicalException(
          ErrorCode.VALIDATION_ERROR,
          'Validation error.',
          descriptions,
        );
      },
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  await setupSwagger(app);
  await app.listen(app.get(ConfigService).get<number>('app.port') ?? 80);
}

async function setupSwagger(app: INestApplication) {
  if (parseBoolean(app.get(ConfigService).get<boolean>('swagger.enabled'))) {
    const packageApp = await readJsonFile('package.json');

    const config = new DocumentBuilder()
      .setTitle(`${app.get(ConfigService).get<string>('swagger.title')}`)
      .setDescription(
        `${app.get(ConfigService).get<string>('swagger.description')}`,
      )
      .setVersion(packageApp.version)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(
      `${app.get(ConfigService).get<string>('swagger.path')}`,
      app,
      document,
    );
  }
}

bootstrap();
