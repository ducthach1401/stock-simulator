import { Injectable } from '@nestjs/common';
import { UserModel } from '../models/user-model';
import { UserRepository } from '../repositories/user-repository';
import { DeleteAuthTokenUsecase } from 'src/modules/auth/domain/usecases/auth-token/delete-auth-token-usecase';

@Injectable()
export class UpdateUserPasswordUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly deleteAuthTokenUsecase: DeleteAuthTokenUsecase,
  ) {}

  async call(user: UserModel, password: string): Promise<boolean> {
    await this.userRepository.updatePassword(user, password);
    await this.deleteAuthTokenUsecase.call(user, undefined);
    return true;
  }
}
