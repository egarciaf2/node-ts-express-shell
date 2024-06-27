import { Router } from 'express';
import { AuthRoutes } from "./auth/auth.routes";
import { CategoryRoutes } from "./category/category.router";
import { AuthMiddleware } from "./middlewares/auth.middleware";
import { ProductRoutes } from "./products/product.router";




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/auth', AuthRoutes.routes );
    router.use('/api/category', [ AuthMiddleware.validateJWT ], CategoryRoutes.routes );
    router.use('/api/product', [ AuthMiddleware.validateJWT ], ProductRoutes.routes );

    return router;
  }


}

