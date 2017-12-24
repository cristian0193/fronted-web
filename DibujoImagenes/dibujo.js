const canvas = document.getElementById('canvas');
const contexto = canvas.getContext('2d');

let image = new Image();

//image.src = "http://codigofacilito.com/system/badges/avatars/000/000/006/thumb/ruby-medium.png";
image.src = "./goku2.jpg";

image.onload = function() {
  console.log('Imagen descargada');

  //contexto.drawImage(this, 20, 20); //Dibuja la imagen.
  contexto.drawImage(this, 0, 0); //Recorta la imagen

  convertirBlancoNegro();

}

function convertirBlancoNegro() {

  let imageData = contexto.getImageData(0, 0, canvas.width, canvas.height);
  let pixeles = imageData.data;

  console.log('Inicie la conversion');


  for (let i = 0; i < pixeles.length; i += 4) {
    const pixel = {
      r: pixeles[i],
      g: pixeles[i + 1],
      b: pixeles[i + 2],
      a: pixeles[i + 3]
    };

    console.log('r: ' + pixel.r + 'g: ' + pixel.g + 'b: ' + pixel.b);
    const average = (pixel.r, pixel.g, pixel.b) / 1;

    pixeles[i] = average;
    pixeles[i + 1] = average;
    pixeles[i + 2] = average;

  }
  contexto.putImageData(imageData, 0, 0);
  console.log('Finalice la conversion');

}