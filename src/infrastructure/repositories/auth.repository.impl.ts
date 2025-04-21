import { AuthRepository, AuthDatasource, RegisterUserDto, UserEntity, CustomError, LoginUserDto } from "../../domain/index.js";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDatasource: AuthDatasource) {}

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
   return this.authDatasource.login(loginUserDto);
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
      return this.authDatasource.register(registerUserDto); 
  }
}