const express = require("express");
const router = express.Router();

const homeController = require("../controller/HomeController");
const vacantesController = require("../controller/VacantesController");
const usuarioController = require("../controller/UsuarioController");
const administracionController = require("../controller/AdministracionController");
const authController = require("../controller/AuthController");

router.get("/",homeController.mostrarTrabajos);

//Vacantes
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
router.post("/vacantes/:url", 
    authController.usuarioAutenticado,
    vacantesController.contactar
    )
router.get("/candidatos/:id", authController.usuarioAutenticado,vacantesController.mostrarCandidatos)

router.delete("/vacantes/eliminar/:id", vacantesController.eliminarVacante)

//Session
router.get("/crearCuenta", usuarioController.formCrearCuenta);
router.post("/crearCuenta",
    usuarioController.validarRegistro,
    usuarioController.crearCuenta
     );

     //Authentication
router.get("/iniciarSesion", usuarioController.formIniciarSesion);
router.post("/iniciarSesion", authController.autenticarUsuario);
router.get("/cerrarSesion", 
    authController.usuarioAutenticado,
    authController.cerrarSesion
    );
    //Administration
router.get("/administracion", 
    authController.usuarioAutenticado,
    administracionController.mostrarPanel
    );

    //User Profile
router.get("/editarPerfil",
    authController.usuarioAutenticado,
    usuarioController.formEditarPerfil
    );
router.post("/editarPerfil",
    authController.usuarioAutenticado,
    usuarioController.editarPerfil
    );


module.exports = router;