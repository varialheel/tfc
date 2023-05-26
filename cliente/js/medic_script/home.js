const citaContainer = document.getElementById("citas");
const loadCitas = async ()=>{
    let user = JSON.parse(sessionStorage.getItem("user"));
    let result = await getRequest(`${baseUrl}relations/?rel=cita,paciente,medico&key=dni_paciente,dni_medico&linkTo=fecha,dni_medico&equalTo=2023-05-09_${user.dni}`, user.token)
    console.log(result)
}
window.addEventListener("DOMContentLoaded", ()=>{
    loadCitas();
})