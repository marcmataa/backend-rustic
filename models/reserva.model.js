import { db } from "../config/db.config.js";
export function ReservaModel() {
  const Schema = db.Schema;
  const ReservaSchema = new Schema({
    // Este userId lo que hace es guardar quien hace la reserva
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["confirmada", "cancelada", "completada"],
      default: "confirmada",
    },
  });
  const ReservaModel =
    db.models.Reserva || db.model("Reserva", ReservaSchema, "Reserva");
  return ReservaModel;
}
