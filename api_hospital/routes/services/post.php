<?php
// importamos el controlador y la clase token 
require_once 'controllers/PostController.php';
require_once 'models/token.php';
// recibimos los datos pasados por el cuerpo de la petición y por la url
$datas = json_decode(file_get_contents("php://input"),true);
$rol = filter_input(INPUT_GET,"rol");
// como solo el administrador puede crear medicos comprobaremos que el rol de la persona que vamos a insertar es médico y comprobaremos el token, si no tiene acceso mostraremos un error
if (isset($rol) && $rol=="medico" && !token::checkToken($token,"admin")) {
    $json = [
        "status"=>404,
        "result"=>"Unauthorized access2"
    ];
        echo json_encode($json,http_response_code($json["status"]));
        return;
}
// comprobamos que existan las rutas y si es login o register
if(isset($datas)&&isset($rutas[2])){
    if ($rutas[2]=="login") {
        PostController::login($datas);
    } else if ($rutas[2]=="register"&&isset($rol)) {
        PostController::register($datas,$rol);
    } else {
        PostController::insertData($rutas[2],$datas);
    }
    
}
