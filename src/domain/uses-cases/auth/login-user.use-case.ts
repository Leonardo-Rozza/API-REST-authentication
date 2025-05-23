import { AuthRepository } from "../../repositories/auth.repository.js";
import { JwtAdapter } from "../../../config/jwt.js";
import { CustomError } from "../../errors/custom.error.js";
import { LoginUserDto } from '../../dtos/auth/login-user.dto.js';

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

type SignToken = (payload: Object, duration?: string) => Promise<string|null>;

interface LoginUserUseCase {
  execute( loginUserDto: LoginUserDto): Promise<UserToken>
}

export class LoginUser implements LoginUserUseCase{
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken, 
  ){}



  async execute(loginUserDto: LoginUserDto): Promise<any> {
    //Crear usuario
    const user = await this.authRepository.login(loginUserDto);

    //Token
    const token = await this.signToken({ id: user.id },"2h");
    if (!token) throw CustomError.internalServerError("Error generating token");
   
    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    }

  }
}