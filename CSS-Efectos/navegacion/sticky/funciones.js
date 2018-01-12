(function() {

  let pinged = false; //iniciamos la bandera en falso indicando que aun no se a llegado al header
  let nav = document.querySelector(".nav"); //obtenermos el selector .nav
  let stickyScrollPoint = document.querySelector(".hero-image").offsetHeight; //Obtiene el height de un div header

  function pingToTop() { //Este metodo pone en posicion Top al nav
    if (pinged) return; // Si pinged es falso return sino ingresa
    nav.classList.add("pined"); //crea la clase pined al nav para ubicarlo en el top
    pinged = true; //pone el pinged en verdadero indicando que el menu esta arriba
  }

  function removePingToTop() { //Este metodo pone en posicion Actual al nav
    if (!pinged) return; // Si pinged es verdadero return sino ingresa
    nav.classList.remove("pined"); //remueve la clase pined al nav para ubicarlo en el actual
    pinged = false; //pone el pinged en falso indicando que el menu esta en su posicion actual
  }

  window.addEventListener('scroll', function(ev) { //obtiene el evento del scroll
    let coords = nav.getBoundingClientRect(); //devuelve el tamaño de un elemento y su posición relativa respecto a la ventana de visualización
    if (window.scrollY < stickyScrollPoint) return removePingToTop(); //si el evento scroll es menor a lo que mide la imagen remueve el nav
    if (coords.top <= 0) return pingToTop(); //si las coordenas en top son menores a 0 pone el nav arriba como encabezado

  })

})();