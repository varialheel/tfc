<?php
// importamos el modelo
require_once 'models/GetModel.php';
// creamos la clase del controlador
class GetController {
    // para las funciones del metodo get pasaremos por parametros la tabla sobre la que realizar la consulta y los distintos parametros que van a conformar nuestra consulta
    // funcion para consulta simple
    static public function getData($table,$select,$orderBy,$orderMode,$startAt,$limit) {
        $response = GetModel::getData($table,$select,$orderBy,$orderMode,$startAt,$limit);
        if ($response==NULL) {
            GetController::fncResponse("Data not found",404);
        } else {
            GetController::fncResponse($response);
        }
    } 
    // funcion para consulta simple con filtros
    static public function getDataFilter($table,$select,$linkTo,$equalTo,$orderBy,$orderMode,$startAt,$limit) {
        $response = GetModel::getDataFilter($table,$select,$linkTo,$equalTo,$orderBy,$orderMode,$startAt,$limit);
        if ($response==NULL) {
            GetController::fncResponse("Data not found",404);
        } else {
            GetController::fncResponse($response);
        }
    } 
    // funcion para consulta con join sin filtro
    static public function getRelData($rel,$key,$select,$orderBy,$orderMode,$startAt,$limit) {
        $response = GetModel::getRelData($rel,$key,$select,$orderBy,$orderMode,$startAt,$limit);
        if ($response==NULL) {
            GetController::fncResponse("Data not found",404);
        } else {
            GetController::fncResponse($response);
        }
    } 
    // funcion para consulta con join con filtro
    static public function getRelDataFilter($rel,$key,$select,$orderBy,$orderMode,$startAt,$limit,$linkto,$equalTo) {
        $response = GetModel::getRelDataFilter($rel,$key,$select,$orderBy,$orderMode,$startAt,$limit,$linkto,$equalTo);
        if ($response==NULL) {
            GetController::fncResponse("Data not found",404);
        } else {
            GetController::fncResponse($response);
        }
    } 
    // la funcion fncResponse enviara la respuesta que recivira como parametro
    static public function fncResponse($response,$code=200) {
        $json = [
            "status" => $code,
            "results" => $response
        ];
        echo json_encode($json,http_response_code($code));
        return;
    }
    // La funvion nextCita nos permitira consultar la cita del dia indicado del medico que lo ejecute de manera que dicha cita se enviará a la arduino para que sea mostrada en la pantalla lcd
    static public function nextCita($token,$date) {
        $id = substr(strstr($token, "&"),1);
        $result = GetModel::nextCita($id,$date);
        $name = substr($result["nombre"],0,7)." ".substr($result["apellido"],0,7);
        if (count($result)>0) {
            $prueba = file_get_contents("http://".$result['arduino']."/Data=".$name."_Consulta:".$result["consulta"].";");
            if (isset($prueba)) {
                $response =  $result;
                GetController::fncResponse($response);
            } else {
                $response = "Conection failed";
                GetController::fncResponse($response,503);
            }
        } else {
            $response = "Data not found";
            GetController::fncResponse($response,404);
        }
        
    }
}