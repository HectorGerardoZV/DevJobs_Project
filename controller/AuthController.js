const passport = require("passport");

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