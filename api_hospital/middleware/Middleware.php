<?php
class Middleware {
    // la función checkAccess comprobará si el usuario tiene acceso o no
    static public function checkAccess($ruta,$token,$method) {
        $access = false;
        // comprobamos que la ruta no sea ni login ni register ya que no hace falta un token para acceder (en register será necesario si se quiere registrar un médico ya que solo puede crearlo un admin)
        if ($ruta=="login"||$ruta=="register") {
            $access=true;
        } else {
            // comprobamos que se tenga acceso a las diferentes rutas y metodos, en caso de no tener acceso se devolverá false
           if(($ruta=="departamento" && $method != "GET")||$ruta=="changeRol"||(($ruta=="usuario"||$ruta=="paciente"||$ruta=="medico") && $method=="DELETE")) {
            if (token::checkToken($token,"admin")) {
                $access=true;
            }
           } else if ((($ruta=="historial"||$ruta=="medico" || $ruta=="receta") && $method!="GET") || $ruta=="nextCita") {
                if (token::checkToken($token,"admin")||token::checkToken($token,"medico")) {
                    $access=true;
                }
           } else {
            if (token::checkToken($token,"admin")||token::checkToken($token,"medico")||token::checkToken($token,"paciente")) {
                $access=true;
            }
           }
        }
        return $access;
    }
}