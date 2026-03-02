import {db} from '../config/db.config.js'
export function ReservaModel(){
    const Schema = db.Schema;
    const ReservaSchema = new Schema ({
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
            required: true
        },
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date, 
            required: true
        },
        status: {
            type: String, 
            enum: ['confirmada', 'cancelada', 'completada'], 
            default: 'confirmada'
        }
    });
    const ReservaModel = db.models.Reserva || db.model("Reserva", ReservaSchema, "Reserva")
    return ReservaModel;
}