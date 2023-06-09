const departament = document.getElementById("departament");
const resultsBody = document.getElementById("resultsBody");
const loader = document.getElementById("loader");
const resultsModal = new bootstrap.Modal(document.getElementById('results'));
const resultsButton = document.getElementById('resultsButton');
const departamentSelect = document.getElementById("departament");
const doctors = document.getElementById("doctors");
const doctorsContainer = document.getElementById("doctorsContainer");
const insert_form = document.getElementById("insert_form");
const dateInput = document.getElementById("dateInput");
const hourInput = document.getElementById("hourInput");
const purposeInput = document.getElementById("purposeInput");
const button = document.getElementById("button")
const loaderButton = document.getElementById("loaderButton")
const insertCita = async ()=>{
    let user = JSON.parse(sessionStorage.getItem("user"));
    let body = {
        "id_cita":null,
        "fecha":dateInput.value,
        "hora":hourInput.value,
        "proposito":purposeInput.value,
        "dni_paciente":user.dni,
        "id_medico":doctors.value,
        "estado":"pendiente"
    }
    loaderButton.classList.toggle("hidden");
    button.innerText="";
    let result = await postRequest(`${baseUrl}cita`,body,user.token)
    loaderButton.classList.toggle("hidden");
    button.innerText="Aceptar";
    if (typeof result == "number"||result==null) {
        if (result == 409) {
            error = "Usted ya tiene una cita en dicha fecha.";
        }else {
            error = "No se pudo conectar al servidor, por favor intentelo más tarde.";
        }
    } else {
        error = "La cita se creó correctamente.";
    }
    resultsBody.innerText=error;
    resultsModal.show()
}
const showDepartaments = (departaments)=> {
    let fragment = document.createDocumentFragment();
    departaments.forEach(element => {
        fragment.appendChild(createOption(element.departamento,element.id_departamento));
    });
    departamentSelect.appendChild(fragment)
}
const showDoctors = (medicos)=> {
    let fragment = document.createDocumentFragment();
    medicos.forEach(element => {
        fragment.appendChild(createOption(`${element.nombre} ${element.apellido}`,element.id_medico));
    });
    doctors.appendChild(fragment)
}
const loadDepartament= async ()=>{
    let user = JSON.parse(sessionStorage.getItem("user"));
    let result = await getRequest(`${baseUrl}departamento`,user.token)
    loader.classList.toggle("hidden")
    if (typeof result == "number") {
        if (result == 500) {
            resultsBody.innerText = "No se pudo conectar al servidor. Por favor intentelo más tarde.";
        } else if (result==404) {
            resultsBody.innerText = "No se encontró ningún departamento.";
        }
        resultsButton.addEventListener("click",()=>{
            window.location="home.html";
        })
        resultsModal.show()
    } else {
        showDepartaments(result.results)
    }
}
const loadDoctors = async ()=>{
    while (doctors.firstChild) {
        doctors.removeChild(doctors.firstChild);
    }
    let user = JSON.parse(sessionStorage.getItem("user"));
    loader.classList.toggle("hidden")
    let result = await getRequest(`${baseUrl}medico/?linkTo=id_departamento&equalTo=${departamentSelect.value}`,user.token)
    loader.classList.toggle("hidden")
    if (typeof result=="number") {
        if (result == 500) {
            resultsBody.innerText = "No se pudo conectar al servidor. Por favor intentelo más tarde.";
        } else if (result==404) {
            resultsBody.innerText = "No se encontró ningún médico de ese departamento.";
        }
        resultsButton.addEventListener("click",()=>{
            window.location="home.html";
        })
        resultsModal.show()
    } else {
        showDoctors(result.results)
        doctorsContainer.classList.remove("hidden")
    }
}
window.addEventListener("DOMContentLoaded",()=>{
    loadDepartament();
})
departamentSelect.addEventListener("change",()=>{
    loadDoctors();
})
insert_form.addEventListener("submit",(event)=>{
    event.preventDefault();
    insertCita();
})
resultsButton.addEventListener("click",()=>{
    resultsModal.hide()
})