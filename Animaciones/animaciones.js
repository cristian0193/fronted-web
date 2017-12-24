document.getElementById('open').addEventListener('click', function(ev) {
  ev.preventDefault();
  open();
});

function open() {
  frame(5, 5);
}

function frame(width, height) {
  if (width > 300 && height > 90) return;

  let el = document.getElementById('element');

  el.style.width = width + "px";
  el.style.height = height + "px";

  requestAnimationFrame(function() {
    frame(width + 5, height + 5);
  });
}

//Animaciones de figuras

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let rectangulo = {
  x: 0,
  y: 0
}

function drawRectangulo() {
  ctx.fillRect(rectangulo.x, rectangulo.y, 100, 100);
}

function clean() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

document.addEventListener('keydown', function(ev) {
  if (ev.keyCode == 38) //identifica el codigo de la fecha que se presiona.
    rectangulo.y -= 5; // se le resta al eje Y cada vez que se presione.
  if (ev.keyCode == 40)
    rectangulo.y += 5;
  if (ev.keyCode == 37)
    rectangulo.x -= 5;
  if (ev.keyCode == 39)
    rectangulo.x += 5;

  clean();
  drawRectangulo();
});

drawRectangulo();