import express from 'express';
import { ReservaController } from '../controllers/reserva.controller.js';
import { AppMiddleware } from '../middleware/app.middleware.js';

const ReservaRouter = express.Router();

ReservaRouter.post('/create', AppMiddleware, ReservaController)

export default ReservaRouter;