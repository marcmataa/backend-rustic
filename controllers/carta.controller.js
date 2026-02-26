import { CartaService, GetCartaService, DeleteCartaService,UpdateCartaService } from "../services/carta.service.js";
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
export async function GetCartaController(req,res){
  try {
  const response = await GetCartaService(req.body);
  res.status(response.status).json({
      success: response.success,
      message: response.message,
      data: response.data
  })
} catch (e) {
  res.status(500).json({
      success: false,
      message: "Error en el controlador al mostrar"
  })
}
}
export async function UpdateCartaController(req,res){
  try {
    const id = req.params.id;
    const data = req.body
    const response = await UpdateCartaService(id, data);
    res.status (response.status).json ({
      success: response.success,
      message: response.message,
      data: response.data
    })
  } catch (e){
    res.status(500).json({
      success: false,
      message: "Error en el controlador al intentar actualizar un plato"
    })
  }
}
export async function DeleteCartaController(req,res){
  try {
    const id = req.params.id;
    const response = await DeleteCartaService (id);
    res.status(response.status).json({
      success: response.success,
      message: response.message,
    })
  } catch (e){
    res.status(500).json({
      success: false,
      message: "Error en el controlador al intentar eliminar un plato"
    })
  }
}