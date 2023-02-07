import { Injectable } from '@nestjs/common';
import { UserModel } from '../models/user-model';
import { UserRepository } from '../repositories/user-repository';

@Injectable()
export class GetUserByUsernameUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async call(username: string): Promise<UserModel> {
    return await this.userRepository.getByUsername(username);
  }
}
