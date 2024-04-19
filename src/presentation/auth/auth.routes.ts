import { Router } from 'express';
import { AuthController } from "./auth.controller";
import { AuthService, EmailConfig, EmailService } from "../services";
import { envs } from "../../config";




export class AuthRoutes {

    static get routes(): Router {

        const router = Router();

        const emailConfig: EmailConfig = {
            auth: {
                pass: envs.MAILER_SECRET_KEY,
                user: envs.MAILER_EMAIL
            },
            host: envs.MAILER_HOST,
            port: envs.MAILER_PORT,
            secure: envs.MAILER_SECURE,
            service: envs.MAILER_SERVICE
        }

        const service = new AuthService(
            new EmailService( emailConfig)
        );

        const controller = new AuthController(service);

        // Definir las rutas
        router.post('/register', controller.registerUser );
        router.post('/login', controller.loginUser );
        router.get('/validate-email/:token', controller.validateEmail );
        return router;
    }


}

