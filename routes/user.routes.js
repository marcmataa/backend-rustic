import express from 'express';
import {registerController} from '../controllers/user.controller.js';
const UserRouter = express.Router();
//Creamos el post con la ruta register y los valores que tienen el registerController
UserRouter.post('/register', registerController)
export default UserRouter;