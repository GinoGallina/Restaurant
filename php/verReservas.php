<?php
require_once 'config.php';
session_start();

$statement = $db->prepare("select * from reservas");
$statement->execute();
$row = $statement->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($row);

exit;
