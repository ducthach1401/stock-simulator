import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import app from 'src/config/app';
import database from 'src/config/database';
import redis from 'src/config/redis';
import swagger from 'src/config/swagger';
import { JwtAuthGuard } from '../auth/app/jwt/jwt-auth-guard';
import { AuthModule } from '../auth/auth-module';
import { ExchangeModule } from '../exchange/exchange-module';
import { StockSystemModule } from '../stock-system/stock-system-module';
import { UserModule } from '../user/user-module';
import { AppController } from './app-controller';
import { AppService } from './app-service';
import { OgmaInterceptor, OgmaModule } from '@ogma/nestjs-module';
import { ExpressParser } from '@ogma/platform-express';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    OgmaModule.forRoot({
      service: {
        color: true,
        json: false,
        application: 'NestJS',
      },
      interceptor: {
        http: ExpressParser,
        ws: false,
        gql: false,
        rpc: false,
      },
    } as any),
    ConfigModule.forRoot({
      load: [app, swagger, redis, database],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<TypeOrmModuleOptions>(
          'database',
        ) as TypeOrmModuleOptions,
    }),
    AuthModule,
    UserModule,
    ExchangeModule,
    StockSystemModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('redis.host'),
        port: configService.get('redis.port'),
        db: configService.get('redis.db'),
      }),
      inject: [ConfigService],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: OgmaInterceptor,
    },
  ],
})
export class AppModule {}
