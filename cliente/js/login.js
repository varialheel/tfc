const loginForm = document.getElementById("login__form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const errorP = document.getElementById("errorP");
const login = async () => {
    let error = "";
    let body = {
        "username": username.value,
        "password": password.value
    }
    let result = await postRequest(`${baseUrl}login`, body)
    if (typeof result == "number"||result==null) {
        if (result == 400) {
            error = "Todos los campos son obligatorios.";
        } else if (result == 401) {
            error = "Usuario o contraseña incorrecto.";
        } else {
            error = "No se pudo conectar al servidor, por favor intentelo más tarde.";
        }
        errorP.innerText = error;
    } else {
        if (result.results.rol=="paciente") {
            let dni = await getRequest(`${baseUrl}paciente/?select=dni_paciente&linkTo=id_usuario&equalTo=${result.results.token.slice(-1)}`,result.results.token);
            result.results.dni = dni.results[0].dni_paciente;
            sessionStorage.setItem("user",JSON.stringify(result.results));
            window.location='pages/pacient_pages/home.html';
        } else {
            let dni = await getRequest(`${baseUrl}medico/?select=dni_medico&linkTo=id_usuario&equalTo=${result.results.token.slice(-1)}`,result.results.token);
            result.results.dni = dni.results[0].dni_medico;
            sessionStorage.setItem("user",JSON.stringify(result.results));
            window.location='pages/medic_pages/home.html';
        }
    }

}

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    login();
})