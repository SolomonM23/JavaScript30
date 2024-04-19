//1. get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');

//2. build the functions
function togglePlay() {
    if (video.paused){
        video.play();
    }else {
        video.pause();
    }
}

//change play/pause icon
function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
    console.log('Update the button');
}

function skip(){
    console.log(this.dataset.skip);
    video.currentTime += +(this.dataset.skip); //this.dataset.skip converted to a number
}

//3. event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));