import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { VnStockModel } from '../../domain/models/vn-stock-model';
import { VnStockEntity } from './entities/vn-stock-entity';

@Injectable()
export class StockSystemService {
  constructor(private readonly httpService: HttpService) {}

  async collectStockInSsiExchange(): Promise<VnStockModel[]> {
    const url = 'https://wgateway-iboard.ssi.com.vn/graphql';
    const payload = {
      operationName: 'stockRealtimes',
      variables: {
        exchange: 'hose',
      },
      query:
        'query stockRealtimes($exchange: String) {\n  stockRealtimes(exchange: $exchange) {\n    ceiling\n    floor\n    refPrice\n    stockSymbol\n    matchedPrice\n   best1Bid\n    best2Bid\n     best3Bid\n   best1Offer\n    best2Offer\n    best3Offer\n  }\n}\n',
    };

    const response = await lastValueFrom(
      this.httpService.request({
        method: 'POST',
        url: url,
        data: JSON.stringify(payload),
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    );

    const stocks = response.data.data.stockRealtimes.map((stock: any) =>
      new VnStockEntity(
        stock.stockSymbol,
        stock.floor,
        stock.ceiling,
        stock.refPrice,
        stock.matchedPrice,
        stock.best1Offer,
        stock.best1Bid,
      ).toModel(),
    );
    return stocks;
  }
}
