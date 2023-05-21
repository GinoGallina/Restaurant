const d=document,
  w=window;

function validar_camposForm(form){
  const inputs = document.querySelectorAll(form+' input');
  let $form=d.querySelector(form);

  console.log($form)

  let $mensaje=d.createElement('div');
  $mensaje.innerHTML='Los campos en rojo no pueden estar vacios';
  $mensaje.classList.add('msj-error','text-center','pb-2');


  let err=0;
  inputs.forEach(input => {
    if(input.hasAttribute('required') & input.value==="" ){
      if(!input.classList.contains('border-danger')){
        input.classList.add('border','border-3','border-danger');
      }
      err++;
    }else{
        input.classList.remove('border','border-3','border-danger');     
    }
    });

  if(err>0){

    if(!($form.firstChild.isEqualNode($mensaje))){
      $form.insertBefore($mensaje,$form.firstChild);
    }
    return false;
  }else{
    return true;
  }
}
function limparValidacionesForm(){
  const inputs = document.querySelectorAll('.modal-body input');
  let $form=d.querySelector('.modal-body');
    inputs.forEach(input => {
    if(input.classList.contains('border-danger')){
        input.classList.remove('border','border-3','border-danger');
    }
    });
    console.log(d.querySelector('.msj-error'))
    if($form.nextElementSibling.isEqualNode(d.querySelector('.msj-error'))){
      d.querySelector('.msj-error').remove();
    }
}

function limparValidaciones(){
  const inputs = document.querySelectorAll('#form-registrar input');
  let $form=d.querySelector('#form-registrar');
    inputs.forEach(input => {
    if(input.classList.contains('border-danger')){
        input.classList.remove('border','border-3','border-danger');
    }
    });
    console.log(d.querySelector('.msj-error'))
    if($form.firstChild.isEqualNode(d.querySelector('.msj-error'))){
      d.querySelector('.msj-error').remove();
    }
}

function validar_campos(form){
  const inputs = document.querySelectorAll(form+' input');
  let $form=d.querySelector(form);
  console.log($form)

  console.log($form)

  let $mensaje=d.createElement('div');
  $mensaje.innerHTML='Los campos en rojo no pueden estar vacios';
  $mensaje.classList.add('msj-error','text-center','pb-1');


  let err=0;
  inputs.forEach(input => {
    if(input.hasAttribute('required') & input.value==="" ){
      if(!input.classList.contains('border-danger')){
        input.classList.add('border','border-3','border-danger');
      }
      err++;
    }else{
        input.classList.remove('border','border-3','border-danger');     
    }
    });

  if(err>0){
    if(!$form.nextElementSibling.isEqualNode($mensaje)){
      $form.insertAdjacentElement('afterend',$mensaje)
    }
    return false;
  }else{
    return true;
  }
}

function validar_datos(datos){
  const inputs = document.querySelectorAll('#form-registrar input');
  let $mensaje=d.createElement('div');
  $mensaje.innerHTML='Este campo no puede estar vacio';
  $mensaje.classList.add('msj-error','text-center','pb-1');


  let pasa=true;
  inputs.forEach(input => {
    if(input.hasAttribute('required') & input.value===""){
      if(!input.nextElementSibling){
        input.classList.add('border','border-3','border-danger');
        console.log('e')
        input.parentNode.insertBefore($mensaje,input.nextSibling);
        //input.insertAdjacentElement('afterend',$mensaje);
      }
      pasa=false;
    }else{
      if(input.nextElementSibling){
        input.classList.remove('border','border-3','border-danger');
        console.log(input.nextElementSibling);
        input.nextElementSibling.remove();
      }
    }
    });


  return pasa;
  };





//Lo primero q se ejectuta seria verificar si ya está logeado
console.log()

w.addEventListener('DOMContentLoaded',()=>{
  
  let $dia= d.querySelector('#dia');
  if($dia!=null){
    let today = new Date().toISOString().slice(0, 10)
    $dia.setAttribute("min",today)
  }

  d.addEventListener('click',e=>{
    

    //Login VIEJO
    /*
    if(e.target.matches('.btn-login')){
      e.preventDefault();
      e.stopPropagation();
      let nombre=d.getElementById('nombre');
      let pass=d.getElementById('password');
      let form=d.getElementById('form-login');
      let valido;
      fetch('http://localhost:3000/personas')
      .then(response => response.json())
      .then(data => {     
        console.log(data);
        data.forEach(element => {
          if(element.nombre==nombre.value & element.password==pass.value){
            valido=0;
          }else{
          }
        });
        if(valido==0){
          sessionStorage.setItem('nombre', nombre.value);
          w.location.href = '../html/reservas.html';
        }else{
          nombre.classList.add('border','border-3','border-danger');
          pass.classList.add('border','border-3','border-danger');
          let $mensaje=d.createElement('div');
          $mensaje.innerHTML='Usuario o contraseña incorrectos';
          $mensaje.classList.add('msj-error','text-center','pb-1');
          if(!(form.firstChild.isEqualNode($mensaje))){
            form.insertBefore($mensaje,form.firstChild);
          }

        };

      })
      .catch(err=>console.log(err));
    }*/

    //LOGIN NUEVO

    if(e.target.matches('.btn-login')){
      e.preventDefault();
      e.stopPropagation();
      let form=d.getElementById('form-login');
      let nombre=d.getElementById('nombre');
      let email=d.getElementById('email');
      let password=d.getElementById('password');


      let formData=new FormData();
      formData.append("nombre", nombre.value);
      formData.append('password', password.value);
      formData.append('email', email.value);


      fetch('../php/login.php', {
       method: "POST",
       body: formData,
       //headers: {"Content-type": "application/json; charset=UTF-8"}
       })
       .then(response => response.json()) 
       .then(json => {
        console.log(json);
        if(json['status']){
          location.href="../php/secure.php";
        }else{
          nombre.classList.add('border','border-3','border-danger');
          password.classList.add('border','border-3','border-danger');
          email.classList.add('border','border-3','border-danger');
          let $mensaje=d.createElement('div');
          $mensaje.innerHTML='Usuario, mail o contraseña incorrectos/as';
          $mensaje.classList.add('msj-error','text-center','pb-1');
          if(!(form.firstChild.isEqualNode($mensaje))){
            form.insertBefore($mensaje,form.firstChild);
          }
        }
        }) 
       .catch(err => {
        console.log('ERROR')
        console.log(err)}
        );

        //sessionStorage.setItem('nombre', nombre.value);
        //w.location.href = '../html/reservas.html';




      }   
    
    
    
    



    //Registro VIEJO
    /*
    if(e.target.matches('.btn-registrar')){
      e.preventDefault();
      e.stopPropagation();

      let datos={
        nombre:d.getElementById('nombre').value,
        password:d.getElementById('password').value
      }

      if(validar_datos(datos)){
      fetch('http://localhost:3000/personas', {
       method: "POST",
       body: JSON.stringify(datos),
       headers: {"Content-type": "application/json; charset=UTF-8"}
       })
       .then(response => response.json()) 
       .then(json => console.log(json))
       .catch(err => console.log(err));
        sessionStorage.setItem('nombre', nombre.value);
        w.location.href = '../html/reservas.html';
      }else{
        console.log('error');
        return false;
      }


  }*/


  //REGISTRO NUEVO
  if(e.target.matches('.btn-registrar')){
    e.preventDefault();
    e.stopPropagation();
    limparValidaciones();
    let form=d.getElementById('#form-registrar');
    let nombre=d.getElementById('nombre');
    let email=d.getElementById('email');
    let password=d.getElementById('password');

    let formData=new FormData();
    formData.append("nombre", nombre.value);
    formData.append('password', password.value);
    formData.append('email', email.value);


    if(validar_camposForm('#form-registrar')){
      fetch('../php/register.php', {
       method: "POST",
       body: formData,
       })
         .then(response => response.json()) 
         .then(json => {
          console.log(json);
          if(json['status']){
            location.href="../php/secure.php";
          }else{
          let $email=d.querySelector('#email');
          let $nombre=d.querySelector('#nombre');
          if(json['msg']=='Email invalido'){
            if(!$email.classList.contains('border-danger')){
              $email.classList.add('border','border-3','border-danger');
            }
              let $mensaje=d.createElement('div');
              $mensaje.innerHTML='Email invalido';
              $mensaje.classList.add('msj-error','text-center','pb-1');
              let $form=d.querySelector('#form-registrar')
              $form.insertBefore($mensaje,$form.firstChild);
          }else if(json['msg']=='Usuario ya registrado'){
            if(!$nombre.classList.contains('border-danger')){
              $nombre.classList.add('border','border-3','border-danger');
            }
              let $mensaje=d.createElement('div');
              $mensaje.innerHTML='Usuario ya registardo';
              $mensaje.classList.add('msj-error','text-center','pb-1');
              let $form=d.querySelector('#form-registrar')
              $form.insertBefore($mensaje,$form.firstChild);
          }else if(json['msg']=='Email ya registrado'){
            console.log('e')
              if(!$email.classList.contains('border-danger')){
              $email.classList.add('border','border-3','border-danger');
            }
              let $mensaje=d.createElement('div');
              $mensaje.innerHTML='Email ya registardo';
              $mensaje.classList.add('msj-error','text-center','pb-1');
              let $form=d.querySelector('#form-registrar')
              $form.insertBefore($mensaje,$form.firstChild);
          }
        
        }
          }) 
         .catch(err => {
          console.log('ERROR')
          console.log(err)}
          );
        }

  }



  //Sesion
  if(e.target.matches('#btn-logout')){
    e.preventDefault();
    location.href="../php/logout.php"
  }

   //Crear reserva modal
   if((e.target.matches('.btn-reserva'))||(e.target.matches('#btn-editar'))){
    console.log('e');
     d.querySelector('#nombre').value=d.querySelector('#btn-sesion').textContent;
    }
    
    
  //Crear reserva
  if(e.target.matches('#btn-reg-res')){
    e.preventDefault();
    e.stopPropagation();
    limparValidacionesForm();
    let $responsable=d.querySelector('#responsable');
    let $personas=d.querySelector('#personas');
    let $dia=d.querySelector('#dia');
    let $hora=d.querySelector('#hora');

    let formData=new FormData();
    formData.append('id_usuario', 'Seria el id de la session');
    formData.append("responsable", $responsable.value);
    formData.append('personas', $personas.value);
    formData.append('dia', $dia.value);
    formData.append('hora', $hora.value);

     if(validar_campos('.modal-body')){
      fetch('../php/createReserva.php', {
       method: "POST",
       body: formData,
       })
         .then(response => response.json()) 
         .then(json => {
          console.log(json);
          if(json['status']){
            console.log('se registró')
            Swal.fire(
            'Reserva Registrada!',
            '',
            'success'
                ).then(()=>
              location.reload()
            );
            //location.href="../php/secure.php";
          }else{
            if(json['msg']=="Ya hay una reserva en ese dia a esa hora"){
              let $mensaje=d.createElement('div');
              $mensaje.innerHTML='Ya hay una reserva en ese dia a esa hora';
              $mensaje.classList.add('msj-error','text-center','pb-1');
              d.querySelector('.modal-body').insertAdjacentElement('afterend',$mensaje)
            }
          }
          }) 
         .catch(err => {
          console.log('ERROR')
          console.log(err)}
          );

     }
  }

  //Editar reserva
/*
  if(e.target.matches('#btn-reg')){
    e.preventDefault();
    e.stopPropagation();
    let $responsable=d.querySelector('#responsable');
    let $personas=d.querySelector('#personas');
    let $dia=d.querySelector('#dia');
    let $hora=d.querySelector('#hora');


    let formData=new FormData();
    formData.append("id", $responsable.value);
    formData.append("responsable", $responsable.value);
    formData.append('personas', $personas.value);
    formData.append('dia', $dia.value);
    formData.append('hora', $hora.value)
    if(validar_campos('.modal-body')){
      if(e.target.classList.contains('editar')){
        editar(formData);
      }
      if(e.target.classList.contains('borrar')){
        borrar(formData);
      }
    }
  }*/




  

})
})