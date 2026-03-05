import { ReservaModel } from "../models/reserva.model.js";

const maxCapacity = 50;

export async function CreateReservaService(data) {
  console.log("Datos que llegan al servicio para guardar:", data);
  try {
    // Lo que haces con todo esto es que por ejemplo si los datos de reserva son 2026-03-04 y 14:30, se convierta en 2026-03-04T14:30:00, la T es la que le dice a js donde termina el dia y empieza la hora.
    const start = new Date(`${data.date}T${data.startTime}:00`);

    // Si envias una cadena que no tenga sentido te saltara el error
    if (isNaN(start.getTime())) {
      throw new Error("Fecha u hora inválida");
    }

    // Le das la constante de los dias, el domingo es 0, lunes = 1...
    const dayOfWeek = start.getDay();
    const hour = start.getHours();
    if (dayOfWeek === 1) {
      return {
        success: false,
        status: 403,
        message: "El restaurante esta cerrado los lunes",
      };
    }
    if (dayOfWeek === 0 && hour >= 17) {
      return {
        success: false,
        status: 403,
        message: "El restaurante está cerrado los domingos por la tarde",
      };
    }

    const [h, m] = data.startTime.split(":").map(Number);

    if (m % 15 !== 0) {
      return {
        success: false,
        status: 400,
        message: "Las reservas deben ser cada 15 minutos.",
      };
    }
    const totalMinutes = h * 60 + m;

    // 12:45 = 765min y las 14:15 = 855, es decir que lunch debe tener el valor de este rango de tiempo
    const isLunch = totalMinutes >= 765 && totalMinutes <= 855;
    // 20.00 = 1200min y 22.00 = 1320 min
    const isDinner = totalMinutes >= 1200 && totalMinutes <= 1320;

    if (!isLunch && !isDinner) {
      return {
        success: false,
        status: 400,
        message: "La hora seleccionada no esta dentro de nuestra apertura",
      };
    }

    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // Pasar dos horas a miliegundos

    const overbookingReservation = await ReservaModel().find({
      // La reserva debe haber empezado antes de que la tuya termine
      startTime: { $lt: end },
      // La reserva existente debe de terminar despues de que la tuya haya empezado
      endTime: { $gt: start },
      // Para que cuente a la gente siempre y cuando este el status en confirmada o en sala
      status: { $in: ["confirmada", "en_sala"] },
    });

    // Este for lo que hace es que si hay reservas que se solapan, recorres el for para calcular las personas que tiene cada reserva
    let occupiedGuests = 0;
    for (let i = 0; i < overbookingReservation.length; i++) {
      const currentRes = overbookingReservation[i]; // Le damos el valor de cada objeto del array
      occupiedGuests = occupiedGuests + currentRes.guests; // Aqui sumamos en cada reserva cuantos clientes hay
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
      phone: data.phone,
      guests: data.guests,
      date: start,
      startTime: start,
      endTime: end,
      status: "confirmada",
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
      // Traemos las reservas que tienes o en las que estas haciendo pero no han terminado
      query.status = { $in: ["confirmada", "en_sala"] };
      query.date = { $gte: now }; // La data >= a la de hoy
      
    } else if (filter === "past") {
      // Traemos las reservas completadas o canceladas para crear un historial luego, aparte si las fecha de la reserva es antigua la manda automaticamente al historial aunque no se haya cancelado ni completado ni nada
     query.$or = [
    { status: { $in: ["completada", "cancelada"] } },
    { date: { $lt: now } }
  ];
    }
    // Busca las reservas del userId y con el sort date: 1 lo que hace es ordenarlas a la mas cercana en el tiempo
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

export async function DeleteReservaService(id) {
  try {
    const Reserva = ReservaModel();
    const searchReservation = await Reserva.findById(id);

    if (!searchReservation) {
      return {
        success: false,
        status: 404,
        message: "Reserva no encontrada",
      };
    }

    // Cojes la hora de la reserva y calculas la diferencia con tu hora actual.
    const now = new Date();
    const reservaStartTime = new Date(searchReservation.startTime);
    const diffInMs = reservaStartTime.getTime() - now.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return {
        success: false,
        status: 403,
        message:
          "No se puede cancelar la reserva con menos de 1 hora de antelación.",
      };
    }

    // Si todo esta bien cancelamos la reserva
    await Reserva.findByIdAndUpdate(id, { status: "cancelada" }, { new: true });
    return {
      success: true,
      status: 200,
      message: "Reserva cancelada correctamente",
    };
  } catch (e) {
    return {
      success: false,
      status: 500,
      message: "Error en la base de datos al eliminar la reserva",
    };
  }
}

export async function GetAllReservaService() {
  try {
    const Reserva = ReservaModel();
    const data = await Reserva.find().sort({ date: 1 });

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
      message: "Error en la basa de datos al leer las reservas",
    };
  }
}

export async function UpdateAllReservaService(id, data) {
  try {
    const Reserva = ReservaModel();

    // Buscamos la reserva actual si no la encuentra salta un error
    const reservaActual = await Reserva.findById(id);
    if (!reservaActual) {
      return { success: false, status: 404, message: "Reserva no encontrada" };
    }

    // 2. Validación de estado
    const statusEnum = ["confirmada", "en_sala", "completada", "cancelada"];
    if (data.status && !statusEnum.includes(data.status)) {
      return {
        success: false,
        status: 400,
        message: "Estado de la reserva no valido",
      };
    }

    // Calculamos los horarios, si no hay un cambio de horario damos el antiguo
    let targetStartTime = data.startTime
      ? new Date(data.startTime)
      : new Date(reservaActual.startTime);
    let targetEndTime = data.endTime
      ? new Date(data.endTime)
      : new Date(reservaActual.endTime);

    // Buscamos solapamientos usando en las horas de reserva, pero esta vez excluyendo el id de la reserva
    const overbookingReservation = await Reserva.find({
      _id: { $ne: id },
      status: { $in: ["confirmada", "en_sala"] },
      startTime: { $lt: targetEndTime },
      endTime: { $gt: targetStartTime },
    });

    // Calculamos la ocupacion del local
    let occupiedGuests = 0;
    for (let i = 0; i < overbookingReservation.length; i++) {
      occupiedGuests += overbookingReservation[i].guests;
    }

    // Validamos que no superamos la capacidad maxima del local
    const guestsToValidate = data.guests || reservaActual.guests; // Usamos los nuevos o mantenemos los actuales
    const availableSpots = Math.max(0, maxCapacity - occupiedGuests);

    if (occupiedGuests + guestsToValidate > maxCapacity) {
      let messageError = "";

      if (availableSpots === 0) {
        messageError = "Capacidad excedida, local lleno.";
      } else {
        messageError = `Capacidad excedida, solo pueden entrar ${availableSpots} personas.`;
      }
      return {
        success: false,
        status: 409,
        message: messageError, 
      };
  
    }

    // Si hemos llegado hasta aqui todo esta correcto y podemos hacer la modificacion
    const updateData = await Reserva.findByIdAndUpdate(id, data, { new: true });

    return {
      success: true,
      status: 200,
      data: updateData,
    };
  } catch (e) {
    console.error(e); // Esto te dirá exactamente qué error ha saltado
    return {
      success: false, // Corregido el typo 'sucess'
      status: 500,
      message: "Error en la base de datos al actualizar una reserva",
    };
  }
}
