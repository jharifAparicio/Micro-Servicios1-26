const express = require("express");
const router = express.Router();
const UserController = require("../controller/userController");

router.get("/usuarios", UserController.listUsers);
router.get("/usuarios/create", UserController.vistaCrear);
router.get("/usuarios/edit/:id", UserController.vistaEditar);

router.post("/usuarios/save", UserController.save);
router.get("/usuarios/delete/:id", UserController.eliminar);

module.exports = router;
