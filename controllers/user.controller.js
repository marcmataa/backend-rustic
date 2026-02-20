// Importaciones
import { RegisterService, LoginService } from "../services/user.service.js";

export async function RegisterController(req, res) {
    //   Se le da a "response" el valor correspondiente del return que da el RegisterService 
    const response = await RegisterService(req.body);
    //El console.log lo que lee es el return correspondiente de el register.service
    console.log(response)
    // Creamos el res.status que lo que hace con el response.status cojer el valor status que tiene el response que ha recogido de RegisterService, y le damos el succes de true y el mensaje que lleva el reponse
    res.status(response.status).json({
        success: true,
        message: response.message
    })
}
