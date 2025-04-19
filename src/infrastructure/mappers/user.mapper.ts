import { CustomError, UserEntity } from "../../domain/index.js";

export class UserMapper {

  static userEntityFromObject(obj: { [key: string] : any }) {
    const {id, _id, name, password, email, roles } = obj;    
    
    if (!id || !_id) throw CustomError.badRequest("User id is required");
    
    if (!name) throw CustomError.badRequest("User name is required");
    
    if (!email) throw CustomError.badRequest("User email is required");
   
    if (!password) throw CustomError.badRequest("User password is required");
    
    if (!roles) throw CustomError.badRequest("User roles is required");

    
    return new UserEntity(
      _id || id,
      name,
      email,
      password,
      roles
    )
  }



}