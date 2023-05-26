<?php
// importamos los modelos
require_once "models/PostModel.php";
require_once "models/GetModel.php";
require_once "models/mail.php";
// creamos la clase del controlador
class PostController
{
    // la funcion insertData realizara una peticion de tipo insert en la tabla que recibe por parametros, esto se hara a traves del modelo
    static public function insertData($table, $datas)
    {
        $datasPost = [];
        // comprobamos que el numeros de columnas coincide con el numero de datos recibidos
        if (count($datas) == count(GetModel::getColumns($table))) {
            // si coincide añadiremos a un array todos los datos
            foreach ($datas as $key => $value) {
                array_push($datasPost, $value);
            }
            // comprobamos que la consulta se realiza correctamente
            if (PostModel::insertData($table, $datasPost)) {
                $response = "Datas inserted correctly";
                GetController::fncResponse($response, 201);
            } else {
                $response = "Data couldn't be inserted, please try again";
                GetController::fncResponse($response, 500);
            }
        } else {
            $response = "The number of columns doesn't match";
            GetController::fncResponse($response, 400);
        }
    }
    // la funcion login nos permitira comprobar que el usuario y la contraseña existen en la base de datos y enviaremos el token como respuesta
    static public function login($datas)
    {
        // comprobamos que el nombre del usuario y la contraseña se han pasado por la request
        if (isset($datas["username"]) && isset($datas["password"])) {
            $user = GetModel::getUser($datas["username"])[0];
            // comprobamos que el usuario existe
            if ($user != null) {
                // si existe el usuario comprobaremos la contraseña y si existe enviaremos el token
                if (password_verify($datas["password"], $user["password"])) {
                    $response = [
                        "token" => token::createToken($user),
                        "rol" => $user["rol"]
                    ];
                    GetController::fncResponse($response);
                } else {
                    GetController::fncResponse("Login failed", 401);
                }
            } else {
                GetController::fncResponse("Login failed", 401);
            }
        } else {
            GetController::fncResponse("Data not found", 400);
        }
    }
    // la funcion generatePassword la usaremos para generar contraseñas aleatorias
    static public function generatePassword()
    {
        $cadena = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        $password = "";
        for ($i = 0; $i < 8; $i++) {
            $indice = rand(0, strlen($cadena) - 1);
            $password = $password . $cadena[$indice];
        }
        return $password;
    }
    // la funcion generateUsername recibira como parametros la informacion de una persona y conformará un nombre de usuario con las tres primeras letras de su nombre y su apellido seguido de un numero aleatorio
    static public function generateUsername($user)
    {
        return substr($user["nombre"], 0, 2) . substr($user["apellido"], 0, 2) . str_pad(rand(0, 9999), 4, "0", STR_PAD_LEFT);
    }
    // la función register creará un usuario e insertara los datos en medico o en paciente dependiendo del rol indicado
    static public function register($datas, $rol)
    {
        $datasPost = [];
        // comprobamos que el nº de columnas coinciden con los datos
        if (count($datas) == count(GetModel::getColumns($rol)) - 1) {
            // generamos la contraseña
            $pass = PostController::generatePassword();
            // creamos un array con los datos del usuario
            $userdata = [NULL, PostController::generateUsername($datas), password_hash($pass, PASSWORD_DEFAULT), $rol];
            if (count(GetModel::getDataFilter($rol, "*", "dni_$rol", $datas["dni_$rol"], null, null, null, null)) > 0) {
                GetController::fncResponse("usuario existente", 409);
            } else {
                // comprobamos que se realiza la consulta
                if (PostModel::insertData("usuario", $userdata) && Mail::sendMail($datas["email"], "Usuario: $userdata[1]\nContraseña: $pass", 'Registro de usuario')) {

                    // añadimos los datos a un array
                    foreach ($datas as $key => $value) {
                        array_push($datasPost, $value);
                    }
                    // cogemos el id del usuario insertado y lo añadimos al array
                    $id = GetModel::getDataFilter("usuario", "*", "username", $userdata[1], null, null, null, null)[0]["id_usuario"];
                    // $id = GetModel::getUser($userdata[1])[0]["id_usuario"];
                    array_push($datasPost, $id);
                    // comprobamos que se realiza la consulta
                    if (PostModel::insertData($rol, $datasPost)) {
                        // si se realiza la consulta crearemos la key para poder descifrar el token
                        token::createKey($id);
                        $response = "Datas inserted correctly";
                        GetController::fncResponse($response, 201);
                    } else {
                        $response = "Data couldn't be inserted, please try again";
                        GetController::fncResponse($response, 500);
                    }
                } else {
                    $response = "Data couldn't be inserted, please try again";
                    GetController::fncResponse($response, 500);
                }
            }
        } else {
            $response = "The number of columns doesn't match";
            GetController::fncResponse($response, 400);
        }
    }
}
