import { ExchangeEntity } from 'src/modules/exchange/data/database/entities/exchange-entity';
import { StockModel } from 'src/modules/stock-system/domain/models/stock-model';
import { UserEntity } from 'src/modules/user/data/database/entities/user-entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('stocks')
export class StockEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  user_id!: string;

  @Column()
  transaction_id!: string;

  @Column()
  code!: string;

  @Column()
  volume!: number;

  @Column()
  purchase_price?: number;

  @Column()
  is_exists!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: UserEntity;

  @OneToOne(() => ExchangeEntity)
  @JoinColumn({ name: 'transaction_id' })
  transaction?: ExchangeEntity;

  toModel(): StockModel {
    return new StockModel(
      this.id,
      this.user_id,
      this.transaction_id,
      this.code,
      this.volume,
      this.purchase_price,
      this.is_exists,
      this.created_at,
      this.updated_at,
      this.user?.toModel(),
      this.transaction?.toModel(),
    );
  }
}
