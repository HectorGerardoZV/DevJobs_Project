const Vacante = require("../model/Vacantes");
const shortId = require("shortid");

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

        const vacante = await Vacante.findOne({url}).lean().populate("autor");

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
            nombre: res.locals.usuario.nombre,
          
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

exports.eliminarVacante = async(req,res,next)=>{
    const {id} = req.params;
    const usuario = res.locals.usuario;
    const vacante = await Vacante.findById(id);

    if(usuario._id.equals(vacante.autor)){
        vacante.remove();
        res.status(200).send("Vacante eliminada correctamente");
    }else{
        res.status(403).send("Error");
    }

    
}

//Subir cv funcionalidad


const validarCurriculum = (req)=>{
    const cv = req.files.cv;
    const errores = [];
    const {size,mimetype} = cv;
    if(size<0 || size>150000){
        errores.push("Error, el archivo supero el tamaño maximo");
    }
    if(mimetype.split("/")[1]!=="pdf"){
        errores.push("Error, el formato del archivo debe de ser PDF");
    }

    return errores;
}
const subirCurriculum = async (req,res)=>{
    const {cv} = req.files;
    const {url} = req.params;
    const vacanteOBJ= req.body;
    const vacante = await Vacante.findOne({url});

    if(vacante){
        const extension = cv.mimetype.split("/")[1];
        const cvName = shortId.generate()+"."+extension;

        const nuevoCandidato ={
            nombre: vacanteOBJ.nombre,
            email: vacanteOBJ.email,
            cv : cvName
        }
        cv.mv(__dirname+"../../public/uploads/cv/"+cvName, async function(error){
           if(error){
            req.flash("error", ["Error al enviar el cv"]);
           
            const vacanteFind = await Vacante.findOne({url}).lean().populate("autor");
            if(vacante){
                res.render("vacante",{
                    namePage : vacante.titulo,
                    vacante:vacanteFind,
                    barra:true,
                    mensajes: req.flash()
                });
             }
           }
        })
       vacante.candidatos.push(nuevoCandidato);
       await vacante.save();
    }
    


}
exports.contactar = async(req,res,next)=>{
    
    let {nombre, email} = req.body;
    nombre = nombre.trim();
    email = email.trim();
    let fails = [];
    if(nombre!=="" || email!==""){
        if(req.files){
            const errores = validarCurriculum(req);
            if(errores.length===0){
                subirCurriculum(req,res);
                req.flash("correcto", "Se envio la solicitud con exito");
                res.redirect("/");
                return next();
            }else{
                fails = errores;
            }
        }else{
            fails.push("Error, El cv en formato PDF es obligatorio")
            
        }
    }else{
       fails.push("Error, el nombre y el correo electronico son obligatorios");
           
    }
    req.flash("error", fails);
    const {url} = req.params;
    const vacante = await Vacante.findOne({url}).lean().populate("autor");
    if(vacante){
        res.render("vacante",{
            namePage : vacante.titulo,
            vacante,
            barra:true,
            mensajes: req.flash()
        });
    }

    
} 