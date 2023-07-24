// Autenticar contraseña 
const maxIntentos = 3;
let intentos = 0;
const psw = document.getElementById("psw");
const mensaje = document.getElementById("mensaje");

//Creo elementos seleccionables para Ciudades y lo traigo de un JSON
const tituloCiudad = document.getElementById('ciudades');
const ciudadSelect = document.createElement('select');
const url = "/js/ciudades.json"
let ciudades = [];


function obtenerCiudades(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    reject(new Error('La respuesta de la red no fue exitosa'));
                }
                resolve(response.json());
            })
            .catch(error => {
                reject(error);
            });
    });
}

obtenerCiudades(url)
    .then(data => {
        ciudades = data;
        cargarCiudades(ciudades);
    })
    .catch(error => {
        console.error('Hubo un problema con la operación de fetch:', error);
    });

function cargarCiudades(ciudades) {
    ciudades.forEach(ciudad => {
        const option = document.createElement('option');
        option.text = `${ciudad.ciudad}`;
        ciudadSelect.appendChild(option);
    });
    tituloCiudad.appendChild(ciudadSelect);
    ciudadSelect.style.display = 'block';
    ciudadSelect.style.margin = '0 auto';
}


document.getElementById("submitBtn").addEventListener("click", function () {
    window.location.assign("sub-pages/ciudades.html");

});


const contenedorImagen = document.createElement('div');
tituloCiudad.appendChild(contenedorImagen);

ciudadSelect.addEventListener('change', function () {
    const imagen = document.createElement('img');
    contenedorImagen.innerHTML = `<img class="imagen-atractiva" src="assets/img-inicio/${ciudadSelect.value}.jpg"/>`;
    contenedorImagen.appendChild(imagen);
});


psw.addEventListener("submit", function (event) {
    event.preventDefault(); 
    const pswUsuario = psw.password.value;
    const pswAutenticada = sessionStorage.getItem('password')
    if (pswUsuario === pswAutenticada) {
        swal.fire({
            title: "¡Contraseña correcta!",
            text: "Proceda a cotizar viajes",
            icon: "success",
            customClass: {
                icon: 'swal2-icon-custom',
                background: 'swal2-popup'
            }
        });


        const incremEstadia = (dias) => {
            return dias >= 1 && dias <= 7 ? 0.4
                : dias >= 8 && dias <= 14 ? 0.3
                    : dias >= 15 && dias <= 21 ? 0.2
                        : dias >= 22 && dias <= 28 ? 0.1
                            : 0;
        }


        let carrito = [];
        const agregarCarrito = () => {
            const ciudad = ciudadSelect.value;
            const usuario = document.getElementById("usuario").value
            const pasajeros = document.getElementById("pasajeros").value;
            const dias = document.getElementById("dias").value;
            const tarifa = ciudades.find((c) => c.ciudad === ciudad).tarifa;
            const precios = tarifa * pasajeros;
            const incrementos = incremEstadia(dias);
            const total = precios * (1 + incrementos);
            const item = { usuario, ciudad, pasajeros, dias, precios, incrementos, total };
            carrito.push(item);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            updatecarrito();
        };

        const updatecarrito = () => {
            const carritoDiv = document.getElementById("carrito");
            const table = carrito.reduce((acumulado, item) => {
                const fila = `<tr><td>${item.usuario}</td><td>${item.ciudad}</td><td>${item.pasajeros}</td><td>${item.dias}</td><td>$${item.precios.toLocaleString('es-AR')}</td><td>${item.incrementos * 100}%</td><td>$${item.total.toLocaleString('es-AR')}</td><td><button class="eliminar-ciudad" data-ciudad="${item.ciudad}">Borrar</button></td></tr>`;
                return acumulado + fila;
            }, "<table><tr><th>Usuario</th><th>Ciudad</th><th>Pasajeros</th><th>Días de estancia</th><th>Precio base</th><th>Incremento</th><th>Total</th><th></th></tr>");
            const totalprecios = carrito.reduce((acumulado, item) => acumulado + item.total, 0);
            const tablaConTotal = `${table}<tr><td></td><td></td><td></td><td></td><td></td><td></td><td><strong style="font-size:larger;color: blue;">Total general:</strong><span style="color: blue;"> $${totalprecios.toLocaleString('es-AR')}</td></tr></table>`;
            carritoDiv.innerHTML = tablaConTotal;
        };

        const comprarCarrito = () => {
            const botonComprar = document.getElementById("comprar");
            updatecarrito();
            if (carrito.length > 0) {
                botonComprar.addEventListener("click", function () {
                    mostrarMensajeDeAgradecimiento()
                        .then(redirigirAPagos)
                        .catch((error) => console.log(error));
                });
            } else {
                botonComprar.addEventListener("click", function () {
                    mostrarMensajeDeError()
                        .catch((error) => console.log(error));
                });
            }
        };
        const mostrarMensajeDeAgradecimiento = () => {
            return new Promise((resolve, reject) => {
                Swal.fire({
                    icon: 'success',
                    title: '¡Gracias por su cotización!',
                    html: 'Será redirigido a nuestra plataforma de pagos',
                    footer: 'Aceptamos Visa, Mastercard y American Express',
                    confirmButtonText: 'Aceptar',
                    showCancelButton: true,
                    cancelButtonText: 'Cancelar',
                    iconHtml: '<img src="icon-256x256.png" style="width: 80px; height: 80px; border: none;">',
                    customClass: {
                        icon: 'swal2-icon-custom',
                        background: 'swal2-popup'
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        resolve();
                    } else {
                        reject();
                    }
                }).catch((error) => {
                    console.error('Ocurrió un error:', error);
                    reject();
                });
            });
        };

        const redirigirAPagos = () => {
            return new Promise((resolve, reject) => {
                try {
                    window.location.href = 'https://www.mercadopago.com.ar';
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        };

        const mostrarMensajeDeError = () => {
            return new Promise((resolve, reject) => {
                Swal.fire({
                    icon: 'warning',
                    title: 'Error!',
                    text: 'Tu carrito está vacío',
                    confirmButtonText: 'Aceptar',
                    customClass: {
                        icon: 'swal2-icon-custom',
                        background: 'swal2-popup'
                    }
                }).then(() => {
                    resolve();

                }).catch((error) => {
                    reject(error);

                });
            });
        };


        const finalizarCarrito = () => {
            carrito = [];
            localStorage.removeItem("carrito");
            updatecarrito();

            Toastify({
                text: "La cotización ha sido finalizada exitosamente.",
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                duration: 3000,
                style: {
                    font: "bold 24px 'Helvetica Neue', sans-serif"
                }
            }).showToast();
        };

        document.getElementById("agregar").addEventListener("click", agregarCarrito);
        document.getElementById("resetear").addEventListener("click", () => {
            Toastify({
                text: "¿Estás seguro de que deseas finalizar la cotización?",
                backgroundColor: "linear-gradient(to right, #ff6e7f, #bfe9ff)",
                style: {
                    font: "bold 24px 'Helvetica Neue', sans-serif"
                },
                duration: 5000,
                close: true,
                gravity: "top",
                position: "center",
                stopOnFocus: true,
                onClick: function () {
                    finalizarCarrito();
                }
            }).showToast();
        });
        document.getElementById("comprar").addEventListener("click", comprarCarrito);


        document.addEventListener("click", (event) => {
            if (event.target.classList.contains("eliminar-ciudad")) {
                const ciudad = event.target.dataset.ciudad; 
                Swal.fire({
                    title: '¿Estás seguro?',
                    text: `¿Deseas eliminar la ciudad ${ciudad}?`,
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, eliminar',
                    cancelButtonText: 'Cancelar',
                    customClass: {
                        icon: 'swal2-icon-custom',
                        background: 'swal2-popup'
                    }
                }).then((result) => {
                    if (result.isConfirmed) {

                        carrito = carrito.filter((item) => item.ciudad !== ciudad);
                        localStorage.setItem("carrito", JSON.stringify(carrito));
                        updatecarrito();
                        Swal.fire(
                            '¡Eliminado!',
                            `La ciudad ${ciudad} ha sido eliminada del carrito.`,
                            'success'
                        )
                    }
                })
            }
        });


        const carritoGuardado = localStorage.getItem("carrito");
        if (carritoGuardado) {
            carrito = JSON.parse(carritoGuardado);
            updatecarrito();
        }


    } else {
        intentos++;
        if (intentos < maxIntentos) {
            swal.fire({
                title: "¡Contraseña incorrecta!",
                text: `Le quedan ${maxIntentos - intentos} intentos.`,
                icon: "error",
                customClass: {
                    icon: 'swal2-icon-custom',
                    background: 'swal2-popup'
                }
            });
        } else {
            swal.fire({
                title: "¡Acceso bloqueado!",
                text: "Ha excedido el número máximo de intentos.",
                icon: "warning",
                customClass: {
                    icon: 'swal2-icon-custom',
                    background: 'swal2-popup'
                }
            });
            psw.password.disabled = true; 
            psw.querySelector("button[type=submit]").disabled = true; 
        }
    }
});

