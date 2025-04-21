import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt.js";
import { UserModel } from "../../data/mongodb/index.js";


export class AuthMiddleware {
  static validateJWT = async(req: Request, res: Response, next: NextFunction) => {
    const authorization = req.header("Authorization");
    if (!authorization) return res.status(401).json({ message: "Unauthorized" });
    if(!authorization.startsWith("Bearer ")) return res.status(401).json({ message: "Invalid Baerer token" });
    

    const token = authorization.split(" ").at(1) || "";
    
    try {
      const payload = await JwtAdapter.validateToken<{id: string}>(token);
      if (!payload) {
        res.status(401).json({ message: "Invalid token" })
        return;
      }
      
      const user = await UserModel.findById(payload.id);
      if (!user) {
        res.status(400).json({ message: "User not found" }); 
        return;
      }
      req.body.user = user;
      next();
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
  }
}
