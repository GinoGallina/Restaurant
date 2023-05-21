<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
  <link rel="stylesheet" href="../css/styles.css">
  <link rel="icon" href="https://www.pngall.com/wp-content/uploads/8/Restaurant-Logo-PNG-High-Quality-Image.png">
  <title>Restaurant</title>
</head>

<body>
  <?php
  session_start();
  if (empty($_SESSION['user_id'])) {
    header('location: ../html/index.php');
  }
  ?>

  <header class="container-fluid p-0 mb-5">
    <nav class="navbar navbar-expand-lg bg-dark fs-4" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="index.php"><img src="https://www.sosfactory.com/wp-content/uploads/2016/12/icon-restaurant-bolat-min.png" class="logo" alt=""></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 d-flex">
            <div class="">
              <li class="nav-item dropdown ms-auto">
                <a id="btn-sesion" class="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><?php echo $_SESSION['user_nombre']; ?>
                </a>
                <ul class="dropdown-menu">
                  <li class="text-center"><a href="" id="btn-logout" class="dropdown-item">Log out</a></li>
                </ul>
              </li>
            </div>
            <?php
            if ($_SESSION['user_nombre'] == 'admin') {
              echo '        <li class="nav-item dropdown">
                              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Opciones Admin
                              </a>
                              <ul class="dropdown-menu ">
                                <li><a class="dropdown-item" href="clientes.php">Clientes</a></li>
                              </ul>
                            </li>';
            }
            ?>
            <li class="nav-item">
              <a class="nav-link " aria-current="page" href="carta.php">Carta</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="reservas.php">Reservas</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <main class="container-lg main-reservas">
    <section class="row">
      <div class="col-12">
        <div class="modal fade" id="modalCrearReserva" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header text-center">
                <h4 class="modal-title w-100 font-weight-bold">Realizar Reserva</h4>
                <button type="button" class="border-0" data-bs-dismiss="modal" aria-label="Close">
                  X
                </button>
              </div>
              <div class="modal-body mx-3">

                <div class="md-form mb-5">
                  <label data-error="wrong" data-success="right" for="defaultForm-email">Usuario</label>
                  <input type="text" id="nombre" name="nombre" class="form-control validate" disabled>
                </div>
                <div class="md-form mb-5">
                  <label data-error="wrong" data-success="right" for="defaultForm-email">Responsable</label>
                  <input type="text" id="responsable" name="responsable" class="form-control validate" required>
                </div>
                <div class="md-form mb-5">
                  <label data-error="wrong" data-success="right" for="defaultForm-email">Cantidad personas</label>
                  <input type="number" id="personas" min=0 name="personas" class="form-control validate" required>
                </div>
                <div class="md-form mb-5">
                  <label data-error="wrong" data-success="right" for="defaultForm-email">Dia</label>
                  <input type="date" id="dia" name="dia" class="form-control validate" required>
                </div>

                <div class="md-form mb-4">
                  <label data-error="wrong" data-success="right" for="defaultForm-pass">Hora</label>
                  <input type="time" id="hora" name="hora" min="09:00" max="22:00" class="form-control validate" required>
                </div>

              </div>
              <div class="modal-footer d-flex justify-content-center">
                <button id="" class="btn btn-danger close" data-bs-dismiss="modal">Cancelar</button>
                <button id="btn-reg-res" class="btn btn-success">Registrar</button>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center ">
          <a href="" class="btn btn-dark btn-rounded mb-4 p-4 border fs-5 btn-reserva" data-bs-toggle="modal" data-bs-target="#modalCrearReserva">Realizar una reserva</a>
        </div>
        <div class="text-center">
          <a href="misReservas.php" class="btn btn-dark btn-rounded mb-4 p-4 border fs-5 btn-ver-reservas">Ver mis reservas</a>
        </div>
        <?php
        if ($_SESSION['user_nombre'] == 'admin') {
          echo '<div class="text-center">
          <a href="reservasAdmin.php" class="btn btn-dark btn-rounded mb-4 p-4 border fs-5 btn-ver-reservas">Ver todas las reservas</a>
        </div>';
        }

        ?>
      </div>


      <div class="col-12">

      </div>
    </section>
  </main>

  <footer class="container-fluid p-0 text-center ">
    <p class="text-white bg-dark p-2 m-0">©2023 Página realizada por Gino Gallina</p>
  </footer>


  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
  <script src="https://kit.fontawesome.com/75833ea205.js" crossorigin="anonymous"></script>
  <script src="../js/main.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script src="sweetalert2.all.min.js"></script>
</body>

</html>