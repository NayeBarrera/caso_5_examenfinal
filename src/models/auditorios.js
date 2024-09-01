import mongoose from "mongoose";

const auditorioSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique : true, trim : true },
  capacidad: { type: Number, required: true, trim : true },
  ubicacion: { type: String, required: true, trim : true }
});

export default mongoose.model("Auditorio", auditorioSchema);;