import { VnStockModel } from 'src/modules/stock-system/domain/models/vn-stock-model';

export class VnStockEntity {
  constructor(
    public readonly code: string,
    public readonly floor_price: number,
    public readonly ceiling_price: number,
    public readonly reference_price: number,
    public readonly matched_price: number,
    public readonly purchase_price: number,
    public readonly sale_price: number,
  ) {}

  toModel(): VnStockModel {
    return new VnStockModel(
      this.code,
      this.floor_price,
      this.ceiling_price,
      this.reference_price,
      this.matched_price,
      this.purchase_price,
      this.sale_price,
    );
  }
}
