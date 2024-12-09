document.addEventListener('DOMContentLoaded', () => {
    // Inicializar mostrando la sección "collares" por defecto
    mostrarSeccion('collares');

    // Obtenemos todos los botones "Agregar"
    const botonesAgregar = document.querySelectorAll('.producto button');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', (event) => {
            const producto = event.target.closest('.producto');
            const nombre = producto.querySelector('p').textContent.trim();
            const precio = parseFloat(producto.querySelector('.precio').textContent.replace(/[^0-9.-]+/g, ""));
            const cantidad = parseInt(producto.querySelector('input[type="number"]').value);

            // Verificar que la cantidad sea válida
            if (cantidad > 0) {
                agregarAlCarrito(nombre, precio, cantidad);
            } else {
                alert('Por favor ingrese una cantidad válida mayor a 0.');
            }
        });
    });

    // Cargar el carrito desde localStorage si existe
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    actualizarCarrito();
});

function mostrarSeccion(seccionId) {
    // Ocultar todas las secciones
    const secciones = document.querySelectorAll('.seccion');
    secciones.forEach(seccion => {
        seccion.style.display = 'none';
    });

    // Mostrar la sección seleccionada
    const seccionActiva = document.getElementById(seccionId);
    if (seccionActiva) {
        seccionActiva.style.display = 'block';
    }

    // Actualizar el menú activo
    const enlaces = document.querySelectorAll('nav ul li a');
    enlaces.forEach(enlace => enlace.classList.remove('active'));

    const enlaceActivo = document.querySelector(`a[onclick="mostrarSeccion('${seccionId}')"]`);
    if (enlaceActivo) {
        enlaceActivo.classList.add('active');
    }
}

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio, cantidad) {
    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(p => p.nombre === nombre);
    if (productoExistente) {
        productoExistente.cantidad += cantidad;
    } else {
        carrito.push({ nombre, precio, cantidad });
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizar la visualización del carrito
    actualizarCarrito();
}

// Actualizar el carrito (cantidad y lista)
function actualizarCarrito() {
    const contadorCarrito = document.getElementById('cantidad-carrito');
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total-carrito');

    // Actualizar cantidad total en el carrito
    let totalCantidad = 0;
    let totalPrecio = 0;

    listaCarrito.innerHTML = '';
    carrito.forEach(producto => {
        totalCantidad += producto.cantidad;
        totalPrecio += producto.cantidad * producto.precio;

        const li = document.createElement('li');
        li.innerText = `${producto.nombre} - ${producto.cantidad} x ${producto.precio.toLocaleString()} COP`;
        listaCarrito.appendChild(li);
    });

    if (contadorCarrito) {
        contadorCarrito.innerText = totalCantidad;
    }
    if (totalCarrito) {
        totalCarrito.innerText = `Total: ${totalPrecio.toLocaleString()} COP`;
    }
}

// Función para abrir el carrito
function abrirCarrito() {
    const modalCarrito = document.getElementById('modal-carrito');
    if (modalCarrito) {
        modalCarrito.style.display = 'block';
    }
}

// Función para cerrar el carrito
function cerrarCarrito() {
    const modalCarrito = document.getElementById('modal-carrito');
    if (modalCarrito) {
        modalCarrito.style.display = 'none';
    }
}

// Función para finalizar la compra
function finalizarCompra() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío.');
        return;
    }

    alert('Compra finalizada. ¡Gracias por tu compra!');
    carrito = []; // Vaciar carrito

    // Actualizar localStorage y carrito visualmente
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
    cerrarCarrito();
}
