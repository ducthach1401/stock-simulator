import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { AllExceptionsFilter } from 'src/exceptions/all-exceptions-filter';
import { ErrorCode } from 'src/exceptions/error-code';
import { LogicalException } from 'src/exceptions/logical-exception';
import { AppModule } from './modules/app/app-module';

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
  await app.listen(app.get(ConfigService).get<number>('app.port') ?? 80);
}

bootstrap();
