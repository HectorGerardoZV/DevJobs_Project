const Usuario = require("../model/Usuarios");
exports.formCrearCuenta = (req,res)=>{
    res.render("crearCuenta",{
        namePage: "Crear cuenta",
        tagLine: "Comienza a publicar tus vacantes gratis, solo debes de crearte una cuenta"
    });
}

exports.crearCuenta = async (req,res,next)=>{
    try {
        const usuario = new Usuario(req.body);
        const nuevoUsuario = await usuario.save();
        if(!nuevoUsuario){
            return next();            
        }else{
            res.redirect("/iniciarSesion");
        }

    } catch (error) {
        console.log(error)
    }
}

exports.validarRegistro = (req,res,next)=>{
    try {
        //Sanitize
        req.sanitizeBody("nombre").escape();
        req.sanitizeBody("email").escape();
        req.sanitizeBody("password").escape();
        req.sanitizeBody("passwordAgain").escape();

        //Validate
        req.checkBody("nombre", "El nombre es obligatorio").notEmpty();
        req.checkBody("email", "El email no es valido").isEmail();
        req.checkBody("password", "La contraseña es obligatoria").notEmpty();
        req.checkBody("passwordAgain", "Confirmar contraseña es obligatoria").notEmpty();
        req.checkBody("passwordAgain", "La contraseña es diferente").equals(req.body.password);

        
        
        const errores = req.validationErrors();
        
        if(errores){
            req.flash("error", errores.map(error => error.msg));
            res.render("crearCuenta",{
                namePage: "Crear cuenta",
                tagLine: "Comienza a publicar tus vacantes gratis, solo debes de crearte una cuenta",
                mensajes: req.flash(),
                usuario: req.body
            });
        }else{
            next();
        }

    } catch (error) {
        console.log(error)
    }
}

exports.formIniciarSesion = (req,res)=>{
    try {
        res.render("iniciarSesion",{
            namePage: "IniciarSesion",
            tagLine: "Inicia sesión y comienza a publicar tus vacantes"
        });
    } catch (error) {
        
    }
}

exports.iniciarSesion = async (req,res,next)=>{
    try {
        res.json("YES");
    } catch (error) {
        
    }
}