const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UsuariosSchema = new Schema({
    imagen: {
        type: String
    },
    nombre: {
        type: String, 
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,        
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    token: {
        type: String
    },
    expira: {
        type: Date
    }
});

UsuariosSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }
    const hash = await bcrypt.hashSync(this.password, 12);
    this.password = hash;
    next();
});



module.exports = mongoose.model("Usuarios", UsuariosSchema);