import { UserModel } from 'src/modules/user/domain/models/user-model';
import { AuthTokensModel } from '../models/auth-tokens-model';

export abstract class AuthRepository {
  abstract create(authToken: AuthTokensModel): Promise<void>;
  abstract checkRevoked(token: string): Promise<boolean>;
  abstract delete(user: UserModel, token: string | undefined): Promise<void>;
}
