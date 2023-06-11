// guardamos en una variable el parametro pasado por la url
const idCita = new URLSearchParams(window.location.search).get("id")
// creamos las variables
const errorContainer = document.getElementById("errorContainer")
const citaContainer = document.getElementById("citaContainer")
const errorP = document.getElementById("errorP")
const fecha = document.getElementById("fecha")
const hora = document.getElementById("hora")
const proposito = document.getElementById("proposito")
const dni_paciente = document.getElementById("dni_paciente")
const estado = document.getElementById("estado")
const antecedentes = document.getElementById("antecedentes")
const medicamentos = document.getElementById("medicamentos")
const vacunas = document.getElementById("vacunas")
const pruebas = document.getElementById("pruebas")
const consultas = document.getElementById("consultas")
const cirugias = document.getElementById("cirugias")
const notas = document.getElementById("notas")
const recetas = document.getElementById("recetas")
const modifyHistorial = document.getElementById("modifyHistorial")
const resultsBody = document.getElementById('resultsBody');
const resultButton = document.getElementById('resultButton');
const nextCita = document.getElementById('nextCita');
const medicamento = document.getElementById("medicamento")
const dosis = document.getElementById("dosis")
const frecuencia = document.getElementById("frecuencia")
const recetaLoader = document.getElementById("recetaLoader")
const recetaSpan = document.getElementById("recetaSpan")
const historialLoader = document.getElementById("historialLoader")
const historialSpan = document.getElementById("historialSpan")
const buttons = document.getElementById("buttons")
const buttonsLoader = document.getElementById("buttonsLoader")
const createReceta = document.getElementById("createReceta")
const errorReceta = document.getElementById("errorReceta")
// para poder manejar los modales de bootstrap tendremos que crear un objeto modal
const historialModal = new bootstrap.Modal(document.getElementById('modal-historial'));
const recetaModal = new bootstrap.Modal(document.getElementById('modal-crear-receta'));
const resultsModal = new bootstrap.Modal(document.getElementById('results'));
const arduinoModal = new bootstrap.Modal(document.getElementById('arduinoModal'));
let result;
/**
 * 
 * @param cita
 * con showcita mostraremos la informacion de la cita 
 */
const showCita = (cita) => {
    fecha.innerText = cita.fecha;
    hora.innerText = cita.hora
    proposito.innerText = cita.proposito
    dni_paciente.innerText = cita.dni_paciente
    estado.innerText = cita.estado
    citaContainer.classList.toggle("hidden")
}
/**
 * 
 * @param historial 
 * con showhistorial mostraremos la informacion del historial 
 */
const showHistorial = (historial) => {
    antecedentes.innerText = historial.antecedentes;
    vacunas.innerText = historial.vacunas
    medicamentos.innerText = historial.medicamentos
    pruebas.innerText = historial.pruebas
    consultas.innerText = historial.consultas
    cirugias.innerText = historial.cirugias
    notas.innerText = historial.notas
}
/**
 * 
 * @param array 
 * con showRecetas mostraremos la informacion de las recetas. Con un bucle recorreremos el array de recetas y crearemos una tr con sus td por cada receta 
 */
const showRecetas = (array) => {
    let fragment = document.createDocumentFragment();
    let tr;
    let td;
    array.forEach(element => {
        td = createTd();
        td.appendChild(createButton("Eliminar",["btn","btn-danger"],element.id_receta))
        tr = createTr()
        tr.appendChild(createTd(element.medicamento))
        tr.appendChild(createTd(element.dosis))
        tr.appendChild(createTd(element.frecuencia))
        tr.appendChild(td)
        fragment.appendChild(tr)
    });
    recetas.appendChild(fragment)
}
/**
 * 
 * @param token 
 * @returns boolean
 * getHistorial realizara una peticion que recogera los datos del historial del paciente cuya cita se va a atender
 */
const getHistorial = async (token) => {
     let historial = await getRequest(`${baseUrl}historial/?linkTo=dni_paciente&equalTo=${result.results[0].dni_paciente}`, token)
    if (typeof historial == "number") {
        if (historial == 500) {
            error = "No se pudo contectar al servidor. Por favor intentelo más tarde.";
        } else {
            error = "No se ha podido encontrar la cita.";
        }
        errorP.innerText = error;
        errorContainer.classList.toggle("hidden")
        return false;
    } else {
        showHistorial(historial.results[0]);
        return true;
    }
}
/**
 * 
 * @param token 
 * @returns boolean
 * getRecetas realizara una peticion que recogera los datos de las recetas del paciente cuya cita se va a atender
 */
const getRecetas = async (token) => {
    let recetasArray = await getRequest(`${baseUrl}receta/?linkTo=dni_paciente&equalTo=${result.results[0].dni_paciente}`, token)
    if (typeof recetasArray == "number") {
        if (recetasArray == 500) {
            error = "No se pudo contectar al servidor. Por favor intentelo más tarde.";
        } else {
            error = "No se ha podido encontrar recetas para este paciente.";
        }
        errorP.innerText = error;
        errorContainer.classList.toggle("hidden")
        return false;
    } else {
        showRecetas(recetasArray.results);
        return true;
    }
}
/**
 * getCita comprobara si existe el id de la cita, en caso de que exista se realizara una peticion para atender esa cita, en el caso contrario se atendera a la siguiente cita de dicho dia
 */
const getCita = async () => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (idCita) {
        result = await getRequest(`${baseUrl}nextCita/?id_cita=${idCita}`, user.token)
    } else {
        let fecha = new Date();
        let año = fecha.getFullYear();
        let mes = fecha.getMonth() + 1 < 10 ? `0${fecha.getMonth() + 1}` : fecha.getMonth() + 1;
        var dia = fecha.getDate() < 10 ? `0${fecha.getDate()}` : fecha.getDate();
        let user = JSON.parse(sessionStorage.getItem("user"));
        result = await getRequest(`${baseUrl}nextCita/?fecha=${año}-${mes}-${dia}`, user.token)
    }
    loader.classList.toggle("hidden")
    if (typeof result == "number") {
        if (result == 500) {
            error = "No se pudo contectar al servidor. Por favor intentelo más tarde.";
        } else {
            error = "No se ha podido encontrar la cita.";
        }
        errorP.innerText = error;
        errorContainer.classList.toggle("hidden")
    } else {
        if (getHistorial(user.token) && getRecetas(user.token)) {
            showCita(result.results[0]);
        }
        console.log(result.results[1])
        if (result.results[1]==0) {
            arduinoModal.show()
        }
    }
}
/**
 * updatehistorial recogera los datos del formulario para formar el cuerpo de la peticion que se realizara para modificar los datos
 */
const updateHistorial = async () => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let newHistorial = {
        "dni_paciente": result.results[0].dni_paciente,
        "antecedentes": antecedentes.value,
        "medicamentos": medicamentos.value,
        "vacunas": vacunas.value,
        "pruebas": pruebas.value,
        "consultas": consultas.value,
        "cirugias": cirugias.value,
        "notas": notas.value,
    }
    historialSpan.innerText=""
    historialLoader.classList.toggle("hidden")
    let resultModify = await putRequest(`${baseUrl}historial`, newHistorial, user.token);
    historialSpan.innerText="Aceptar"
    historialLoader.classList.toggle("hidden")
    if (typeof resultModify == "number") {
        if (resultModify == 500) {
            error = "El historial no se pudo modificar. Por favor vuelva a intentarlo.";
            resultsBody.classList.remove("alert-info")
            resultsBody.classList.add("alert-danger")
        }
    } else {
        error = "El historial ha sido cambiado correctamente.";
        resultsBody.classList.remove("alert-danger")
        resultsBody.classList.add("alert-info")
        let update = await getHistorial(user.token)
    }
    resultsBody.innerText = error;
    historialModal.hide();
    resultsModal.show();
}
/**
 * 
 * @param state
 *  updateCita recogera los datos del formulario para formar el cuerpo de la peticion que se realizara para modificar los datos al cual se añadira el estado de la cita (atendido o no presentado)
 */
const updateCita = async (state) => {
    let error ="";
    let user = JSON.parse(sessionStorage.getItem("user"));
    let newCita = {
        "id_cita":result.results[0].id_cita,
        "fecha":result.results[0].fecha,
        "hora":result.results[0].hora,
        "proposito":result.results[0].proposito,
        "dni_paciente":result.results[0].dni_paciente,
        "id_medico":result.results[0].id_medico,
        "estado":state,
    }
    newCita.estado = state
    buttons.classList.toggle("hidden")
    buttonsLoader.classList.toggle("hidden")
    buttonsLoader.classList.toggle("d-flex")
    let resultModify = await putRequest(`${baseUrl}cita`, newCita, user.token);
    buttons.classList.toggle("hidden")
    buttonsLoader.classList.toggle("d-flex")
    buttonsLoader.classList.toggle("hidden")
    if (typeof resultModify == "number") {
        if (resultModify == 500) {
            error = "La cita no se pudo modificar. Por favor vuelva a intentarlo.";
            resultsBody.classList.remove("alert-info")
            resultsBody.classList.add("alert-danger")
        }
    } else {
        error = "La cita ha sido cambiada correctamente.";
        resultsBody.classList.remove("alert-danger")
        resultsBody.classList.add("alert-info")
        nextCita.classList.toggle("hidden")
        nextCita.addEventListener("click",()=>{
            window.location="atender.html"
        })
        resultButton.innerText="Volver"
        resultButton.addEventListener("click",()=>{
            window.location="home.html"
        })
    }
    resultsBody.innerText = error;
    historialModal.hide();
    resultsModal.show();
}
/**
 * insertreceta conformara el body con los datos del formulario y realizara la peticion
 */
const insertReceta = async () => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let body = {
        "id_receta": null,
        "medicamento":medicamento.value,
        "dosis":dosis.value,
        "frecuencia":frecuencia.value,
        "dni_paciente":result.results[0].dni_paciente,
        "id_medico":user.id_medico
    }
    recetaSpan.innerText="receta"
    recetaLoader.classList.toggle("hidden")
    let resultInsert = await postRequest(`${baseUrl}receta`, body, user.token)
    recetaSpan.innerText="Aceptar"
    recetaLoader.classList.toggle("hidden")
    if (typeof resultInsert == "number") {
        if (resultInsert == 500) {
            error = "No se pudo conectar al servidor, por favor intentelo más tarde.";
        }
    } else {
        error = "La receta se creó correctamente.";
        recetas.innerHTML=""
        let insert = await getRecetas(user.token)
    }
    resultsBody.innerText = error;
    recetaModal.hide()
    resultsModal.show()

}
/**
 * 
 * @param id
 * deletereceta realizara una peticion del tipo delete para eliminar dicha receta 
 */
const deleteReceta = async (id)=>{
    let user = JSON.parse(sessionStorage.getItem("user"));
    let result = await deleteRequest(`${baseUrl}receta/?id_receta=${id}`, user.token);
    if (typeof result == "number") {
        if (result == 500) {
            error = "La receta no se pudo eliminar. Por favor vuelva a intentarlo.";
        }
    } else {
        error = "La receta ha sido eliminada correctamente.";
        recetas.innerHTML=""
        let update = await getRecetas(user.token)
    }
    resultsBody.innerText = error;
    recetaModal.hide()
    resultsModal.show()
}
// añadimos los eventos
window.addEventListener("DOMContentLoaded", () => {
    getCita()
})
modifyHistorial.addEventListener("submit", (event) => {
    event.preventDefault()
    updateHistorial()
})
createReceta.addEventListener("submit", (event) => {
    event.preventDefault()
    let error = checkText(medicamento, "medicamento") || checkText(dosis, "dosis") || checkText(frecuencia, "frecuencia")
    if (error == "") {
        insertReceta();
    } else {
        errorReceta.innerText = error
    }
})
recetas.addEventListener("click",(event)=>{
    if(event.target.tagName=="BUTTON"){
       deleteReceta(event.target.getAttribute("id"));
    }
})
buttons.addEventListener("click",(event)=>{
    if (event.target.tagName=="BUTTON"||event.target.tagName=="SPAN") {
        // updateCita(event.target)
        if (event.target.tagName=="SPAN") {
            updateCita(event.target.innerText)
        } else {
            updateCita(event.target.querySelector("span").innerText)
        }
    }
})