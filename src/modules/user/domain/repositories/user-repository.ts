import { PaginationParams } from 'src/core/models/pagination-params';
import { SortParams } from 'src/core/models/sort-params';
import { UserModel } from '../models/user-model';

export abstract class UserRepository {
  abstract get(id: string, relations: string[] | undefined): Promise<UserModel>;

  abstract getByUsername(username: string): Promise<UserModel>;

  abstract update(
    user: UserModel,
    name: string | undefined,
    isOnline: boolean | undefined,
  ): Promise<boolean>;

  abstract register(user: UserModel): Promise<boolean>;

  abstract checkPassword(user: UserModel, password: string): Promise<boolean>;

  abstract updatePassword(user: UserModel, password: string): Promise<boolean>;

  abstract list(
    user: UserModel,
    paginationParams: PaginationParams,
    sortParams: SortParams,
    search: string | undefined,
  ): Promise<UserModel[]>;
}
