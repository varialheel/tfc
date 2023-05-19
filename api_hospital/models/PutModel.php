<?php
// importamos la base de datos
require_once 'bd/Bd.php';
// creamos la clase del modelo
class PutModel {
    // la funcion modifyData nos permite realizar una consulta update a una tabla
    static public function modifyData($table,$datas) {
        $bd = new Bd();
        // para filtrar por la clave primaria realizaremos una consulta para saber cual es la clave primaria de la tabla
        $sql = "show index from $table where Key_name = 'PRIMARY' ";
        $pk = $bd->select($sql,[])[0]["Column_name"];
        // conformamos la consulta con los datos proporcionados
        $sql = "UPDATE $table SET ";
        $data = [];
        foreach($datas as $key=>$value){
            if($key!=$pk) {
                $sql=$sql."$key = ?,";
                array_push($data,$value);
            }
            
        }
        array_push($data,$datas[$pk]);
        // sustituimos la ultima , por un espacio y añadimos la condicion
        $sql[strlen ($sql)-1] = " ";
        $sql = $sql."where $pk = ?";
        return $bd->consulta($sql,$data);
    }
    // la funcion changeRol nos permite cambiar el rol a un usuario
    static public function changeRol($datas) {
        $bd = new Bd();
        $sql = "UPDATE usuario SET rol = ? where id_usuario = ?";
        return $bd->consulta($sql,[$datas["rol"],$datas["id_usuario"]]);
    }
}