let botonLeerMas = document.getElementById('botonLeerMas');
let esconderTexto = document.getElementById('esconderTexto');

botonLeerMas.addEventListener('click', alternarTexto);

function alternarTexto() {
    const promesa = new Promise((resolve, reject) => {
        try {
            esconderTexto.classList.toggle('mostrarTexto');
            resolve();
        } catch (error) {
            reject(error);
        }
    });

    async function actualizarBoton() {
        try {
            await promesa;
            botonLeerMas.innerHTML = esconderTexto.classList.contains('mostrarTexto') ? 'Leer menos' : 'Leer más';
        } catch (error) {
            console.log('Ocurrió un error: ' + error);
        }
    }

    actualizarBoton();
}