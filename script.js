const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.querySelector(".current-time");
const durationEl = document.querySelector(".duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

//Music State Variable
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machina",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
  },
];
//Check if playing, State variable
let isPlaying = false;

//Play
const playSong = function () {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
};

//Pause
const pauseSong = function () {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");

  music.pause();
};

//Play or Pause event Listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

//Update DOM
const loadSong = function (song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
};
//Current Song State Variable
let songIndex = 0;
//Prev/Next
const prevSong = function () {
  if (songIndex === 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex--;
  }
  console.log(songIndex);

  loadSong(songs[songIndex]);
  playSong();
};
const nextSong = function () {
  if (songIndex === songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex++;
  }

  loadSong(songs[songIndex]);
  playSong();
};

//On Load - Select First Song
loadSong(songs[songIndex]);

//Update Progress Bar
const updateProgressBar = function (e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    //Update Progress Bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    //Calc Display for Duration Visual
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    //delay switching durationEl to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    //Calc Display for Current Time Visual DOM
    const currentTimeMinutes = Math.floor(currentTime / 60);
    let currentTimeSeconds = Math.floor(currentTime % 60);
    if (currentTimeSeconds < 10) {
      currentTimeSeconds = `0${currentTimeSeconds}`;
    }
    if (currentTimeSeconds) {
      currentTimeEl.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`;
    }
  }
};

//Set Progress Bar
const setProgressBar = function (e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  const percentBar = (clickX / width) * 100;
  //Fill progress bar
  progress.style.width = `${percentBar}%`;
  //Set the music to specific time clicked
  music.currentTime = (clickX / width) * duration;
};

//Event Listeners for prev/next
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
music.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgressBar);
