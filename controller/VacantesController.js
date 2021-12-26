const Vacante = require("../model/Vacantes");

exports.formularioNuevaVacante = async (req,res,next)=>{
    try {
        res.render("nuevaVacante",{
            namaPage: "Nueva Vacante",
            tagLine: "Llena el formulario y publica tu vacante"
        });
    } catch (error) {
        
    }
    
}
exports.agregarVacante =  async(req,res,next)=>{
    try {
        let data = req.body;
        data.skills = req.body.skills.split(",");
        const vacante = new Vacante(data);
        
        const result = await vacante.save();
        if(result){
            res.redirect(`/vacantes/${result.url}`);
        }else{
            res.redirect("/");
        }
        
        
    } catch (error) {
        console.log(error);
    }
}