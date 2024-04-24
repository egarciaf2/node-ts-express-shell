import { Router } from 'express';
import { CategoryController } from "./category.controller";




export class CategoryRoutes {


    static get routes(): Router {

        const router = Router();

        const controller = new CategoryController();

        // Definir las rutas
        router.get('/',  controller.getCategories );
        router.get('/:idCategory',  controller.getCategory );
        router.post('/', controller.createCategory );
        router.put('/:idCategory',  controller.updateCategory );
        router.delete('/:idCategory',  controller.deleteCategory );

        return router;
    }


}

