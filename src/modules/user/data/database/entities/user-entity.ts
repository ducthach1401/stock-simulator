import { UserModel } from 'src/modules/user/domain/models/user-model';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  toModel(): UserModel {
    return new UserModel(
      this.id,
      this.name,
      this.username,
      this.password,
      this.created_at,
      this.updated_at,
    );
  }
}
