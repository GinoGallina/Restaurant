<?php
require_once 'config.php';

$error = array();
$resp = array();



if (empty($_POST['email'])) {
  $error[] = "Email field is required";
}

if (empty($_POST['nombre'])) {
  $error[] = "Nombre field is required";
}

if (empty($_POST['password'])) {
  $error[] = "Password field is required";
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

$statement = $db->prepare("select * from usuarios where email = :email and nombre = :nombre and borrado=0");
$statement->execute(array(':email' => $_POST['email'],':nombre' => $_POST['nombre']));
$row = $statement->fetchAll(PDO::FETCH_ASSOC);
if (count($row) > 0) {
  if ($_POST['password'] != $row[0]['password']) {
    $error[] = "Password is not valid";
    $resp['msg'] = $error;
    $resp['status'] = false;
    echo json_encode($resp);
    exit;
  }
  session_start();
  $_SESSION['user_id'] = $row[0]['id'];
  $_SESSION['user_nombre'] = $row[0]['nombre'];
  $resp['redirect'] = "reservas.html";
  $resp['status'] = true;
  $resp['sesion'] = $_SESSION;
  echo json_encode($resp);
  exit;
} else {
  $error[] = "Email or Name does not match";
  $resp['msg'] = $error;
  $resp['status'] = false;
  echo json_encode($resp);
  exit;
}
