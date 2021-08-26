import Router from "express";
import { INV_ANGet, INV_ANById,INV_ANPost,INV_ANPut,INV_ANActivar,INV_ANDesactivar,INV_ANDelete} from "../Controllers/inventario_animal.js";

const router = Router();

router.get("/",INV_ANGet);

router.get("/:id", INV_ANById);

router.post("/",INV_ANPost);

router.put("/:id",INV_ANPut);

router.put("/activar/:id",INV_ANActivar);

router.put("/desactivar/:id",INV_ANDesactivar);

router.delete("/:id",INV_ANDelete);

export default router;
