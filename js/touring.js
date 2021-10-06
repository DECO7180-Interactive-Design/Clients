const whole = document.querySelector('.container')
const music = document.querySelector('.music')
const playBtn =document.querySelector('#play')
const prevBtn =document.querySelector('#prev')
const nextBtn =document.querySelector('#next')
const title = document.querySelector('#title')
const audio = document.querySelector('#audio')
const songs = ['Levitating', 'I Feel It Coming', 'Blinding Lights','bensound-betterdays',
'bensound-dubstep','bensound-energy','bensound-epic','bensound-sunny','bensound-tenderness']
const rest = document.querySelector('#pauseRiding')
const hideBtn = document.querySelector('.hideAll')
const map = document.querySelector('.mapbox')
const controlBtn = document.querySelector('.controlBtn')
const dropdown = document.querySelector(".dropDown")
const statistic = document.querySelector('#stat')
const prevStopBtn =document.querySelector('#lastStop')
const nextStopBtn =document.querySelector('#nextStop')

stoptime = true;

whole.classList.add('show')
rest.classList.add('play')
let songIndex = 0

loadSong(songs[songIndex])

function loadSong(song) {
    title.innerText = song
    audio.src = `assets/${song}.mp3`
}

// play and pause songs
function playSong() {
    music.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    audio.play()
}

function pauseSong() {
    music.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    audio.pause()
}

//take a rest or keep riding
function takeRest() {
    rest.classList.remove('play')
    rest.querySelector('i.fas').classList.remove('fa-play')
    rest.querySelector('i.fas').classList.add('fa-pause')
    
}

function resumeRiding() {
    rest.classList.add('play')
    rest.querySelector('i.fas').classList.add('fa-play')
    rest.querySelector('i.fas').classList.remove('fa-pause')
    stopTimer()
}

// next and last song
function prevSong() {
    songIndex--
    if(songIndex < 0) {
        songIndex = 8
    }

    loadSong(songs[songIndex])
    playSong()
}

function nextSong() {
    songIndex++
    if(songIndex > 8) {
        songIndex = 0
    }

    loadSong(songs[songIndex])
    playSong()
}

// pop up img dialogue
function confirmAction() {
    var change = false;
    let confirmAction = confirm("Are you sure to end this tour?")
    if(confirmAction==true) {
        // return true;
        window.location.replace("index.html");
    } else {return false;}
}

// hide and show all buttons
function hideAll() {
    whole.classList.remove('show')
    hideBtn.querySelector('i.fas').classList.remove('fa-eye-slash')
    hideBtn.querySelector('i.fas').classList.add('fa-eye')
    music.style.display = "none";
    map.style.display = "none";
    controlBtn.style.display = "none";
    dropdown.style.display = "none";
    statistic.style.display = "none";
}

function showAll() {
    whole.classList.add('show')
    hideBtn.querySelector('i.fas').classList.remove('fa-eye')
    hideBtn.querySelector('i.fas').classList.add('fa-eye-slash')
    music.style.display = "block";
    map.style.display = "block";
    controlBtn.style.display = "block";
    dropdown.style.display = "block";
    statistic.style.display = "block";
}

// play and pause music
playBtn.addEventListener('click', () => {
    const isPlaying = music.classList.contains('play')

    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

rest.addEventListener('click', () => {
    const isRiding = rest.classList.contains('play')

    if(isRiding) {
        takeRest()
    } else {
        resumeRiding()
    }
})

hideBtn.addEventListener('click', () => {
    const isShowing = whole.classList.contains('show')
    
    if(isShowing) {
        hideAll()
    } else {
        showAll()
    }
})

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

// map popup
var modal = document.getElementById("mapModal");

var img = document.getElementById("mapImg");
var modalImg = document.getElementById("img1");
var captionText = document.getElementById("caption");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

var span = document.getElementsByClassName("close")[0];
span.onclick = function() { 
  modal.style.display = "none";
}

let mapImgIndex = 0

mapImgs = ['Route1', 'Route2', 'Route3', 'Route4', 'Route5']
  
function loadMapImg(mapImg) {
  document.getElementById('mapImg').src = `assets/${mapImg}.png`;
}
  
function prevMapImg() {
  mapImgIndex--
  if(mapImgIndex < 0) {
      mapImgIndex = 4
  }

  loadMapImg(mapImgs[mapImgIndex])
}

function nextMapImg() {
  mapImgIndex++
  if(mapImgIndex > 4) {
      mapImgIndex = 0
  }

  loadMapImg(mapImgs[mapImgIndex])
}

prevStopBtn.addEventListener('click', prevMapImg)
nextStopBtn.addEventListener('click', nextMapImg)


// dropdown
function showMenu() {
    document.getElementById("options").classList.toggle("show");
  }
  
  window.onclick = function(event) {
    if (!event.target.matches('#dbutton')) {
      var dropdowns = document.getElementsByClassName("dropdown-option");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

// timer
const timer = document.getElementById('timer');
const speed = document.getElementById('speed');
const ridingBtn = document.getElementById('pauseRiding');
var h = 0;
var min = 0;
var sec = 0;
var speedValue = 10;
var stoptime = true;

function startTimer() {
  if (stoptime == true) {
        stoptime = false;
        incrementTimer();
    }
}
function stopTimer() {
  if (stoptime == false) {
    stoptime = true;
  }
}

function incrementTimer() {
    if (stoptime == false) {
    sec = parseInt(sec);
    min = parseInt(min);
    h = parseInt(h);
    sec = sec + 1;
    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (min == 60) {
      h = h + 1;
      min = 0;
      sec = 0;
    }
    if (sec < 10 || sec == 0) {
      sec = '0' + sec;
    }
    if (min < 10 || min == 0) {
      min = '0' + min;
    }
    if (h < 10 || h == 0) {
      h = '0' + h;
    }
    timer.innerHTML = h + ':' + min + ':' + sec;
    setTimeout("incrementTimer()", 1000);
  }
}

// background image change
// let bdImgIndex = 0
// bdImgs = ['bd1', 'bd2', 'bd3', 'bd4', 'bd5']

// function loadBdImg(bdImg) {
//   document.getElementById('bd').style.backgroundImage = `url(assets/${bdImg}.jpg`;
// }

// function prevBdImg() {
//   bdImgIndex--
//   if(bdImgIndex < 0) {
//       bdImgIndex = 4
//   }

//   loadBdImg(bdImgs[bdImgIndex])
// }

// function nextBdImg() {
//   bdImgIndex++
//   if(bdImgIndex > 4) {
//       bdImgIndex = 0
//   }

//   loadBdImg(bdImgs[bdImgIndex])
// }

prevStopBtn.addEventListener('click', loadImg)
nextStopBtn.addEventListener('click', loadImg)

// pass cordinates 
let routeCoords = sessionStorage.getItem('coordsArray');
sessionStorage.clear();
// console.log(routeCoords);

function loadImg() {
  const pos = routeCoords.split(",");
  const latArray = [];
  const lngArray = [];

  for (let i = 0; i < pos.length; i++) {
    if (pos[i] > 0) {
      lngArray.push(pos[i])
    } else {
      latArray.push(pos[i])
    }
  }

  for (var i = 0; i < latArray.length; i++) {
    for (var j = 0; j < lngArray.length; j++) {
      if (latArray.indexOf(i) == lngArray.indexOf(j)) {
        console.log(i, j);
        var $lat = latArray[i];
        var $lng = lngArray[j];
        var $address = $lat + ',' + $lng;
        var addressUrl = 'http://maps.googleapis.com/maps/api/streetview?size=700x420&location=' + $address +'&key=AIzaSyDzhjAxe7rAUePAGS11UmlV8DHliHAn_D0';
        document.getElementById('bd').style.backgroundImage = 'url("'+ addressUrl + '")';
      }
       
    }
  }
  
}
