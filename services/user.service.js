// Importaciones
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Exportacion funcion asincrona que recibe los datosn en "userData", que son los que se envian desde el front o Postman
export async function RegisterService(userData) {
  //   Se ejecuta el modelo que permite que nos conectemos con la base de datos
  const User = UserModel();
  //   Creas el userEmail para ver si en la bd se encuentra un email igual, si es asi ejecutas el if con su status y mensaje
  const userEmail = await User.findOne({ email: userData.email });
  if (userEmail) {
    return {
      status: 409,
      message: "Este usuario ya existe",
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
    // Creo la variable token, la cual coje el valor gracia al json.sign que codifica el objecto payload. Luego se coje el TOKEN_KEY para mezclarlo con el payload y crear el token.
    // El expiresIN, hace que cuando pase el tiempo dado, en este caso 1h, tendras que volver a iniciar sesion
    const token = jwt.sign(payload, process.env.TOKEN_KEY, {
      expiresIn: "1h",
    });
    return {
      status: 201,
      message: "Usuario registrado",
      token: token,
    };
    // Si no ha salido todo bien, ira al catch y te dara el error
  } catch (e) {
    console.log(e);
    return {
      status: 400,
      message: "Error en la base de datos",
    };
  }

  export async function LoginService(email, password) {
    const userAccess = await UserModel().findOne({ email: email });
    if (!userAccess) {
      return {
        status: 404,
        message: "Usuario o claves incorrectos",
      };
    }
  }
}
