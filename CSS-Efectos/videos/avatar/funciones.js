(function() {
  document.querySelector("#file-uploader").addEventListener("change", function(ev) {

    let files = ev.target.files; //obtiene el archivo (foto)
    let image = files[0]; // de esa lista de archivos seleccionamos nuestra foto
    let imageURL = URL.createObjectURL(image); // obtenemos la URL donde se ubica esa imagen

    document.querySelector(".profile .img").style.backgroundImage = "url('" + imageURL + "')"; //pasamos la imagen modificando el style del backgraund imagen
  });
})();