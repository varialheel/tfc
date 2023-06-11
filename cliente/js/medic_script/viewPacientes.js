// creamos las variables
const pacientes = document.getElementById("pacientes");
const table = document.getElementById("table");
const errorContainer = document.getElementById("error");
const errorP = document.getElementById("errorP");
const loader = document.getElementById("loader");
const closeButton = document.getElementById("closeButton");
const historialModal = document.getElementById('historialModal');
const modalBody = document.getElementById("modalBody")
const modalLoader = document.getElementById("modalLoader")
const nombreSpan = document.getElementById("nombreSpan")
const apellidoSpan = document.getElementById("apellidoSpan")
const fechaNacimientoSpan = document.getElementById("fechaNacimientoSpan")
const telefonoSpan = document.getElementById("telefonoSpan")
const direccionSpan = document.getElementById("direccionSpan")
const emailSpan = document.getElementById("emailSpan")
const antecedentesSpan = document.getElementById("antecedentesSpan")
const medicamentosSpan = document.getElementById("medicamentosSpan")
const vacunasSpan = document.getElementById("vacunasSpan")
const pruebasSpan = document.getElementById("pruebasSpan")
const consultasSpan = document.getElementById("consultasSpan")
const cirugiasSpan = document.getElementById("cirugiasSpan")
const notasSpan = document.getElementById("notasSpan")
/**
 * 
 * @param pacientesArray 
 * con showpacientes recorreremos el array de pacientes y crearemos una fila por cada uno
 */
const showPacientes = (pacientesArray) => {
    let fragment = document.createDocumentFragment();
    let tr;
    pacientesArray.forEach(element => {
        let enlace = createButton("Ver detalles", ["btn", "btn-info"], element.dni_paciente)
        enlace.setAttribute("data-bs-toggle", "modal")
        enlace.setAttribute("data-bs-target", "#historialModal")
        let td = createTd();
        td.appendChild(enlace)
        tr = createTr("table-dark")
        tr.appendChild(createTd(`${element.nombre} ${element.apellido}`))
        tr.appendChild(createTd(element.fec_nac))
        tr.appendChild(createTd(element.telefono))
        tr.appendChild(createTd(element.direccion))
        tr.appendChild(createTd(element.email))
        tr.appendChild(td)
        fragment.appendChild(tr);
    });
    pacientes.appendChild(fragment);
}
/**
 * 
 * @param historial 
 * showhistorial mostrara la informacion de dicho historial
 */
const showHistorial = (historial) => {
    nombreSpan.innerText = historial.nombre
    apellidoSpan.innerText = historial.apellido
    fechaNacimientoSpan.innerText = historial.fec_nac
    telefonoSpan.innerText = historial.telefono
    direccionSpan.innerText = historial.direccion
    emailSpan.innerText = historial.email
    antecedentesSpan.innerText = historial.antecedentes
    medicamentosSpan.innerText = historial.medicamentos
    vacunasSpan.innerText = historial.vacunas
    pruebasSpan.innerText = historial.pruebas
    consultasSpan.innerText = historial.consultas
    cirugiasSpan.innerText = historial.cirugias
    notasSpan.innerText = historial.notas
}
/**
 * loadpacientes realizara una peticion para recoger los datos de los pacientes que han sido atendidos por el medico
 */
const loadPacientes = async () => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let result = await getRequest(`${baseUrl}relations/?rel=cita,paciente&key=dni_paciente&distinct=1&linkTo=id_medico&equalTo=${user.id_medico}`, user.token)
    loader.classList.toggle("hidden")
    if (typeof result == "number") {
        if (result == 500) {
            error = "No se pudo contectar al servidor. Por favor intentelo más tarde.";
        } else {
            error = "No tiene ninguna cita pendiente.";
        }
        errorP.innerText = error;
        errorContainer.classList.toggle("hidden")
    } else {
        showPacientes(result.results);
        table.classList.toggle("hidden")
    }
}
/**
 * 
 * @param dni
 * loadhistorial realizara una peticion para recoger los datos del historial del paciente 
 */
const loadHistorial = async (dni) => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let result = await getRequest(`${baseUrl}relations/?rel=historial,paciente&key=dni_paciente&linkTo=dni_paciente&equalTo=${dni}`, user.token)
    modalBody.classList.toggle("hidden")
    modalLoader.classList.toggle("hidden")
    console.log(result)
    if (typeof result == "number") {
        if (result == 500) {
            error = "No se pudo contectar al servidor. Por favor intentelo más tarde.";
        } else {
            error = "No tiene ninguna cita pendiente.";
        }
        errorP.innerText = error;
        errorContainer.classList.toggle("hidden")
    } else {
        showHistorial(result.results[0]);
    }
}
// añadimos los eventos
window.addEventListener("DOMContentLoaded", () => {
    loadPacientes();
})
pacientes.addEventListener("click", (event) => {
    if (event.target.tagName == "BUTTON") {
        loadHistorial(event.target.getAttribute("id"))
    }
})
historialModal.addEventListener("hidden.bs.modal",()=>{
    modalBody.classList.toggle("hidden")
    modalLoader.classList.toggle("hidden")
})