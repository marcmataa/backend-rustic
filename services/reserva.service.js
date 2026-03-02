import { ReservaModel } from "../models/reserva.model.js";

const maxCapacity = 50;
export async function CreateReservaService(data) {
  try {
    const start = new Date(data.startTime);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // Pasar dos horas a miliegundos

    const overbookingReservation = await ReservaModel().find({
        // La reserva debe haber empezado antes de que la tuy termine
        startTime: { $lt: end},
        // La reserva existente debe de terminar despues de que la tuya haya empezado
        endTime: {$gt: start}
    });

    let occupiedGuests = 0;
    for ( let i = 0; i < overbookingReservation.length; i++){
        const currentRes = overbookingReservation[i];
        occupiedGuests = occupiedGuests + currentRes.guests
    }
const availableSpots = Math.max(0, maxCapacity - occupiedGuests);
    // Comprueba que el nuemro de personas de las reservas que se solapan, que ya estan hechas y la suma de los nuevos clientes de la nueva reserva no superen la capacidad del local porque sino salta un error.
    if (occupiedGuests + data.guests >maxCapacity) {
        if (availableSpots === 0){
            return {
                  success: false,
            status: 409,
            message:` Capacidad excedida, local lleno.` 
            }
        }else {

            return {
                success: false,
                status: 409,
                message:` Capacidad excedida, solo pueden entrar ${availableSpots} personas para llenar el local.` 
            }
        }
    } 
    const newReserva = await ReservaModel().create({
      name: data.name,
      surname: data.surname,
      email: data.email,
      phone: data.phone,
      guests: data.guests,
      startTime: start,
      endTime: end,
    });

    return {
      success: true,
      status: 201,
      data: newReserva,
      message: "Reserva creada correctamente",
    };
  } catch (e) {
      
      console.log("Error al CreateReservaService: ", e)
    return {
      success: false,
      status: 400,
      message: "Error al crear la reserva",
    };
  }
}
