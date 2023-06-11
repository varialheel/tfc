// con checkadmin comprobaremos que se ha iniciado sesion y que el rol de dicho usuario sea administradorr, en caso de que no lo sea se destruira la sesion y se le enviara al login
if (!sessionStorage.getItem("user")) {
    window.location="../../index.html";
} else {
    if (JSON.parse(sessionStorage.getItem("user")).rol!="admin") {
        sessionStorage.removeItem("user")
        window.location="../../index.html";
    }
}
