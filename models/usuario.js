import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema({
  nombre: { type: String, require: true, maxlength: 35},
  apellido: { type: String, require: true, maxlength: 40},
  indentificacion: { type: String, require: true, maxlength: 20 },
  telefono: { type: Number, require: true, maxlength: 20, unique: true },
  direccion: { type: String, require: true, maxlength: 25, unique: true },
  ciudad: { type: String, require: true, maxlength: 20  },
  departamento: { type: String, require: true, maxlength: 20},
  sexo: { type: String, maxlength: 20 },
  email: { type: String, require: true, maxlength: 200, unique: true },
  password: { type: String, require: true, minlength:7, maxlength: 13000, unique: true },
  rol: { type: String, required: true, maxlength: 20 },
  estado: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("usuario", usuarioSchema);