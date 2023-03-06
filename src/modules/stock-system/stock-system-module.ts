import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user-module';
import { StockSystemController } from './app/http/controllers/stock-system-controller';
import { StockSystemController as StockSystemSchedule } from './app/schedule/controllers/stock-system-controller';
import { StockEntity } from './data/database/entities/stock-entity';
import { StockSystemDatasource } from './data/database/stock-system-datasource';
import { StockSystemRepositoryImpl } from './data/repositories/stock-system-repository-impl';
import { StockSystemService } from './data/services/stock-system-service';
import { StockSystemRepository } from './domain/repositories/stock-system-repository';
import { CollectSystemStockInSsiExchangeUsecase } from './domain/usecases/collect-system-stock-in-ssi-exchange-usecase';
import { GetAllStocksUsecase } from './domain/usecases/get-all-stocks-usecase';
import { GetStockUsecase } from './domain/usecases/get-stock-usecase';
import { CreateTransactionStockUsecase } from './domain/usecases/transactions/create-transaction-stock-usecase';
import { DeleteTransactionStockUsecase } from './domain/usecases/transactions/delete-transaction-stock-usecase';
import { GetTransactionStockByTransactionIdUsecase } from './domain/usecases/transactions/get-transaction-stock-by-transaction-id-usecase';
import { GetTransactionStockUsecase } from './domain/usecases/transactions/get-transaction-stock-usecase';
import { GetTransactionStocksUsecase } from './domain/usecases/transactions/get-transaction-stocks-usecase';
import { MergeTransactionStocksUsecase } from './domain/usecases/transactions/merge-transaction-stocks-usecase';
import { TotalStockVolumeUsecase } from './domain/usecases/transactions/total-stock-volume-usecase';
import { UpdateTransactionStockUsecase } from './domain/usecases/transactions/update-transaction-stock-usecase';

@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot(),
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([StockEntity]),
  ],
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
    StockSystemDatasource,
    CreateTransactionStockUsecase,
    GetTransactionStockUsecase,
    GetTransactionStocksUsecase,
    UpdateTransactionStockUsecase,
    GetTransactionStockByTransactionIdUsecase,
    TotalStockVolumeUsecase,
    DeleteTransactionStockUsecase,
    MergeTransactionStocksUsecase,
  ],
  exports: [
    GetStockUsecase,
    CreateTransactionStockUsecase,
    UpdateTransactionStockUsecase,
    GetTransactionStockByTransactionIdUsecase,
    DeleteTransactionStockUsecase,
    TotalStockVolumeUsecase,
    MergeTransactionStocksUsecase,
  ],
})
export class StockSystemModule {}
