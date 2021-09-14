const music = document.querySelector('.music')
const playBtn =document.querySelector('#play')
const prevBtn =document.querySelector('#prev')
const nextBtn =document.querySelector('#next')
const title = document.querySelector('#title')
const audio = document.querySelector('#audio')
const songs = ['Levitating', 'I Feel It Coming', 'Blinding Lights']
const rest = document.querySelector('#pauseRiding')

let songIndex = 0

loadSong(songs[songIndex])

function loadSong(song) {
    title.innerText = song
    audio.src = `assets/${song}.mp3`
}

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

function takeRest() {
    rest.classList.remove('play')
    rest.querySelector('i.fas').classList.remove('fa-play')
    rest.querySelector('i.fas').classList.add('fa-pause')
}

function resumeRiding() {
    rest.classList.add('play')
    rest.querySelector('i.fas').classList.add('fa-play')
    rest.querySelector('i.fas').classList.remove('fa-pause')
}

function prevSong() {
    songIndex--
    if(songIndex < 0) {
        songIndex = 2
    }

    loadSong(songs[songIndex])
    playSong()
}

function nextSong() {
    songIndex++
    if(songIndex > 2) {
        songIndex = 0
    }

    loadSong(songs[songIndex])
    playSong()
}

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

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)