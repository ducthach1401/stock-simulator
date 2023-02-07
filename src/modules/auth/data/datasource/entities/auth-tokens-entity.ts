import { AuthTokensModel } from 'src/modules/auth/domain/models/auth-tokens-model';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('auth_tokens')
export class AuthTokensEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  token: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  toModel(): AuthTokensModel {
    return new AuthTokensModel(
      this.id,
      this.user_id,
      this.token,
      this.created_at,
      this.updated_at,
    );
  }
}
