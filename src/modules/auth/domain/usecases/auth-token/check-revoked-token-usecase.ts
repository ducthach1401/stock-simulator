import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../../repositories/auth-repository';

@Injectable()
export class CheckRevokedTokenUsecase {
  constructor(private readonly authRepository: AuthRepository) {}

  async call(token: string): Promise<boolean> {
    return await this.authRepository.checkRevoked(token);
  }
}
