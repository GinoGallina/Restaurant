<?php
require_once 'config.php';
session_start();

$statement = $db->prepare("select * from reservas where id_usuario = :id_usuario");
$statement->execute(array(':id_usuario' =>$_SESSION['user_id']));
$row = $statement->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($row);

exit;

?>