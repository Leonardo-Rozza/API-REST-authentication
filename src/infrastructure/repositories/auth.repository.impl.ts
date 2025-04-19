import { AuthRepository, AuthDatasource, RegisterUserDto, UserEntity, CustomError } from "../../domain/index.js";

export class AuthRepositoryImpl implements AuthRepository{
  constructor(private readonly authDatasource: AuthDatasource) {}

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

      return this.authDatasource.register(registerUserDto); 
  }
}