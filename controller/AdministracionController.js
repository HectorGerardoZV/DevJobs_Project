const Vacante = require("../model/Vacantes");


exports.mostrarPanel = async(req,res,next)=>{
    try {
        const autor = res.locals.usuario._id;
        const vacantes = await Vacante.find({autor}).lean();
        res.render("administracion",{
            namePage: "Panel de administración",
            tagLine: "Crea y administra tus vacantes aquí",
            vacantes
        });
    } catch (error) {
        console.log(error);
    }
}