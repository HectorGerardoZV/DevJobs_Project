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
}
document.addEventListener("DOMContentLoaded",()=>{
    const listadoHabilidades = new ListadoHabilidades();
    if(listadoHabilidades.exits()){
        listadoHabilidades.skillsEvent();
    }
});
