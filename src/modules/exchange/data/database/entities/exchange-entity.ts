import { ExchangeType } from 'src/modules/exchange/domain/enums/exchange-type';
import { ExchangeModel } from 'src/modules/exchange/domain/models/exchange-model';
import { UserEntity } from 'src/modules/user/data/database/entities/user-entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('exchange')
export class ExchangeEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  code: string;

  @Column()
  volume: number;

  @Column()
  price: number;

  @Column()
  type: ExchangeType;

  @Column()
  finished_at?: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: UserEntity;

  toModel(): ExchangeModel {
    return new ExchangeModel(
      this.id,
      this.user_id,
      this.code,
      this.volume,
      this.price,
      this.type,
      this.finished_at,
      this.created_at,
      this.updated_at,
      this.user.toModel(),
    );
  }
}
