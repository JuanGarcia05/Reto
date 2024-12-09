// Recupera el carrito desde el localStorage o crea uno vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Selecciona todos los botones "Agregar al carrito"
const botonesAgregar = document.querySelectorAll(".agregar");

// Contenedor donde se mostrará el carrito
const contenidoCarrito = document.getElementById("contenido-carrito");

// Función para actualizar y mostrar el carrito
function mostrarCarrito() {
  contenidoCarrito.innerHTML = ""; // Limpia el contenido previo

  if (carrito.length === 0) {
    contenidoCarrito.innerHTML = "<p>El carrito está vacío.</p>";
  } else {
    carrito.forEach(producto => {
      const productoHTML = document.createElement("div");
      productoHTML.innerHTML = `
        <p>${producto.nombre} - Precio: $${producto.precio} - Cantidad: ${producto.cantidad}</p>
      `;
      contenidoCarrito.appendChild(productoHTML);
    });
  }
}

// Función para agregar productos al carrito
botonesAgregar.forEach(boton => {
  boton.addEventListener("click", () => {
    const productoId = boton.getAttribute("data-id");
    const productoNombre = boton.getAttribute("data-nombre");
    const productoPrecio = parseFloat(boton.getAttribute("data-precio"));

    // Verifica si el producto ya existe en el carrito
    const productoExistente = carrito.find(item => item.id === productoId);

    if (productoExistente) {
      // Si ya existe, incrementa la cantidad
      productoExistente.cantidad++;
    } else {
      // Si no existe, lo agrega al carrito
      carrito.push({
        id: productoId,
        nombre: productoNombre,
        precio: productoPrecio,
        cantidad: 1
      });
    }

    // Actualiza el localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Actualiza la vista del carrito
    mostrarCarrito();

    alert(`¡${productoNombre} agregado al carrito!`);
  });
});

// Muestra el carrito al cargar la página
mostrarCarrito();
