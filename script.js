const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const playlist = document.querySelectorAll("#playlist li");

let songs = Array.from(playlist).map((li) => ({
  src: li.dataset.src,
  title: li.textContent
}));
let songIndex = 0;

function loadSong(index) {
  audio.src = songs[index].src;
  title.textContent = songs[index].title;
  audio.load();
}

function playSong() {
  audio.play();
  playBtn.textContent = "⏸";
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶️";
}

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  playSong();
});

nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  playSong();
});

playlist.forEach((li, index) => {
  li.addEventListener("click", () => {
    songIndex = index;
    loadSong(songIndex);
    playSong();
  });
});

// Load first song by default
loadSong(songIndex);
