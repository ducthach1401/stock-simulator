import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { ErrorException } from './error-exception';
import { ErrorCode } from './error-code';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    let errorException: ErrorException;
    let httpStatusCode: number;

    if (exception instanceof ErrorException) {
      errorException = exception;
      httpStatusCode = exception.httpStatusCode;
    } else {
      errorException = new ErrorException(
        ErrorCode.UNDEFINED_ERROR,
        exception.response?.error ??
          exception.response?.message ??
          exception.message ??
          'Undefined Error',
        exception.message,
      );
      httpStatusCode = exception.status ?? errorException.httpStatusCode;
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    return response
      .setHeader('X-Error-Code', errorException.code)
      .setHeader('X-Error-Message', errorException.message)
      .status(httpStatusCode)
      .json(errorException.getErrors());
  }
}
