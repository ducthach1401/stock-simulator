import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import user from 'src/config/user';
import { AuthModule } from '../auth/auth-module';
import { AdminController } from './app/http/controllers/admin/admin-controller';
import { UserController as UserControllerByPublic } from './app/http/controllers/public/user-controller';
import { UserController as UserControllerByUser } from './app/http/controllers/user/user-controller';
import { UserEntity } from './data/database/entities/user-entity';
import { UserDatasource } from './data/database/user-datasource';
import { UserRepositoryImpl } from './data/repositories/user-repository-impl';
import { UserRepository } from './domain/repositories/user-repository';
import { AddBalanceUsecase } from './domain/usecases/admin/add-balance-usecase';
import { DeleteUserUsecase } from './domain/usecases/admin/delete-user-usecase';
import { SubtractBalanceUsecase } from './domain/usecases/admin/subtract-balance-usecase';
import { CheckUserPasswordUsecase } from './domain/usecases/user/check-user-password-usecase';
import { GetUserByUsernameUsecase } from './domain/usecases/user/get-user-by-username-usecase';
import { GetUserUsecase } from './domain/usecases/user/get-user-usecase';
import { GetUsersUsecase } from './domain/usecases/user/get-users-usecase';
import { RegisterUserUsecase } from './domain/usecases/user/register-user-usecase';
import { UpdateUserPasswordUsecase } from './domain/usecases/user/update-user-password-usecase';
import { UpdateUserUsecase } from './domain/usecases/user/update-user-usecase';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [user],
    }),
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserControllerByPublic, UserControllerByUser, AdminController],
  providers: [
    UserDatasource,
    GetUserUsecase,
    UpdateUserUsecase,
    RegisterUserUsecase,
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
    CheckUserPasswordUsecase,
    GetUserByUsernameUsecase,
    UpdateUserPasswordUsecase,
    GetUsersUsecase,
    AddBalanceUsecase,
    DeleteUserUsecase,
    SubtractBalanceUsecase,
  ],
  exports: [
    CheckUserPasswordUsecase,
    GetUserByUsernameUsecase,
    UpdateUserUsecase,
    GetUserUsecase,
    SubtractBalanceUsecase,
    AddBalanceUsecase,
  ],
})
export class UserModule {}
