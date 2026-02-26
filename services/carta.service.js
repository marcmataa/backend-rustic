import { CartaModel } from "../models/carta.model.js";

export async function CartaService(dishData) {
  try {
    const Carta = CartaModel();
    const newDish = await Carta.create({
      name: dishData.name,
      description: dishData.description,
      price: dishData.price,
      category: dishData.category,
    });
    return {
      success: true,
      status: 201,
      data: newDish,
      message: "Plato añadido correctamente",
    };
  } catch (e) {
    return {
      success: false,
      status: 400,
      message: "Error al crear el plato",
    };
  }
}
//Funcion para poder leer la carta
export async function GetCartaService() {
  try {
    const Carta = CartaModel();
    const dishes = await Carta.find();
    return {
      success: true,
      status: 200,
      data: dishes,
    };
  } catch (e) {
    return {
      success: false,
      status: 500,
      message: "Error en la base de datos al leer la carta",
    };
  }
}

export async function UpdateCartaService(id, data) {
  try {
    const Carta = CartaModel();
    const updatedDishes = await Carta.findByIdAndUpdate(id, data, {
      new: true,
    });
    return {
      success: true,
      status: 200,
      data: updatedDishes,
    };
  } catch (e) {
    return {
      success: false,
      status: 500,
      message: "Error en la base de datos al actualizar el plato",
    };
  }
}

export async function DeleteCartaService (id){
  try {
    const Carta = CartaModel();
    await Carta.findByIdAndDelete(id);
    return {
      success: true,
      status: 200,
      message:"Plato eliminado correctamente"
    }
  } catch(e){
    return {
      success: false,
      status: 500,
      message: "Error en la base de datos al eliminar el plato"
    }
  }
}