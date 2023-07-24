const sliderModo = document.getElementById('slider');

const elementosModoOscuro = document.querySelectorAll('.contenido div');

function cambiarModo() {
    if (sliderModo.value == 1) {
        document.body.classList.add('modoOscuro');
        elementosModoOscuro.forEach(elemento => {
            elemento.classList.add('modoOscuro');
        });
        localStorage.setItem('modo', 'oscuro');
    } else {
        document.body.classList.remove('modoOscuro');
        elementosModoOscuro.forEach(elemento => {
            elemento.classList.remove('modoOscuro');
        });
        localStorage.setItem('modo', 'claro');
    }
}

if (localStorage.getItem('modo') === 'oscuro') {
    document.body.classList.add('modoOscuro');
    sliderModo.value = 1;
    elementosModoOscuro.forEach(elemento => {
        elemento.classList.add('modoOscuro');
    });
} else {
    document.body.classList.remove('modoOscuro');
    sliderModo.value = 0;
    elementosModoOscuro.forEach(elemento => {
        elemento.classList.remove('modoOscuro');
    });
}

sliderModo.addEventListener('input', cambiarModo);
