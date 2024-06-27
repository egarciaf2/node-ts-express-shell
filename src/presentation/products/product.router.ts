import { Router } from 'express';
import { ProductController } from "./product.controller";
import { ProductService } from "../services/product.service";

export class ProductRoutes {


    static get routes(): Router {

        const router = Router();

        const service = new ProductService();

        const controller = new ProductController(service);

        // Definir las rutas
        router.get( '/', controller.getProducts );
        router.get( '/:idProduct', controller.getProduct );
        router.post( '/', controller.createProduct );

        return router;
    }


}

