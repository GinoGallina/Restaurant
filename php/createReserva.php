<?php
require_once 'config.php';

$error = array();
$resp = array();

if (empty($_POST['responsable'])) {
  $error[] = "Este campo no puede estar vacio";
}

if (empty($_POST['personas'])) {
  $error[] = "Este campo no puede estar vacio";
}

if (empty($_POST['dia'])) {
  $error[] = "Este campo no puede estar vacio";
}

if (empty($_POST['hora'])) {
  $error[] = "Este campo no puede estar vacio";
}



if (count($error) > 0) {
  $resp['msg'] = $error;
  $resp['status'] = false;
  echo json_encode($resp);
  exit;
}

$statement = $db->prepare("select * from reservas where dia = :dia AND  hora = :hora");
$statement->execute(array(':dia' => $_POST['dia'], ':hora' => $_POST['hora']));
$row = $statement->fetchAll(PDO::FETCH_ASSOC);


if (count($row) > 0) {
  $error[] = "Ya hay una reserva en ese dia a esa hora";
  $resp['msg'] = $error;
  $resp['status'] = false;
  echo json_encode($resp);
  exit;
}

session_start();
$id_usuario= $_SESSION['user_id'];

$statement2 = $db->prepare('INSERT INTO reservas(id_usuario,personas,dia,hora) VALUES(:id_usuario,:personas,:dia,:hora)');
$statement2->execute(array(':id_usuario' => $id_usuario, ':personas' => $_POST['personas'], ':dia' => $_POST['dia'], ':hora' => $_POST['hora']));

$resp['redirect'] = "reservas.html";
$resp['status'] = true;
echo json_encode($resp);
exit;
