import { Injectable } from '@nestjs/common';
import { ExchangeModel } from '../models/exchange-model';
import { ExchangeRepository } from '../repositories/exchange-repository';

@Injectable()
export class MarkFinishedExchangeUsecase {
  constructor(private readonly exchangeRepository: ExchangeRepository) {}

  async call(
    matchedPrice: number | undefined,
    exchange: ExchangeModel,
  ): Promise<void> {
    await this.exchangeRepository.markFinished(matchedPrice, exchange);
  }
}
