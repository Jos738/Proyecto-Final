import Router from "express";
import {
  venta_compraGet,
  venta_compraPost,
  venta_compraById,
  venta_compraPut,
  venta_compraActivar,
  venta_compraDesactivar,
  venta_compraDelete,
} from "../Controllers/venta_compra.js";

const router = Router();

router.get("/",venta_compraGet);

router.get("/:id",venta_compraById);

router.post("/",venta_compraPost);

router.put("/:id",venta_compraPut);

router.put("/activar/:id",venta_compraActivar);

router.put("/desactivar/:id",venta_compraDesactivar);

router.delete("/:id",venta_compraDelete);

export default router;
