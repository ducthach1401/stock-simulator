import { Injectable } from '@nestjs/common';
import { ExchangeType } from '../enums/exchange-type';
import { ExchangeModel } from '../models/exchange-model';
import { ExchangeRepository } from '../repositories/exchange-repository';

@Injectable()
export class GetExchangesUsecase {
  constructor(private readonly exchangeRepository: ExchangeRepository) {}

  async call(
    type: ExchangeType | undefined,
    hasFinished: boolean | undefined,
  ): Promise<ExchangeModel[]> {
    return await this.exchangeRepository.getAll(type, hasFinished);
  }
}
