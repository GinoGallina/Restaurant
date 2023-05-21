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
  if ($_SESSION['user_nombre']!='admin') {
    header('location: ../html/reservas.php');
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
                              <a class="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Opciones Admin
                              </a>
                              <ul class="dropdown-menu ">
                                <li><a class="dropdown-item" href="#">Clientes</a></li>
                              </ul>
                            </li>';
            }
            ?>
            <li class="nav-item">
              <a class="nav-link " aria-current="page" href="carta.php">Carta</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="reservas.php">Reservas</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <main class="container-lg main-reservas">
    <section class="row">
      <div class="col-12">
        <!-- MODAL -->
        <div class="modal fade" id="modalCliente" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header text-center">
                <h4 id="modal-label" class="modal-title w-100 font-weight-bold"></h4>
                <button type="button" class="border-0" data-bs-dismiss="modal" aria-label="Close">
                  X
                </button>
              </div>
              <div class="modal-body mx-3">
                <div class="md-form mb-5">
                  <label data-error="wrong" data-success="right" for="defaultForm-email">ID</label>
                  <input type="text" id="id_cli" name="id_cli" class="form-control validate no-desabilitar" disabled>
                </div>
                <div class="md-form mb-5">
                  <label data-error="wrong" data-success="right" for="defaultForm-email">Nombre</label>
                  <input type="text" id="nombre" name="nombre" class="form-control validate" required>
                </div>
                <div class="md-form mb-5">
                  <label data-error="wrong" data-success="right" for="defaultForm-email">Email</label>
                  <input type="email" id="email" name="email" class="form-control validate" required>
                </div>
                <div class="md-form mb-5">
                  <label data-error="wrong" data-success="right" for="defaultForm-email">Contraseña</label>
                  <input type="password" id="password" name="password" class="form-control validate" required>
                </div>

              </div>
              <div class="modal-footer d-flex justify-content-center">
                <button id="" class="btn btn-danger close" data-bs-dismiss="modal">Cancelar</button>
                <button id="btn-reg-cli" class="btn btn-success">Registrar</button>
              </div>
            </div>
          </div>
        </div>
        <!-- MODAL -->

        <table id="clientes" class="table table-dark table-striped mt-4">
          <thead>
            <th class="text-center">Id</th>
            <th class="text-center">Usuario</th>
            <th class="text-center">Email</th>
            <th class="text-center">Contraseña</th>
            <th class="text-center">Fecha Creación</th>
            <th class="text-center">Acciones</th>
          </thead>
          <tbody id="t-body">
          </tbody>
        </table>

        <div class=" text-end">
          <a href="" id="btn-crear-cli" class="btn btn-dark btn-rounded mb-4 mt-2 border fs-3 " data-bs-toggle="modal" data-bs-target="#modalCliente">Crear Cliente</a>
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
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script src="sweetalert2.all.min.js"></script>
  <script src="../js/main.js"></script>
  <script src="../js/clientes.js"></script>


</body>

</html>