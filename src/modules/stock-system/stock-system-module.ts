import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from '../user/user-module';
import { StockSystemController } from './app/http/controllers/stock-system-controller';
import { StockSystemController as StockSystemSchedule } from './app/schedule/controllers/stock-system-controller';
import { StockSystemRepositoryImpl } from './data/repositories/stock-system-repository-impl';
import { StockSystemService } from './data/services/stock-system-service';
import { StockSystemRepository } from './domain/repositories/stock-system-repository';
import { CollectSystemStockInSsiExchangeUsecase } from './domain/usecases/collect-system-stock-in-ssi-exchange-usecase';
import { GetAllStocksUsecase } from './domain/usecases/get-all-stocks-usecase';
import { GetStockUsecase } from './domain/usecases/get-stock-usecase';

@Module({
  imports: [HttpModule, ScheduleModule.forRoot(), forwardRef(() => UserModule)],
  controllers: [StockSystemController],
  providers: [
    {
      provide: StockSystemRepository,
      useClass: StockSystemRepositoryImpl,
    },
    StockSystemService,
    StockSystemSchedule,
    CollectSystemStockInSsiExchangeUsecase,
    GetStockUsecase,
    GetAllStocksUsecase,
  ],
  exports: [GetStockUsecase],
})
export class StockSystemModule {}
