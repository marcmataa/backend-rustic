import { db } from "../config/db.config.js";
export function UserModel() {
  const Schema = db.Schema;
  const UserSchema = new Schema(
    {
      name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
      },
      surname: {
        type: String,
        required: [true, "El apellido es obligatorio"],
      },
      email: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true,
        lowercase: true, //Lo que hace es guardar de manera automatica todo a letra minuscula
      },
      password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
        minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
      },
      role: {
        type: String,
        enum: ["client", "admin"],
        default: "client",
      },
    },
    { timestamps: true },
  );
  const UserModel =db.models.User || db.model("User", UserSchema, "User");
  return UserModel;
}
