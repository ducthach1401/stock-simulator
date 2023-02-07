import { Injectable } from '@nestjs/common';
import { UserModel } from '../models/user-model';
import { UserRepository } from '../repositories/user-repository';

@Injectable()
export class UpdateUserUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async call(
    user: UserModel,
    name: string | undefined,
    isOnline: boolean | undefined,
  ): Promise<boolean> {
    return await this.userRepository.update(user, name, isOnline);
  }
}
