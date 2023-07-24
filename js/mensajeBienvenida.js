function mostrarMensajeBienvenida() {
    return new Promise((resolve, reject) => {
        const usuarioInput = document.getElementById("usuario");
        const mensajeBienvenida = document.createElement("p");
        mensajeBienvenida.classList.add("mensaje-bienvenida");
        const encabezado = document.getElementsByTagName("header")[0];
        const imagenUsuario = document.createElement("img");
        imagenUsuario.classList.add("imagen-usuario");
        encabezado.appendChild(imagenUsuario);

        const inputFoto = document.getElementById("foto");
        inputFoto.addEventListener("change", (event) => {
            const imagenSeleccionada = event.target.files[0];
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                imagenUsuario.setAttribute("src", reader.result);

                localStorage.setItem("imagenUsuario", reader.result);
            });
            reader.readAsDataURL(imagenSeleccionada);
        });

        usuarioInput.addEventListener("input", () => {
            if (usuarioInput.value) {
                mensajeBienvenida.textContent = `Bienvenido(a), ${usuarioInput.value}!`;
                encabezado.appendChild(mensajeBienvenida);

                localStorage.setItem("mensajeBienvenida", mensajeBienvenida.textContent);
                resolve();
            } else {
                reject("El campo de usuario está vacío");
            }
        });
    });
}

mostrarMensajeBienvenida().then(() => {
    console.log("Mensaje de bienvenida mostrado correctamente");

}).catch((error) => {
    console.log("Error al mostrar el mensaje de bienvenida:", error);

}); 
