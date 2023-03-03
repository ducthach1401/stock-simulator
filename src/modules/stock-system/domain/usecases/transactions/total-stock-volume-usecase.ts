import { Injectable } from '@nestjs/common';
import { ErrorCode } from 'src/exceptions/error-code';
import { LogicalException } from 'src/exceptions/logical-exception';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { StockSystemRepository } from '../../repositories/stock-system-repository';
import { GetStockUsecase } from '../get-stock-usecase';

@Injectable()
export class TotalStockVolumeUsecase {
  constructor(
    private readonly stockSystemRepository: StockSystemRepository,
    private readonly getStockUsecase: GetStockUsecase,
  ) {}

  async call(user: UserModel, code: string): Promise<number> {
    const stock = await this.getStockUsecase.call(code);
    if (!stock) {
      throw new LogicalException(
        ErrorCode.CODE_INVALID,
        'Code invalid.',
        undefined,
      );
    }

    return await this.stockSystemRepository.totalStock(user, code);
  }
}
