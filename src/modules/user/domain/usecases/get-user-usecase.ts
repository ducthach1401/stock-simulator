import { Injectable } from '@nestjs/common';
import { UserModel } from '../models/user-model';
import { UserRepository } from '../repositories/user-repository';

@Injectable()
export class GetUserUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async call(id: string, relations: string[] | undefined): Promise<UserModel> {
    return await this.userRepository.get(id, relations);
  }
}
