<?php
// importamos el autoload de composser para poder usar las librerias de jwt y phpmailer, el fichero token donde tendremos las funciones necesarias para la creación y chekeo de tokens y el middleware
require_once "vendor/autoload.php";
require_once "models/token.php";
require_once "middleware/Middleware.php";
// con estas lineas cuando se envie una preflight request le indicaremos que es seguro (se envia para determinar si es seguro enviar peticiones)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

// indicamos que no reporte los errores y que si hay algún error quede guardado en un log
error_reporting(0);

// importamos el fichero de configuración y la base de datos
require_once 'conf/config.php';
require_once 'bd/Bd.php';

// importamos el fichero routes que llevará un control de que archivo tiene que cargar dependiendo del method de la request
require_once 'routes/routes.php';