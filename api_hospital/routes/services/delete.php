<?php
// Para el metodo delete solo importaremos el controlador y que existan los datos necesarios pasados por get
require_once 'controllers/DeleteController.php';
$datas = filter_input_array(INPUT_GET);
if(isset($datas)){
    DeleteController::deleteData($rutas[2],$datas);
}
