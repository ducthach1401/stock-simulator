import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Not, Repository } from 'typeorm';
import { UserEntity } from './entities/user-entity';
import { UserModel } from '../../domain/models/user-model';
import * as bcrypt from 'bcrypt';
import { PaginationParams } from 'src/core/models/pagination-params';
import { SortParams } from 'src/core/models/sort-params';
import { PageList } from 'src/core/models/page-list';

@Injectable()
export class UserDatasource {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async get(
    id: number,
    relations: string[] | undefined,
  ): Promise<UserModel | undefined> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: relations,
    });
    if (!user) {
      return undefined;
    }

    return user.toModel();
  }

  async update(
    user: UserModel,
    name: string | undefined,
    isOnline: boolean | undefined,
  ): Promise<boolean> {
    await this.userRepository.update(user.id, {
      ...(name && { name: name }),
      ...{ is_online: isOnline },
      updated_at: new Date(),
    });
    return true;
  }

  async register(user: UserModel): Promise<boolean> {
    const entity = new UserEntity();
    entity.id = user.id;
    entity.name = user.name;
    entity.username = user.username;
    entity.password = user.password;
    entity.created_at = user.createdAt;
    entity.updated_at = user.updatedAt;
    entity.balance = user.balance;
    entity.profit = user.profit;
    entity.capital = user.capital;
    entity.is_admin = user.isAdmin;
    await this.userRepository.save(entity);
    return true;
  }

  async getByUsername(username: string): Promise<UserModel | undefined> {
    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });
    if (!user) {
      return undefined;
    }
    return user.toModel();
  }

  async checkPassword(user: UserModel, password: string): Promise<boolean> {
    return bcrypt.compareSync(password, user.password);
  }

  async updatePassword(user: UserModel, password: string): Promise<boolean> {
    await this.userRepository.update(user.id, {
      password: bcrypt.hashSync(password, 10),
    });

    return true;
  }

  async list(
    user: UserModel,
    paginationParams: PaginationParams,
    sortParams: SortParams,
    search: string | undefined,
  ): Promise<PageList<UserModel>> {
    const options: FindOptionsWhere<UserEntity> = {};
    options.id = Not(user.id);
    if (search) {
      options.name = Like(`%${search}%`);
    }

    const users = await this.userRepository.find({
      where: options,
      order: {
        [sortParams.sort]: sortParams.dir,
      },
      skip: (paginationParams.page - 1) * paginationParams.limit,
      take: paginationParams.limit,
    });

    return new PageList(
      paginationParams.page,
      undefined,
      users.map((user) => user.toModel()),
    );
  }

  async addBalance(user: UserModel, amountBalance: number): Promise<void> {
    await this.userRepository.update(
      {
        id: user.id,
      },
      {
        balance: user.balance + amountBalance,
        capital: user.capital + amountBalance,
        created_at: new Date(),
      },
    );
  }

  async delete(user: UserModel): Promise<void> {
    await this.userRepository.delete({
      id: user.id,
    });
  }
}
