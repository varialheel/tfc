const loginForm = document.getElementById("login__form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const errorP = document.getElementById("errorP");
const loader = document.getElementById("loader")
const button = document.getElementById("button")
const verifyModal = new bootstrap.Modal(document.getElementById('verificationModal'));
const codeForm = document.getElementById('codeForm');
const sendCode = document.getElementById('sendCode');
const codeError = document.getElementById('codeError');
const codeInput = document.getElementById('verification');

const login = async () => {
    let error = "";
    let body = {
        "username": username.value,
        "password": password.value
    }
    loader.classList.toggle("hidden");
    button.innerText="";
    let result = await postRequest(`${baseUrl}login`, body)
    loader.classList.toggle("hidden");
    button.innerText="Aceptar";
    if (typeof result == "number"||result==null) {
        if (result == 400) {
            error = "Todos los campos son obligatorios.";
        } else if (result == 401) {
            error = "Usuario o contraseña incorrecto.";
        } else {
            error = "No se pudo conectar al servidor, por favor intentelo más tarde.";
        }
        loader.classList.toggle("hidden");
        button.innerText="Aceptar";
        errorP.innerText = error;
    } else {
        if (result.results.rol=="paciente") {
            console.log(result.results.token.slice(result.results.token.lastIndexOf("&")+1,result.results.token.length))
            let dni = await getRequest(`${baseUrl}paciente/?select=dni_paciente&linkTo=id_usuario&equalTo=${result.results.token.slice(result.results.token.lastIndexOf("&")+1,result.results.token.length)}`,result.results.token);
            result.results.dni = dni.results[0].dni_paciente;
            sessionStorage.setItem("user",JSON.stringify(result.results));
            window.location='pages/pacient_pages/home.html'
        } else {
            verifyModal.show();
        }
    }

}
const sendVerificationCode = async ()=>{
    let error = "";
    let body = {
        "username": username.value
    }
    let result = await postRequest(`${baseUrl}sendCode`, body)
    if (typeof result == "number"||result==null) {
        if (result == 400) {
            error = "Todos los campos son obligatorios.";
        } else if (result == 404) {
            error = "No se encuentra el código.";
        } else {
            error = "No se pudo conectar al servidor, por favor intentelo más tarde.";
        }
        codeError.classList.remove("text-info")
        codeError.classList.add("text-danger")
    } else {
        codeError.classList.remove("text-danger")
        codeError.classList.add("text-info")
        error = "Código enviado."
    }
    codeError.innerText = error;
}

const checkVerificationCode = async ()=>{
    let error = "";
    let body = {
        "username": username.value, 
        "code":codeInput.value
    }
    let result = await postRequest(`${baseUrl}verificationCode`, body)
    if (typeof result == "number"||result==null) {
        if (result == 400) {
            error = "Todos los campos son obligatorios.";
        } else if (result == 401) {
            error = "El código no es correcto.";
        } else {
            error = "No se pudo conectar al servidor, por favor intentelo más tarde.";
        }
        codeError.classList.remove("text-info")
        codeError.classList.add("text-danger")
        codeError.innerText = error
    } else {
        console.log(result.results.token)
        let dni = await getRequest(`${baseUrl}medico/?select=id_medico&linkTo=id_usuario&equalTo=${result.results.token.slice(result.results.token.lastIndexOf("&")+1,result.results.token.length)}`, result.results.token);
        console.log(dni)
        result.results.id_medico = dni.results[0].id_medico;
        sessionStorage.setItem("user", JSON.stringify(result.results));
        window.location = 'pages/medic_pages/home.html';
    }
}

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    login();
})
codeForm.addEventListener("submit",(event)=>{
    event.preventDefault()
    checkVerificationCode()
})
sendCode.addEventListener("click",()=>{
    sendVerificationCode();
})