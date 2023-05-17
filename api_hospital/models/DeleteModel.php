<?php
// importamos la base de datos
require_once 'bd/Bd.php';
// creamos la clase del modelo
class DeleteModel {
    // la funciondeleteData realizara una consulta delete a la tabla que recibe por parametros filtrando por la columna que se le indique
    static public function deleteData($table,$data) {
        $column = key($data);
        $bd = new Bd();
        $sql = "delete from $table where $column = ?";
        return $bd->consulta($sql,[$data[$column]]);
    }
}