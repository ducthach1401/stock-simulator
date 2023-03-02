import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user-module';
import { ExchangeController } from './app/http/controllers/exchange-controller';
import { ExchangeEntity } from './data/database/entities/exchange-entity';
import { ExchangeDatasource } from './data/database/exchange-datasource';
import { ExchangeRepositoryImpl } from './data/repositories/exchange-repository-impl';
import { ExchangeRepository } from './domain/repositories/exchange-repository';
import { CreateExchangeUsecase } from './domain/usecases/create-exchange-usecase';
import { GetExchangeUsecase } from './domain/usecases/get-exchange-usecase';
import { ListExchangeUsecase } from './domain/usecases/list-exchange-usecase';
import { MarkFinishedExchangeUsecase } from './domain/usecases/mark-finished-exchange-usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExchangeEntity]),
    forwardRef(() => UserModule),
  ],
  controllers: [ExchangeController],
  providers: [
    {
      provide: ExchangeRepository,
      useClass: ExchangeRepositoryImpl,
    },
    ExchangeDatasource,
    CreateExchangeUsecase,
    GetExchangeUsecase,
    ListExchangeUsecase,
    MarkFinishedExchangeUsecase,
  ],
})
export class ExchangeModule {}
