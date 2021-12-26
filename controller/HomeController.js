const Vacante  = require("../model/Vacantes");

exports.mostrarTrabajos = async(req,res,next)=>{
    try {

        const vacantes = await Vacante.find().lean();
        res.render("home",{
            namePage: "DevJobs",
            tagLine: "Encuentra y publica trabajos para desarrolladores web",
            barra: true,
            boton: true,
            vacantes
        });
        
    } catch (error) {
        
    }
}