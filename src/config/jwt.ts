import jwt from 'jsonwebtoken';
import { envs } from './envs.js';


const JWT_SECRET = envs.JWT_SECRET;

export class JwtAdapter {

  static async generateToken(payload: Object, duration:string = "1h"): Promise<string|null> {
    return new Promise((resolve) => {

      jwt.sign(payload, JWT_SECRET, {
        expiresIn: "1h",
      }, (err, token) => {
        if (err) return resolve(null);
        if (!token) return resolve(null);
        resolve(token);
      })
    }) 
  }

  static validateToken<T>(token: string): Promise<T|null> {
    
    return new Promise((resolve) => {

      jwt.verify(token, JWT_SECRET, (err, decoded) => {

        if (err) return resolve(null);
        if (!decoded) return resolve(null);
        resolve(decoded as T);
      })
    })
  }

}