import axios from "axios";
import Swal from "sweetalert2";

 
class ListadoHabilidades {
    constructor(){
        this.skills = document.querySelector(".lista-conocimientos");
        this.skillsList = new Set();
    }
    exist = ()=>{
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

class AccionesVacante {
    constructor(){
        this.listado = document.querySelector(".panel-administracion");
        
    }

    exist = () =>{
        if(this.listado){
            return true;
        }
        return false;
    }

    listeners = () =>{
        this.listado.addEventListener("click",this.eliminarVacante);
    }
    eliminarVacante = e =>{
        e.preventDefault();
        let item = e.target;

        if(item.tagName === "A"){
            if(item.dataset.eliminar){
                Swal.fire({
                    title: 'Desea eliminar esta vacante?',
                    text: "Una vez eliminada no se podrá recuperar!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, eliminar vacante!',
                    cancelButtonText: "No, cancelar"
                  }).then((result) => {
                    if (result.isConfirmed) {
                        const url = `${location.origin}/vacantes/eliminar/${item.dataset.eliminar}`;
                      axios.delete(url,{url})
                      .then(function(respuesta){
                          if(respuesta.status===200){
                            Swal.fire(
                                'Deleted!',
                                respuesta.data,
                                'success'
                              )
                              item.parentElement.parentElement.parentElement.removeChild(item.parentElement.parentElement);
                          }
                      }).catch(()=>{
                        Swal.fire(
                            {
                            type: 'Deleted!',
                            title: respuesta.data,
                            text: 'success'
                            }
                          )
                      })
                    }
                  })
            }else{
                window.location.href = e.target.href;
            }
        }
        
    }
}


document.addEventListener("DOMContentLoaded",()=>{
    const listadoHabilidades = new ListadoHabilidades();
    const alertas = document.querySelector(".alertas");
    const accionesVacante = new AccionesVacante();
    if(alertas){
      setTimeout(() => {
        alertas.remove();
      }, 3000);
       
    }
    if(listadoHabilidades.exist()){
        listadoHabilidades.skillsEvent();
        listadoHabilidades.skillsSeleccionadas();
    }

    if(accionesVacante.exist()){
        accionesVacante.listeners();
    }
});
