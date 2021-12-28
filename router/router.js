const express = require("express");
const router = express.Router();

const homeController = require("../controller/HomeController");
const vacantesController = require("../controller/VacantesController");
const usuarioController = require("../controller/usuarioController");

router.get("/",homeController.mostrarTrabajos);


router.get("/vacantes/nueva",vacantesController.formularioNuevaVacante);
router.post("/vacantes/nueva",vacantesController.agregarVacante);

router.get("/vacantes/:url", vacantesController.mostrarVacante);
router.get("/vacantes/editar/:url", vacantesController.formEditarVacante);
router.post("/vacantes/editar/:url", vacantesController.editarVacante);

//Session
router.get("/crearCuenta", usuarioController.formCrearCuenta);
router.post("/crearCuenta",
    usuarioController.validarRegistro,
    usuarioController.crearCuenta
     );

router.get("/iniciarSesion", usuarioController.formIniciarSesion);
router.post("/iniciarSesion", usuarioController.autenticarUsuario);



module.exports = router;