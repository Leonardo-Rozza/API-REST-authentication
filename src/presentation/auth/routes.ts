import { Router } from "express";
import { AuthController } from "./controller.js"; 
import { AuthRepositoryImpl } from "../../infrastructure/index.js"; 
import { AuthDatasourceImpl } from "../../infrastructure/index.js"; 

export class AuthRoutes{
  static get routes(): Router {
    const router = Router();

    const datasource = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(datasource);

    const controller = new AuthController(authRepository);
    
    router.post("/login", controller.loginUser);

    router.post("/register", async (req, res) => {
      try {
        await controller.registerUser(req, res);
      } catch (error) {
        res.status(500).send({ error: "Internal Server Error" });
      }
    });

    return router;
  }
}