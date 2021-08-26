import Inventario_animal from "../models/inventario_animal.js";

const INV_ANGet = async (req, res) => {
  const inventario_animal = await Inventario_animal.find().populate(
    "raza",
    "nombre"
  );
  res.json({
    inventario_animal,
  });
};

const INV_ANById = async (req, res) => {
  const { id } = req.params;
  const inventario_animal = await Inventario_animal.findOne({ _id: id });
  res.json({
    inventario_animal,
  });
};

const INV_ANPost = async (req, res) => {
  const { raza, peso_KL, cantidad, color, sexo, litros_leche, edad, N_partos } =
    req.body;
  const inventario_animal = new Inventario_animal({
    raza,
    peso_KL,
    cantidad,
    color,
    sexo,
    litros_leche,
    edad,
    N_partos,
  });
  await inventario_animal.save();
  res.json({
    inventario_animal,
  });
};

const INV_ANPut = async (req, res) => {
  const { id } = req.params;
  const { _id, ...resto } = req.body;
  const inventario_animal = await Inventario_animal.findByIdAndUpdate(
    id,
    resto
  );

  res.json({
    inventario_animal,
  });
};
const INV_ANActivar = async (req, res) => {
  const { id } = req.params;
  const inventario_animal = await Inventario_animal.findOneAndUpdate(id, {
    estado: 1,
  });
  res.json({
    inventario_animal,
  });
};
const INV_ANDesactivar = async (req, res) => {
  const { id } = req.params;
  const inventario_animal = await Inventario_animal.findOneAndUpdate(id, {
    estado: 0,
  });
  res.json({
    inventario_animal,
  });
};
const INV_ANDelete = async (req, res) => {
  const { id } = req.params;
  const inventario_animal = await Inventario_animal.findByIdAndDelete(id);
  res.json({
    inventario_animal,
  });
};

export {
  INV_ANGet,
  INV_ANById,
  INV_ANPost,
  INV_ANPut,
  INV_ANActivar,
  INV_ANDesactivar,
  INV_ANDelete,
};
