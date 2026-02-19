import { createUserService } from "../services/user.service.js"
export async function registerController(req, res){
    try {
        //Haces la prueba de si todo va bien, el nuevo usuario sea igual al valor que le damos en el body, todo ese req.body ahora se converitra en el userData.
        const newUser = await createUserService(req.body);
        //Aqui enviamos el mensaje y status si todo esta correcto
        res.status(201).json({msg: "Usuario creado", data:newUser})
    } catch(e){
        //Si hay algun error avisa
        res.status(400).json(e.message)
    }
}
