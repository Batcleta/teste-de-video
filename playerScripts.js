const qs = (el) => document.querySelector(el);
const media = qs("video");
const controls = qs(".controls");

const play = qs(".play");
const stop = qs(".stop");
const rwd = qs(".rwd");
const fwd = qs(".fwd");

const timerWrapper = qs(".timer");
const timer = qs(".timer span");
const timerBar = qs(".timer div");

media.removeAttribute("controls");

function playPauseMedia() {
  if (media.paused) {
    play.setAttribute("data-icon", "u");
    media.play();
  } else {
    play.setAttribute("data-icon", "P");
    media.pause();
  }
}

play.addEventListener("click", playPauseMedia);

function stopMedia() {
  media.pause();
  media.currentTime = 0;
  play.setAttribute("data-icon", "P");

  rwd.classList.remove("active");
  fwd.classList.remove("active");
  clearInterval(intervalRwd);
  clearInterval(intervalFwd);
}

stop.addEventListener("click", stopMedia);
media.addEventListener("ended", stopMedia);

// Back and next buttons
let intervalFwd;
let intervalRwd;

//   Backwards

function windBackward() {
  if (media.currentTime <= 3) {
    rwd.classList.remove("active");
    clearInterval(intervalRwd);
    stopMedia();
  } else {
    media.currentTime -= 3;
  }
}

function mediaBackward() {
  clearInterval(intervalFwd);
  fwd.classList.remove("active");

  if (rwd.classList.contains("active")) {
    rwd.classList.remove("active");
    clearInterval(intervalRwd);
    media.play();
  } else {
    rwd.classList.add("active");
    media.pause();
    intervalRwd = setInterval(windBackward, 200);
  }
}
//   forward

function windForward() {
  if (media.currentTime >= media.duration - 3) {
    fwd.classList.remove("active");
    clearInterval(intervalFwd);
    stopMedia();
  } else {
    media.currentTime += 3;
  }
}

function mediaForward() {
  clearInterval(intervalRwd);
  rwd.classList.remove("active");

  if (fwd.classList.contains("active")) {
    fwd.classList.remove("active");
    clearInterval(intervalFwd);
    media.play();
  } else {
    fwd.classList.add("active");
    media.pause();
    intervalFwd = setInterval(windForward, 200);
  }
}

rwd.addEventListener("click", mediaBackward);
fwd.addEventListener("click", mediaForward);

//   timer

function setTime() {
  let minutes = Math.floor(media.currentTime / 60);
  let seconds = Math.floor(media.currentTime - minutes * 60);
  let minuteValue;
  let secondValue;

  if (minutes < 10) {
    minuteValue = "0" + minutes;
  } else {
    minuteValue = minutes;
  }

  if (seconds < 10) {
    secondValue = "0" + seconds;
  } else {
    secondValue = seconds;
  }

  let mediaTime = minuteValue + ":" + secondValue;
  timer.textContent = mediaTime;

  let barLength =
    timerWrapper.clientWidth * (media.currentTime / media.duration);
  timerBar.style.width = barLength + "px";
}

media.addEventListener("timeupdate", setTime);
