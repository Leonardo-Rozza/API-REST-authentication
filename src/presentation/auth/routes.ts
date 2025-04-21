import { Router} from "express";
import { AuthController } from "./controller.js"; 
import { AuthRepositoryImpl } from "../../infrastructure/index.js"; 
import { AuthDatasourceImpl } from "../../infrastructure/index.js"; 
import { AuthMiddleware } from "../middlewares/auth.middlewares.js";

export class AuthRoutes{
  static get routes(): Router {
    const router = Router();

    const datasource = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(datasource);

    const controller = new AuthController(authRepository);
    
    router.post("/login", controller.loginUser);

    router.post("/register", controller.registerUser);

    router.get("/", async (req, res, next) => {
        try {
            await AuthMiddleware.validateJWT(req, res, next);
            controller.getUser(req, res, next);
        } catch (error) {
            next(error);
        }
    });

    return router;
  }
}