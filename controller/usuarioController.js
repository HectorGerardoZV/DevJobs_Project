const Usuario = require("../model/Usuarios");
const bcrypt = require("bcrypt");
const multer = require("multer");
const shortId = require("shortid");
const fs = require("fs");

const validaImagen = (req)=>{
    const imagen = req.files.imagen;
    const errores = [];
    const extension = imagen.mimetype.split("/")[1];   
    if(extension!== "png" && extension!== "jpeg"){
        errores.push("Formato no valido");
    }
    if(imagen.size<0 || imagen.size>100000){
        errores.push("El tamaño de la imagen fue exedio");
    }
    return errores;
}
const subirImagen = (req,res,name)=>{
    const errores = [];
    const imagen = req.files.imagen;
        imagen.mv(__dirname+"../../public/uploads/perfiles/"+name,function(error){
            if(error){
                errores.push("Error al subir la imagen");
                req.flash("error", errores);
                res.render("editarPerfil",{
                    namePage: "Editar perfil",
                    tagLine: "Edita tu perfil rapido y seguro",
                    usuario: res.locals.usuario,
                    mensajes: req.flash()
                });
            }
        })
    
    
}
const eliminarImagen= (req,res,usuario)=>{
    const errores = [];
    fs.unlink(__dirname+"../../public/uploads/perfiles/"+usuario.imagen,function(error){
        if(error){
            errores.push("Error al actualizar la imagen");
            req.flash("error", errores);
            res.render("editarPerfil",{
                namePage: "Editar perfil",
                tagLine: "Edita tu perfil rapido y seguro",
                usuario: res.locals.usuario,
                mensajes: req.flash()
            });
        }
    })
}
const nombreImagem = (req)=>{
    if(req.files){
        const imagen = req.files.imagen;
        const extension = imagen.mimetype.split("/")[1];
        const {size} = imagen;
        if(extension === "png" || extension==="jpeg"){
            if(size>0 && size<100000){
                const name = shortId.generate()+"."+extension;
               return {name};
            }
            
        }
    }
    
}



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
        req.flash("error", "Este correo electronico ya esta en uso");
        res.redirect("/crearCuenta");
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
        let usuario = await Usuario.findById(id);
     


        let {nombre, email, password} = nuevoUsuario;

        nombre = nombre.trim();
        email = email.trim();
        
    
        const errores = [];
        let valid = false;

        if(nombre!=="" && email!==""){
            valid = true;
        }else{
            errores.push("El nombre y el correo electronico son obligatorios");
        }


        if(password!==""){
            password = password.trim();
            const passwordEQ = (bcrypt.compareSync(password,usuario.password));
            if(!passwordEQ){
                errores.push("Contraseña incorrecta");
                valid = false;
            }else{
                valid= true;
            }
        }else{
            errores.push("La contraseña para realizar la actualización es obliogatoria");
            valid = false;
        }
        if(valid){
            usuario.password = password;
            usuario.nombre = nombre;
            usuario.email = email;
            if(req.files){
               

                const validationImage = validaImagen(req);
                if(validationImage.length>0){
                    req.flash("error", validationImage);
                    res.render("editarPerfil",{
                        namePage: "Editar perfil",
                        tagLine: "Edita tu perfil rapido y seguro",
                        usuario: res.locals.usuario,
                        mensajes: req.flash()
            });
            return;
                }else{
                    if(usuario.imagen){
                        eliminarImagen(req,res,usuario);
                     }
                    const name = nombreImagem(req).name;
                    subirImagen(req,res,name);
                    usuario.imagen = name;
                }
                
            }
            
    
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

