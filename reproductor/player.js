class Video{

  constructor(selector){
    this.selector = selector;
    this.playerElement = document.querySelector(selector);
    this.videoElement = document.querySelector(selector + " video");
    this.bindEvents();
  }

bindEvents(){
  this.playPauseBtn = document.querySelector(this.selector + " .play-pause");
  this.showVolumenBtn = document.querySelector(this.selector + " .show-volume");
  this.volumeRange  = document.querySelector(this.selector + " #volume-range");
  this.progressBar = document.querySelector(this.selector + " .bar");
  this.progressConteinerBar = document.querySelector(this.selector + " .progress");
  this.fullSreenBtn = document.querySelector(this.selector + " .set-full-screen");
  this.showSpeedBtn = document.querySelector(this.selector + " .show-speed");
  this.playBackRateBtns = document.querySelectorAll(this.selector + " .playBackRate");

  this.playPauseBtn.addEventListener('click',()=>this.playPause());
  this.showVolumenBtn.addEventListener('click',()=>this.toggleVolume());
  this.volumeRange.addEventListener('input',()=>this.updateVolume());
  this.videoElement.addEventListener('timeupdate',()=>this.updateProgress());
  this.videoElement.addEventListener('durationchange',()=>this.setFullDuration());
  this.fullSreenBtn.addEventListener('click',()=>this.setFullScreen());
  this.showSpeedBtn.addEventListener('click',()=>this.toggleSpeed());
  this.progressConteinerBar.addEventListener('click',(ev)=>this.setDuration(ev));
  this.playBackRateBtns.forEach((el)=>{ //recorre los elementos como arreglos
    el.addEventListener('click',()=> this.setPlayBackRate(el));
  });
}

setDuration(ev){
  let el = ev.currentTarget;
  let position = this.getCoodinadas(ev,el);
  let fullWidth = el.offsetWidth;
  let porcentaje = position.x / fullWidth;

  let time = this.videoElement.duration * porcentaje;
  this.videoElement.currentTime = time;

  console.log(time);
}

setPlayBackRate(el){
  let speed = parseFloat(el.dataset.value);
  this.videoElement.playBackRate = speed;
  this.toggleSpeed();
}

playPause(){
  if(this.videoElement.paused){
    this.playPauseBtn.innerHTML = "pause";
    this.videoElement.play();
  }else{
    this.videoElement.pause();
    this.playPauseBtn.innerHTML = "play_arrow";

  }
}

toggleVolume(){
  document.querySelector(this.selector + " .volume").classList.toggle('active');
}

toggleSpeed(){
  document.querySelector(this.selector + " .speed").classList.toggle('active');
}

updateVolume(){
  if(this.volumeRange.value == 0){
    this.showVolumenBtn.innerHTML = "volume_mute";
  }else if (this.volumeRange.value < 0.5){
    this.showVolumenBtn.innerHTML = "volume_down";
  }
    this.videoElement.volume = this.volumeRange.value;
  }

updateProgress(){
    let currentTime = this.videoElement.currentTime;
    let fullTime = this.videoElement.duration;
    this.setTime(currentTime,".current-duration");
    let porcentaje = Math.floor((currentTime * 100) / fullTime);
    this.progressBar.style.width = porcentaje + "%";
  }

setFullDuration(){
  this.setTime(this.videoElement.duration,".full-duration");
}

setTime(duracion,selector){
    let minutos = parseInt(duracion / 60, 10);
    let segundos = parseInt(duracion % 60);

    minutos = (minutos < 10 ) ? "0"+minutos : minutos;
    segundos = (segundos < 10 ) ? "0"+segundos : segundos;

    document.querySelector(this.selector + " "+selector).innerHTML = minutos+":"+segundos;
}

setFullScreen(){
  this.videoElement.webkitRequestFullScreen();
}

getCoodinadas(e, container){
  let pos = {}, offset = {}, ref;
  ref = container.offsetParent;

  pos.x = !! e.touches ? e.touches[ 0 ].pageX : e.pageX;
  pos.y = !! e.touches ? e.touches[ 0 ].pageY : e.pageY;

  offset.left = container.offsetLeft;
  offset.top = container.offsetTop;
      while(ref) {
        offset.left += ref.offsetLeft;
        offset.top += ref.offsetTop;
        ref = ref.offsetParent;
      }
  return {
      x : pos.x - offset.left,
      y : pos.y - offset.top,
    };
}


}
