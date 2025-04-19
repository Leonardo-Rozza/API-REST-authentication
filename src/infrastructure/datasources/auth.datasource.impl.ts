import { BcryptAdapter } from '../../config/index.js';
import { UserModel } from '../../data/mongodb/index.js';
import { RegisterUserDto, AuthDatasource, UserEntity, CustomError } from '../../domain/index.js';
import { UserMapper } from '../mappers/user.mapper.js';


type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hash: string) => boolean;


export class AuthDatasourceImpl implements AuthDatasource{

  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
  ) { }
  
 async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    
   const { name, email, password } = registerUserDto;

   try {
     // 1. Verificar si el correo existe
     const existEmail = await UserModel.findOne({ email });
     if (existEmail) throw CustomError.badRequest("El correo ya existe");

     const user = await UserModel.create({
        name,
        email,
        password: this.hashPassword(password),
     });
     
     await user.save();
     
     // 3. Mapear la respuesta a nuestra entidad
     return UserMapper.userEntityFromObject(user);
     
   } catch (error) {
     
     if (error instanceof CustomError) {
       throw error;
     }

     throw CustomError.internalServerError();
   }
  }
}