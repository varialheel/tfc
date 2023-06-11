// añadimos un evento al boton de cerrar sesion
const closeSession = document.getElementById("close_session");
closeSession.addEventListener("click",(event)=>{
    event.preventDefault();
    // eliminamos la sesion y devolvemos al index
    sessionStorage.removeItem("user");
    window.location=`http://${window.location.href.split("/")[2]}/index.html`;
})