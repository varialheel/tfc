// creamos las variables
const citaContainer = document.getElementById("citas");
const table = document.getElementById("table");
const errorContainer = document.getElementById("error");
const errorP = document.getElementById("errorP");
const loader = document.getElementById("loader");
/**
 * 
 * @param citas
 * con showcitas recorreremos el array de citas y crearemos una fila por cada una 
 */
const showCitas = (citas)=>{
    let fragment = document.createDocumentFragment();
    let cita;
    citas.forEach(element => {
        let enlace = createA("Atender",`atender.html?id=${element.id_cita}`,["btn","btn-link"])
        let td = createTd();
        td.appendChild(enlace)
        cita = createTr("table-dark")
        cita.appendChild(createTd(element.fecha))
        cita.appendChild(createTd(element.hora))
        cita.appendChild(createTd(`${element.nombre} ${element.apellido}`))
        cita.appendChild(createTd(element.proposito))
        cita.appendChild(createTd(element.estado))
        cita.appendChild(td)
        fragment.appendChild(cita);
    });
    citaContainer.appendChild(fragment);
}
/**
 * loadcitas realizara una peticion para recoger las citas del medico que ha iniciado sesion y que sean de la fecha actual
 */
const loadCitas = async () => {
    var fecha = new Date();
    let año = fecha.getFullYear();
    let mes = fecha.getMonth()+1 < 10 ? `0${fecha.getMonth()+1}` : fecha.getMonth()+1;
    var dia = fecha.getDate() < 10 ? `0${fecha.getDate()}` : fecha.getDate();
    let user = JSON.parse(sessionStorage.getItem("user"));
    let result = await getRequest(`${baseUrl}relations/?rel=cita,paciente&key=dni_paciente&linkTo=fecha,id_medico&equalTo=${año}-${mes}-${dia},${user.id_medico}&orderBy=hora&orderMode=asc`, user.token)
    loader.classList.toggle("hidden")
    if (typeof result=="number") {
        if (result==500) {
            error = "No se pudo contectar al servidor. Por favor intentelo más tarde.";
        } else {
            error = "No tiene ninguna cita pendiente.";
        }
        errorP.innerText=error;
        errorContainer.classList.toggle("hidden")
    } else {
        showCitas(result.results);
        table.classList.toggle("hidden")
    }
}
// añadimos el evento
window.addEventListener("DOMContentLoaded", () => {
    loadCitas();
})