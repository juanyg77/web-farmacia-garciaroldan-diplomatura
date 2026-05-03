const formulario = document.getElementById('form-contacto');

formulario.addEventListener('submit', (e) =>{
    e.preventDefault();

   const nombreForm = document.getElementById('nombre').value.trim();
   const telefonoForm = document.getElementById('telefono').value.trim();
   const motivoForm = document.getElementById('motivo').value; 
   const mensajeForm = document.getElementById('mensaje').value.trim();

   let formularioValido = true;

   if (nombreForm === ""){
    document.getElementById('nombre').classList.add('is-invalid');
    formularioValido = false;
   }else{
     document.getElementById('nombre').classList.remove('is-invalid');
   }

  
if (telefonoForm === "" || isNaN(telefonoForm.replace(/\s/g, '').replace(/-/g, ''))){
     document.getElementById('telefono').classList.add('is-invalid');
     formularioValido = false;
   } else {
    const soloNumeros = telefonoForm.replace(/\s/g, '').replace(/-/g, '');

    if(soloNumeros.length < 10){ 
        document.getElementById('telefono').classList.add('is-invalid');
        formularioValido = false;
    } else {
        document.getElementById('telefono').classList.remove('is-invalid');
    }
   }

   if (motivoForm === "") {
        document.getElementById('motivo').classList.add('is-invalid');
        formularioValido = false;
    } else {
        document.getElementById('motivo').classList.remove('is-invalid');
    }

    if (mensajeForm === "" || mensajeForm.length <5)  {
        document.getElementById('mensaje').classList.add('is-invalid');
        formularioValido = false;
    } else {
        document.getElementById('mensaje').classList.remove('is-invalid');
    }

    if(formularioValido){
        document.getElementById('mensaje-exito').classList.remove('d-none');
        formulario.reset();
    }
});