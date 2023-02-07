import { Controller, Get } from '@nestjs/common';
import { Public } from '../auth/app/decorators/metadata';
import { AppService } from './app-service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Hello world')
@Controller('api/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiResponse({ type: String })
  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
