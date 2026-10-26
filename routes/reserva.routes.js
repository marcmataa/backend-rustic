import express from 'express';
import { DeleteReservaController, GetReservaController, ReservaController, GetAllReservaController, UpdateAllReservaController, GetDisponibilidadController } from '../controllers/reserva.controller.js';
import { AppMiddleware } from '../middleware/app.middleware.js';
import {AdminMiddleware} from '../middleware/admin.middleware.js'

const ReservaRouter = express.Router();

ReservaRouter.post('/create', AppMiddleware, ReservaController)
ReservaRouter.get('/', AppMiddleware, GetReservaController)
ReservaRouter.put('/delete/:id', AppMiddleware, DeleteReservaController)
ReservaRouter.get('/all',AppMiddleware, AdminMiddleware,GetAllReservaController)
ReservaRouter.put('/update/:id', AppMiddleware, AdminMiddleware, UpdateAllReservaController)
ReservaRouter.get('/disponibilidad', GetDisponibilidadController)
export default ReservaRouter;