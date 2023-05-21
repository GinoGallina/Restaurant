<?php
require_once 'config.php';


$error = array();

/*
$statement = $db->prepare("DELETE  from usuarios where id = :id");
$statement->execute(array(':id' => $_GET['id']));*/


$statement = $db->prepare("UPDATE usuarios SET borrado=1  where id = :id ");
$statement->execute(array(':id' => $_GET['id']));


$resp['status'] = true;
echo json_encode($resp);
exit;
