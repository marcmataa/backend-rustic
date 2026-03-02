import express from 'express'
import { CartaController, GetCartaController, UpdateCartaController, DeleteCartaController  } from '../controllers/carta.controller.js'
import { AppMiddleware } from '../middleware/app.middleware.js';
import { AdminMiddleware } from '../middleware/admin.middleware.js';
const CartaRouter = express.Router();

CartaRouter.get('/', GetCartaController)

CartaRouter.post("/create", AppMiddleware, AdminMiddleware, CartaController )
// Se usa el :id en la ruta para que directamente angular asigne el valor del id a req.params.id
CartaRouter.put('/update/:id', AppMiddleware, AdminMiddleware, UpdateCartaController)
CartaRouter.delete('/delete/:id', AppMiddleware, AdminMiddleware, DeleteCartaController)
export default CartaRouter;