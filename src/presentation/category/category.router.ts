import { Router } from 'express';
import { CategoryController } from "./category.controller";
import { CategoryService } from "../services/category.service";

export class CategoryRoutes {


    static get routes(): Router {

        const router = Router();

        const service = new CategoryService();

        const controller = new CategoryController(service);

        // Definir las rutas
        router.get( '/', controller.getCategories );
        router.get( '/:idCategory', controller.getCategory );
        router.post( '/', controller.createCategory );
        router.put( '/:idCategory', controller.updateCategory );
        router.delete( '/:idCategory', controller.deleteCategory );

        return router;
    }


}

