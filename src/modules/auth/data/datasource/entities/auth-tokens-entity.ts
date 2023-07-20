import { AuthTokensModel } from 'src/modules/auth/domain/models/auth-tokens-model';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('auth_tokens')
export class AuthTokensEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  user_id!: number;

  @Column()
  token!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

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
