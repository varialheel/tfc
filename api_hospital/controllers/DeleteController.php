<?php
// importamos el modelo
require_once "models/DeleteModel.php";
class DeleteController {
    // la funcion deleteData recibira como parametros la tabla sobre la que haremos la consulta y los datos que usaremos para filtrar
    static public function deleteData($table,$datas) {
        // comprobamos que la funcion del modelo se realiza correctamente y creamos la respuesta
        if (DeleteModel::deleteData($table,$datas)) {
            $response = "Datas deleted correctly";
            // mostramos la respuesta
            GetController::fncResponse($response);
        } else {
            $response="Data couldn't be deleted, please try again";
            GetController::fncResponse($response,500);
        }
    } 
}