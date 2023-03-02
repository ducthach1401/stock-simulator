import { Injectable } from '@nestjs/common';
import { ExchangeModel } from '../models/exchange-model';
import { ExchangeRepository } from '../repositories/exchange-repository';

@Injectable()
export class GetExchangeUsecase {
  constructor(private readonly exchangeRepository: ExchangeRepository) {}

  async call(id: string): Promise<ExchangeModel | undefined> {
    return await this.exchangeRepository.get(id);
  }
}
