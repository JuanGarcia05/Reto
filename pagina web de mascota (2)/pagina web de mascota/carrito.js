// Selecciona todos los botones "Agregar"
const botonesAgregar = document.querySelectorAll(".agregar");

// Recupera el carrito del localStorage o crea uno vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Agrega un evento a cada botón
botonesAgregar.forEach(boton => {
  boton.addEventListener("click", () => {
    // Extrae los datos del producto desde el botón
    const producto = {
      id: boton.getAttribute("data-id"),
      nombre: boton.getAttribute("data-nombre"),
      precio: parseFloat(boton.getAttribute("data-precio")),
      cantidad: 1
    };

    // Verifica si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.id === producto.id);

    if (productoExistente) {
      // Si ya está, incrementa la cantidad
      productoExistente.cantidad++;
    } else {
      // Si no está, agrégalo al carrito
      carrito.push(producto);
    }

    // Guarda el carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert(`¡${producto.nombre} agregado al carrito!`);
  });
});

// Funcionalidad para mostrar el carrito
const botonVerCarrito = document.getElementById("ver-carrito");
const contenidoCarrito = document.getElementById("contenido-carrito");

botonVerCarrito.addEventListener("click", () => {
  // Recupera el carrito del localStorage
  const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];

  // Limpia el contenido previo
  contenidoCarrito.innerHTML = "";

  if (carritoGuardado.length === 0) {
    contenidoCarrito.innerHTML = "<p>El carrito está vacío.</p>";
  } else {
    // Muestra los productos
    carritoGuardado.forEach(producto => {
      const productoHTML = document.createElement("div");
      productoHTML.innerHTML = `
        <p>${producto.nombre} - Precio: $${producto.precio} - Cantidad: ${producto.cantidad}</p>
      `;
      contenidoCarrito.appendChild(productoHTML);
    });
  }
});
