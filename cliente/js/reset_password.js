const resetForm = document.getElementById("reset__form");
const mail = document.getElementById("mail");
const errorP = document.getElementById("errorP");
const loader = document.getElementById("loader")
const button = document.getElementById("button")
const insertedDiv = document.getElementById("inserted")
const formContainer = document.getElementById("form__container")
const login = async () => {
    let error = "";
    let body = {
        "email": mail.value
    }
    loader.classList.toggle("hidden");
    button.innerText="";
    let result = await putRequest(`${baseUrl}password`, body)
    if (typeof result == "number"||result==null) {
        loader.classList.toggle("hidden");
        button.innerText="Aceptar";
        if (result == 400) {
            error = "Todos los campos son obligatorios.";
        } else {
            error = "No se pudo conectar al servidor, por favor intentelo más tarde.";
        }
    } else {
        insertedDiv.classList.toggle("hidden")
        formContainer.classList.toggle("hidden")
    }

}

resetForm.addEventListener("submit", (event) => {
    event.preventDefault();
    login();
})