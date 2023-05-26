<?php
// importamos la base de datos
require_once 'bd/Bd.php';
// creamos la clase del modelo
class GetModel {
    // la funcion getData realizara una consulta get a una tabla sin filtros
    static public function getData($table,$select,$orderBy,$orderMode,$startAt,$limit) {
        $bd = new Bd();
        $sql = "select $select from `$table`";
        // comprobamos los parametros que se hayan pasado y los iremos añadiendo a la consulta
        if($orderBy!=null && $orderMode!=null){
            $sql=$sql." order by $orderBy $orderMode";
        }
        if($startAt!=null&&$limit!=null){
            $sql=$sql." limit $startAt, $limit";
        } else if($limit!=null) {
            $sql=$sql." limit $limit"; 
        }
        return $bd->select($sql);
    }
    // La funcion getRelData realizara un join de dos o mas tablas
    static public function getRelData($rel,$key,$select,$orderBy,$orderMode,$startAt,$limit) {
        // para poder sacar las tablas y las condiciones que les unen haremos un explode para conseguir un array
        $relArray = explode(",",$rel);
        $keyArray = explode(",",$key);
        $bd = new Bd();
        $sql = "select $select from `$relArray[0]`";
        // recorremos los arrays y añadiremos los join a la consulta
        for ($i=1; $i < count($relArray); $i++) { 
            $sql=$sql. " inner join `$relArray[$i]` on $relArray[0].".$keyArray[($i-1)]." = $relArray[$i].".$keyArray[($i-1)];
        }
        // comprobamos los parametros que se hayan pasado y los iremos añadiendo a la consulta
        if($orderBy!=null && $orderMode!=null){
            $sql=$sql." order by $orderBy $orderMode";
        }
        if($startAt!=null&&$limit!=null){
            $sql=$sql." limit $startAt, $limit";
        } else if($limit!=null) {
            $sql=$sql." limit $limit"; 
        }
        return $bd->select($sql);
    }
    // La funcion getRelData realizara un join de dos o mas tablas con filtros
    static public function getRelDataFilter($rel,$key,$select,$orderBy,$orderMode,$startAt,$limit,$linkTo,$equalTo) {
        // para poder sacar las tablas y las condiciones que les unen haremos un explode para conseguir un array
        $relArray = explode(",",$rel);
        $keyArray = explode(",",$key);
        $linkToArray = explode(",",$linkTo);
        $equalToArray = explode("_",$equalTo);
        // comprobamos que el array de campos que se pasan para filtrar y el de condiciones tienen la misma longitud
        if(count($linkToArray)!=count($equalToArray)){
            return [];
        }
        $bd = new Bd();
        $sql = "select $select from `$relArray[0]`";
        // recorremos los arrays y añadiremos los join a la consulta
        for ($i=1; $i < count($relArray); $i++) { 
            $sql=$sql. " inner join `$relArray[$i]` on $relArray[0].".$keyArray[($i-1)]." = $relArray[$i].".$keyArray[($i-1)];
        }
        $sql = $sql." where ";
        // recorremos las condiciones y las añadimos
        foreach($linkToArray as $key=>$value){
            if($key==0) {
                $sql = $sql."$value= ?";
            } else {
                $sql = $sql." and $value= ?";
            }
        }
        // comprobamos los parametros que se hayan pasado y los iremos añadiendo a la consulta
        if($orderBy!=null && $orderMode!=null){
            $sql=$sql." order by $orderBy $orderMode";
        }
        if($startAt!=null&&$limit!=null){
            $sql=$sql." limit $startAt, $limit";
        } else if($limit!=null) {
            $sql=$sql." limit $limit"; 
        }
        return $bd->select($sql,$equalToArray);
    }
    // la funcion getColumns nos permitirá consultar las columnas de una tabla
    static public function getColumns($table) {
        $bd = new Bd();
        $columns = [];
        foreach($bd->select("SHOW COLUMNS FROM  $table") as $value){
            $columns[]=$value["Field"];
        }
        return $columns;
    }
    // con la funcion getData filter podremos realizar consultas simples con filtros
    static public function getDataFilter($table,$select,$linkTo,$equalTo,$orderBy,$orderMode,$startAt,$limit) {
       
        try {
            // para poder sacar las las condiciones haremos un explode para conseguir un array
            $linkToArray = explode(",",$linkTo);
            $equalToArray = explode("_",$equalTo);
            $bd = new Bd();
            $sql = "select $select from `$table` where ";
            // comprobamos que el array de campos que se pasan para filtrar y el de condiciones tienen la misma longitud
            if(count($linkToArray)!=count($equalToArray)){
                return [];
            }
            // recorremos las condiciones y las añadimos
            foreach($linkToArray as $key=>$value){
                if($key==0) {
                    $sql = $sql."$value= ?";
                } else {
                    $sql = $sql." and $value= ?";
                }
            }
            // comprobamos los parametros que se hayan pasado y los iremos añadiendo a la consulta
            if($orderBy!=null && $orderMode!=null){
                $sql=$sql." order by $orderBy $orderMode";
            }
            if($startAt!=null&&$limit!=null){
                $sql=$sql." limit $startAt, $limit";
            } else if($limit!=null) {
                $sql=$sql." limit $limit"; 
            }
            return $bd->select($sql,$equalToArray);
        } catch (Exception $e) {
            return "error";
        }
    }
    // la funcion getUser devolvera un usuario con el nombre pasado por parametros
    static public function getUser($username) {
        $bd = new Bd();
        $sql = "select * from `usuario` where username = ?";
        return $bd->select($sql,[$username]);
    }
    // la funcion nextCite realizara una consulta que nos devolvera la informacion necesaria para conformar la peticion a la arduino
    static public function nextCita($id,$date) {
        $bd = new Bd();
        $sql = 'SELECT arduino, paciente.nombre, paciente.apellido, consulta FROM `cita` inner JOIN medico on cita.dni_medico = medico.dni_medico inner join departamento on departamento.id_departamento = medico.id_departamento inner join paciente on cita.dni_paciente = paciente.dni_paciente where `fecha` = ? and medico.id_usuario = ? and `estado` = "pendiente" limit 1';
        return $bd->select($sql,[$date,$id])[0];
    }
    static public function getMail($mail) {
        $bd = new Bd();
        $sql = "select user.id_usuario, user.email, usuario.username from (SELECT email, id_usuario from paciente where `email` = ? UNION SELECT email, id_usuario from medico where `email` = ?) as user INNER JOIN usuario on usuario.id_usuario = user.id_usuario;";
        return $bd->select($sql,[$mail,$mail]);
    }
}