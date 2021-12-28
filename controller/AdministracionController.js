exports.mostrarPanel = (req,res,next)=>{
    try {
        res.render("administracion",{
            namePage: "Panel de administración",
            tagLine: "Crea y administra tus vacantes aquí"
        });
    } catch (error) {
        
    }
}