const doc=document,
  win=window;

function completarCampos(id_cli){
  fetch('../php/verCliente.php?' + new URLSearchParams({
    id: id_cli,
}))
      .then(response => response.json())
      .then(data => {     
        console.log(data)
        let $id_cli=doc.querySelector('#id_cli');
        let $nombre=doc.querySelector('#nombre');
        let $email=doc.querySelector('#email');
        let $password=doc.querySelector('#password');



        $id_cli.value=id_cli;
        $nombre.value=data[0].nombre;
        $email.value=data[0].email;
        $password.value=data[0].password;

      })
      .catch(err=>{
        console.log('error');
        console.log(err)});
}

function habilitarCampos(){
  let $inputs=doc.querySelectorAll('.modal input');
  $inputs.forEach(inp=>{

    if((!inp.classList.contains('no-desabilitar')) & inp.hasAttribute('disabled')){
      inp.removeAttribute('disabled');
    }
  })

}

function deshabilitarCampos(){
  let $inputs=doc.querySelectorAll('.modal input');
  $inputs.forEach(inp=>{
    if(!(inp.classList.contains('no-desabilitar')) & (!inp.hasAttribute('disabled'))){
      inp.setAttribute('disabled','disabled');
    }
  })
}

function limparCampos(){
  const inputs = document.querySelectorAll('.modal-body input');
  let $form=d.querySelector('.modal-body');
    inputs.forEach(input => {
    input.value=""
    if(input.classList.contains('border-danger')){
        input.classList.remove('border','border-3','border-danger');
    }
    });
    console.log(doc.querySelector('.msj-error'))
    if($form.nextElementSibling.isEqualNode(doc.querySelector('.msj-error'))){
      doc.querySelector('.msj-error').remove();
    }
}

function limparValidaciones(){
  const inputs = document.querySelectorAll('.modal-body input');
  let $form=d.querySelector('.modal-body');
    inputs.forEach(input => {
    if(input.classList.contains('border-danger')){
        input.classList.remove('border','border-3','border-danger');
    }
    });
    console.log(doc.querySelector('.msj-error'))
    if($form.nextElementSibling.isEqualNode(doc.querySelector('.msj-error'))){
      doc.querySelector('.msj-error').remove();
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

function editar(data){
      fetch('../php/editarCliente.php', {
       method: "POST",
       body: data,
       })
         .then(response => response.json()) 
         .then(json => {
          console.log(json);
          console.log(json['status']);
          if(json['status']){
            //alert('se actualizo')
            Swal.fire(
            'Cliente Ediado!',
            '',
            'success'
                ).then(()=>
              location.reload()
            );
            //location.reload();
          }else{
          let $email=doc.querySelector('#email');
          let $nombre=doc.querySelector('#nombre');
          if(json['msg']=='Enter Valid Email address'){
            if(!$email.classList.contains('border-danger')){
              $email.classList.add('border','border-3','border-danger');
            }
              let $mensaje=d.createElement('div');
              $mensaje.innerHTML='Email invalido';
              $mensaje.classList.add('msj-error','text-center','pb-1');
              doc.querySelector('.modal-body').insertAdjacentElement('afterend',$mensaje)
          }else if(json['msg']=='Ya hay un usuario con en ese nombre o mail'){
            if(!$email.classList.contains('border-danger')){
              $email.classList.add('border','border-3','border-danger');
            }
            if(!$nombre.classList.contains('border-danger')){
              $nombre.classList.add('border','border-3','border-danger');
            }
              let $mensaje=d.createElement('div');
              $mensaje.innerHTML='Ya hay un usuario con ese Email o Nombre';
              $mensaje.classList.add('msj-error','text-center','pb-1');
              doc.querySelector('.modal-body').insertAdjacentElement('afterend',$mensaje) 
          }
        
        }
          }) 
         .catch(err => {
          console.log('ERROR')
          console.log(err)}
          );
}

function crear(data){
    fetch('../php/createCliente.php', {
     method: "POST",
     body: data,
     })
       .then(response => response.json()) 
       .then(json => {
        console.log(json);
        if(json['status']){
          //alert('ser registró')
            Swal.fire(
            'Cliente Creado!',
            '',
            'success'
            ).then(()=>
              location.reload()
            );
            
        }else{
          let $email=doc.querySelector('#email');
          let $nombre=doc.querySelector('#nombre');
          if(json['msg']=='Enter Valid Email address'){
            if(!$email.classList.contains('border-danger')){
              $email.classList.add('border','border-3','border-danger');
            }
              let $mensaje=d.createElement('div');
              $mensaje.innerHTML='Email invalido';
              $mensaje.classList.add('msj-error','text-center','pb-1');
              doc.querySelector('.modal-body').insertAdjacentElement('afterend',$mensaje)
          }else if(json['msg']=='Ya hay un usuario con en ese nombre o mail'){
            if(!$email.classList.contains('border-danger')){
              $email.classList.add('border','border-3','border-danger');
            }
            if(!$nombre.classList.contains('border-danger')){
              $nombre.classList.add('border','border-3','border-danger');
            }
              let $mensaje=d.createElement('div');
              $mensaje.innerHTML='Ya hay un usuario con en ese nombre o mail';
              $mensaje.classList.add('msj-error','text-center','pb-1');
              doc.querySelector('.modal-body').insertAdjacentElement('afterend',$mensaje) 
          }
        
        }
        }) 
       .catch(err => {
        console.log('ERROR')
        console.log(err)}
        );
}

function borrar(id){

      fetch('../php/borrarCliente.php?'+ new URLSearchParams({
        id: id,
      }), {
       method: "DELETE"
       })
         .then(response => response.json()) 
         .then(json => {
          console.log(json);
          if(json['status']){
            Swal.fire(
            'Cliente Borrado!',
            '',
            'success'
            ).then(()=>
              location.reload()
            );
            
          }else{

          }
          }) 
         .catch(err => {
          console.log('ERROR')
          console.log(err)}
          );
}


win.addEventListener('DOMContentLoaded',()=>{

  let $t_body= doc.querySelector('#t-body')
  fetch('../php/verClientes.php')
      .then(response => response.json())
      .then(data => {     

        let contenido="";
        data.forEach(d=>{
          contenido += "<tr>";
      	  contenido += "<td class='text-center'>" + d.id + "</td>";
      	  contenido += "<td class='text-center'>" + d.nombre + "</td>";
          contenido += "<td class='text-center'>" + d.email + "</td>";
          contenido += "<td class='text-center'>" + d.password + "</td>";
          contenido += "<td class='text-center'>" + d.fecha_creacion + "</td>";
          contenido += "<td class='text-center'>" 
          contenido+= '<form action="" class="borrar d-flex justify-content-around" method="">'
          contenido+='<a id="btn-editar" href="" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#modalCliente" data-cli='+d.id+'>Editar</a>'
          contenido+='<a id="btn-borrar" href="" class=" btn btn-danger boton-borrar" data-bs-toggle="modal" data-bs-target="#modalCliente" data-cli='+d.id+'>Borrar</a></form>'       
          contenido +="</td>"
          contenido += "</tr>";
        })
        $t_body.innerHTML=contenido;


      })
      .catch(err=>{
        console.log('error');
        console.log(err)});
      

      doc.addEventListener('click',e=>{
        let $tituloModal=doc.querySelector('#modal-label');
        let $btn_reg=doc.getElementById('btn-reg-cli');

        if(e.target.matches('#btn-crear-cli')){
          limparCampos();
          $tituloModal.innerHTML="Crear Cliente";
          habilitarCampos();
          $btn_reg.classList.add('crear');
          if($btn_reg.classList.contains('borrar')){
            $btn_reg.classList.remove('borrar');
          }
          if($btn_reg.classList.contains('editar')){
            $btn_reg.classList.remove('editar');
          }
        }
        
        if(e.target.matches('#btn-editar')){
          limparCampos();
          $tituloModal.innerHTML="Editar Cliente";
          habilitarCampos();
          let $id_cli=e.target.dataset.cli;
          completarCampos($id_cli);
          $btn_reg.classList.add('editar');
          if($btn_reg.classList.contains('borrar')){
            $btn_reg.classList.remove('crear');
          }
        }

        if(e.target.matches('#btn-borrar')){
          limparCampos();
          $tituloModal.innerHTML="Borrar Cliente";
          deshabilitarCampos();
          completarCampos(e.target.dataset.cli);
          $btn_reg.classList.add('borrar');
          if($btn_reg.classList.contains('editar')){
            $btn_reg.classList.remove('editar');
          }
          if($btn_reg.classList.contains('crear')){
            $btn_reg.classList.remove('crear');
          }
        }

        if(e.target.matches('#btn-reg-cli')){
            e.preventDefault();
            e.stopPropagation();
            limparValidaciones();
            if(validar_campos('.modal-body')){
              let $id_cli=d.querySelector('#id_cli');

              let $nombre=d.querySelector('#nombre');
              let $email=d.querySelector('#email');
              let $password=d.querySelector('#password');

              let formData=new FormData();
              formData.append("nombre", $nombre.value);
              formData.append('email', $email.value);
              formData.append('password', $password.value);
              formData.append("id", $id_cli.value);

             
              if(e.target.classList.contains('editar')){
                editar(formData);
              }else if(e.target.classList.contains('borrar')){
                borrar($id_cli.value);
              }else if(e.target.classList.contains('crear')){
                crear(formData);
              }
          }

        }
          


      })


})