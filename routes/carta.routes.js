import express from 'express'
import { CartaController } from '../controllers/carta.controller.js'
const CartaRouter = express.Router();
CartaRouter.post("/create",CartaController )
export default CartaRouter;