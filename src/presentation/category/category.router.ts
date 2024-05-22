import { Router } from 'express';
import { CategoryController } from "./category.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";


export class CategoryRoutes {


    static get routes(): Router {

        const router = Router();

        const controller = new CategoryController();

        // Definir las rutas
        router.get( '/', [ AuthMiddleware.validateJWT ], controller.getCategories );
        router.get( '/:idCategory', [ AuthMiddleware.validateJWT ], controller.getCategory );
        router.post( '/', [ AuthMiddleware.validateJWT ], controller.createCategory );
        router.put( '/:idCategory', [ AuthMiddleware.validateJWT ], controller.updateCategory );
        router.delete( '/:idCategory', [ AuthMiddleware.validateJWT ], controller.deleteCategory );

        return router;
    }


}

