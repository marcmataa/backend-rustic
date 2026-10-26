// Importaciones
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function LoginService(email, password) {
  const userAccess = await UserModel().findOne({ email: email });
  if (!userAccess) {
    return {
      success: false,
      status: 404,
      message: "Usuario o claves incorrectos",
    };
  }

  const correctPass = await bcrypt.compare(password, userAccess.password);
  if (!correctPass || userAccess.role !== "admin") {
    return {
      success: false,
      status: 404,
      message: "Usuario o claves incorrectos",
    };
  }

  const payload = {
    id: userAccess._id,
    role: userAccess.role,
  };
  const token = jwt.sign(payload, process.env.TOKEN_KEY, {
    expiresIn: "1h",
  });

  return {
    success: true,
    status: 200,
    data: {
      message: "Usuario logueado",
      user: payload,
      token,
    },
  };
}
