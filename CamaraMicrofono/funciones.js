let video = document.getElementById('video');
let selectTag = document.getElementById('camera-selector');
let canvas = document.getElementById('canvas');
let contexto = canvas.getContext('2d');
let bigotes = document.getElementById('bigote');
let gafas = new Image();
let bigote = new Image();
let imageLoaded = false;
const ctracker = new clm.tracker(); //libreria o proyecto para la deteccion de rostro
ctracker.init(pModel); // modelo de la libreria para deteccion de rostro

console.log(bigote);
gafas.src = "gafas.png";

gafas.onload = function() {
  imageLoaded = true;
}

navigator.mediaDevices.enumerateDevices().then(devices => {
  devices.forEach(device => {


    if (device.kind != "videoinput") return; //filtra los dispositivos diferentes a video

    // este codigo se carga a la lista desplegable los dispotivos filtrador iguales a video.
    let optionTag = document.createElement("option");
    console.log(device.label);
    optionTag.innerHTML = device.label;
    optionTag.value = device.deviceId;
    selectTag.appendChild(optionTag);

  });
});

selectTag.addEventListener('change', function(ev) {
  let deviceId = this.options[this.selectedIndex].value; //cuando es seleccionado un dispositivo de la lista lo carga.
  start(deviceId); // inicia el dispositivo seleccinado por medio de su ID.
});

function start(deviceId = undefined) {
  const constraints = { //Condiciones para nuestros dispositivos audio y video
    video: {
      deviceId: deviceId
    }
  }

  navigator.mediaDevices.getUserMedia(constraints)
    .then(strem => {
      video.srcObject = strem;
      setTimeout(function() {
        ctracker.start(video); // se inicia la libreria una vez el video es cargado en el stream.
        requestAnimationFrame(loop);
      }, 500);
    }).catch(error => console.log(error));
}

function drawImageRealTime(imagen, position, modificarAncho, modificarAlto) {
  console.log(position);

  if (!position.x.init || !position.x.final || !position.y.init || !position.y.final)
    return;

  const x1 = position.x.init[0] - modificarAncho;
  const x2 = position.x.final[0] + modificarAncho;

  const y1 = position.y.init[1] - modificarAlto;
  const y2 = position.y.final[1] + modificarAlto;

  let width = x2 - x1;
  let height = y2 - y1;

  contexto.drawImage(imagen, x1, y1, width, height);

}

function loop() { //esta funcion constante mente esta leyendo el video.
  contexto.drawImage(video, 0, 0, 800, 600);
  //ctracker.draw(canvas); // carga la libreria las guias para deteccion de rostro

  let positions = ctracker.getCurrentPosition();

  if (imageLoaded)
    drawImageRealTime(gafas, {
      x: {
        init: positions[0],
        final: positions[14]
      },
      y: {
        init: positions[33],
        final: positions[41]
      }
    }, 0, 15)

  drawImageRealTime(bigotes, {
    x: {
      init: positions[44],
      final: positions[50]
    },
    y: {
      init: positions[37],
      final: positions[60]
    }
  }, 50, 40)

  requestAnimationFrame(loop);
}

start();