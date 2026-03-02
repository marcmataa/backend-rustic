import { CreateReservaService } from "../services/reserva.service.js";

export async function ReservaController(req, res) {
  try {
    const response = await CreateReservaService(req.body);
    res.status(response.status).json({
      success: response.success,
      message: response.message,
      data: response.data,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Error en el el controlador de reserva",
    });
  }
}
