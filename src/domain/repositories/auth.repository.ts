import { LoginUserDto } from "../dtos/auth/login-user.dto.js";
import { RegisterUserDto } from "../dtos/auth/register-user.dto.js";
import { UserEntity } from "../entities/UserEntity.js";

export abstract class AuthRepository {

  abstract login(loginUserDto: LoginUserDto ): Promise<UserEntity>;
  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
  
}