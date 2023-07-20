import { Injectable } from '@nestjs/common';
import { PageList } from 'src/core/models/page-list';
import { PaginationParams } from 'src/core/models/pagination-params';
import { SortParams } from 'src/core/models/sort-params';
import { UserModel } from '../../domain/models/user-model';
import { UserRepository } from '../../domain/repositories/user-repository';
import { UserDatasource } from '../database/user-datasource';

@Injectable()
export class UserRepositoryImpl extends UserRepository {
  constructor(private readonly userDatasource: UserDatasource) {
    super();
  }

  async get(
    id: number,
    relations: string[] | undefined,
  ): Promise<UserModel | undefined> {
    return await this.userDatasource.get(id, relations);
  }

  async getByUsername(username: string): Promise<UserModel | undefined> {
    return await this.userDatasource.getByUsername(username);
  }

  async update(
    user: UserModel,
    name: string | undefined,
    isOnline: boolean | undefined,
  ): Promise<boolean> {
    return await this.userDatasource.update(user, name, isOnline);
  }

  async register(user: UserModel): Promise<boolean> {
    return await this.userDatasource.register(user);
  }

  async updatePassword(user: UserModel, password: string): Promise<boolean> {
    return await this.userDatasource.updatePassword(user, password);
  }

  async checkPassword(user: UserModel, password: string): Promise<boolean> {
    return await this.userDatasource.checkPassword(user, password);
  }

  async list(
    user: UserModel,
    paginationParams: PaginationParams,
    sortParams: SortParams,
    search: string | undefined,
  ): Promise<PageList<UserModel>> {
    return await this.userDatasource.list(
      user,
      paginationParams,
      sortParams,
      search,
    );
  }

  async addBalance(user: UserModel, amountBalance: number): Promise<void> {
    await this.userDatasource.addBalance(user, amountBalance);
  }

  async delete(user: UserModel): Promise<void> {
    await this.userDatasource.delete(user);
  }
}
