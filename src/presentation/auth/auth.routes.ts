import { Router } from 'express';
import { AuthController } from "./auth.controller";
import { AuthService } from "../services/auth.service";




export class AuthRoutes {

    static get routes(): Router {

        const router = Router();

        const service = new AuthService();

        const controller = new AuthController(service);

        // Definir las rutas
        router.post('/register', controller.registerUser );
        router.post('/login', controller.loginUser );
        router.get('/validate-email/:token', controller.validateEmail );
        return router;
    }


}

