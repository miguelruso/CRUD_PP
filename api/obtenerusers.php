<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    require "conexion.php";
    $json = file_get_contents("php://input");
    $sql = "SELECT * FROM users";
    $query = $mysqli->query($sql);
    $datos = array();
    while($resultado = $query->fetch_assoc()) {
        $datos[] = $resultado;
    }
    echo json_encode($datos);
    //echo json_encode(array("users" => $datos));
