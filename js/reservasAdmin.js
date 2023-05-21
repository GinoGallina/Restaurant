const doc=document,
  win=window;

function completarCampos(id_res){
  fetch('../php/verReservaCliente.php?' + new URLSearchParams({
    id: id_res,
}))
      .then(response => response.json())
      .then(data => {     
        
        let $id_res=doc.querySelector('#id_res');
        let $responsable=doc.querySelector('#responsable');
        let $personas=doc.querySelector('#personas');
        let $dia=doc.querySelector('#dia');
        let $hora=doc.querySelector('#hora');


        $id_res.value=id_res;
        $responsable.value=data[0].responsable;
        $personas.value=data[0].personas;
        $hora.value=data[0].hora;
        $dia.value=data[0].dia;

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

function traerClientes(){

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
      fetch('../php/editarReserva.php', {
       method: "POST",
       body: data,
       })
         .then(response => response.json()) 
         .then(json => {
          console.log(json);
          if(json['status']){
            alert('se actualizo')
            location.reload();
          }else{

          }
          }) 
         .catch(err => {
          console.log('ERROR')
          console.log(err)}
          );
}

function crear(data){
    fetch('../php/createReserva.php', {
     method: "POST",
     body: data,
     })
       .then(response => response.json()) 
       .then(json => {
        console.log(json);
        if(json['status']){
          alert('ser registró')
          location.reload();
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


function borrar(id){

      fetch('../php/borrarReserva.php?'+ new URLSearchParams({
        id: id,
      }), {
       method: "DELETE"
       })
         .then(response => response.json()) 
         .then(json => {
          console.log(json);
          if(json['status']){
            alert('Se borro');
            location.reload();
            
          }else{

          }
          }) 
         .catch(err => {
          console.log('ERROR')
          console.log(err)}
          );
}


win.addEventListener('DOMContentLoaded',()=>{

  traerClientes()
  let $t_body= doc.querySelector('#t-body')
  fetch('../php/verReservas.php')
      .then(response => response.json())
      .then(data => {
        
        

        let contenido="";
        data.forEach(d=>{
          contenido += "<tr>";
      	  contenido += "<td class='text-center'>" + d.id + "</td>";
      	  contenido += "<td class='text-center'>" + d.id_usuario + "</td>";
      	  contenido += "<td class='text-center'>" + d.id_usuario + "</td>";
      	  contenido += "<td class='text-center'>" + d.responsable + "</td>";
          contenido += "<td class='text-center'>" + d.personas + "</td>";
          contenido += "<td class='text-center'>" + d.dia + "</td>";
          contenido += "<td class='text-center'>" + d.hora + "</td>";
          contenido += "<td class='text-center'>" 
          contenido+= '<form action="" class="borrar d-flex justify-content-around" method="">'
          contenido+='<a id="btn-editar-res" href="" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#modalReserva" data-res='+d.id+'>Editar</a>'
          contenido+='<a id="btn-borrar-res" href="" class=" btn btn-danger boton-borrar" data-bs-toggle="modal" data-bs-target="#modalReserva" data-res='+d.id+'>Borrar</a></form>'       
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
        let $btn_reg=doc.getElementById('btn-reg-res');

        if(e.target.matches('#btn-crear-res')){
          limparCampos();
          $tituloModal.innerHTML="Crear Reserva";
          habilitarCampos();
          $btn_reg.classList.add('crear');
          if($btn_reg.classList.contains('borrar')){
            $btn_reg.classList.remove('borrar');
          }
          if($btn_reg.classList.contains('editar')){
            $btn_reg.classList.remove('editar');
          }
        }
        
        if(e.target.matches('#btn-editar-res')){
          limparCampos();
          $tituloModal.innerHTML="Editar Reserva";
          habilitarCampos();
          let $id_res=e.target.dataset.res;
          completarCampos($id_res);
          $btn_reg.classList.add('editar');
          if($btn_reg.classList.contains('borrar')){
            $btn_reg.classList.remove('crear');
          }
        }

        if(e.target.matches('#btn-borrar-res')){
          limparCampos();
          $tituloModal.innerHTML="Borrar Reserva";
          deshabilitarCampos();
          completarCampos(e.target.dataset.res);
          $btn_reg.classList.add('borrar');
          if($btn_reg.classList.contains('editar')){
            $btn_reg.classList.remove('editar');
          }
          if($btn_reg.classList.contains('crear')){
            $btn_reg.classList.remove('crear');
          }
        }

        if(e.target.matches('#btn-reg-res')){
            e.preventDefault();
            e.stopPropagation();
            limparValidaciones();
            if(validar_campos('.modal-body')){
              let $id_res=d.querySelector('#id_res');
              let $responsable=d.querySelector('#responsable');
              let $personas=d.querySelector('#personas');
              let $dia=d.querySelector('#dia');
              let $hora=d.querySelector('#hora');


              let formData=new FormData();
              formData.append("id", $id_res.value);
              formData.append("responsable", $responsable.value);
              formData.append('personas', $personas.value);
              formData.append('dia', $dia.value);
              formData.append('hora', $hora.value);

              
              
              
              if(e.target.classList.contains('editar')){
                formData.append("id", $id_res.value);
                editar(formData);
              }else if(e.target.classList.contains('borrar')){
                borrar($id_res.value);
              }else if(e.target.classList.contains('crear')){
                crear(formData);
              }
          }

        }
          


      })


})