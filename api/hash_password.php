<?php
$password = json_decode(file_get_contents("php://input"))->password;
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

echo json_encode(array("hashedPassword" => $hashedPassword));
?>