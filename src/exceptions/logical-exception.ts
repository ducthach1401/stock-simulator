import { ErrorException } from './error-exception';
import { ErrorCode } from './error-code';

export class LogicalException extends ErrorException {
  constructor(
    code: ErrorCode,
    message: string | undefined,
    description: string | Record<string, string[]> | undefined,
  ) {
    super(code, message, description);
  }

  public getErrors(): Record<string, any> {
    return {
      error_code: this.code,
      error_message: this.message,
      ...(this.description && { error_description: this.description }),
    };
  }
}
