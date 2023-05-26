<?php
// importamos las clases jwt y key
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
// creamos la clase token
class token {
    // la funcion checkToken comprobara si el token es valido
    static public function checkToken($token,$rol) {
        // creamos una variable con la fecha actual
        $date = time(); 
        try {
            /* decodificamos el token, para ello tendremos que usar la funcion decode la cual tendra los siguientes parametros:
                -token
                -key: a partir de la ultima version es necesario pasar por parametros un objeto key. Para crearlo tendremos que pasarle la key de dicho usuario
                -hash */
            $data = JWT::decode(substr($token, 0, strrpos($token, "&")),new Key(token::getKey(substr(strstr($token, "&"),1)),'HS256'));
            // recogemos la fecha de expiracion del token decodificado
            $exp = $data->exp;
            // comprobamos que el token no ha expirado y que el rol es correcto
            if ($date < $exp && $data->data->rol == $rol) {
                return true;
            }
            return false;
        } catch (\Throwable $th) {
            return false;
        }
    }
    static public function getUser($token) {
        try {
            $data = JWT::decode(substr($token, 0, strrpos($token, "&")),new Key(token::getKey(substr(strstr($token, "&"),1)),'HS256'));
            return $data->data;
        } catch (\Throwable $th) {
            return false;
        }
    }
    // la funcion generateKey nos permitira crear claves aleatorias para cifrar y descifrar tokens
    static public function generateKey() {
        /**para generar la clave usaremos las siguientes funciones:
         * bin2hex que convierte los bytes en su representacion hexadecimal
         * random_bytes que genera bytes aleatorios de x longitud
         */
        return substr(bin2hex(random_bytes(5)), 0, 10); 
    }
    // la funcion createKey generara una clave aleatoria y la insertara en el fichero de claves 
    static public function createKey($id) {
        $contenido = file_get_contents("diccionario.json");

        $diccionario = json_decode($contenido, true);

        $diccionario[$id] = token::generateKey();

        $json = json_encode($diccionario);

        file_put_contents("diccionario.json", $json);
    }
    // la funcion getKey buscará en el fichero de claves la clave del usuario pasado por parametros la cual esta identificada con dicho id
    static public function getKey($id) {
        $contenido = file_get_contents("diccionario.json");

        $diccionario = json_decode($contenido, true);
        
        return $diccionario[$id];
    }
    // la funcion createToken recibira como parametro la informacion de un usuario y generara un token con dicha informacion 
    static public function createToken($user) {
        $date = time();
        $datas = [
            "iat"=>$date,
            "exp"=>($date + ((60*60)*24)),
            "data"=>$user
        ];
        $key =token::getKey($user["id_usuario"]);
        try {
            // para generar el token usaremos la funcion encode para que genere el token al cual le añadiremos el id del usuario al final. La clave para codificar la cogemos del fichero
            $token = JWT::encode($datas,$key,'HS256')."&".$user["id_usuario"];
        } catch (\Throwable $th) {
            echo $th->getMessage();
        }
        
        return $token;
    }
}