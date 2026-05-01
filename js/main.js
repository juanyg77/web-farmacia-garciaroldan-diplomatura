const productos = [
    {
        id: 1,
        nombre: "Sertal Perlas",
        descripcion: "Caja x 10 cápsulas",
        precio: 8000,
        img: "../img/productos/sertal_perlas.png",
        categoria: "salud"
    },
    {
        id: 2,
        nombre: "Sertal Compuesto",
        descripcion: "Caja x 20 comprimidos",
        precio: 9500,
        img: "../img/productos/sertal_compuesto.png",
        categoria: "salud"
    },
    {
        id: 3,
        nombre: "Lotrial 10mg",
        descripcion: "Caja x 30 comprimidos",
        precio: 12000,
        img: "../img/productos/lotrial10.png",
        categoria: "salud"
    },
    {
        id: 4,
        nombre: "Losacor 50mg",
        descripcion: "Caja x 30 comprimidos",
        precio: 11500,
        img: "../img/productos/losacor.png",
        categoria: "salud"
    },
    {
        id: 5,
        nombre: "Shampoo Tío Nacho Herbolaria Milenaria",
        descripcion: "Anti-caída - 415ml",
        precio: 15000,
        img: "../img/productos/shampo.jpg",
        categoria: "perfumeria"
    },
    {
        id: 6,
        nombre: "Desodorante Rexona Motionsense Invisible",
        descripcion: "Aerosol + Roll-on",
        precio: 6500,
        img: "../img/productos/rexona.png",
        categoria: "perfumeria"
    },
    {
        id: 7,
        nombre: "Desodorante Axe Dark Temptation",
        descripcion: "Aerosol x 152ml",
        precio: 4200,
        img: "../img/productos/axe.png",
        categoria: "perfumeria"
    },
    {
        id: 8,
        nombre: "Línea Solar Dermaglós",
        descripcion: "Protectores FPS 50 y Post Solar",
        precio: 30500,
        img: "../img/productos/protectores_solares.png",
        categoria: "perfumeria"
    }
];


let carrito = JSON.parse(localStorage.getItem('carritoFarmacia')) || [];

const btnCarrito = document.querySelector('#btn-carrito');
const carritoDesplegable = document.querySelector('#carrito-desplegable');
const contenedorSalud = document.querySelector('#contenedor-salud');
const contenedorPerfumeria = document.querySelector('#contenedor-perfumeria');


const pintarProductos = () => {
    if (!contenedorSalud || !contenedorPerfumeria){
        return;
    } ;
    productos.forEach(prod =>{
        const card = `
            <div class="col-md-3">
                <article class="card-producto">
                    <div class="header-producto">
                        <img src="${prod.img}" class="img-producto" alt="${prod.nombre}">
                    </div>
                    <div class="info-producto mt-3 text-center">
                        <h5 class="nombre-producto">${prod.nombre}</h5>
                        <p class="descripcion-producto text-muted small">${prod.descripcion}</p>
                        <p class="precio-producto fw-bold">$${prod.precio.toLocaleString()}</p>
                        <button id="${prod.id}" class="btn-agregar-carrito">Agregar al carrito</button>
                    </div>
                </article>
            </div>
        `;
        if (prod.categoria ==="salud"){
            contenedorSalud.innerHTML += card;
        }else{
            contenedorPerfumeria.innerHTML += card;
        }
    });
}

const dibujarCarrito = () =>{
    const lista = document.querySelector('#lista-carrito');
    const totalContenedor = document.querySelector('.total-carrito span:last-child');

    lista.innerHTML = '';

    if(carrito.length === 0){
        lista.innerHTML = '<p class="text-center">El carrito está vacío</p>';
        totalContenedor.innerText = '$0';
        return;
    }



    let sumaTotal=0;

    carrito.forEach((prod, indice) =>{
        sumaTotal += prod.precio;

        const renglon = `
            <div class="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                <img src="${prod.img}" width="40" alt="${prod.nombre}" class="rounded">
                <div class="ms-2 flex-grow-1 text-start">
                    <p class="mb-0 small fw-bold">${prod.nombre}</p>
                    <p class="mb-0 extra-small">$${prod.precio.toLocaleString()}</p>
                </div>
                <button class="btn btn-sm btn-outline-danger border-0" onclick="eliminarProducto(${indice})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        lista.innerHTML += renglon;
    });
    totalContenedor.innerText = `$${sumaTotal.toLocaleString()}`;
    actualizarContador();
};

const eliminarProducto = (indice) => {
    carrito.splice(indice, 1);

    localStorage.setItem('carritoFarmacia', JSON.stringify(carrito));
    dibujarCarrito();
    actualizarContador();
}

const actualizarContador = () => {
    const contador = document.querySelector('#contador-carrito');
    if (contador) {
        contador.innerText = carrito.length;
    }
};

btnCarrito.addEventListener('click', () =>{
    carritoDesplegable.classList.toggle('d-none');
});




pintarProductos();
dibujarCarrito();
actualizarContador();

const botonesAgregar = document.querySelectorAll('.btn-agregar-carrito');

botonesAgregar.forEach(boton => {
   boton.addEventListener('click', () =>{
    const idCapturado = boton.id;
    console.log("Hiciste click en el botón con ID:", idCapturado);

    let productoEncontrado = null;

    for(let i=0; i < productos.length; i++){
        if(productos[i].id == idCapturado){
            productoEncontrado = productos[i];
            break;
        }
    }
    if(productoEncontrado) {
        carrito.push(productoEncontrado);
        dibujarCarrito();
        actualizarContador();
        localStorage.setItem('carritoFarmacia', JSON.stringify(carrito));

        console.log("Carrito actual:", carrito);
    }
   }); 
});