<?php
require_once 'config.php';
session_start();

$statement = $db->prepare("select * from usuarios where borrado=0");
$statement->execute();
$row = $statement->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($row);

exit;
