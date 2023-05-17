<?php
// importamos el controlador
require_once 'controllers/PutController.php';
// Guardamos en una variable los datos pasados por el cuerpo de la request
$datas = json_decode(file_get_contents("php://input"),true);
// comprobamos que existe el campo password y si existe lo ciframos
if (isset($datas["password"])) {
    $datas["password"] = password_hash($datas["password"],PASSWORD_DEFAULT);
}
if ($rutas[2]=="usuario"||$rutas[2]=="medico"||$rutas[2]=="paciente") {
    $user = token::getUser($token);
    if ($datas["id_usuario"]!=$user->id_usuario) {
        $json = [
            "status"=>403,
            "result"=>"Unauthorized access"
        ];
            echo json_encode($json,http_response_code($json["status"]));
            return;
    } else {
        $datas["rol"]= $user->rol;
    }
}
// comprobamos que existan los datos y si la ruta es changeRol o no
if(isset($datas)){
    if ($rutas[2]=="changeRol") {
        PutController::changeRol($datas);
    } else {
        PutController::modifyData($rutas[2],$datas);
    }
}
