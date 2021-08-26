import Router from "express";
import {
  razaGet,
  razaById,
  razaPost,
  razaPut,
  razaActivar,
  razaDesactivar,
  razaDelete,
} from "../Controllers/raza.js";

const router = Router();

router.get("/",razaGet  );

router.get("/:id",razaById);

router.post("/",razaPost);

router.put("/:id",razaPut);

router.put("/activar/:id",razaActivar);

router.put("/desactivar/:id",razaDesactivar);

router.delete("/:id",razaDelete);

export default router;
