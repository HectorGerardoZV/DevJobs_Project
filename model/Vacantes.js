const mongoose = require("mongoose");
const slug = require("slug");
const shortId = require("shortid");
const Schema = mongoose.Schema;

const VacantesSchema = new Schema({
    titulo : {
        type: String,
        required:"El nombre de la vacantes es obligatorio",
        trim:true,
    },
    empresa: {
        type: String,
        trim: true,
        required: "La empresa obligatoria"
    },
    ubicacion: {
        type: String,
        trim: true,
        required: "La empresa es obligatoria"
    },
    salario: {
        type: String,
        default: 0,
        trim: true
    },
    contrato: {
        type: String,
        trim: true,
        required: "El salario es obligatorio"
    },
    url: {
        type: String,
        lowercase: true
    },
    skills: {
        type: [String]
    },
    candidatos: {
        type: [{
            nombre: String,
            emial: String,
            cv: String
        }]
    }
}); 
VacantesSchema.pre("save",(next)=>{
    const url = slug(this.titulo);
    this.url = `${url}-${shortId.generate()}`;
    next();
})

module.exports = mongoose.model("Vacante", VacantesSchema);