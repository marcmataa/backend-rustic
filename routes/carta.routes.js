import express from 'express'
import { CartaController, GetCartaController, UpdateCartaController, DeleteCartaController  } from '../controllers/carta.controller.js'
const CartaRouter = express.Router();

CartaRouter.post("/create",CartaController )
CartaRouter.get('/', GetCartaController)
// Se usa el :id en la ruta para que directamente angular asigne el valor del id a req.params.id
CartaRouter.put('/update/:id', UpdateCartaController)
CartaRouter.delete('/delete/:id', DeleteCartaController)
export default CartaRouter;