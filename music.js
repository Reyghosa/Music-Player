import songs from "./data.js"
const carousel = [...document.querySelectorAll('.carousel img')];

let carouselImageIndex = 0;

const changeCarousel = () => {
    carousel[carouselImageIndex].classList.toggle('active');
    if(carouselImageIndex >= carousel.length - 1){
        carouselImageIndex = 0;
    }else{
        carouselImageIndex++;
    }
    carousel[carouselImageIndex].classList.toggle('active');
}

setInterval( () => {
    changeCarousel();
}, 3000);


const musicPlayerSection = document.querySelector('.music-player-section');

let clickCount = 1;

musicPlayerSection.addEventListener('click', () => {
    if(clickCount >= 2){
        musicPlayerSection.classList.add('active');
        clickCount = 1;
        return;
    }
    clickCount++;
    setTimeout( () => {
        clickCount = 1
    }, 250);
})

const backToHomeBtn = document.querySelector('.music-player-section .back-btn');
backToHomeBtn.addEventListener('click', () => {
    musicPlayerSection.classList.remove('active');
})
const playlistSection = document.querySelector('.playlist');
const navBtn = document.querySelector('.music-player-section .nav-btn');

navBtn.addEventListener('click', () => {
    playlistSection.classList.add('active');
})

const backToMusicPlayer = document.querySelector('.playlist .back-btn');
backToMusicPlayer.addEventListener('click', () => {
    playlistSection.classList.remove('active');
})


let currentMusic = 0;

const music = document.querySelector('#audio-source');

const seekBar = document.querySelector('.music-seek-bar');
const songName = document.querySelector('.current-song-name');
const artistName = document.querySelector('.artist-name');
const coverImage = document.querySelector('.cover');
const currentMusicTime = document.querySelector('.current');
const musicDuration = document.querySelector('.duration');

const queue =[...document.querySelectorAll('.queue')];

const forwardBtn = document.querySelector('i.fa-forward');
const backwarBtn = document.querySelector('i.fa-backward');
const playBtn = document.querySelector('i.fa-play');
const pauseBtn = document.querySelector('i.fa-pause');
const repeatBtn = document.querySelector('span.fa-rotate-right');
const volumeBtn = document.querySelector('span.fa-volume-high');
const volumeSlider = document.querySelector('.volume-slider');

let playInterval = ''
playBtn.addEventListener('click', () => {
    music.play()
    playBtn.classList.remove('active');
    pauseBtn.classList.add('active');
    clearInterval(playInterval)
})

pauseBtn.addEventListener('click', () => {
    music.pause()
    pauseBtn.classList.remove('active');
    playBtn.classList.add('active');
    clearInterval(playInterval)
})



const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;
     music.src = song.path;
    // music.autoplay = true
    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    coverImage.src = song.cover;
    queue.forEach(item => item.classList.remove('active'));
    queue[currentMusic].classList.add('active');
 
}


const numFormatter = (value)=>{
    if(value < 10){
        return `0${value}`
    }
    return value
}

const formatTime = (duration) => {
       
    let min = Math.floor(duration/60)
    let seconds = Math.floor(duration % 60)
    
    musicDuration.innerText = `${numFormatter(min)}:${numFormatter(seconds)}`
}

const play = (e)=>{
    setInterval(() => {
        seekBar.max = music.duration;
    }, 300)
    playInterval = setInterval( () => {
        seekBar.value = music.currentTime;
         currentMusicTime.innerText = musicTime(music.currentTime);
         
     }, 500)
}


music.addEventListener("play", (e) =>{
    if(e){
        play(e)
    }
})

music.addEventListener("ended", (e) =>{
    if(repeatBtn.className.includes('active') && e){
        music.currentTime = 0
        music.play()
        play(e)
    }
    else{
        setMusic(currentMusic + 1)
        music.play()
    }
})

music.addEventListener("playing", (e) => formatTime(e.currentTarget.duration))


const numFormat = (value)=>{
    if(value < 10){
        return `0${value}`
    }
    return value
}

const musicTime = (current) => {
       
    let min = Math.floor(current/60)
    let seconds = Math.floor(current % 60)

    return `${numFormat(min)}:${numFormat(seconds)}`
}

  


seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
    
})


forwardBtn.addEventListener('click', () =>{
    clearInterval(playInterval)
    if (currentMusic >= songs.length - 1){
        currentMusic = 0;
    } else{
        currentMusic++;
    }
    setMusic(currentMusic);
    playBtn.click();
})

backwarBtn.addEventListener('click', () =>{
    if (currentMusic <= 0){
        currentMusic = songs.length - 1;
    } else{
        currentMusic--;
    }
    setMusic(currentMusic);
    playBtn.click();
})

repeatBtn.addEventListener('click', () => {
    repeatBtn.classList.toggle('active');
})


volumeBtn.addEventListener('click', () =>{
    volumeBtn.classList.toggle('active');
    volumeSlider.classList.toggle('active');
})

volumeSlider.addEventListener('input', () =>{
    music.volume = volumeSlider.value;
})

queue.forEach((item, i) => {
    item.addEventListener('click', () => {
        setMusic(i);
        playBtn.click();
    })
})

       
window.addEventListener("load", () => {
    // setInterval( () => {
    //     seekBar.value = music.currentTime;
    //      currentMusicTime.innerText = musicTime(music.currentTime);
    //      if (Math.floor(music.currentTime) == Math.floor(seekBar.max)){
    //          if (repeatBtn.className.includes('active')){
    //              setMusic(currentMusic);
    //              playBtn.click();
    //          } else{
    //              forwardBtn.click();
    //          }
    //      }
         
    //  }, 500)
     setMusic(0)
})









