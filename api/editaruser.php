<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
require "conexion.php";
    $json = file_get_contents("php://input");
    $objAfiliado = json_decode($json);
    $sql = "UPDATE users SET nombre='$objAfiliado->nombre', apellido='$objAfiliado->apellido', user='$objAfiliado->user', password='$objAfiliado->password', email='$objAfiliado->email', level='$objAfiliado->level' WHERE idUser='$objAfiliado->idUser'";
    $query = $mysqli->query($sql);
    $jsonRespuesta = array('msg' => 'OK');
    echo json_encode($jsonRespuesta);
