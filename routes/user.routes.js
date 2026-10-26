import express from "express";
import { LoginController, ProfileController } from "../controllers/user.controller.js";
import { AppMiddleware } from "../middleware/app.middleware.js";
import { AdminMiddleware } from "../middleware/admin.middleware.js";

const UserRouter = express.Router();

UserRouter.post("/login", LoginController);
UserRouter.get("/profile", AppMiddleware, AdminMiddleware, ProfileController);

export default UserRouter;
