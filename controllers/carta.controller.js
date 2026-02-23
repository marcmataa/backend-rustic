import { CartaService } from "../services/carta.service.js";
export async function CartaController(req, res) {
  try {
    const response = await CartaService(req.body);
    res.status(response.status).json({
        success: response.success,
        message: response.message,
        data: response.data
    })
  } catch (e) {
    res.status(500).json({
        success: false,
        message: "Error en el controlador"
    })
  }
}
