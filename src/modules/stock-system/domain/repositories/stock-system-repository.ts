import { VnStockModel } from '../models/vn-stock-model';

export abstract class StockSystemRepository {
  abstract collectStockInSsiExchange(): Promise<VnStockModel[]>;
}
