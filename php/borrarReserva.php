<?php
require_once 'config.php';


$error = array();


$statement = $db->prepare("DELETE  from reservas where id = :id");
$statement->execute(array(':id' => $_GET['id']));


$resp['redirect'] = "reservas.html";
$resp['status'] = true;
echo json_encode($resp);
exit;
