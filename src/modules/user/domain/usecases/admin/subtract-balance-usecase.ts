import { Injectable } from '@nestjs/common';
import { UserModel } from '../../models/user-model';
import { UserRepository } from '../../repositories/user-repository';

@Injectable()
export class SubtractBalanceUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async call(user: UserModel, amountBalance: number): Promise<void> {
    await this.userRepository.addBalance(user, -amountBalance);
  }
}
