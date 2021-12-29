const Vacante = require("../model/Vacantes");

exports.formularioNuevaVacante = async (req,res,next)=>{
    try {
        res.render("nuevaVacante",{
            namaPage: "Nueva Vacante",
            tagLine: "Llena el formulario y publica tu vacante",
            cerrarSesion: true,
            nombre: res.locals.usuario.nombre
        });
    } catch (error) {
        
    }
    
}
exports.agregarVacante =  async(req,res,next)=>{
    try {
        const autor = res.locals.usuario._id;
        let data = req.body;
        data.skills = req.body.skills.split(",");
        const vacante = new Vacante(data);
        vacante.autor = autor;
        
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

exports.mostrarVacante = async(req,res,next)=>{
    try {
        const {url} = req.params;

        const vacante = await Vacante.findOne({url}).lean();

        if(vacante){
            res.render("vacante",{
                namePage : vacante.titulo,
                vacante,
                barra:true
            });
        }
    } catch (error) {
        next();
    }
}

exports.formEditarVacante = async(req,res,next)=>{
    try {
        const {url} = req.params;
        const vacante = await Vacante.findOne({url}).lean();

        res.render("editarVacante",{
            namePage: "Editando Vacante",
            vacante,
            cerrarSesion: true,
            nombre: res.locals.usuario.nombre
        });
    } catch (error) {
        next();
    }
}
exports.editarVacante = async(req,res,next)=>{
    try {
        const vacanteActualizada = req.body;
        vacanteActualizada.skills = vacanteActualizada.skills.split(",");
        const vacante = await Vacante.findOneAndUpdate({url: req.params.url},vacanteActualizada,{new:true});
        res.redirect(`/vacantes/${vacante.url}`);
    } catch (error) {
        next();
    }
}