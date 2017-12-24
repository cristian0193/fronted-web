let video = document.getElementById('video');


const constraints = {
  audio: {
    echoCancellation: false
  },
  video: {
    framerate: {
      ideal: 10
    },
    facingMode: "user"
  }
}

navigator.mediaDevices.getUserMedia(constraints)
  .then(strem => {
    video.srcObject = strem;
  }).catch(error => console.log(error));