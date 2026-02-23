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
