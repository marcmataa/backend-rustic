import { ReservaModel } from "../models/reserva.model.js";

const maxCapacity = 50;
export async function CreateReservaService(data) {
    console.log("Datos que llegan al servicio para guardar:", data);
  try {
    const start = new Date(`${data.date}T${data.startTime}:00`);
    if (isNaN(start.getTime())) {
      throw new Error("Fecha u hora inválida");
    }
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // Pasar dos horas a miliegundos

    const overbookingReservation = await ReservaModel().find({
      // La reserva debe haber empezado antes de que la tuy termine
      startTime: { $lt: end },
      // La reserva existente debe de terminar despues de que la tuya haya empezado
      endTime: { $gt: start },
    });

    let occupiedGuests = 0;
    for (let i = 0; i < overbookingReservation.length; i++) {
      const currentRes = overbookingReservation[i];
      occupiedGuests = occupiedGuests + currentRes.guests;
    }
    const availableSpots = Math.max(0, maxCapacity - occupiedGuests);
    // Comprueba que el nuemro de personas de las reservas que se solapan, que ya estan hechas y la suma de los nuevos clientes de la nueva reserva no superen la capacidad del local porque sino salta un error.
    if (occupiedGuests + data.guests > maxCapacity) {
      if (availableSpots === 0) {
        return {
          success: false,
          status: 409,
          message: ` Capacidad excedida, local lleno.`,
        };
      } else {
        return {
          success: false,
          status: 409,
          message: ` Capacidad excedida, solo pueden entrar ${availableSpots} personas para llenar el local.`,
        };
      }
    }
    const newReserva = await ReservaModel().create({
      userId: data.userId,
      name: data.name,
      surname: data.surname,
      email: data.email,
      phone: data.phone,
      guests: data.guests,
      date: data.date,
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
    console.log("Error al CreateReservaService: ", e);
    return {
      success: false,
      status: 400,
      message: "Error al crear la reserva",
    };
  }
}

export async function GetReservaService(userId, filter = "upcoming") {
  try {
    const Reserva = ReservaModel();
    const now = new Date();
    // Solo reservas del usuario en especifico
    let query = { userId: userId };

    if (filter === "upcoming") {
      // El gte hace que sean reservas desde hoy hacia adelante
      query.date = { $gte: now };
    } else if (filter === "past") {
      // Reservas anteriores a hoy
      query.date = { $lt: now };
    }
    // Busca las reservas del userId y con el sort date: 1 lo que hace es ordenarlas en orden ascendente
    const data = await Reserva.find(query).sort({ date: 1 });

    return {
      success: true,
      status: 200,
      data: data,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      status: 500,
      message: "Error en la base de datos al leer las reservas",
    };
  }
}
