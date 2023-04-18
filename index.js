
// Carga de la pag
document.addEventListener('DOMContentLoaded', function () {
    //conntenedor de los productos
    const productosContainer = document.querySelector("#productos-container");
    const gridProductos = document.querySelector("#grid-productos");
    const carritoContainer = document.querySelector("#carrito-container");
    const carritoTotalElement = document.querySelector(".carrito-total");
    const hacerPedidoElement = document.querySelector(".hacer-pedido");

window.addEventListener('load', function() { //Event listener para detectar cuando la página se recarga
    
            if (carrito.length > 0) {
            mostrarTotalYPedido();
        }
});

const producto = [ //productos en formato JSON
    {
        "id": 1,
        "nombre": "Vino Alambrado Malbec",
        "precio": 5000,
        "imagen": "imagenes/AAlambrado.jpg",
        "descripcion": "Alambrado Malbec 2008, Mendoza Argentina x750ml.",
        "disponibilidad": true
    },
    {
        "id": 2,
        "nombre": "Vino Catena Zapata Malbec",
        "precio": 18000,
        "imagen": "imagenes/catenazapata.jpg",
        "descripcion": "Catena Zapata Malbec Argentino x750ml",
        "disponibilidad": true
    },
    {
        "id": 3,
        "nombre": "Vino Catena Zapata D.V ",
        "precio": 7500,
        "imagen": "imagenes/dvcatenazap.jpg",
        "descripcion": "Catena Zapata D.V Cabernet-Malbec x750ml ",
        "disponibilidad": true
    },
    {
        "id": 4,
        "nombre": "Vino Luigi bosca De Sangre",
        "precio": 7.500,
        "imagen": "imagenes/luigi.jpg",
        "descripcion": "Vino luigi bosca 2008 Blend de uvas tintas seco x750ml.",
        "disponibilidad": true
    },
    {
        "id": 5,
        "nombre": "Vino blanco Portillo Sauvignon blanc ",
        "precio": 900,
        "imagen": "imagenes/portillodulce.jpeg",
        "descripcion": "Vino Portillo Sauvignon blanc dulce Salentein x750ml.",
        "disponibilidad": true
    },
    {
        "id": 6,
        "nombre": "Vino blanco Nicasia Vineyards",
        "precio": 2500,
        "imagen": "imagenes/Nicasiablend.png",
        "descripcion": "Vino blanco Nicasia vineyards blend de blancas x750ml.",
        "disponibilidad": true
    },
    {
        "id": 7,
        "nombre": "Vino de tintas bonarda Nieto Senetiner Partida Limitada ",
        "precio": 10500,
        "imagen": "imagenes/bonardanieto.jpg",
        "descripcion": "Vino bonarda Partida Limitada Nieto Senetiner Mza, Arg x750ml.",
        "disponibilidad": true
    },
    {
        "id": 8,
        "nombre": "Solucion Ruborizada Ricardo Santos",
        "precio": 6000,
        "imagen": "imagenes/ricardosantos.jpg",
        "descripcion": "Vino rosado Ricardo Santos x750ml.",
        "disponibilidad": true
    }
];

console.log(producto);

let carrito = [];

inicializarCarrito(); // función inicializarCarrito() cargar los productos del carrito guardado

function crearElementoProducto(producto) { // crear un elemento HTML para un producto y lo retorna

    const divProducto = document.createElement('div'); // Creamos un elemento div para contener la info de producto
    divProducto.classList.add('col-md-3');
    divProducto.innerHTML = // Creamos el contenido del div utilizando la info de producto 
                                `<img src="${producto.imagen}" alt="${producto.nombre}">
        <h2>${producto.nombre}</h2>
                    <p>Precio: $${producto.precio}</p>
                        <p>Descripción: ${producto.descripcion}</p>`
                ;
                const imgProducto = divProducto.querySelector('img');

    const infoBtn = document.createElement('button');
    infoBtn.textContent = 'Más información';
    infoBtn.classList.add('info-btn');
    infoBtn.style.visibility = 'hidden';
    infoBtn.addEventListener('click', mostrarInfoProducto.bind(infoBtn, producto));
    divProducto.appendChild(infoBtn); 


    const botonAgregar = document.createElement('button'); // Creamos un elemento button para agregar el producto al carrito
    botonAgregar.id = 'boton-agregar';
    botonAgregar.textContent = 'Agregar al carrito';
    botonAgregar.addEventListener('click', function () { // Agregamos un event listener al botón para ejecutar una función cuando se haga clic en él
        console.log(`Se agregó al carrito el producto: ${producto.nombre}`);
            agregarAlCarrito(producto);
      actualizarTotalCarrito(); // Actualiza el total del carrito
    }); 
    divProducto.appendChild(botonAgregar); // Agregamos el botón al div del producto
    
    divProducto.addEventListener('mouseover', mostrarBotonInfo);
    divProducto.addEventListener('mouseout', ocultarBotonInfo);

    return divProducto; // Retornamos el div con la información del producto y el botón para agregarlo al carrito
} 

function agregarAlCarrito(producto) { // Función para agregar un producto al carrito 
    const itemCarrito = { // Crea un objeto que represente un ítem del carrito con la información del producto
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        cantidad: 1
    };
    carrito.push(itemCarrito); // Agrega el item del carrito al array del carrito
    agregarProductoCarrito(itemCarrito); // Agrega el producto al carrito en la interfaz
    carritoContainer.classList.remove('oculto');
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualiza el carrito guardado en el almacenamiento local
    mostrarTotalYPedido();
}

function agregarProductoCarrito(producto) { // Función para agregar un producto al carrito en la interfaz
    const carritoItem = document.createElement('div');
    carritoItem.classList.add('carrito-item');
    carritoItem.dataset.id = producto.id;
    carritoItem.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}" class="carrito-item-img">
    <span>${producto.nombre}</span>
    <span class="precio-unitario">Valor unitario: $${producto.precio}</span>
    <div>
        <button class="disminuir-cantidad">-</button>
        <span class="cantidad">1</span>
        <button class="aumentar-cantidad">+</button>
    </div>
    <button class="eliminar-producto">X</button>
    `;
        carritoContainer.appendChild(carritoItem);
  // Agregar event listeners para los botones de aumentar y disminuir cantidad y eliminar producto
        carritoItem.querySelector('.aumentar-cantidad').addEventListener('click', () => aumentarCantidad(producto.id));
        carritoItem.querySelector('.disminuir-cantidad').addEventListener('click', () => disminuirCantidad(producto.id));
        carritoItem.querySelector('.eliminar-producto').addEventListener('click', () => {eliminarProducto(producto.id, carritoItem);}); 
}
        
function aumentarCantidad(id) { // Función para aumentar la cantidad de un producto en el carrito
    
    const itemCarrito = carrito.find((item) => item.id === id); // Busca el ítem del carrito con el ID proporcionado  
    if (itemCarrito) { // Si se encuentra el ítem, incrementa su cantidad
            itemCarrito.cantidad += 1;
                if (itemCarrito.cantidad < 1) {
            eliminarProducto(id);
        } 
        actualizarCarritoEnInterfaz();
        actualizarTotalCarrito();
    }
}    

function disminuirCantidad(id) { // Función para disminuir la cantidad de un producto en el carrito
        
        const itemCarrito = carrito.find((item) => item.id === id); // Busca el ítem del carrito con el ID proporcionado
        if (itemCarrito && itemCarrito.cantidad > 1) { // Si se encuentra el ítem y su cantidad es mayor a 1, decrementa su cantidad
            itemCarrito.cantidad--;   
            actualizarTotalCarrito();
            actualizarCarritoEnInterfaz();// Actualiza el total del carrito
        }
}
    
function eliminarProducto(id, carritoItem) { // Función para eliminar un producto del carrito 

    if (!carritoItem) { // Si el elemento HTML no se encuentra como parámetro, busca el elemento correspondiente en el DOM
        carritoItem = carritoContainer.querySelector(`[data-id="${id}"]`);
    }
    const index = carrito.findIndex((item) => item.id === id); // Encuentra el índice del ítem del carrito con el ID proporcionado
    if (index !== -1) { // Si se encuentra el ítem, elimínalo del array del carrito y de la interfaz gráfica
        carrito.splice(index, 1);
        carritoContainer.removeChild(carritoItem);
        mostrarTotalYPedido();
        actualizarTotalCarrito(); // Actualiza el total del carrito
        if (carrito.length === 0) { // Si el carrito está vacío, oculta los elementos de "total" y "hacer pedido"
            carritoTotalElement.classList.add("oculto");
            if (hacerPedidoElement) {
            hacerPedidoElement.classList.add("oculto-boton");
        }
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
        else {
        console.error("El objeto carrito[index] es undefined");
    }
}

function actualizarTotalCarrito() { // Función para actualizar el total del carrito y lo guarda en almacenamiento local
        // Encuentra el elemento HTML que muestra el total del carrito
        const carritoTotalElement = document.querySelector('.carrito-total');
        let total = 0;
    
        // Calcula el total sumando el precio de cada ítem multiplicado por su cantidad
        carrito.forEach((item) => {
            total += item.precio * item.cantidad;
        });
    
        // Actualiza el texto del elemento HTML del total del carrito
        carritoTotalElement.textContent = `Total: $${total}`;

        localStorage.setItem('carrito', JSON.stringify(carrito));

}

function inicializarCarrito() { //Carga los productos del carrito guardado en el almacenamiento local y agrega los productos al carrito en la interfaz.
      const carritoGuardado = localStorage.getItem('carrito'); // Verifica si existe un carrito en el almacenamiento local
      if (carritoGuardado) { // Si existe, convierte el JSON almacenado en un array de objetos JavaScript
            const carritoParseado = JSON.parse(carritoGuardado);
          carrito = carritoParseado; // Asigna el carrito guardado al carrito actual
          carritoParseado.forEach((producto) => { // Agrega cada producto del carrito guardado al carrito en la interfaz
                agregarProductoCarrito(producto);
            });
          carritoContainer.querySelectorAll('.aumentar-cantidad').forEach((btn, index) => {  // Agregar event listeners para los botones de aumentar y disminuir cantidad y eliminar producto
                btn.addEventListener('click', () => aumentarCantidad(carrito[index].id));
            });
            carritoContainer.querySelectorAll('.disminuir-cantidad').forEach((btn, index) => {
                btn.addEventListener('click', () => disminuirCantidad(carrito[index].id));
            });
            carritoContainer.querySelectorAll('.eliminar-producto').forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    if (carrito[index]) {
                        eliminarProducto(carrito[index].id, carritoContainer.querySelector(`[data-id="${carrito[index].id}"]`));
                    }
                });
            });      
          actualizarTotalCarrito(); // Actualiza el total del carrito
          carritoContainer.classList.remove("oculto"); // Mostrar el carrito si tiene elementos
        } else {
          carritoContainer.classList.add("oculto"); // Si no hay elementos en el carrito, ocultarlo
        }
        mostrarTotalYPedido()
}

function mostrarTotalYPedido() { //Muestra u oculta el total y el botón "Hacer pedido" en función de si el carrito tiene elementos o no.
        const total = document.querySelector("#total");
        const carritoTotal = document.querySelector(".carrito-total");
        const hacerPedido = document.querySelector("#hacer-pedido");
        const carritoElement = document.querySelector("#carrito");
        const carritoContainer = document.querySelector("#carrito-container");
        
        if (carrito.length > 0) {
        actualizarTotalCarrito();
        carritoTotal.classList.remove("oculto");
        hacerPedido.classList.remove("oculto");
        carritoElement.classList.remove("oculto");
        carritoContainer.classList.remove("oculto");
        } else {
        carritoTotal.classList.add("oculto");
        hacerPedido.classList.add("oculto");
        carritoElement.classList.add("oculto");
        carritoContainer.classList.add("oculto");
        }
}
    
function actualizarCarritoEnInterfaz() { //Actualiza el carrito en la inte muestra total de pedido.
        carritoContainer.innerHTML = "";
        carrito.forEach((producto) => {
        agregarProductoCarrito(producto);
        });
        actualizarTotalCarrito();
        mostrarTotalYPedido();
}


function mostrarBotonInfo() { // muestra boton
    const botonInfo = this.querySelector('.info-btn');
    if (botonInfo) {
        botonInfo.style.visibility = 'visible';
    }
}

function ocultarBotonInfo() { // esconder boton
    const botonInfo = this.querySelector('.info-btn');
    if (botonInfo) {
        botonInfo.style.visibility = 'hidden';
    }
}

async function mostrarInfoProducto(producto) { // muiestra productos
    const detalles = producto.info_puntuaciones;

    const respuesta = await fetch('./json/productos.json');
    const productos = await respuesta.json();
    const indexProducto = productos.findIndex(p => p.id === producto.id);

  // crea html con la info
    const contenidoHTML = `
        <div class="modal fade" id="infoModal" tabindex="-1" role="dialog" aria-labelledby="infoModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <div class="d-flex align-items-center">
                <img class="img-fluid img-thumbnail" src="${productos[indexProducto].imagen}" alt="${productos[indexProducto].nombre}" style="max-width: 150px;">
                <h2 class="ml-3">${productos[indexProducto].nombre}</h2>
                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <h3>Informacion de medallas:</h3>
                <ul>
                <li>Medallas: ${detalles.medallas} p</li>
                <li>Puntuacion Parker : ${detalles.PuntuacionParker} </li> 
            </div>
        </div>
        </div>
    `;

  // contenido a modal
    const modalExistente = document.querySelector('#infoModal');
    if (modalExistente) {
    modalExistente.remove();
    }

  // agreg html
    document.body.insertAdjacentHTML('beforeend', contenidoHTML);
    
    $('#infoModal').modal('show');
}
    

fetch('./json/productos.json') // actualiza json 
    .then(response => response.json())
    .then(productos => {
    const gridProductos = document.getElementById('grid-productos');
    productos.forEach(producto => {
        gridProductos.appendChild(crearElementoProducto(producto));
    });
    return productos; // retornar los datos de los productos
    })
    .then(producto => {
    console.log(producto); // acceso a los datos de los productos
    })
    .catch(error => console.error('Error al cargar los datos de los productos:', error));


function generarMensajeWhatsApp() {
    
    let mensaje = "¡Hola! Me gustaría hacer un pedido:\n";
    carrito.forEach((producto) => {
        mensaje += `\n* ${producto.nombre} - Cantidad: ${producto.cantidad}`;
    });
    const carritoTotal = carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
    mensaje += `\n\nTotal: $${carritoTotal}`;
    return mensaje;
}
if (hacerPedidoElement) {
    hacerPedidoElement.addEventListener("click", () => {
        const mensaje = encodeURIComponent(generarMensajeWhatsApp());
        const numeroWhatsApp = "2615542322"; // Reemplaza este número por el número de teléfono al que deseas enviar el pedido
        window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, "_blank");
    });
} else {
    console.error('No se encontró el elemento ".hacer-pedido" en el DOM');
}
});    