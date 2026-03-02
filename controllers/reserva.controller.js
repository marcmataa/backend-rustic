import { CreateReservaService, GetReservaService } from "../services/reserva.service.js";

export async function ReservaController(req, res) {
  try {
   const dataWithUser = {
        ...req.body,           // Copiamos todo lo que envió el frontend
        userId: req.user.id    // Añadimos el ID que sacamos del token (seguro)
    };
    const response = await CreateReservaService(dataWithUser);
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

export async function GetReservaController(req,res){
  try {
    const userId = req.user.id;
    const filter = req.query.filter
    const response = await GetReservaService(userId, filter);
    res.status(response.status).json({
      success: response.success,
      message: response.message,
      data: response.data
    });
  } catch (e){
    res.status(500).json({
      success: false,
      message: "Error en el controlador de leer reserva"
    })
  }
}