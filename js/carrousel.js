const carousel = document.querySelector('.carousel');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let index = 0;
const anchoFoto = carousel.querySelector('.carousel-item').clientWidth;
const cuentaDeFotos = carousel.querySelectorAll('.carousel-item').length;

prevButton.addEventListener('click', () => {
    index = Math.max(index - 1, 0);
    carousel.style.transform = `translateX(-${index * anchoFoto}px)`;
});

nextButton.addEventListener('click', () => {
    index = Math.min(index + 1, cuentaDeFotos - 1);
    carousel.style.transform = `translateX(-${index * anchoFoto}px)`;
});

window.addEventListener('resize', () => {
    const newAnchoFoto = carousel.querySelector('.carousel-item').clientWidth;
    if (newAnchoFoto !== anchoFoto) {
        anchoFoto = newAnchoFoto;
        carousel.style.transform = `translateX(-${index * anchoFoto}px)`;
    }
});