<?php
// importamos los modelos
require_once "models/PutModel.php";
require_once "models/GetModel.php";
require_once "PostController.php";
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
                GetController::fncResponse($response,500);
            }
        } else {
            $response = "The number of columns doesn't match";
            GetController::fncResponse($response,400);
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
                GetController::fncResponse($response,500);
            }
        } else {
            $response = "The number of columns doesn't match";
            GetController::fncResponse($response,400);
        }
    }
    static public function changePassword($data) {
        $password = PostController::generatePassword();
        $mail = GetModel::getMail($data["email"])[0];
        try {
            if(PutModel::changePassword(password_hash($password,PASSWORD_DEFAULT),$mail["id_usuario"])&&Mail::sendMail($mail["email"], "Usuario: ".$mail['username']."\nContraseña: $password",'Recuperación de contraseña')) {
                GetController::fncResponse("Password updated");
            } else {
                GetController::fncResponse("Password could not be updated",500);
            }
        } catch(Exception $e){
            GetController::fncResponse($e,500);
        }
    }
}
