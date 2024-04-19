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
    //could also use parseint() or parseFloat() to convert this.dataset.skip to a number
}

//volume and speed
function handleRangeUpdate(){
    video[this.name] = this.value;
}


function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    console.log(e);
}

//3. event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));


let mousedown = false;
progress.addEventListener('click', scrub);
//if holding the mouse down while scrubbing progress bar then it will run scrub()
//must pass the event target to the function just like in the scrub() above
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);