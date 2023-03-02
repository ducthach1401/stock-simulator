import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { ExchangeType } from '../enums/exchange-type';
import { ExchangeModel } from '../models/exchange-model';
import { ExchangeRepository } from '../repositories/exchange-repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateExchangeUsecase {
  constructor(private readonly exchangeRepository: ExchangeRepository) {}

  async call(
    user: UserModel,
    code: string,
    volume: number,
    price: number,
    type: ExchangeType,
  ): Promise<void> {
    const model = new ExchangeModel(
      uuidv4(),
      user.id,
      code,
      volume,
      price,
      type,
      undefined,
      new Date(),
      new Date(),
      undefined,
    );

    await this.exchangeRepository.create(model);
  }
}
