<?php
require_once "controllers/GetController.php";
// para poder controlar que tabla de la bbdd se quiere acceder tenemos que guardar en un array cada elemento de la url separado por /
$rutas = array_filter(explode("/", $_SERVER["REQUEST_URI"]));
// comprobamos que existe tanto la url como la posición 2 de la url que es la que nos va a indicar la tabla (en caso de usar un virtual host tendremos que poner la posición 1)
if (empty($rutas) || !isset($rutas[2])) {
    // en caso de no existir mandaremos un codigo 404
    GetController::fncResponse("Page not found", 400);
}
$token = getallheaders()["token"];
// guardamos en una variable el método usado en la request de manera que podremos comprobar el método y cargar un fichero u otro en consecuencia
$method = filter_input(INPUT_SERVER, "REQUEST_METHOD");
if (isset($method)) {
    // comprobamos que la peticion no sea ni login ni register ya que para esas dos peticiones no es necesario un token
    if ($rutas[2] != "login" && $rutas[2] != "register" && $rutas[2] != "verificationCode" && $rutas[2] != "sendCode") {
        // en caso de que el método exista recogeremos el token de la cabecera
        // en caso de que se quiera realizar una consulta comprobaremos que existe el token 
        if (isset($token)) {
            // ahora comprobaremos que el usuario tenga acceso, esto se comprobará con checkAccess
            if (Middleware::checkAccess($rutas[2], $token, $method)) {
                // si el usuario tiene acceso cargaremos el fichero necesario dependiendo del método de la request
                if ($method === "GET") {
                    require_once "routes/services/get.php";
                }
                if ($method === "POST") {
                    require_once "routes/services/post.php";
                }
                if ($method === "PUT") {
                    require_once "routes/services/put.php";
                }
                if ($method === "DELETE") {
                    require_once "routes/services/delete.php";
                }
            } else {
                GetController::fncResponse("Unauthorized access", 403);
            }
        } else {
            GetController::fncResponse("Unauthorized access", 403);
        }
    } else {
        if ($method === "POST") {
            require_once "routes/services/post.php";
        }
    }
} else {
    GetController::fncResponse("Page not found", 400);
}
