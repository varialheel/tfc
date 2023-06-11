<?php
// importamos el modelo
require_once 'models/GetModel.php';
require_once 'models/HistoryPdf.php';
require_once "models/mail.php";
// creamos la clase del controlador
class GetController
{
    // para las funciones del metodo get pasaremos por parametros la tabla sobre la que realizar la consulta y los distintos parametros que van a conformar nuestra consulta
    // funcion para consulta simple
    static public function getData($table, $select, $orderBy, $orderMode, $startAt, $limit, $distinct)
    {
        $response = GetModel::getData($table, $select, $orderBy, $orderMode, $startAt, $limit, $distinct);
        if ($response == NULL) {
            GetController::fncResponse("Data not found", 404);
        } else {
            GetController::fncResponse($response);
        }
    }
    // funcion para consulta simple con filtros
    static public function getDataFilter($table, $select, $linkTo, $equalTo, $orderBy, $orderMode, $startAt, $limit, $distinct)
    {
        $response = GetModel::getDataFilter($table, $select, $linkTo, $equalTo, $orderBy, $orderMode, $startAt, $limit, $distinct);
        if ($response == NULL) {
            GetController::fncResponse("Data not found", 404);
        } else {
            GetController::fncResponse($response);
        }
    }
    // funcion para consulta con join sin filtro
    static public function getRelData($rel, $key, $select, $orderBy, $orderMode, $startAt, $limit, $distinct)
    {
        $response = GetModel::getRelData($rel, $key, $select, $orderBy, $orderMode, $startAt, $limit, $distinct);
        if ($response == NULL) {
            GetController::fncResponse("Data not found", 404);
        } else {
            GetController::fncResponse($response);
        }
    }
    // funcion para consulta con join con filtro
    static public function getRelDataFilter($rel, $key, $select, $orderBy, $orderMode, $startAt, $limit, $linkto, $equalTo, $distinct)
    {
        $response = GetModel::getRelDataFilter($rel, $key, $select, $orderBy, $orderMode, $startAt, $limit, $linkto, $equalTo, $distinct);
        if ($response == NULL) {
            GetController::fncResponse("Data not found", 404);
        } else {
            GetController::fncResponse($response);
        }
    }
    // la funcion fncResponse enviara la respuesta que recivira como parametro
    static public function fncResponse($response, $code = 200)
    {
        $json = [
            "status" => $code,
            "results" => $response
        ];
        echo json_encode($json, http_response_code($code));
        exit;
    }
    // La funvion nextCita nos permitira consultar la cita del dia indicado del medico que lo ejecute de manera que dicha cita se enviará a la arduino para que sea mostrada en la pantalla lcd
    static public function nextCita($token, $date = "", $id_cita = 0)
    {
        $id = substr(strstr($token, "&"), 1);
        if ($id_cita != 0) {
            $result = GetModel::getCita($_GET["id_cita"]);
        } else {
            $result = GetModel::nextCita($id, $date);
        }
        $name = substr($result["nombre"], 0, 7) . " " . substr($result["apellido"], 0, 7);
        if (count($result) > 0) {
            $options = array(
                'http' => array(
                    'method' => 'GET',
                    'header' => 'Content-type: text/html\r\n',
                    'timeout' => 5
                )
            );
            $context = stream_context_create($options);
            $conexion = file_get_contents("http://" . $result['arduino'] . "/Data=" . $name . "_Consulta:" . $result["consulta"] . ";", false, $context);
            if (gettype($conexion) != "string") {
                $response = [$result, 0];
                GetController::fncResponse($response);
            } else {
                $response =  [$result, 1];
                GetController::fncResponse($response);
            }
        } else {
            $response = "Data not found";
            GetController::fncResponse($response, 404);
        }
    }
    static public function getHistory($token)
    {
        $user = token::getUser($token);
        $paciente = GetModel::getHistory($user->id_usuario);
        if (count($paciente) > 0) {
            $file = HistoryPdf::createPdf($paciente[0]);
            if (Mail::sendMail($paciente[0]["email"], "En este correo se le envía adjunto su historial médico.", 'Historial médico', $file)) {
                unlink($file);
                GetController::fncResponse($user);
            } else {
                GetController::fncResponse("History file could not be sent", 500);
            }
        } else {
            GetController::fncResponse("Data not found", 404);
        }
    }
    static public function getAccount($token)
    {
        $user = token::getUser($token);
        $rol = $user->rol == "admin" ? "medico" : $user->rol;
        $account = GetModel::getRelDataFilter("usuario,$rol", "id_usuario", "*", null, null, null, null, "id_usuario", $user->id_usuario, "");
        if (count($account) > 0) {
            GetController::fncResponse($account);
        } else {
            GetController::fncResponse("Data not found", 404);
        }
    }
}
