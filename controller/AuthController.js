const passport = require("passport");
const Usuario = require("../model/Usuarios");
const crypto = require("crypto");
const envairEmail = require("../handlers/email");

exports.autenticarUsuario = passport.authenticate("local",{
    successRedirect: "/administracion",
    failureRedirect: "/iniciarSesion",
    failureFlash: true,
    badRequestMessage: "Ambos campos son obligatorios",

});

exports.usuarioAutenticado = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/iniciarSesion");
}

exports.cerrarSesion = (req,res,next)=>{
    req.session.destroy(()=>{       
        res.redirect("/iniciarSesion");
    });
}
exports.reestablecerPasswordForm = (req,res,next)=>{
    try {
        res.render("reestablecerPassword",{
            namePage: "Reestableciendo Contraseña",
            tagLine: "Si ya tienes una cuenta pero olvidaste tu contraseña, coloca tu correo electronico"
        })
    } catch (error) {
        
    }
}
exports.enviarToken = async (req,res,next)=>{
    try {
        const {email} = req.body;
        const usuario = await Usuario.findOne({email});
        if(usuario){
            usuario.token = crypto.randomBytes(20).toString("hex");
            usuario.expira = Date.now()+ 3600000;
            await usuario.save();

            const resetURL = `http://${req.headers.host}/reestablecerPassword/${usuario.token}`;
            await envairEmail.enviar({
                usuario,
                subject: "Password reset",
                resetUrl: resetURL,
                archivo: "reset"
            });


            req.flash("correcto", "Revisa tu correo electronico y actualiza tu contraseña");
            res.redirect("/reestablecerPassword");
        }else{
            req.flash("error", "No hay una cuenta ligada con este correo electronico");
            res.redirect("/reestablecerPassword");
        }
    } catch (error) {
        console.log(error)
    }
}

exports.reestablecerPassword = async (req,res,next)=>{
    try {
        const {token} = req.params;
        const usuario = await Usuario.findOne({
            token,
            expira: {
                $gt: Date.now()
            }
        });
        if(!usuario){
            req.flash("error", "El formulario ya no es valido, intenta enviando uno nuevo");
           return res.redirect("/reestablecerPassword")
        }else{
            res.render("nuevoPassword",{
                namePage: "Nueva Contraseña",
                tagLine: "Modifica tu nueva constraseña"
            })
        }

        
    } catch (error) {
        console.log(error)
    }
}
exports.guardarPassword = async (req,res,next)=>{
    try {
        const {token} = req.params;
        const usuario = await Usuario.findOne({
            token,
            expira: {
                $gt: Date.now()
            }
        });
        if(!usuario){
            req.flash("error", "El formulario ya no es valido, intenta enviando uno nuevo");
           return res.redirect("/reestablecerPassword")
        }else{

            usuario.password = req.body.password;
            usuario.token = null;
            usuario.expira = null;

            await usuario.save();

            req.flash("correcto", "Contraseña actualizada correctamente")
            res.redirect("/iniciarSesion");
        }
    } catch (error) {
        
    }
}