import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UserModel } from '../models/user-model';
import { UserRepository } from '../repositories/user-repository';
import * as bcrypt from 'bcrypt';
import { DefaultConfig } from '../enums/default-config';

@Injectable()
export class RegisterUserUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async call(
    name: string,
    username: string,
    password: string,
  ): Promise<boolean> {
    const model = new UserModel(
      uuidv4(),
      name,
      username,
      bcrypt.hashSync(password, 10),
      DefaultConfig.Balance,
      DefaultConfig.Balance,
      0,
      false,
      new Date(),
      new Date(),
    );

    return await this.userRepository.register(model);
  }
}
