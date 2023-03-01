import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    console.log('test');
    return `${this.configService.get<string>('app.name')} / ${new Date()}`;
  }
}
