import Venta_compra from "../models/venta_compra.js";
import modificarStock from "../db_helpers/modificarStock.js";
import Subirarchivo from "../db_helpers/subirArchivo.js";
import path from "path";
import url from "url";
import * as fs from "fs";

const venta_compraGet = async (req, res) => {
  const venta_compra = await Venta_compra.find().populate("usuario", "nombre");
  res.json({
    venta_compra,
  });
};

const venta_compraPost = async (req, res) => {
  const { usuario, impuesto, total, detalles, estado } = req.body;
  const venta_compra = new Venta_compra({
    usuario,
    impuesto,
    total,
    detalles,
    estado,
  });

  venta_compra.total = venta_compra.detalles.reduce(
    (acc, inventario_animal) => acc + (inventario_animal.subtotal = (inventario_animal.cantidad * inventario_animal.precio - inventario_animal.cantidad * inventario_animal.precio * inventario_animal.descuento / 100)), 0
  );

  venta_compra.impuesto=venta_compra.total* 1.2 /100
  

  await venta_compra.save();
  let detallesTemp = req.body.detalles;
  detallesTemp.map((inventario_animal) =>
    modificarStock.disminuirStock(inventario_animal._id, venta_compra.cantidad)
  );
  res.json({
    venta_compra,
  });
};

const venta_compracargararchivo = async (req, res) => {
  const { id } = req.params;
  try {
    const nombre = await Subirarchivo(req.files, undefined);
    let venta_compra = await Venta_compra.findById(id);
    if (venta_compra.foto) {
      const _dirname = path.dirname(url.fileURLToPath(import.meta.url));
      const pathImage = path.join(_dirname, "../upload/", venta_compra.foto);
      if (fs.existsSync(pathImage)) {
        fs.unlinkSync(pathImage);
      }
    }
     venta_compra = await Venta_compra.findByIdAndUpdate(id, { foto: nombre });
    res.json({ nombre });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const venta_compraById = async (req, res) => {
  const { id } = req.params
  const venta_compra = await Venta_compra.findOne({ _id: id })
    .populate("usuario", ["nombre"]);
  res.json({
    venta_compra,
  })
};

const venta_compraPut = async (req, res) => {
  const { id } = req.params
  const { _id, ...resto } = req.body
  const venta_compra = await Venta_compra.findByIdAndUpdate(id, resto)
  venta_compra.total = venta_compra.detalles.reduce(
    (acc, inventario_animal) =>
      acc +
      (inventario_animal.subtotal =
        inventario_animal.cantidad * inventario_animal.precio -
        (inventario_animal.cantidad *
          inventario_animal.precio *
          inventario_animal.descuento) /
          100),
    0
  );

  venta_compra.impuesto = (venta_compra.total * 1.2) / 100;

  await venta_compra.save();
  let detallesTemp = req.body.detalles;
  detallesTemp.map((inventario_animal) =>
    modificarStock.disminuirStock(inventario_animal._id, venta_compra.cantidad)
  );
  res.json({
    venta_compra,
  })
};

const venta_compraActivar = async (req, res) => {
  const { id } = req.params
  const venta_compra = await Venta_compra.findByIdAndUpdate(id, { estado: 1 })
  venta_compra.detalles.map((inventario_animal) =>
    modificarStock.disminuirStock(inventario_animal._id,inventario_animal.cantidad)
  )
  res.json({
    venta_compra,
  });
};

const venta_compraDesactivar = async (req, res) => {
   const { id } = req.params;
   const venta_compra = await Venta_compra.findByIdAndUpdate(id, { estado: 0 });
   venta_compra.detalles.map((inventario_animal) =>
     modificarStock.disminuirStock(
       inventario_animal._id,
       inventario_animal.cantidad
     )
   );
   res.json({
     venta_compra,
   });
};

const venta_compraDelete = async (req, res) => {
  const { id } = req.params;
  const venta_compra = await Venta_compra.findByIdAndDelete(id);
  res.json({
    venta_compra,
  });
};

export {
  venta_compraGet,
  venta_compraPost,
  venta_compraById,
  venta_compracargararchivo,
  venta_compraPut,
  venta_compraActivar,
  venta_compraDesactivar,
  venta_compraDelete,
};
