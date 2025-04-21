import { Request, Response, RequestHandler } from 'express';
import { AuthRepository, CustomError, LoginUserDto, RegisterUser, RegisterUserDto } from '../../domain/index.js';
import { JwtAdapter } from '../../config/jwt.js';
import { UserModel } from '../../data/mongodb/index.js';
import { LoginUser } from '../../domain/uses-cases/auth/login-user.use-case.js';


export class AuthController {
  constructor(
    private readonly authRepository:AuthRepository
  ) { }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
   } 
  }

  registerUser:RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res));
  }

  /*
    registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });
    
    this.authRepository.register(registerUserDto!)
      .then(async (user) => {
        res.json({
          user,
          token: await JwtAdapter.generateToken({ id: user.id}),
        })
      })
      .catch(error => this.handleError(error, res));
  }
  */

  loginUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const [error, loginUserDto] = LoginUserDto.create(req.body);
      if (error) {
        res.status(400).json({ error });
        return;
      }

      const user = await new LoginUser(this.authRepository).execute(loginUserDto!);
      const token = await JwtAdapter.generateToken({ id: user.id });
      res.json({ user, token });
    } catch (error) {
      this.handleError(error, res);
    }
  }

  getUser: RequestHandler = (req: Request, res: Response) => {
    UserModel.find()
      .then(users => res.json({
        //users,
        token: req.body.payload,
      }))
      .catch(error => res.status(500).json({ error: "Internal Server Error" }));

  }
}