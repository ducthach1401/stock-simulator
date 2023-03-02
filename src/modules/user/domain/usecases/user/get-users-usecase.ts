import { Injectable } from '@nestjs/common';
import { PageList } from 'src/core/models/page-list';
import { PaginationParams } from 'src/core/models/pagination-params';
import { SortParams } from 'src/core/models/sort-params';
import { UserModel } from '../../models/user-model';
import { UserRepository } from '../../repositories/user-repository';

@Injectable()
export class GetUsersUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async call(
    user: UserModel,
    paginationParams: PaginationParams,
    sortParams: SortParams,
    search: string | undefined,
  ): Promise<PageList<UserModel>> {
    return await this.userRepository.list(
      user,
      paginationParams,
      sortParams,
      search,
    );
  }
}
