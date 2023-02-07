import { Injectable } from '@nestjs/common';
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

  async get(id: string, relations: string[] | undefined): Promise<UserModel> {
    return await this.userDatasource.get(id, relations);
  }

  async getByUsername(username: string): Promise<UserModel> {
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
  ): Promise<UserModel[]> {
    return await this.userDatasource.list(
      user,
      paginationParams,
      sortParams,
      search,
    );
  }
}
