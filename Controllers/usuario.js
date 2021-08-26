import Usuario from "../models/usuario.js";
const usuarioGet = async (req, res) => {
  const usuario = await Usuario.find();
  res.json({
    usuario,
  });
};

const usuarioPost = async (req, res) => {
  const {
    nombre,
    apellido,
    indentificacion,
    telefono,
    direccion,
    ciudad,
    departamento,
    sexo,
    email,
    password,
    rol,
  } = req.body;
  const usuario = new Usuario({
    nombre,
    apellido,
    indentificacion,
    telefono,
    direccion,
    ciudad,
    departamento,
    sexo,
    email,
    password,
    rol,
  });
  await usuario.save();
  res.json({
    usuario,
  });
};

const usuarioById = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findOne({ _id: id });
  res.json({
    usuario,
  });
};

const usuarioPut = async (req, res) => {
  const { id } = req.params;
  const { _id, email, createdAt, _v, estado, rol, password, ...resto } = req.body;
  const usuario = await Usuario.findByIdAndUpdate(id, resto);
  res.json({
    usuario,
  });  
};

const usuarioActivar = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: 1 });

  res.json({
    usuario,
  });
};

const usuarioDesactivar = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: 0 });

  res.json({
    usuario,
  });
};

const usuarioDelete = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findOneAndDelete(id);
  res.json({
    usuario,
  });
};


export {
  usuarioGet,
  usuarioById,
  usuarioPost,
  usuarioPut,
  usuarioActivar,
  usuarioDesactivar,
  usuarioDelete 
};
