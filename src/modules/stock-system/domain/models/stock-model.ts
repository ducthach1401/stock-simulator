import { DomainModel } from 'src/core/models/domain-model';
import { UserModel } from 'src/modules/user/domain/models/user-model';

export class StockModel extends DomainModel {
  public readonly id: string;
  public readonly userId: string;
  public readonly code: string;
  public readonly volume: number;
  public readonly purchasePrice: number;
  public readonly isExists: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly user: UserModel | undefined;

  constructor(
    id: string,
    userId: string,
    code: string,
    volume: number,
    purchasePrice: number,
    isExists: boolean,
    createdAt: Date,
    updatedAt: Date,
    user: UserModel | undefined,
  ) {
    super();
    this.id = id;
    this.userId = userId;
    this.code = code;
    this.volume = volume;
    this.purchasePrice = purchasePrice;
    this.isExists = isExists;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.user = user;
  }

  toJson(showHidden: boolean): Record<string, any> {
    return this.filterHiddenIfNeed(
      {
        id: this.id,
        user_id: this.userId,
        code: this.code,
        volume: this.volume,
        purchase_price: this.purchasePrice,
        is_exists: this.isExists,
        created_at: this.createdAt,
        updated_at: this.updatedAt,
        user: this.user?.toJson(showHidden),
      },
      showHidden,
    );
  }
}
