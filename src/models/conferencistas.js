import mongoose from 'mongoose';

const conferencistaSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombre: { type: String, required: true, trim: true },
  cedula: { type: Number, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  especialidad: { type: String, required: true, trim: true },
  temas: { type: String, required: true, trim: true },
});

export default mongoose.model('Conferencista', conferencistaSchema);