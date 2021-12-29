const Usuario = require("../model/Usuarios");
const passport = require("passport");
const bcrypt = require("bcrypt");

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
        
        res.redirect("/iniciarSesion");

    } catch (error) {
        console.log(error);
        // req.flash("error", "Este correo electronico ya esta en uso");
        // res.redirect("/crearCuenta");
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

exports.formEditarPerfil = (req,res,next) =>{
    try {
        res.render("editarPerfil",{
            namePage: "Editar perfil",
            tagLine: "Edita tu perfil rapido y seguro",
            usuario: res.locals.usuario,
            cerrarSesion: true,
            nombre: res.locals.usuario.nombre
        });
    } catch (error) {
        
    }
}
exports.editarPerfil = async (req,res,next) =>{
    try {
        const id = res.locals.usuario._id;
        const nuevoUsuario = req.body;
        const usuario = await Usuario.findById(id);
        const passwordEQ = (bcrypt.compareSync(nuevoUsuario.passwordNow,usuario.password));


        let {nombre, email, passwordNow, password, passwordNew} = nuevoUsuario;

        nombre = nombre.trim();
        email = email.trim();
        passwordNow = passwordNow.trim();
        password = password.trim();
        passwordNew = passwordNew.trim();
        const errores = [];
        let valid = false;

        if(nombre!=="" && email!=="" && password !== "" && passwordNow !== "" && passwordNew!==""){
            if(passwordEQ){
                if(password===passwordNew){
                    valid = true;
                }else{
                    errores.push("La contraseña nueva no coincide con la repetición");
                }
            }else{
                errores.push("La contraseña actual no es valida");
            }
        }else{
            errores.push("Todos los campos son obligatorios");
        }
        if(valid){
            usuario.password = password;
            usuario.nombre = nombre;
            usuario.email = email;
            req.flash("correcto", "Cambios guardados correctamente");
            await usuario.save();
            res.redirect("/administracion");
        }else{
            req.flash("error", errores);
            res.render("editarPerfil",{
                namePage: "Editar perfil",
                tagLine: "Edita tu perfil rapido y seguro",
                usuario: res.locals.usuario,
                mensajes: req.flash()
            });
        }
        
    } catch (error) {
        console.log(error);
    }
}

