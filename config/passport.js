const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const Usuario = require("../model/Usuarios");
const bcrypt = require("bcrypt");


passport.use(new localStrategy({
    usernameField: "email",
    passwordField: "password"
},async (email, password, done) =>{
    //Finding the user
    const user = await Usuario.findOne({email});
    //If the user was not found
    if(!user) return done(null,false,{message: "El usuario no existe"});
    //If the user is found but the password is incorrect
    const verificarPassword = bcrypt.compareSync(password,user.password);
    if(!verificarPassword) return done(null, false, {message: "Credenciales invalidas"});
    //If the password is correct
    return done(null, user);
}));

//Utilities
passport.serializeUser((user, done)=>done(null, user._id));
passport.deserializeUser(async (id, done)=>{
    const user = await Usuario.findById(id);
    return done(null, user);
});


module.exports = passport;