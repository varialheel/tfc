const loader = document.getElementById("loader");
const errorContainer = document.getElementById("error");
const username = document.getElementById("username");
const password = document.getElementById("password");
const dni_paciente = document.getElementById("dni_paciente");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const fec_nac = document.getElementById("fec_nac");
const telefono = document.getElementById("telefono");
const direccion = document.getElementById("direccion");
const email = document.getElementById("email");
const accountForm = document.getElementById("accountForm");
const submitButton = document.getElementById("submitButton")
const buttonSpan = document.getElementById("button")
const loaderButton = document.getElementById("loaderButton")
const userData = document.getElementById("userData")
const pacientData = document.getElementById("pacientData")
const resultsBody = document.getElementById("resultsBody");
const resultsModal = new bootstrap.Modal(document.getElementById('results'));
const resultsButton = document.getElementById('resultsButton');
let result;
const updateAccount = async () => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let userBody = {
        "id_usuario": result.results[0].id_usuario,
        "username": result.results[0].username
    }
    if (password.value != "") {
        userBody.password = password.value
    } else {
        userBody.password = null
    }
    let accountBody = {
        "dni_paciente": dni_paciente.value,
        "nombre": nombre.value,
        "apellido": apellido.value,
        "fec_nac": fec_nac.value,
        "telefono": telefono.value,
        "direccion": direccion.value,
        "email": email.value,
        "id_usuario": result.results[0].id_usuario
    }
    loaderButton.classList.toggle("hidden")
    buttonSpan.innerText = ""
    if (!checkInputs(userData) && !checkInputs(pacientData)) {
        let resultUser = await putRequest(`${baseUrl}usuario`, userBody, user.token)
        if (typeof resultUser == "number") {
            if (resultUser == 409) {
                error = "La información no pudo ser actualizada."
            } else if (resultUser == 500) {
                error = "El servidor no responde o se encuentra en mantenimiento. Por favor intentelo más tarde."
            }
            loaderButton.classList.toggle("hidden")
            buttonSpan.innerText = "Aceptar"
            resultsBody.innerText = error
            resultsModal.show()
        } else {
            let resultAccount = await putRequest(`${baseUrl}paciente`, accountBody, user.token)
            if (typeof resultAccount == "number") {
                if (resultAccount == 409) {
                    error = "El usuario."
                } else if (resultAccount == 500) {
                    error = "El servidor no responde o se encuentra en mantenimiento. Por favor intentelo más tarde."
                }
                loaderButton.classList.toggle("hidden")
                buttonSpan.innerText = "Aceptar"
                resultsBody.innerText = error
                resultsModal.show()
            } else {

                loaderButton.classList.toggle("hidden")
                buttonSpan.innerText = "Aceptar";
                resultsBody.innerText = "Información actualizada correctamente";
                resultsButton.addEventListener("click",()=>{
                    window.location.reload()
                })
                resultsModal.show()
            }
        }
    } else if (!checkInputs(userData)) {
        let resultUser = await putRequest(`${baseUrl}usuario`, userBody, user.token)
        if (typeof resultUser == "number") {
            if (resultUser == 409) {
                error = "La información no pudo ser actualizada."
            } else if (resultUser == 500) {
                error = "El servidor no responde o se encuentra en mantenimiento. Por favor intentelo más tarde."
            }
            loaderButton.classList.toggle("hidden")
            buttonSpan.innerText = "Aceptar"
            resultsBody.innerText = error
            resultsModal.show()
        } else {
            loaderButton.classList.toggle("hidden")
            buttonSpan.innerText = "Aceptar";
            resultsBody.innerText = "Información actualizada correctamente";
            resultsButton.addEventListener("click",()=>{
                window.location.reload()
            })
            resultsModal.show()
        }
    } else if (!checkInputs(pacientData)) {
        let resultAccount = await putRequest(`${baseUrl}paciente`, accountBody, user.token)
            if (typeof resultAccount == "number") {
                if (resultAccount == 409) {
                    error = "El usuario."
                } else if (resultAccount == 500) {
                    error = "El servidor no responde o se encuentra en mantenimiento. Por favor intentelo más tarde."
                }
                loaderButton.classList.toggle("hidden")
                buttonSpan.innerText = "Aceptar"
                resultsBody.innerText = error
                resultsModal.show()
            } else {

                loaderButton.classList.toggle("hidden")
                buttonSpan.innerText = "Aceptar";
                resultsBody.innerText = "Información actualizada correctamente";
                resultsButton.addEventListener("click",()=>{
                    window.location.reload()
                })
                resultsModal.show()
            }
    }

}
const loadAccount = async () => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    result = await getRequest(`${baseUrl}getAccount`, user.token)
    loader.classList.toggle("hidden")
    if (typeof result == "number") {
        if (result == 404) {
            error = "Usuario no encontrado."
        } else if (result == 500) {
            error = "El servidor no responde o se encuentra en mantenimiento. Por favor intentelo más tarde."
        }
        errorContainer.querySelector("h2").innerText = error;
        errorContainer.classList.toggle("hidden")
    } else {
        username.setAttribute("value", result.results[0].username)
        dni_paciente.setAttribute("value", result.results[0].dni_paciente)
        nombre.setAttribute("value", result.results[0].nombre)
        apellido.setAttribute("value", result.results[0].apellido)
        fec_nac.setAttribute("value", result.results[0].fec_nac)
        telefono.setAttribute("value", result.results[0].telefono)
        direccion.setAttribute("value", result.results[0].direccion)
        email.setAttribute("value", result.results[0].email)
        accountForm.classList.toggle("hidden")
    }
}
const checkInputs = (field) => {
    let disabled = true;
    field.querySelectorAll("input").forEach(element => {
        if (!element.disabled) {
            disabled = false;
        }
    })
    return disabled
}
const controlButtons = (element) => {
    if (element.tagName == "I" || element.tagName == "BUTTON") {
        if (element.classList.contains("edit") || element.classList.contains("bi-pencil-fill")) {
            if (element.classList.contains("bi-pencil-fill")) {
                element.parentNode.nextElementSibling.style.animation = 'fadeIn 1s forwards';
                element.parentNode.nextElementSibling.classList.toggle("hidden")
                element.parentNode.style.animation = 'fadeOut 1s forwards';
                element.parentNode.classList.toggle("hidden")
                element.parentNode.parentNode.previousElementSibling.disabled = !element.parentNode.parentNode.previousElementSibling.disabled;
            } else {
                element.nextElementSibling.style.animation = 'fadeIn 1s forwards';
                element.nextElementSibling.classList.toggle("hidden")
                element.style.animation = 'fadeOut 1s forwards';
                element.classList.toggle("hidden")
                element.parentNode.previousElementSibling.disabled = !element.parentNode.previousElementSibling.disabled;

            }
            if (checkInputs(userData) && checkInputs(pacientData)) {
                submitButton.disabled = true;
            } else {
                submitButton.disabled = false;
            }
        } else if (element.classList.contains("cancel") || element.classList.contains("bi-x-circle-fill")) {
            let input;
            if (element.classList.contains("bi-x-circle-fill")) {
                input = element.parentNode.parentNode.previousElementSibling;
                element.parentNode.previousElementSibling.style.animation = 'fadeIn 1s forwards';
                element.parentNode.previousElementSibling.classList.toggle("hidden")
                element.parentNode.style.animation = 'fadeOut 1s forwards';
                element.parentNode.classList.toggle("hidden")
                input.disabled = !input.disabled;
            } else {
                input = element.parentNode.previousElementSibling;
                element.previousElementSibling.style.animation = 'fadeIn 1s forwards';
                element.previousElementSibling.classList.toggle("hidden")
                element.style.animation = 'fadeOut 1s forwards';
                element.classList.toggle("hidden")
                input.disabled = !input.disabled;
            }
            if (input.getAttribute("id") != "password") {
                window[input.getAttribute("id")].value = result.results[0][input.getAttribute("id")]
            } else {
                window[input.getAttribute("id")].value = ""
            }
            if (checkInputs(userData) && checkInputs(pacientData)) {
                submitButton.disabled = true;
            } else {
                submitButton.disabled = false;
            }
        }
    }
}
window.addEventListener("DOMContentLoaded", () => {
    loadAccount();
})
accountForm.addEventListener("click", (event) => {
    controlButtons(event.target)
})
accountForm.addEventListener("submit", (event) => {
    event.preventDefault()
    updateAccount();
})