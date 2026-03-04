import { CreateReservaService, DeleteReservaService, GetReservaService, GetAllReservaService, UpdateAllReservaService } from "../services/reserva.service.js";

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

export async function DeleteReservaController(req,res){
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ 
        success: false, 
        message: "ID de reserva no proporcionado" 
      });
    }
    const response = await DeleteReservaService (id);
    res.status(response.status).json({
      success: response.success,
      message: response.message
    })
  } catch (e){
    console.error("Error crítico en DeleteReservaController:", e);
    res.status(500).json({
      success: false,
      message: "Error en el controlador al intentar eliminar una reserva"
    })
  }
}

export async function GetAllReservaController(req, res){
  try {
    const response = await GetAllReservaService(req.body);
    res.status(response.status).json({
      success: response.success,
      message:response.message,
      data: response.data
    })
  } catch (e){
    res.status(500).json({
      success: false,
      message:"Error en el controlador al mostrar todas las reservas"
    })
  }
}

export async function UpdateAllReservaController(req, res){
  try {
    const id = req.params.id;
    const data = req.body;
    const response = await UpdateAllReservaService(id, data);
    res.status (response.status).json({
      success: response.success,
      message: response.message,
      data: response.data
    });
  } catch (e){
    console.log("error en el controlador al actualizar reserva: ",e)
    res.status(500).json({
      success: false,
      message: "Error en el controlador al intentar actualizar una reserva"
    })
  }
}