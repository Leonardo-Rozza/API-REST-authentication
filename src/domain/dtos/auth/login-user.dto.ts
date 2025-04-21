import { Validators } from "../../../config/validators.js";

export class LoginUserDto {
  constructor(
    public email: string,
    public password: string,
  ) { }

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;
    if (!email) return ['Missing email'];
     if (!Validators.email.test(email)) return ['Invalid email'];
    if (!password) return ['Missing password'];
    if (password.length < 6) return ['Password must be at least 6 characters long'];
    if (password.length > 20) return ['Password must be at most 20 characters long'];
    
    return [
      undefined,
      new LoginUserDto(email, password),
    ];
  }
}