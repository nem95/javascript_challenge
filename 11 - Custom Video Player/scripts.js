const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButton = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay() {
  /*
    // We can also use this method:

    const method = video.paused ? 'play' : 'pause';
    video[method]();
   */
  
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
  console.log(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  console.log(e);
  console.log(e.srcElement.offsetWidth);
  const position = ( e.offsetX / e.srcElement.offsetWidth) * 100;
  progressBar.style.flexBasis = `${position}%`;

}


// Play and pause the video
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

// Update the progress bar
video.addEventListener('timeupdate', handleProgress);

// Update the video when the user move the progress bar
progress.addEventListener('click', scrub);
//progress.addEventListener('mousemove', scrub);

// Skip part of the video
skipButton.forEach(button => button.addEventListener('click', skip));

// Change range value
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

