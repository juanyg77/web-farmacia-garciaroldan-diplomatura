let carrito = JSON.parse(localStorage.getItem('carritoFarmacia')) || [];

const carritoVacio = document.querySelector('#estado-vacio');
const contenedorPago = document.querySelector('#estado-pago');
const resumenProductos = document.querySelector('#resumen-carrito-pago');

const subtotalEtiqueta = document.querySelector('#subtotal-pago');
const totalFinalEtiqueta = document.querySelector('#total-final-pago');

const selectorPago = document.querySelector('#metodo-pago');
const selectorCuotas = document.querySelector('#cuotas-pago');
const etiquetaAjuste = document.querySelector('#valor-descuento-recargo');

const infoTransf = document.querySelector('#info-transferencia');
const formTarjeta = document.querySelector('#formulario-tarjeta');
const contCuotas = document.querySelector('#contenedor-cuotas');

const btnFinalizar = document.querySelector('#btn-confirmar-pago');
const pantallaExito = document.querySelector('#pantalla-exito');
const nroPedidoEtiqueta = document.querySelector('#nro-pedido-final');
const detalleFinalWA = document.querySelector('#detalle-final-wa');

const inputNombre = document.querySelector('#nombre-tarjeta');
const inputNumero = document.querySelector('#nro-tarjeta');
const inputVence = document.querySelector('#vencimiento');
const inputCvv = document.querySelector('#cvv');

let precioBaseTotal = 0;

const renderizarResumen = () => {
    resumenProductos.innerHTML = '';
    precioBaseTotal = 0;

    if(carrito.length === 0){
        carritoVacio.classList.remove('d-none');
        contenedorPago.classList.add('d-none');
    }else{
        carritoVacio.classList.add('d-none');
        contenedorPago.classList.remove('d-none');

        carrito.forEach((prod, indice) =>{
            precioBaseTotal += prod.precio;
            resumenProductos.innerHTML += `
                <div class="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                    <img src="${prod.img}" width="40" alt="${prod.nombre}" class="rounded">
                    <div class="ms-2 flex-grow-1 text-start">
                        <p class="mb-0 small fw-bold">${prod.nombre}</p>
                        <p class="mb-0 small text-muted">$${prod.precio.toLocaleString()}</p>
                    </div>
                </div>
            `;
        });
       subtotalEtiqueta.innerText = `$${precioBaseTotal.toLocaleString()}`;
        totalFinalEtiqueta.innerText = `$${precioBaseTotal.toLocaleString()}`;
    }
}
const actualizarPrecios = () => {
    const metodo = selectorPago.value;
    const cuotas = selectorCuotas.value;
    
    let totalConImpuestos = precioBaseTotal; 
    let textoAjuste = "Descuento/Recargo:";
    let valorAjuste = 0;

    
    if (metodo === 'transferencia') {
        valorAjuste = -(precioBaseTotal * 0.05); 
        totalConImpuestos = precioBaseTotal + valorAjuste;
    } 
    else if (metodo === 'credito') {
        if (cuotas === '3') {
            valorAjuste = precioBaseTotal * 0.20;
        } else if (cuotas === '6') {
            valorAjuste = precioBaseTotal * 0.30; 
        }
        totalConImpuestos = precioBaseTotal + valorAjuste;
    }

    etiquetaAjuste.innerText = `$${valorAjuste.toLocaleString()}`;
    totalFinalEtiqueta.innerText = `$${totalConImpuestos.toLocaleString()}`;
}

const numeroPedido = () => Math.floor(Math.random() * 900000) + 100000;

selectorPago.addEventListener('change', () =>{
    const metodo = selectorPago.value;

    infoTransf.classList.add('d-none');
    formTarjeta.classList.add('d-none');
    contCuotas.classList.add('d-none');

    if(metodo === 'transferencia'){
        infoTransf.classList.remove('d-none');
    }else if(metodo === 'credito'){
        formTarjeta.classList.remove('d-none');
        contCuotas.classList.remove('d-none');
    } else if (metodo === 'debito') {
        formTarjeta.classList.remove('d-none');
    }
    actualizarPrecios();
})

btnFinalizar.addEventListener('click', (e) =>{
    e.preventDefault()
    selectorPago.classList.remove('is-invalid');
    const metodoElegido= selectorPago.value
    if (metodoElegido === "") {
        selectorPago.classList.add('is-invalid');
        return; 
    }

    if (metodoElegido === 'transferencia'){
        const nro = numeroPedido();
        nroPedidoEtiqueta.innerText = nro;

        contenedorPago.classList.add('d-none');
        pantallaExito.classList.remove('d-none');

        const mensajeWA = `Hola! Realicé el pedido #${nro} por un total de ${totalFinalEtiqueta.innerText}.`;
        
        detalleFinalWA.innerHTML = `
            <p class="small mt-3 mb-2 text-muted">Mandanos el comprobante por acá:</p>
            <a href="https://wa.me/5493547328075?text=${encodeURIComponent(mensajeWA)}" target="_blank" class="btn-wa">
                <i class="fa-brands fa-whatsapp me-2"></i> Enviar Comprobante
            </a>
        `;
        localStorage.removeItem('carritoFarmacia');
        carrito = [];
    }else if(metodoElegido === 'debito' || metodoElegido === 'credito'){
        const nombreLimpio = inputNombre.value.trim();
        let formularioValido = true;

        if (nombreLimpio === "" || nombreLimpio.length < 3) {
            inputNombre.classList.add('is-invalid');
            formularioValido = false;
        }else{
            inputNombre.classList.remove('is-invalid');
        }
        
        const numeroLimpio = inputNumero.value.trim();
         if (numeroLimpio === "" || isNaN(numeroLimpio) || numeroLimpio.length !== 16) {
            inputNumero.classList.add('is-invalid');
            formularioValido = false;
        } else {
            inputNumero.classList.remove('is-invalid');
        }

        const vencimientoLimpio = inputVence.value.trim();
        if (vencimientoLimpio === "" || vencimientoLimpio.length !== 5) {
            inputVence.classList.add('is-invalid');
           formularioValido = false;
         } else {
            inputVence.classList.remove('is-invalid');
        }
        
        const cvvLimpio = inputCvv.value.trim();
        if (cvvLimpio === "" || isNaN(cvvLimpio) || cvvLimpio.length !== 3) {
            inputCvv.classList.add('is-invalid');
            formularioValido = false;
        } else {
            inputCvv.classList.remove('is-invalid');
        }

        if(!formularioValido){
            return;
        }

        const nro = numeroPedido();
        nroPedidoEtiqueta.innerText = nro;
        detalleFinalWA.innerHTML = "";
        contenedorPago.classList.add('d-none');
        pantallaExito.classList.remove('d-none');
        localStorage.removeItem('carritoFarmacia');
        carrito = [];
    }
});

selectorCuotas.addEventListener('change', actualizarPrecios);
renderizarResumen();