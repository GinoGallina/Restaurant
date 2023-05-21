<?php
require_once 'config.php';
session_start();

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



$statement = $db->prepare("select * from reservas where dia = :dia AND  hora = :hora AND id!= :id");
$statement->execute(array(':dia' => $_POST['dia'], ':hora' => $_POST['hora'], ':id' => $_POST['id']));
$row = $statement->fetchAll(PDO::FETCH_ASSOC);

if (count($row) > 0) {
  $error[] = "Ya hay una reserva en ese dia a esa hora";
  $resp['msg'] = $error;
  $resp['status'] = false;
  echo json_encode($row);
  exit;
}

$statement2 = $db->prepare("UPDATE reservas SET  responsable= :responsable ,personas = :personas,dia = :dia,hora= :hora where id = :id ");
$statement2->execute(array(':responsable' => $_POST['responsable'], ':personas' => $_POST['personas'], ':dia' => $_POST['dia'], ':hora' => $_POST['hora'], ':id' => $_POST['id']));

$resp['status'] = true;
echo json_encode($resp);
exit;
