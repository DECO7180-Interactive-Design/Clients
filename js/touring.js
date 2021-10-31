const whole = document.querySelector(".container");
const music = document.querySelector(".music");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const title = document.querySelector("#title");
const audio = document.querySelector("#audio");
const bottle = document.querySelector("#bottle");
const songs = [
  "bensound-energy",
  "bensound-sunny",
  "bensound-betterdays",
  "bensound-dubstep",
  "bensound-epic",
  "bensound-tenderness",
];
const rest = document.querySelector("#pauseRiding");
const hideBtn = document.querySelector(".hideAll");
const map = document.querySelector(".mapbox");
const controlBtn = document.querySelector(".controlBtn");
const dropdown = document.querySelector(".dropDown");
const statistic = document.querySelector("#stat");
const prevStopBtn = document.querySelector("#lastStop");
const nextStopBtn = document.querySelector("#nextStop");
let start = true;

stoptime = true;

whole.classList.add("show");
rest.classList.add("play");
let songIndex = 0;

loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `assets/${song}.mp3`;
}

// play and pause songs
function playSong() {
  music.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}

function pauseSong() {
  music.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  audio.pause();
}

//pop-up question
  function openwin() {
    document.getElementById("qs-container").classList.add("open");
    resumeRiding();
  }

  function closewin() {
    document.getElementById("qs-container").classList.remove("open");
  }

//take a rest or keep riding
function takeRest() {
  rest.classList.remove("play");
  rest.querySelector("i.fas").classList.remove("fa-play");
  rest.querySelector("i.fas").classList.add("fa-pause");
  
  if (start == true) {
    setTimeout(openwin, 5000);
    start = false;
  }
  
}

function resumeRiding() {
  rest.classList.add("play");
  rest.querySelector("i.fas").classList.add("fa-play");
  rest.querySelector("i.fas").classList.remove("fa-pause");
  stopTimer();
  stopCalory();
  stopspeed();
}

// next and last song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = 5;
  }

  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > 5) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// pop up img dialogue
function confirmAction() {
  var change = false;
  let confirmAction = confirm("Are you sure to end this tour?");
  if (confirmAction == true) {
    // return true;
    window.location.replace("index.html");
  } else {
    return false;
  }
}

// hide and show all buttons
function hideAll() {
  whole.classList.remove("show");
  hideBtn.querySelector("i.fas").classList.remove("fa-eye-slash");
  hideBtn.querySelector("i.fas").classList.add("fa-eye");
  music.style.display = "none";
  map.style.display = "none";
  controlBtn.style.display = "none";
  dropdown.style.display = "none";
  statistic.style.display = "none";
  bottle.style.display = "none";
}

function showAll() {
  whole.classList.add("show");
  hideBtn.querySelector("i.fas").classList.remove("fa-eye");
  hideBtn.querySelector("i.fas").classList.add("fa-eye-slash");
  music.style.display = "block";
  map.style.display = "block";
  controlBtn.style.display = "block";
  dropdown.style.display = "block";
  statistic.style.display = "block";
  bottle.style.display = "block";
}


// play and pause music
playBtn.addEventListener("click", () => {
  const isPlaying = music.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

rest.addEventListener("click", () => {
  const isRiding = rest.classList.contains("play");

  if (isRiding) {
    takeRest();
  } else {
    resumeRiding();
  }
});

hideBtn.addEventListener("click", () => {
  const isShowing = whole.classList.contains("show");

  if (isShowing) {
    hideAll();
  } else {
    showAll();
  }
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// map popup
var modal = document.getElementById("mapModal");

var img = document.getElementById("mapImg");
var modalImg = document.getElementById("img1");
var captionText = document.getElementById("caption");
img.onclick = function () {
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
};

var span = document.getElementsByClassName("close")[0];
span.onclick = function () {
  modal.style.display = "none";
};

let mapImgIndex = 0;

mapImgs = ["Route1", "Route2", "Route3", "Route4", "Route5"];

function loadMapImg(mapImg) {
  document.getElementById("mapImg").src = `assets/${mapImg}.png`;
}

function prevMapImg() {
  mapImgIndex--;
  if (mapImgIndex < 0) {
    mapImgIndex = 4;
  }

  loadMapImg(mapImgs[mapImgIndex]);
}

function nextMapImg() {
  mapImgIndex++;
  if (mapImgIndex > 4) {
    mapImgIndex = 0;
  }

  loadMapImg(mapImgs[mapImgIndex]);
}

prevStopBtn.addEventListener("click", prevMapImg);
nextStopBtn.addEventListener("click", nextMapImg);

// dropdown
function showMenu() {
  document.getElementById("options").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches("#dbutton")) {
    var dropdowns = document.getElementsByClassName("dropdowns");
    for (var i = 0; i < dropdowns.length; i++) {
      console.log("this function");
      var showDropdown = dropdowns[i];
      if (showDropdown.classList.contains("show")) {
        showDropdown.classList.remove("show");
      }
    }
  }
};
// timer
const timer = document.getElementById("timer");
const speed = document.getElementById("speed");
const calory = document.getElementById("calories");
const ridingBtn = document.getElementById("pauseRiding");
var h = 0;
var min = 0;
var sec = 0;
var speedValue = 0;
var caloryValue = 0;
var stoptime = true;
var stopSpeed = true;
var stopCalories = true;
// CALORIES
function setCalories() {
  if (stopCalories == false) {
    caloryValue = parseInt(caloryValue);
    caloryValue += 10;
    calory.innerHTML = caloryValue + " KJ";
    setTimeout("setCalories()", 4000)
  }
}
function startCalory() {
  if (stopCalories == true) {
    stopCalories = false;
    setCalories();
  }
}
function stopCalory() {
  if (stopCalories == false) {
    stopCalories = true;
  }
}

// SPEED
function setSpeed() {
  if (stopSpeed == false) {
    speedValue = parseInt(speedValue);
    speedValue = Math.floor((Math.random()*20) + 10);
    speed.innerHTML = speedValue + " Km/h";
    setTimeout("setSpeed()", 2000)
  }
};

function startSpeed() {
  if (stopSpeed == true) {
    stopSpeed = false;
    setSpeed();
  }
}
function stopspeed() {
  if (stopSpeed == false) {
    stopSpeed = true;
    speed.innerHTML = "0 Km/h";
  }
}

// TIMER
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
      sec = "0" + sec;
    }
    if (min < 10 || min == 0) {
      min = "0" + min;
    }
    if (h < 10 || h == 0) {
      h = "0" + h;
    }
    timer.innerHTML = h + ":" + min + ":" + sec;
    setTimeout("incrementTimer()", 1000);
  }
}


// pass cordinates
let routeCoords = sessionStorage.getItem("coordsArray");
sessionStorage.clear();

let moder = 0;
let currentPtr = 0;
let urls = [];
loadImg();

const previousImg = () => {
  const bg = document.getElementById("bd");
  currentPtr = currentPtr % moder;
  bg.style.backgroundImage = 'url("' + urls[--currentPtr] + '")';
};

const nextImg = () => {
  const bg = document.getElementById("bd");
  currentPtr = currentPtr % moder;
  bg.style.backgroundImage = 'url("' + urls[++currentPtr] + '")';
};

prevStopBtn.addEventListener("click", previousImg);
nextStopBtn.addEventListener("click", nextImg);

function loadImg() {
  const pos = routeCoords.split(",");
  const latArray = [];
  const lngArray = [];

  for (let i = 0; i < pos.length; i++) {
    if (pos[i] > 0) {
      lngArray.push(pos[i]);
    } else {
      latArray.push(pos[i]);
    }
  }

  moder = latArray.length - 1;

  for (var i = 0; i < latArray.length; i++) {
    var $lat = latArray[i];
    var $lng = lngArray[i];
    var $address = $lat + "," + $lng;
    var addressUrl =
      "http://maps.googleapis.com/maps/api/streetview?size=700x420&location=" +
      $address +
      "&key=AIzaSyDzhjAxe7rAUePAGS11UmlV8DHliHAn_D0";
    urls.push(addressUrl);
  }
}
// shadow cyclist
var closebtn = document.getElementsByClassName('closeshadowcycling');
closebtn.onclick = function() {
  popup.style.display = "none";
}

// REFERENCES

// W3schools.com. 2021. How TO - Clickable Dropdown. https://www.w3schools.com/howto/howto_js_dropdown.asp
// W3schools.com. 2021. How TO - Modal Images. https://www.w3schools.com/howto/howto_css_modal_images.asp
// Google, Google street view API. 2021. 