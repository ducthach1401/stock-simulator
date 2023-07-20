import { PageList } from 'src/core/models/page-list';
import { PaginationParams } from 'src/core/models/pagination-params';
import { SortParams } from 'src/core/models/sort-params';
import { UserModel } from '../models/user-model';

export abstract class UserRepository {
  abstract get(
    id: number,
    relations: string[] | undefined,
  ): Promise<UserModel | undefined>;

  abstract getByUsername(username: string): Promise<UserModel | undefined>;

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
  ): Promise<PageList<UserModel>>;

  abstract addBalance(user: UserModel, amountBalance: number): Promise<void>;

  abstract delete(user: UserModel): Promise<void>;
}
