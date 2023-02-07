import { Injectable } from '@nestjs/common';
import { AuthTokensModel } from '../../models/auth-tokens-model';
import { AuthRepository } from '../../repositories/auth-repository';
import { v4 as uuidv4 } from 'uuid';
import { UserModel } from 'src/modules/user/domain/models/user-model';

@Injectable()
export class SaveAuthTokenUsecase {
  constructor(private readonly authRepository: AuthRepository) {}

  async call(user: UserModel, token: string): Promise<void> {
    await this.authRepository.create(
      new AuthTokensModel(uuidv4(), user.id, token, new Date(), new Date()),
    );
  }
}
