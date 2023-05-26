<?php
// importamos el autoload de composser para poder usar las librerias de jwt y phpmailer, el fichero token donde tendremos las funciones necesarias para la creación y chekeo de tokens y el middleware
require_once "vendor/autoload.php";
require_once "models/token.php";
require_once "middleware/Middleware.php";
// indicamos que no reporte los errores y que si hay algún error quede guardado en un log
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}
error_reporting(0);
ini_set('display_error',1);
ini_set('log_errors',1);
ini_set('error_log',$_SERVER['DOCUMENT_ROOT'].'/log.txt');

// importamos el fichero de configuración y la base de datos
require_once 'conf/config.php';
require_once 'bd/Bd.php';

// importamos el fichero routes que llevará un control de que archivo tiene que cargar dependiendo del method de la request
require_once 'routes/routes.php';