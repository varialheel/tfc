const antecedentesP = document.getElementById("antecedentesP")
const medicamentosP = document.getElementById("medicamentosP")
const vacunasP = document.getElementById("vacunasP")
const pruebasP = document.getElementById("pruebasP")
const consultasP = document.getElementById("consultasP")
const cirugiasP = document.getElementById("cirugiasP")
const notasP = document.getElementById("notasP")
const loader = document.getElementById("loader")
const loaderButton = document.getElementById("loaderButton")
const historyContainer = document.getElementById("historyContainer")
const downloadButton = document.getElementById("downloadButton")
const downloadSpan = document.getElementById("downloadSpan")
const errorContainer = document.getElementById("error")
const errorP = document.getElementById("errorP")
const resultsModal = new bootstrap.Modal(document.getElementById('results'));
const resultsBody = document.getElementById("resultsBody");
const downloadHistory = async ()=>{
    let user = JSON.parse(sessionStorage.getItem("user"));
    downloadSpan.innerText="";
    loaderButton.classList.toggle("hidden")
    let result = await getRequest(`${baseUrl}getHistory`, user.token)
    loaderButton.classList.toggle("hidden")
    downloadSpan.innerText="Descargar historial";
    if (typeof result == "number") {
        if (result == 404) {
            error = "Historial no encontrado."
        } else if (result == 500) {
            error = "El servidor no responde o se encuentra en mantenimiento. Por favor intentelo más tarde."
        }
        resultsBody.innerText = error;
        resultsModal.show();
    } else {
        resultsBody.innerText = "El historial ha sido enviado a su correo";
        resultsModal.show();
    }
}
const getHistory = async () => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    loader.classList.toggle("hidden")
    let result = await getRequest(`${baseUrl}historial/?linkTo=dni_paciente&equalTo=${user.dni}`, user.token)
    loader.classList.toggle("hidden")
    if (typeof result == "number") {
        if (result == 404) {
            error = "Historial no encontrado."
        } else if (result == 500) {
            error = "El servidor no responde o se encuentra en mantenimiento. Por favor intentelo más tarde."
        }
        errorP.innerText = error;
        errorContainer.classList.toggle("hidden")
    } else {
        antecedentesP.innerText = result.results[0].antecedentes
        medicamentosP.innerText = result.results[0].medicamentos
        vacunasP.innerText = result.results[0].vacunas
        pruebasP.innerText = result.results[0].pruebas
        consultasP.innerText = result.results[0].consultas
        cirugiasP.innerText = result.results[0].cirugias
        notasP.innerText = result.results[0].notas
        historyContainer.classList.toggle("hidden")
    }

}
window.addEventListener("DOMContentLoaded", () => {
    getHistory()
})
downloadButton.addEventListener("click",()=>{
    downloadHistory();
})