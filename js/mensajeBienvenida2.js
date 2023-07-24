const imagenUsuario = localStorage.getItem("imagenUsuario");
const mensajeBienvenida = localStorage.getItem("mensajeBienvenida");

if (imagenUsuario) {
    const imagen = document.createElement("img");
    imagen.classList.add("imagen-usuario");
    imagen.setAttribute("src", imagenUsuario);
    const encabezado = document.getElementsByTagName("header")[0]; 
    encabezado.appendChild(imagen);
}

if (mensajeBienvenida) {
    const mensaje = document.createElement("p");
    mensaje.classList.add("mensaje-bienvenida");
    mensaje.textContent = mensajeBienvenida;
    const encabezado = document.getElementsByTagName("header")[0];
    encabezado.appendChild(mensaje);
}
    