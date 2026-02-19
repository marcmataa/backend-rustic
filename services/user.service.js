import {UserModel} from '../models/user.model.js'
//Creamos una funcion asincrona en la cual tiene el valor userData dado. El userData, contiene toda la informacion que el cliente ha escrito, en este caso desde postman
export async function createUserService(userData){
    //Creamos el modelo usuario el cual le damos la estructura de la schema que hemos creado en el model
    const User = UserModel();
    //Creamos la instancia con todo lo recogido del modelo, es decir para darle el valor a user
    const newUser = new User(userData)
    return await newUser.save()
}