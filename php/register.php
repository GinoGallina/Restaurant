<?php
require_once 'config.php';

$error = array();
$resp = array();

if (empty($_POST['email'])) {
  $error[] = "Este campo no puede estar vacio";
}

if (empty($_POST['nombre'])) {
  $error[] = "Este campo no puede estar vacio";
}

if (empty($_POST['password'])) {
  $error[] = "Este campo no puede estar vacio";
}
if (!empty($_POST['email']) && !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
  $error[] = "Email invalido";
}

if (count($error) > 0) {
  $resp['msg'] = $error;
  $resp['status'] = false;
  echo json_encode($resp);
  exit;
}

$statement = $db->prepare("select * from usuarios where email = :email");
$statement->execute(array(':email' => $_POST['email']));
$row = $statement->fetchAll(PDO::FETCH_ASSOC);


$statement2 = $db->prepare("select * from usuarios where nombre = :nombre");
$statement2->execute(array(':nombre' => $_POST['nombre']));
$row2 = $statement2->fetchAll(PDO::FETCH_ASSOC);


if (count($row) > 0) {
  $error[] = "Email ya registrado";
  $resp['msg'] = $error;
  $resp['status'] = false;
  echo json_encode($resp);
  exit;
}

if (count($row2) > 0) {
  $error[] = "Usuario ya registrado";
  $resp['msg'] = $error;
  $resp['status2'] = false;
  echo json_encode($resp);
  exit;
}

$statement3 = $db->prepare('INSERT INTO usuarios(nombre,email,password) VALUES(:nombre,:email,:password)');
$statement3->execute(array(':nombre' => $_POST['nombre'], ':email' => $_POST['email'], ':password' => $_POST['password']));

$id= $db->lastInsertId();
session_start();
$_SESSION['user_id'] = $id;
$resp['redirect'] = "reservas.html";
$_SESSION['user_nombre'] = $_POST['nombre'];
$resp['status'] = true;
echo json_encode($resp);
exit;

