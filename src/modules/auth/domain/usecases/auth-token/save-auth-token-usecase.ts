import { Injectable } from '@nestjs/common';
import { AuthTokensModel } from '../../models/auth-tokens-model';
import { AuthRepository } from '../../repositories/auth-repository';
import { UserModel } from 'src/modules/user/domain/models/user-model';

@Injectable()
export class SaveAuthTokenUsecase {
  constructor(private readonly authRepository: AuthRepository) {}

  async call(user: UserModel, token: string): Promise<void> {
    await this.authRepository.create(
      new AuthTokensModel(undefined, user.id, token, new Date(), new Date()),
    );
  }
}
