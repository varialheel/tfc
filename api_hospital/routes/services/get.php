<?php
// importamos el controlador 
require_once 'controllers/GetController.php';
// comprobamos que la ruta no esté vacia
if ($rutas[2]!="") {
    // comprobamos que exista el token
    if (isset($token)) {
        // comprobamos que la ruta no sea nextCita ya que se usará una función especifica
        if ($rutas[2]=="nextCita") {
            // en caso de querer mostrar la la siguiente cita en la arduino tendremos que recoger la fecha mandada por el metodo get
            $date = filter_input(INPUT_GET,"fecha");
            if (isset($date)) {
                // si se ha mandado la fecha se llamará a la funcion del controlador nextCita
                GetController::nextCita($token,$date);
            } else {
                $json = [
                    "status" => 400,
                    "results" => "data not found"
                ];
                echo json_encode($json);
            }
        } else {
            // Para poder conformar las consultas tendremos que comprobar los parametros que se pasen por get, para cada parametro comprobaremos que existen y si no le pondremos un valor por defecto
            $params = filter_input_array(INPUT_GET);
            $select = $params["select"] ?? "*";
            $orderBy = $params["orderBy"] ?? null;
            $orderMode = $params["orderMode"] ?? null;
            $startAt = $params["startAt"] ?? null;
            $limit = $params["limit"] ?? null;
            // ahora dependiendo de los parametros pasados ejecutaremos un tipo de consulta y otra
            // primero comprobaremos que se haya realizado una consulta con join sin filtro
            if(isset($params["rel"])&&isset($params["key"])&&$rutas[2]==="relations" && !isset($params["linkTo"]) && !isset($params["equalTo"])){
                GetController::getRelData($params["rel"],$params["key"],$select,$orderBy,$orderMode,$startAt,$limit);
                // Luego comprobamos que sea una consulta join con filtro
            } else if(isset($params["rel"])&&isset($params["key"])&&$rutas[2]==="relations" && isset($params["linkTo"]) && isset($params["equalTo"])){
                // Después de los joins comprobaremos que se consulte una sola tabla con filtros
                GetController::getRelDataFilter($params["rel"],$params["key"],$select,$orderBy,$orderMode,$startAt,$limit,$params["linkTo"],$params["equalTo"]);
            } else if(isset($params["linkTo"]) && isset($params["equalTo"])){
                GetController::getDataFilter($rutas[2],$select,$params["linkTo"],$params["equalTo"],$orderBy,$orderMode,$startAt,$limit);
                // por ultimo se realizara una consulta sin filtros
            }
            else {
                GetController::getData($rutas[2],$select,$orderBy,$orderMode,$startAt,$limit);
            }
        }
    } else {
        $json = [
            "status"=>404,
            "result"=>"Unauthorized access"
        ];
            echo json_encode($json,http_response_code($json["status"]));
            return;
    }
    
} else {
    $json = [
        "status" => 400,
        "results" => "data not found"
    ];
    echo json_encode($json);
}