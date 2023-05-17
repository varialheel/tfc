<?php
// importamos la base de datos
require_once 'bd/Bd.php';
// creamos la clase del modelo
class PostModel {
    // la funcion insertData nos permite realizar una consulta insert a una tabla
    static public function insertData($table,$datas) {
        $bd = new Bd();
        $sql = "INSERT INTO $table VALUES (";
        // recorremos el array de datos y añadimos una ? para ser parseada mas tarde
        foreach($datas as $value){
            $sql=$sql."?,";
        }
        // sustituimos la ultima , por un )
        $sql[strlen ($sql)-1] = ")";
        return $bd->consulta($sql,$datas);
    }
}