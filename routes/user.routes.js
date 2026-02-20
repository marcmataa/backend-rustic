import express from "express";
import { RegisterController } from "../controllers/user.controller.js";
const UserRouter = express.Router();
//Creamos el post con la ruta register y los valores que tienen el registerController
UserRouter.post("/register", RegisterController);
export default UserRouter;
