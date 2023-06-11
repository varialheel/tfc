<?php
// Para el metodo delete solo importaremos el controlador y que existan los datos necesarios pasados por get
require_once 'controllers/DeleteController.php';
$datas = filter_input_array(INPUT_GET);
if ($rutas[2]=="usuario") {
    $datas["id_usuario"] = token::getUser($token)->id_usuario;
    DeleteController::deleteData($rutas[2],$datas,$token);
} else if(isset($datas)){
    DeleteController::deleteData($rutas[2],$datas,$token);
} else {
    GetController::fncResponse("No datas were sent",404);
}
