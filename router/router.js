const express = require("express");
const router = express.Router();

const homeController = require("../controller/HomeController");
const vacantesController = require("../controller/VacantesController");
const usuarioController = require("../controller/UsuarioController");
const administracionController = require("../controller/AdministracionController");
const authController = require("../controller/AuthController");

router.get("/",homeController.mostrarTrabajos);


router.get("/vacantes/nueva",
    authController.usuarioAutenticado,
    vacantesController.formularioNuevaVacante
);
router.post("/vacantes/nueva",
    authController.usuarioAutenticado,
    vacantesController.agregarVacante
);

router.get("/vacantes/:url", vacantesController.mostrarVacante);
router.get("/vacantes/editar/:url", 
    authController.usuarioAutenticado,
    vacantesController.formEditarVacante
    );
router.post("/vacantes/editar/:url", 
    authController.usuarioAutenticado,
    vacantesController.editarVacante
    );

//Session
router.get("/crearCuenta", usuarioController.formCrearCuenta);
router.post("/crearCuenta",
    usuarioController.validarRegistro,
    usuarioController.crearCuenta
     );

router.get("/iniciarSesion", usuarioController.formIniciarSesion);
router.post("/iniciarSesion", authController.autenticarUsuario);
router.get("/administracion", 
    authController.usuarioAutenticado,
    administracionController.mostrarPanel
    );


module.exports = router;