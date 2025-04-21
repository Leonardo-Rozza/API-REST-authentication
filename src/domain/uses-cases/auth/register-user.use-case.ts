import { AuthRepository } from "../../repositories/auth.repository.js";
import { RegisterUserDto } from "../../dtos/auth/register-user.dto.js";
import { JwtAdapter } from "../../../config/jwt.js";
import { CustomError } from "../../errors/custom.error.js";

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

type SignToken = (payload: Object, duration?: string) => Promise<string|null>;

interface RegisterUserUseCase {
  execute(RegisterUserDto: RegisterUserDto): Promise<UserToken>
}

export class RegisterUser implements RegisterUserUseCase{
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken, 
  ){}



  async execute(RegisterUserDto: RegisterUserDto): Promise<any> {
    //Crear usuario
    const user = await this.authRepository.register(RegisterUserDto);

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