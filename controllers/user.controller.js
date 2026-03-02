// Importaciones
import { UserModel } from "../models/user.model.js";
import { RegisterService, LoginService } from "../services/user.service.js";

export async function RegisterController(req, res) {
  //   Se le da a "response" el valor correspondiente del return que da el RegisterService
  const response = await RegisterService(req.body);
  //El console.log lo que lee es el return correspondiente de el register.service
  console.log(response);
  // Creamos el res.status que lo que hace con el response.status cojer el valor status que tiene el response que ha recogido de RegisterService, y le damos el succes de true y el mensaje que lleva el reponse
  res.status(response.status).json({
    success: response.success,
    message: response.message,
    token: response.token,
    role: response.role
  });
}
export async function LoginController(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const response = await LoginService(email, password);
  res.status(response.status).json({
    success: response.success,
    data: response.data,
  });
}
export async function ProfileController(req, res) {
  try {
    // Extraemos el valor del id del usuario ya que el middleware authrization lo guardo en el req
    const userId = req.user.id;
    // Hazemos que traiga el ususario con el mismo id... que en el middleware, pero excluyendo el password por seguridad
    const user = await UserModel().findById(userId).select("-password");
    //Este json si todo va bien te dira succes true y te dara los datos del usuario es decir id, rol....
    res.status(200).json({
      success: true,
      message: "Perfil obtenido correctamente",
      data: user,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Error al obtener perfil",
    });
  }
}
