import { ExchangeEntity } from 'src/modules/exchange/data/database/entities/exchange-entity';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column()
  balance!: number;

  @Column()
  capital!: number;

  @Column()
  profit!: number;

  @Column()
  is_admin!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => ExchangeEntity, (ExchangeEntity) => ExchangeEntity.user)
  @JoinColumn()
  exchange?: ExchangeEntity[];

  toModel(): UserModel {
    return new UserModel(
      this.id,
      this.name,
      this.username,
      this.password,
      this.balance,
      this.capital,
      this.profit,
      this.is_admin,
      this.created_at,
      this.updated_at,
      this.exchange?.map((entity) => entity.toModel()),
    );
  }
}
