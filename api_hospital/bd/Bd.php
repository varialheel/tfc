<?php

class Bd
{

    private $conexion;

    public function __construct()
    {
        // Crea una instancia de PDO para conectarse a la base de datos
        try {
            $this->conexion = new PDO(DB_HOST, DB_USER, DB_PASS);
            $this->conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (Exception $th) {
            GetController::fncResponse("Database is currently on maintenance, please try again later", 500);
        }
    }


    /**
     * @param: $query
     * @param: $param
     * @return: $result
     * La funcion select nos permitira realizar consultas preparadas y recibir como resultado un array asociativo con los datos
     */
    public function select($query = "", $param = [])
    {
        // Creamos un array vacio donde guardaremos los datos recibidos
        $resultados = [];
        try {
            // creamos una consulta preparada a la cual pasaremos por parametros la consulta recibida. En caso de fallar generaremos una excepcion.
            if (!$stmt = $this->conexion->prepare($query)) {
                return null;
            }
            /* Comprobamos que hayan pasado parametros, en caso de que el array de parametros no este vacio iremos enlazaremos cada parametro con la consulta
                es importante saber que con foreach tendremos problemas al realizar consultas con varias condiciones por eso elegi el bucle for para recorrer el array*/
            if (count($param) != 0) {
                for ($i = 1; $i <= count($param); $i++) {
                    $stmt->bindParam($i, $param[$i - 1]);
                }
            }
            // Ejecutamos la sentencia.
            if (!$stmt->execute()) {
                return null;
            }
            // con un bucle while recorreremos los resultados los cuales indicaremos que nos lo devuleva como un array asociativo. Cada resultado lo guardaremos en $result.
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                array_push($resultados, $row);
            }
        } catch (Exception $e) {
            return null;
            // return null;
        }
        // cerramos el cursor
        $stmt->closeCursor();
        return $resultados;
    }
    // La funcion consulta es igual que la funcion query, la diferencia es que no devolveremos un array como resultado si no un valor booleano indicando si la operacion se pudo realizar
    public function consulta($query = "", $param)
    {
        try {
            $i = 1;
            if (!$stmt = $this->conexion->prepare($query)) {
                return null;
            }
            if (count($param) != 0) {
                for ($i = 1; $i <= count($param); $i++) {
                    $stmt->bindParam($i, $param[$i - 1]);
                }
            }
            // var_dump($stmt);
            return $stmt->execute();
        } catch (PDOException $e) {
            if ($e->errorInfo[1] === 1062) {
                return 409;
            } else {
                return null;
            }
        }
        $stmt->closeCursor();
    }
}
