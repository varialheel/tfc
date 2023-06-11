// recogemos el id de la cita pasado por la url, en caso de no existir devolveremos al paciente al inicio
const idCita = new URLSearchParams(window.location.search).get("id")
if (!idCita) {
    window.location = "home.html";
}
// creamos las variables
const errorContainer = document.getElementById("error");
const dataContainer = document.getElementById("datas");
const loader = document.getElementById("loader");
const date = document.getElementById("date")
const hour = document.getElementById("hour")
const purpose = document.getElementById("purpose")
const nombre = document.getElementById("name");
const departament = document.getElementById("departament")
const consultation = document.getElementById("consultation")
const modifyButton = document.getElementById("modifyButton")
const deleteButton = document.getElementById("deleteButton")
const dateInput = document.getElementById("dateInput")
const hourInput = document.getElementById("hourInput")
const purposeInput = document.getElementById("purposeInput")
const resultsTitle = document.getElementById('resultsTitle');
const resultsBody = document.getElementById('resultsBody');
const resultsButton = document.getElementById('resultsButton');
const loaderButton = document.getElementById("loader")
const modifyForm = document.getElementById("modifyForm")
const errorP = document.getElementById("errorP")
let cita = "";
let error = "";
// creamos instancias de los modales
const modifyModal = new bootstrap.Modal(document.getElementById('modifyModal'));
const resultsModal = new bootstrap.Modal(document.getElementById('results'));
/**
 * 
 * @param cita 
 * @param medico 
 * insertdatas mostrara la informacion de la cita y del medico
 */
const insertDatas = (cita, medico) => {
    date.innerText += cita.fecha
    hour.innerText += cita.hora
    purpose.innerText += cita.proposito
    nombre.innerText += `${medico.nombre} ${medico.apellido}`;
    departament.innerText += medico.departamento
    consultation.innerText += medico.consulta
    dateInput.value = cita.fecha
    hourInput.value = cita.hora
    purposeInput.value = cita.proposito
    dataContainer.classList.toggle("hidden")
}
/**
 * updatecita realizara una peticion para modificar los datos de la cita con los datos recogidos del formulario
 */
const updateCita = async () => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let newCita = cita.results[0];
    newCita.fecha = dateInput.value;
    newCita.hora = hourInput.value;
    newCita.proposito = purposeInput.value;
    let result = await putRequest(`${baseUrl}cita`, newCita, user.token);
    resultsTitle.innerText="Cambio de cita:"
    if (typeof result == "number") {
        if (result == 500) {
            resultsBody.innerText = "La cita no se pudo modificar. Por favor vuelva a intentarlo.";
        }
    } else {
        resultsBody.innerText = "La cita ha sido cambiada correctamente.";
    }
    resultsButton.addEventListener("click",()=>{
        window.location.reload();
    })
    modifyModal.hide();
    resultsModal.show();
    
}
/**
 * deleteCita realizara una peticion para eliminar la cita
 */
const deleteCita = async () => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let result = await deleteRequest(`${baseUrl}cita/?id_cita=${idCita}`, user.token);
    resultsTitle.innerText="Cambio de cita:"
    if (typeof result == "number") {
        if (result == 500) {
            resultsBody.innerText = "La cita no se pudo eliminar. Por favor vuelva a intentarlo.";
        }
    } else {
        console.log(resultsBody)
        resultsBody.innerText = "La cita ha sido cambiada correctamente.";
    }
    modifyModal.hide();
    resultsModal.show();
    resultsButton.addEventListener("click",()=>{
        window.location = "home.html";
    })
}
/**
 * loadMedico realizara una peticion para recoger los datos del medico de la cita
 */
const loadMedico = async (id, token) => {
    let medico = await getRequest(`${baseUrl}relations/?rel=medico,departamento&key=id_departamento&linkTo=id_medico&equalTo=${id}`, token)
    loader.classList.toggle("hidden")
    if (typeof medico == "number") {
        if (medico == 404) {
            error = "Médico no encontrada."
        } else if (medico == 500) {
            error = "El servidor no responde o se encuentra en mantenimiento. Por favor intentelo más tarde."
        }
        errorContainer.querySelector("h2").innerText = error;
        errorContainer.classList.toggle("hidden")
    } else {
        insertDatas(cita.results[0], medico.results[0])
    }
}
/**
 * 
 * @param id
 * loadcita realizara una peticion para recoger los datos de la cita 
 */
const loadCita = async (id) => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    cita = await getRequest(`${baseUrl}cita/?linkTo=id_cita&equalTo=${id}`, user.token)
    if (typeof cita == "number") {
        loader.classList.toggle("hidden")
        if (cita == 404) {
            error = "Cita no encontrada."
        } else if (cita == 500) {
            error = "El servidor no responde o se encuentra en mantenimiento. Por favor intentelo más tarde."
        }
        errorContainer.querySelector("h2").innerText = error;
        errorContainer.classList.toggle("hidden")
    } else {
        loadMedico(cita.results[0].id_medico, user.token)
    }
}
// añadimos los eventos
window.addEventListener("DOMContentLoaded", () => {
    loadCita(idCita)
})
modifyForm.addEventListener("submit", (event) => {
    event.preventDefault()
    let error = checkCita(dateInput) || checkHour(hourInput) || checkText(purposeInput,"proposito")
    if (error=="") {
        updateCita();
    } else {
        errorP.innerText=error
    }
})
deleteButton.addEventListener("click",()=>{
    deleteCita();
})