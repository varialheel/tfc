const registerForm = document.getElementById("register__form");
const dni = document.getElementById("dni");
const nombre = document.getElementById("name");
const lastname = document.getElementById("lastname");
const fec_nac = document.getElementById("fec_nac");
const tlf = document.getElementById("tlf");
const address = document.getElementById("address");
const mail = document.getElementById("mail");
const errorP = document.getElementById("errorP");
const loader = document.getElementById("loader")
const button = document.getElementById("button")
const insertedDiv = document.getElementById("inserted")
const formContainer = document.getElementById("form__container")
const register = async ()=>{
    let error = "";
    let body = {
        "dni_paciente":dni.value,
        "nombre":nombre.value,
        "apellido":lastname.value,
        "fec_nac":fec_nac.value.replaceAll("-","/"),
        "telefono":tlf.value,
        "direccion":address.value,
        "email":mail.value
    }
    loader.classList.toggle("hidden");
    button.innerText="";
    let result = await postRequest(`${baseUrl}register/?rol=paciente`,body)
    // let result = "await postRequest(`${baseUrl}register/?rol=paciente`,body)"
    if (typeof result == "number"||result==null) {
        loader.classList.toggle("hidden");
        button.innerText="Aceptar";
        if (result == 400) {
            error = "Todos los campos son obligatorios.";
        } else if (result == 409) {
            error = "La persona que intenta registrar ya existe.";
        } else {
            error = "No se pudo conectar al servidor, por favor intentelo más tarde.";
        }
    } else {
        insertedDiv.classList.toggle("hidden")
        formContainer.classList.toggle("hidden")
    }
    errorP.innerText = error;
}
registerForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    register();
})