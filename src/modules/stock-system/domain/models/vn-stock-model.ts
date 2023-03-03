import { DomainModel } from 'src/core/models/domain-model';

export class VnStockModel extends DomainModel {
  public readonly code: string;
  public readonly floorPrice: number;
  public readonly ceilingPrice: number;
  public readonly referencePrice: number;
  public readonly matchedPrice: number;
  public readonly purchasePrice: number;
  public readonly salePrice: number;

  constructor(
    code: string,
    floorPrice: number,
    ceilingPrice: number,
    referencePrice: number,
    matchedPrice: number,
    purchasePrice: number,
    salePrice: number,
  ) {
    super();
    this.code = code;
    this.floorPrice = floorPrice;
    this.ceilingPrice = ceilingPrice;
    this.referencePrice = referencePrice;
    this.matchedPrice = matchedPrice;
    this.purchasePrice = purchasePrice;
    this.salePrice = salePrice;
  }

  toJson(showHidden: boolean): Record<string, any> {
    return this.filterHiddenIfNeed(
      {
        code: this.code,
        floor_price: this.floorPrice,
        ceiling_price: this.ceilingPrice,
        reference_price: this.referencePrice,
        matched_price: this.matchedPrice,
        purchase_price: this.purchasePrice,
        sale_price: this.salePrice,
      },
      showHidden,
    );
  }
}
