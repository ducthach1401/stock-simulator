import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../repositories/user-repository';
import { UserModel } from '../../models/user-model';
import { DefaultConfig } from '../../enums/default-config';
import { DEFAULT_ID } from 'src/core/constants';

@Injectable()
export class RegisterUserUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async call(
    name: string,
    username: string,
    password: string,
  ): Promise<boolean> {
    const model = new UserModel(
      DEFAULT_ID,
      name,
      username,
      bcrypt.hashSync(password, 10),
      DefaultConfig.Balance,
      DefaultConfig.Balance,
      0,
      false,
      new Date(),
      new Date(),
      undefined,
    );

    return await this.userRepository.register(model);
  }
}
