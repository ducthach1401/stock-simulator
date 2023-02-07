import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../../repositories/auth-repository';
import { UserModel } from 'src/modules/user/domain/models/user-model';

@Injectable()
export class DeleteAuthTokenUsecase {
  constructor(private readonly authRepository: AuthRepository) {}

  async call(user: UserModel, token: string | undefined): Promise<void> {
    await this.authRepository.delete(user, token);
  }
}
