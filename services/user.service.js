// Importaciones
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//-------------REGISTER-------------
// Exportacion funcion asincrona que recibe los datosn en "userData", que son los que se envian desde el front o Postman
export async function RegisterService(userData) {
  //   Se ejecuta el modelo que permite que nos conectemos con la base de datos
  const User = UserModel();
  //   Creas el userEmail para ver si en la bd se encuentra un email igual, si es asi ejecutas el if con su status y mensaje
  const userEmail = await User.findOne({ email: userData.email });
  if (userEmail) {
    return {
      success: false,
      status: 409,
      message: "Este usuario ya existe",
    };
  }
  if (userData.password.length < 6) {
    return {
      success: false,
      status: 400,
      message: "La contraseña debe tener al menos 6 caracteres",
    };
  }
  //Aqui encriptamos, se genera una cadena de caracteres con salt de 10, para cifrar la contraseña, con el hash la encriptas combinandola con el password inicial y el salt
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(userData.password, salt);
  try {
    // Registramos el nuevo usuario con el schema que cojemos de la funcion "UserModel", con la contraseña hasheada
    const newUser = await UserModel().create({
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      password: hash,
    });
    // Creamos un objeto en el cual damos los valores del id y rol del usuario
    const payload = {
      id: newUser._id,
      role: newUser.role,
    };
    // Creo la variable token, la cual coje el valor gracias al json.sign que codifica el objecto payload. Luego se coje el TOKEN_KEY para mezclarlo con el payload y crear el token.
    // El expiresIN, hace que cuando pase el tiempo dado, en este caso 1h, tendras que volver a iniciar sesion
    const token = jwt.sign(payload, process.env.TOKEN_KEY, {
      expiresIn: "1h",
    });
    return {
      success: true,
      status: 201,
      message: "Usuario registrado",
      token: token,
    };
    // Si no ha salido todo bien, ira al catch y te dara el error
  } catch (e) {
    console.log(e);
    return {
      success: false,
      status: 400,
      message: "Error en la base de datos",
    };
  }

}
//-------------LOGIN-------------
export async function LoginService(email, password) {
    // Creamos una constante que busca si el correo ya existe, es decir si esta registrado.
  const userAccess = await UserModel().findOne({ email: email });
  if (!userAccess) {
    return {
        success: false,
      status: 404,
      message: "Usuario o claves incorrectos",
    };
  }
//   Creamos una constante que se encarga de comparar la contraseña con su hash y te devuelve el valor de true si son iguales
  const correctPass = await bcrypt.compare(password, userAccess.password);
  if(!correctPass){
    return {
        success:false,
        status: 404,
        message: "Usuario o claves incorrectos",
    }
  }
  //Creacion del payload para cuando se inicie la sesion
   const payload = {
      id: userAccess._id,
      role: userAccess.role,
    };
    //Creacion del token durante una hora
    const token = jwt.sign(payload, process.env.TOKEN_KEY, {
      expiresIn: "1h",
    });
     return {
      success: true,
      status: 200,
      data: {
        message:"Usuario logueado",
        user: payload,
        token
      }
    };
}
