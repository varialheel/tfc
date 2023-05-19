<?php
// importamos los modelos
require_once "models/PutModel.php";
require_once "models/GetModel.php";
// creamos la clase del controlador
class PutController
{
    // la funcion modifyData nos permitirá modificar un registro de la mtabla recibida por parametros
    static public function modifyData($table, $datas)
    {
        // comprobamos que el numero de columnas y el de los datos coinciden
        if (count($datas) == count(GetModel::getColumns($table))) {
            // comprobamos que la consulta se realiza correctamente
            if (PutModel::modifyData($table, $datas)) {
                $response = "Datas modified correctly";
                GetController::fncResponse($response);
            } else {
                $response = "Data couldn't be modified, please try again";
                GetController::fncResponse($response,409);
            }
        } else {
            $response = "The number of columns doesn't match";
            GetController::fncResponse($response,409);
        }
        
    }
    // la funcion changeRol nos permite modificar el rol a un usuario
    static public function changeRol($datas) {
        if (isset($datas["rol"])&&isset($datas["id_usuario"])) {
            if (PutModel::changeRol($datas)) {
                $response = "Datas modified correctly";
                GetController::fncResponse($response);
            } else {
                $response = "Data couldn't be modified, please try again";
                GetController::fncResponse($response,409);
            }
        } else {
            $response = "The number of columns doesn't match";
            GetController::fncResponse($response,409);
        }
    }
}
