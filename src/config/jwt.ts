import jwt from 'jsonwebtoken';


export class JwtAdapter {

  static async generateToken(payload: Object, duration:string = "1h"): Promise<string|null> {

    return new Promise((resolve) => {
      jwt.sign(payload, "SEED", {
        expiresIn: "1h",
      }, (err, token) => {
        if (err) return resolve(null);
        if (!token) return resolve(null);
        resolve(token);
      })
    }) 
  }

}