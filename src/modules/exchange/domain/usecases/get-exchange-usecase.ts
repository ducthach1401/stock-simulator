import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { ExchangeModel } from '../models/exchange-model';
import { ExchangeRepository } from '../repositories/exchange-repository';

@Injectable()
export class GetExchangeUsecase {
  constructor(private readonly exchangeRepository: ExchangeRepository) {}

  async call(
    user: UserModel | undefined,
    id: string,
  ): Promise<ExchangeModel | undefined> {
    return await this.exchangeRepository.get(user, id);
  }
}
