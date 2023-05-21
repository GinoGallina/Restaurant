<?php
require_once 'config.php';
session_start();

$error = array();
$resp = array();

if (empty($_POST['nombre'])) {
  $error[] = "Este campo no puede estar vacio";
}

if (empty($_POST['email'])) {
  $error[] = "Este campo no puede estar vacio";
}

if (empty($_POST['password'])) {
  $error[] = "Este campo no puede estar vacio";
}

if (!empty($_POST['email']) && !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
  $error[] = "Enter Valid Email address";
}


if (count($error) > 0) {
  $resp['msg'] = $error;
  $resp['status'] = false;
  echo json_encode($resp);
  exit;
}



$statement = $db->prepare("select * from usuarios where (nombre = :nombre OR  email = :email) AND id!= :id AND borrado=0");
$statement->execute(array(':nombre' => $_POST['nombre'], ':email' => $_POST['email'], ':id' => $_POST['id']));
$row = $statement->fetchAll(PDO::FETCH_ASSOC);



if (count($row) > 0) {
  $error[] = "Ya hay un usuario con en ese nombre o mail";
  $resp['msg'] = $error;
  $resp['row'] = $row;
  $resp['status'] = false;
  echo json_encode($resp);
  exit;
}

$statement2 = $db->prepare("UPDATE usuarios SET  nombre= :nombre ,email = :email, password = :password where id = :id ");
$statement2->execute(array(':nombre' => $_POST['nombre'], ':email' => $_POST['email'], ':password' => $_POST['password'], ':id' => $_POST['id']));

$resp['status'] = true;
echo json_encode($resp);
exit;
