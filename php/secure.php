<?php
session_start();
if (empty($_SESSION['user_id'])) {
  header('location: ../html/index.html');
} else {
  header('location: ../html/reservas.php');
}
