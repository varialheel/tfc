const citaContainer = document.getElementById("citas");
const table = document.getElementById("table");
const errorContainer = document.getElementById("error");
const errorP = document.getElementById("errorP");
const loader = document.getElementById("loader");
const showCitas = (citas)=>{
    let fragment = document.createDocumentFragment();
    let cita;
    citas.forEach(element => {
        let enlace = createA("Ver cita",`view_cita.html?id=${element.id_cita}`,["btn","btn-link"])
        let td = createTd();
        td.appendChild(enlace)
        cita = createTr("table-dark")
        cita.appendChild(createTd(element.fecha))
        cita.appendChild(createTd(element.hora))
        cita.appendChild(createTd(`${element.nombre} ${element.apellido}`))
        cita.appendChild(createTd(element.proposito))
        cita.appendChild(td)
        fragment.appendChild(cita);
    });
    citaContainer.appendChild(fragment);
}
const loadCitas = async () => {
    let error = "";
    let user = JSON.parse(sessionStorage.getItem("user"));
    let result = await getRequest(`${baseUrl}relations/?rel=cita,medico&key=id_medico&linkTo=dni_paciente,estado&equalTo=${user.dni},Pendiente`, user.token);
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
window.addEventListener("DOMContentLoaded", () => {
    loadCitas();
})