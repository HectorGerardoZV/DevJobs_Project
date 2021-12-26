const express = require("express");
const router = express.Router();

const homeController = require("../controller/HomeController");
const vacantesController = require("../controller/VacantesController");

router.get("/",homeController.mostrarTrabajos);


router.get("/vacantes/nueva",vacantesController.formularioNuevaVacante);
router.post("/vacantes/nueva",vacantesController.agregarVacante);


module.exports = router;