import { db } from "../config/db.config.js";
export function CartaModel() {
  const Schema = db.Schema;
  const CartaSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["entrantes", "burguers", "brasa", "postres"],
    },
  });
  const CartaModel = db.models.Carta || db.model("Carta", CartaSchema, "Carta");
  return CartaModel;
}
