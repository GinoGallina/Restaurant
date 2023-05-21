<?php
require_once 'config.php';
session_start();

$statement = $db->prepare("select * from usuarios where id = :id");
$statement->execute(array(':id' => $_GET['id']));
$row = $statement->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($row);

exit;
