exports.mostrarTrabajos = (req,res,next)=>{
    try {
        res.render("home",{
            namePage: "DevJobs",
            tagLine: "Encuentra y publica trabajos para desarrolladores web",
            barra: true,
            boton: true
        });
    } catch (error) {
        
    }
}