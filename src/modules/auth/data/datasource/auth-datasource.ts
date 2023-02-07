import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { FindOptionsWhere, Repository } from 'typeorm';
import { AuthTokensModel } from '../../domain/models/auth-tokens-model';
import { AuthTokensEntity } from './entities/auth-tokens-entity';

@Injectable()
export class AuthDatasource {
  constructor(
    @InjectRepository(AuthTokensEntity)
    private readonly authRepository: Repository<AuthTokensEntity>,
  ) {}

  async create(authToken: AuthTokensModel): Promise<void> {
    const entity = new AuthTokensEntity();
    entity.id = authToken.id;
    entity.user_id = authToken.userId;
    entity.token = authToken.token;
    entity.created_at = authToken.createdAt;
    entity.updated_at = authToken.updatedAt;
    await this.authRepository.save(entity);
  }

  async checkRevoked(token: string): Promise<boolean> {
    const authToken = await this.authRepository.findOne({
      where: {
        token: token,
      },
    });

    if (!authToken) {
      return false;
    }

    return true;
  }

  async delete(user: UserModel, token: string | undefined): Promise<void> {
    const options: FindOptionsWhere<AuthTokensEntity> = {
      user_id: user.id,
    };
    if (token) {
      options.token = token;
    }
    await this.authRepository.delete(options);
  }
}
