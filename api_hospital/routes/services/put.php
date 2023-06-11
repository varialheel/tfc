<?php
// importamos el controlador
require_once 'controllers/PutController.php';
// Guardamos en una variable los datos pasados por el cuerpo de la request
$datas = json_decode(file_get_contents("php://input"), true);
if ($rutas[2] == "usuario" || $rutas[2] == "medico" || $rutas[2] == "paciente") {
    $user = token::getUser($token);
    if ($datas["id_usuario"] != $user->id_usuario && $user->rol != "admin") {
        GetController::fncResponse("Unauthorized access", 401);
    } else {
        if ($rutas[2] == "usuario") {
            // comprobamos que existe el campo password y si existe lo ciframos
            if ($datas["password"] == null) {
                $datas["password"] = $user->password;
            } else {
                $datas["password"] = password_hash($datas["password"], PASSWORD_DEFAULT);
            }
            $datas["rol"] = $user->rol;
        }
    }
}
// comprobamos que existan los datos y si la ruta es changeRol o no
if (isset($datas)) {
    if ($rutas[2] == "changeRol") {
        PutController::changeRol($datas);
    } else if ($rutas[2] == "password") {
        PutController::changePassword($datas);
    } else {
        PutController::modifyData($rutas[2], $datas);
    }
} else {
    GetController::fncResponse("No data were sent", 404);
}
