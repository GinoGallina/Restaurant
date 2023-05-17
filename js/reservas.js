const doc=document,
  win=window;

win.addEventListener('DOMContentLoaded',()=>{

  if(!sessionStorage.getItem('usuario')){
    console.log('no existe');
    //No tendría q pasar
  }else{
    let usuario=doc.getElementById('btn-sesion');
    usuario.textContent=sessionStorage.getItem('usuario');
  }

  doc.addEventListener('click',e=>{
    if(e.target.matches('#btn-logout')){
      console.log('hola');
      sessionStorage.clear();
    }else{

    }
  })




})