class ListadoHabilidades {
    constructor(){
        this.skills = document.querySelector(".lista-conocimientos");
        this.skillsList = new Set();
    }
    exits = ()=>{
        if(this.skills){
            return true;
        }
        return false;
    }
    skillsEvent = ()=>{
        this.skills.addEventListener("click",this.agregarSkills);
    }
    agregarSkills = (e)=>{
        if(e.target.tagName=="LI"){
            if(e.target.classList.contains("activo")){
                e.target.classList.remove("activo");
                this.skillsList.delete(e.target.textContent);
            }else{
                this.skillsList.add(e.target.textContent);
                e.target.classList.add("activo");
            }
        }
        const data = [...this.skillsList];
        document.querySelector("#skills").value = data;
    }
    skillsSeleccionadas = ()=>{
        const seleccionadas = Array.from( document.querySelectorAll(".lista-conocimientos .activo"));
        seleccionadas.forEach(seleccion=>{
            this.skillsList.add(seleccion.textContent);
        })
        const data = [...this.skillsList];
        document.querySelector("#skills").value = data;
        
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    const listadoHabilidades = new ListadoHabilidades();
    const alertas = document.querySelector(".alertas");

    if(alertas){
      setTimeout(() => {
        alertas.remove();
      }, 3000);
       
    }
    if(listadoHabilidades.exits()){
        listadoHabilidades.skillsEvent();
        listadoHabilidades.skillsSeleccionadas();
    }
});
