import { Injectable } from '@nestjs/common';
import { UserModel } from '../../models/user-model';
import { UserRepository } from '../../repositories/user-repository';

@Injectable()
export class DeleteUserUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async call(user: UserModel): Promise<void> {
    await this.userRepository.delete(user);
  }
}
