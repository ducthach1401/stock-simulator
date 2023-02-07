import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Not, Repository } from 'typeorm';
import { UserEntity } from './entities/user-entity';
import { UserModel } from '../../domain/models/user-model';
import * as bcrypt from 'bcrypt';
import { PaginationParams } from 'src/core/models/pagination-params';
import { SortParams } from 'src/core/models/sort-params';

@Injectable()
export class UserDatasource {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async get(id: string, relations: string[] | undefined): Promise<UserModel> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: relations,
    });
    if (!user) {
      return null;
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
    await this.userRepository.save(entity);
    return true;
  }

  async getByUsername(username: string): Promise<UserModel> {
    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });
    if (!user) {
      return null;
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
  ): Promise<UserModel[]> {
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

    return users.map((user) => user.toModel());
  }
}
