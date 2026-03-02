import express from 'express';
import { GetReservaController, ReservaController } from '../controllers/reserva.controller.js';
import { AppMiddleware } from '../middleware/app.middleware.js';

const ReservaRouter = express.Router();

ReservaRouter.post('/create', AppMiddleware, ReservaController)
ReservaRouter.get('/my-reservations', AppMiddleware, GetReservaController)
export default ReservaRouter;