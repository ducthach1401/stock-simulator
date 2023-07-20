import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageList } from 'src/core/models/page-list';
import { PaginationParams } from 'src/core/models/pagination-params';
import { SortParams } from 'src/core/models/sort-params';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import {
  Between,
  FindOptionsWhere,
  IsNull,
  LessThanOrEqual,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
import { ExchangeType } from '../../domain/enums/exchange-type';
import { ExchangeModel } from '../../domain/models/exchange-model';
import { ExchangeEntity } from './entities/exchange-entity';

@Injectable()
export class ExchangeDatasource {
  constructor(
    @InjectRepository(ExchangeEntity)
    private readonly exchangeRepository: Repository<ExchangeEntity>,
  ) {}

  async get(
    user: UserModel | undefined,
    id: number,
  ): Promise<ExchangeModel | undefined> {
    const conditions: FindOptionsWhere<ExchangeEntity> = {
      id: id,
    };

    if (user) {
      conditions.user_id = user.id;
    }
    const exchange = await this.exchangeRepository.findOne({
      where: conditions,
    });

    return exchange?.toModel();
  }

  async create(exchange: ExchangeModel): Promise<void> {
    const entity = new ExchangeEntity();
    entity.id = exchange.id;
    entity.user_id = exchange.userId;
    entity.code = exchange.code;
    entity.price = exchange.price;
    entity.volume = exchange.volume;
    entity.type = exchange.type;
    entity.finished_at = exchange.finishedAt;
    entity.created_at = exchange.createdAt;
    entity.updated_at = exchange.updatedAt;
    await this.exchangeRepository.save(entity);
  }

  async list(
    user: UserModel | undefined,
    search: string | undefined,
    paginationParams: PaginationParams,
    sortParams: SortParams,
    fromTime: Date | undefined,
    toTime: Date | undefined,
    hasFinished: boolean | undefined,
  ): Promise<PageList<ExchangeModel>> {
    const conditions: FindOptionsWhere<ExchangeEntity> = {};
    if (user) {
      conditions.user_id = user.id;
    }

    if (search) {
      conditions.code = search;
    }

    if (fromTime && toTime) {
      conditions.created_at = Between(fromTime, toTime);
    } else if (fromTime) {
      conditions.created_at = MoreThanOrEqual(fromTime);
    } else if (toTime) {
      conditions.created_at = LessThanOrEqual(toTime);
    }

    if (hasFinished !== undefined) {
      conditions.finished_at = hasFinished ? Not(IsNull()) : IsNull();
    }

    const entities = await this.exchangeRepository.findAndCount({
      where: conditions,
      order: {
        [sortParams.sort]: sortParams.dir,
      },
      skip: paginationParams.limit * (paginationParams.page - 1),
      take: paginationParams.limit,
    });

    return new PageList(
      paginationParams.page,
      entities[1],
      entities[0].map((entity) => entity.toModel()),
    );
  }

  async markFinished(
    matchedPrice: number | undefined,
    exchange: ExchangeModel,
  ): Promise<void> {
    await this.exchangeRepository.update(
      {
        id: exchange.id,
      },
      {
        matched_price: matchedPrice,
        finished_at: new Date(),
        updated_at: new Date(),
      },
    );
  }

  async getAll(
    type: ExchangeType | undefined,
    hasFinished: boolean | undefined,
  ): Promise<ExchangeModel[]> {
    const conditions: FindOptionsWhere<ExchangeEntity> = {};
    if (hasFinished !== undefined) {
      conditions.finished_at = hasFinished ? Not(IsNull()) : IsNull();
    }

    if (type !== undefined) {
      conditions.type = type;
    }

    const exchanges = await this.exchangeRepository.find({
      where: conditions,
    });

    return exchanges.map((exchange) => exchange.toModel());
  }
}
