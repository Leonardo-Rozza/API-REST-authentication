import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/UserEntity";

export abstract class AuthDatasource {

  //todo: 
  // abstract login()
  
  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
  
}