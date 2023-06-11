// comprobamos que se ha iniciado sesion y si no se ha iniciado sesion se devolvera al login
if (!sessionStorage.getItem("user")) {
    window.location="../../index.html";
}