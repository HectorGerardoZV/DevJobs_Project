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

        req.sanitizeBody("titulo").escape();
        req.sanitizeBody("empresa").escape();
        req.sanitizeBody("ubicacion").escape();
        req.sanitizeBody("salario").escape();
        req.sanitizeBody("contrato").escape();
        req.sanitizeBody("skills").escape();

        req.checkBody("titulo", "Agregar titulo a la vacante").notEmpty();
        req.checkBody("empresa", "Agregar empresa a la vacante").notEmpty();
        req.checkBody("ubicacion", "Agregar ubicación a la vacante").notEmpty();
        req.checkBody("salario", "Agregar salario a la vacante").notEmpty();
        req.checkBody("contrato", "Agregar contrato a la vacante").notEmpty();
        req.checkBody("skills", "Agregar habilidades requeridas a la vacante").notEmpty();

        const errores = req.validationErrors();

        if(!errores){
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
        }else{
            req.flash("error", errores.map(error=>error.msg));
            res.render("nuevaVacante",{
                namaPage: "Nueva Vacante",
                tagLine: "Llena el formulario y publica tu vacante",
                cerrarSesion: true,
                nombre: res.locals.usuario.nombre,
                mensajes: req.flash()
            })
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

        req.sanitizeBody("titulo").escape();
        req.sanitizeBody("empresa").escape();
        req.sanitizeBody("ubicacion").escape();
        req.sanitizeBody("salario").escape();
        req.sanitizeBody("contrato").escape();
        req.sanitizeBody("skills").escape();

        req.checkBody("titulo", "Agregar titulo a la vacante").notEmpty();
        req.checkBody("empresa", "Agregar empresa a la vacante").notEmpty();
        req.checkBody("ubicacion", "Agregar ubicación a la vacante").notEmpty();
        req.checkBody("salario", "Agregar salario a la vacante").notEmpty();
        req.checkBody("contrato", "Agregar contrato a la vacante").notEmpty();
        req.checkBody("skills", "Agregar habilidades requeridas a la vacante").notEmpty();

        const errores = req.validationErrors();

        if(!errores){
            const vacanteActualizada = req.body;
            vacanteActualizada.skills = vacanteActualizada.skills.split(",");
            const vacante = await Vacante.findOneAndUpdate({url: req.params.url},vacanteActualizada,{new:true});
            res.redirect(`/vacantes/${vacante.url}`);
        }else{
            req.flash("error", errores.map(error=>error.msg));
            const {url} = req.params;
            const vacante = await Vacante.findOne({url}).lean();

            res.render("editarVacante",{
                namePage: "Editando Vacante",
                vacante,
                cerrarSesion: true,
                nombre: res.locals.usuario.nombre,
                mensajes: req.flash()
            });
        }


    } catch (error) {
        next();
    }
}