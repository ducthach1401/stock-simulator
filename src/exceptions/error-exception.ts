import { ErrorCode } from './error-code';

export class ErrorException extends Error {
  public readonly code: number;
  public readonly httpStatusCode: number;
  public readonly description: any;

  constructor(code: ErrorCode, message: string | undefined, description: any) {
    super(message);
    const [errorCode, httpStatusCode] = code.split('|');
    this.code = Number(errorCode);
    this.httpStatusCode = Number(httpStatusCode);
    this.description = description;
  }

  public getErrors(): Record<string, any> {
    return {
      error_code: this.code,
      error_message: this.message,
      ...(this.description && { error_description: this.description }),
    };
  }
}
