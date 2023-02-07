import { ErrorException } from './error-exception';
import { ErrorCode } from './error-code';

export class AuthException extends ErrorException {
  public readonly hint: string | undefined;

  constructor(
    code: ErrorCode,
    error: string,
    description: string | undefined,
    hint: string | undefined,
  ) {
    super(code, error, description);
    this.hint = hint;
  }

  public getErrors(): Record<string, any> {
    return {
      error: this.message,
      ...(this.description && { error_description: this.description }),
      ...(this.hint && { hint: this.hint }),
    };
  }
}
