import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { AuthTokensModel } from '../../domain/models/auth-tokens-model';
import { AuthRepository } from '../../domain/repositories/auth-repository';
import { AuthDatasource } from '../datasource/auth-datasource';

@Injectable()
export class AuthRepositoryImpl extends AuthRepository {
  constructor(private readonly authDatasource: AuthDatasource) {
    super();
  }

  async create(authToken: AuthTokensModel): Promise<void> {
    await this.authDatasource.create(authToken);
  }

  async checkRevoked(token: string): Promise<boolean> {
    return await this.authDatasource.checkRevoked(token);
  }

  async delete(user: UserModel, token: string | undefined): Promise<void> {
    await this.authDatasource.delete(user, token);
  }
}
