import Router from "express";
import {
  usuarioGet,
  usuarioById,
  usuarioPost,
  usuarioPut,
  usuarioActivar,
  usuarioDesactivar,
  usuarioDelete
} from "../Controllers/usuario.js";

const router = Router();

router.get("/", usuarioGet);

router.get("/:id", usuarioById);

router.post("/",  usuarioPost);

router.put("/:id", usuarioPut);

router.put("/activar/:id", usuarioActivar);

router.put("/desactivar/:id", usuarioDesactivar);

router.delete("/:id", usuarioDelete);

export default router;
