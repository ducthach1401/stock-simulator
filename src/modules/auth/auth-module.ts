import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import auth from 'src/config/auth';
import { UserModule } from '../user/user-module';
import { AuthController } from './app/http/controllers/auth-controller';
import { JwtStrategy } from './app/jwt/jwt-strategy';
import { SocketGuard } from './app/jwt/socket-guard';
import { LoginUsecase } from './domain/usecases/login-usecase';
import { GetPayloadByTokenUsecase } from './domain/usecases/get-payload-by-token-usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthTokensEntity } from './data/datasource/entities/auth-tokens-entity';
import { SaveAuthTokenUsecase } from './domain/usecases/auth-token/save-auth-token-usecase';
import { CheckRevokedTokenUsecase } from './domain/usecases/auth-token/check-revoked-token-usecase';
import { DeleteAuthTokenUsecase } from './domain/usecases/auth-token/delete-auth-token-usecase';
import { AuthRepository } from './domain/repositories/auth-repository';
import { AuthRepositoryImpl } from './data/repositories/auth-repository-impl';
import { AuthDatasource } from './data/datasource/auth-datasource';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [auth],
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): any =>
        configService.get<JwtModuleOptions>('auth.jwt'),
    }),
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([AuthTokensEntity]),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    LoginUsecase,
    SocketGuard,
    {
      provide: AuthRepository,
      useClass: AuthRepositoryImpl,
    },
    GetPayloadByTokenUsecase,
    SaveAuthTokenUsecase,
    CheckRevokedTokenUsecase,
    DeleteAuthTokenUsecase,
    AuthDatasource,
  ],
  exports: [
    SocketGuard,
    GetPayloadByTokenUsecase,
    DeleteAuthTokenUsecase,
    CheckRevokedTokenUsecase,
  ],
})
export class AuthModule {}
