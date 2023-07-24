
function redireccionVideo(videoUrl, abrirNuevaVentana) {
    abrirNuevaVentana ? window.open(videoUrl) : window.location.href = videoUrl;
    }
    
    const imgAmsterdam = document.getElementById('img-amsterdam');
    imgAmsterdam.addEventListener('click', function () {
        redireccionVideo('https://www.youtube.com/embed/sn9dVPMvk1A', true);
    });
    
    const imgBarcelona = document.getElementById('img-barcelona');
    imgBarcelona.addEventListener('click', function () {
        redireccionVideo('https://www.youtube.com/embed/dk18fAl3SXQ', true);
    });
    
    const imgBerlin = document.getElementById('img-berlin');
    imgBerlin.addEventListener('click', function () {
        redireccionVideo('https://www.youtube.com/embed/l2Bw37WvKbU', true);
    });
    
    const imgRoma = document.getElementById('img-roma');
    imgRoma.addEventListener('click', function () {
        redireccionVideo('https://www.youtube.com/embed/pn_xb5Rav-0', true);
    });
    
    const imgLondres = document.getElementById('img-londres');
    imgLondres.addEventListener('click', function () {
        redireccionVideo('https://www.youtube.com/embed/mE0COXQHJGo', true);
    });
    
    const imgParis = document.getElementById('img-paris');
    imgParis.addEventListener('click', function () {
        redireccionVideo('https://www.youtube.com/embed/_n6GHaADUOc', true);
    });
    
    