class IndexForSiblingss {
  static get(el) { // este metodo obtiene el hijo segun el click que se haga en uno de los elementos
    let children = el.parentNode.children;

    for (var i = 0; i < children.length; i++) {
      let child = children[i];
      if (child == el) {
        return i;
      }
    }
  }
}


class Slider {

  constructor(selector, movimiento = true) {
    this.move = this.move.bind(this); //mueve el slider
    this.moveByButton = this.moveByButton.bind(this); //captura el evento del boton seleccionado
    this.slider = document.querySelector(selector); //obtiene el selector del slider (div)
    this.itemsCount = this.slider.querySelectorAll(".container > *").length; //obtiene todos los item dentro del slider
    this.movimiento = movimiento;
    this.interval = null;
    this.contador = 0; //contador para aumentar segun la cantidad de iteraciones
    this.start(); //Inicia el Slider de manera automatica
    this.buildControls(); //animacion para el indicador de los botones
    this.buildEvents(); //control para click sobre los controles
  }

  start() {
    if (!this.movimiento) return;
    this.interval = window.setInterval(this.move, 3000); //ejecuta la funcin move cada 3 segundos
  }

  restart() {
    if (this.interval) {
      window.clearInterval(this.interval); //limpia el intervalor
      this.start(); //inicia nuevamente la simulacion o animacion
    }
  }

  buildControls() {
    for (var i = 0; i < this.itemsCount; i++) { // recorre los elementos encontrados en el slider
      let control = document.createElement("li"); //crea nuevos hijos dependiendo la cantidad de imagenes
      if (i == 0) {
        control.classList.add("active"); //pone activo el primer indicador de los controles
      }
      this.slider.querySelector(".controls ul").appendChild(control); //se le agregan los controles li al ul

    }
  }

  move() {

    this.contador++;
    if (this.contador > this.itemsCount - 1) {
      this.contador = 0;
    }
    this.moveTo(this.contador);
  }

  resetIndicador() {
    this.slider.querySelectorAll(".controls li.active")
      .forEach(item => item.classList.remove("active")); //obtiene todos los elementos li activos y les elimina la clase
  }

  moveTo(index) {
    let left = index * 100; //aumenta el index * 100 para permitir iterarlos
    this.resetIndicador(); //limpia las clases con active
    this.slider.querySelector(".controls li:nth-child(" + (index + 1) + ")").classList.add("active"); //adiciona la case active a indicar actual de la imagen
    this.slider.querySelector(".container").style.left = "-" + left + "%"; //permite pasar las imagenes una despues de la otra
  }

  buildEvents() {
    this.slider.querySelectorAll(".controls li")
      .forEach(item => {
        item.addEventListener("click", this.moveByButton) //recorre todos los botones en li para escuchar el evento click
      });
  }

  moveByButton(ev) {
    let index = IndexForSiblingss.get(ev.currentTarget); //obtiene el index del elemento clickeado
    this.contador = index; //pasa al contador el index  obtenido para que la animacion no se pierda
    this.moveTo(index); //pasa el indicen para que se inicie la animacion desde esa posicion
    this.restart(); //resetea o limpia el intervalo
  }

}

(function() {
  new Slider(".slider", true); //instancia la clase
})();