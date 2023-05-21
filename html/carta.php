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
    header('location: ../html/index.html');
  }
  ?>

  <header class="container-fluid p-0 mb-5">
    <nav class="navbar navbar-expand-lg bg-dark fs-4" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="index.html"><img src="https://www.sosfactory.com/wp-content/uploads/2016/12/icon-restaurant-bolat-min.png" class="logo" alt=""></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 d-flex">
            <div class="">
              <li class="nav-item dropdown ms-auto">
                <a id="btn-sesion" class="nav-link dropdown-toggle " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><?php
                                                                                                                                            echo $_SESSION['user_nombre']; ?>
                </a>
                <ul class="dropdown-menu">
                  <li class="text-center"><a href="" id="btn-logout">Log out</a></li>
                </ul>
              </li>
            </div>
            <?php
            if ($_SESSION['user_nombre'] == 'admin') {
              echo '        <li class="nav-item dropdown">
                              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Opciones Admin
                              </a>
                              <ul class="dropdown-menu bg-light">
                                <li><a class="dropdown-item" href="clientes.php">Clientes</a></li>
                              </ul>
                            </li>';
            }
            ?>


            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Carta</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="reservas.php">Reservas</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>



  <main class="container-lg ">
    <section class="row">
      <div class="col-12 d-flex justify-content-center mb-4">
        <img src="https://img.pikbest.com/origin/06/30/65/46YpIkbEsTFqc.jpg!w700wp">
      </div>


    </section>
  </main>

  <div class="position-relativo">

    <footer class="container-fluid p-0 text-center  ">
      <p class="text-white bg-dark p-2 m-0">©2023 Página realizada por Gino Gallina</p>
    </footer>
  </div>


  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
  <script src="https://kit.fontawesome.com/75833ea205.js" crossorigin="anonymous"></script>
  <script src="../js/main.js"></script>
</body>

</html>