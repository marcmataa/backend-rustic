import { ValidateTokenService } from "../services/token.service.js";
export function AppMiddleware(req, res, next) {
    //Extraemos donde viaja el token
  const authHeader = req.headers.authorization;
  //Comprueba si el usuario esta registrado y por lo tanto tiene token
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "No se ha proporcionado un token",
    });
  }
  //Lo que hace es separar el bearer "12ashdi1u" token y se queda la parte del token solo
  const token = authHeader.split(" ")[1];
  try {
    // Lo que hace es comprobar el TOKEN_KEY y si coicide abre el token y extrae la informacion que se ha puesto originalmente.
    const decoded = ValidateTokenService(token);
    // Aqui lo que se hace es decir que el usuario que esta entrando es el que tiene tal id y tal rol
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({
      success: false,
      message: "Token inválido o caducado",
    });
  }
}
