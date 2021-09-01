import Router from "express";
import { INV_ANGet, INV_ANById,INV_ANPost,INV_ANPut,INV_ANActivar,INV_ANDesactivar,INV_ANDelete} from "../Controllers/inventario_animal.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { existeInventario_animalById } from "../db_helpers/inventario_animal.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import validator from "express-validator";
const { check } = validator;
const router = Router();

router.get("/",[validarJWT,validarCampos],INV_ANGet);

router.get(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeInventario_animalById),
    validarCampos,
  ],
  INV_ANById
);


router.post("/",[validarJWT,validarCampos],INV_ANPost);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeInventario_animalById),
    validarCampos,
  ],
  INV_ANPut
);

router.put(
  "/activar/:id",
  [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeInventario_animalById),
    validarCampos,
  ],
  INV_ANActivar
);

router.put(
  "/desactivar/:id",
  [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeInventario_animalById),
    validarCampos,
  ],
  INV_ANDesactivar
);

router.delete("/:id",[validarJWT],INV_ANDelete);

export default router;
