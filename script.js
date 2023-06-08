const songData = [
  {
    name: "刻在你心底的名字",
    artist: "卢广仲",
    src: "song1",
  },
  {
    name: "3189",
    artist: "你老婆",
    src: "song2",
  },
  {
    name: "我的名字",
    artist: "焦迈奇",
    src: "song3",
  },
  {
    name: "So Far Away (Acouatic)",
    artist: "Adam Christopher",
    src: "song4",
  },
  {
    name: "鬼",
    artist: "草东",
    src: "song5",
  },
  {
    name: "但",
    artist: "草东",
    src: "song6",
  },
  {
    name: "缸",
    artist: "草东",
    src: "song7",
  },
  {
    name: "The Way I till Love You",
    artist: "Reynard Silva",
    src: "song8",
  },
  {
    name: "Numb Litte Bug",
    artist: "Em Beihold",
    src: "song9",
  },
  {
    name: "11",
    artist: "队长＆黄礼格",
    src: "song10",
  },
  {
    name: "Dive Back In Time",
    artist: "白鲨 JAWS",
    src: "song11",
  },
  {
    name: "Shadow Of The Son",
    artist: "文W社长",
    src: "song12",
  },
  {
    name: "起风了 (Acoustic)",
    artist: "买辣椒也用劵",
    src: "song11",
  },
  {
    name: "撒野",
    artist: "林一卡",
    src: "song11",
  },
  {
    name: "玫瑰少年",
    artist: "蔡依林",
    src: "song11",
  }
];

const container = document.querySelector(".container");
const songName = document.querySelector(".song-name");
const songArtist = document.querySelector(".song-artist");
const cover = document.querySelector(".cover");
const playPauseBtn = document.querySelector(".play-pause");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const audio = document.querySelector(".audio");
const songTime = document.querySelector(".song-time");
const songProgress = document.querySelector(".song-progress");

let songIndex = 0;

window.addEventListener("load", () => {
  loadSong(songIndex);
});

const loadSong = (index) => {

  songName.textContent = songData[index].name;
  songArtist.textContent = songData[index].artist;
  audio.src = `music/${songData[index].src}.mp3`;
};

const playSong = () => {
  container.classList.add("pause");
  cover.classList.add("rotate");
  playPauseBtn.firstElementChild.className = "fa-solid fa-pause";
  audio.play();
};

const pauseSong = () => {
  container.classList.remove("pause");
  cover.classList.remove("rotate");
  playPauseBtn.firstElementChild.className = "fa-solid fa-play";
  audio.pause();
};

playPauseBtn.addEventListener("click", () => {
  if (container.classList.contains("pause")) {
    pauseSong();
  } else {
    playSong();
  }
});

const prevSongPlay = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songData.length - 1;
  }

  loadSong(songIndex);
  playSong();
};

const nextSongPlay = () => {
  songIndex++;
  if (songIndex > songData.length - 1) {
    songIndex = 0;
  }

  loadSong(songIndex);
  playSong();
};

prevBtn.addEventListener("click", prevSongPlay);
nextBtn.addEventListener("click", nextSongPlay);

audio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let currentTimeWidth = (currentTime / duration) * 100;
  songProgress.style.width = `${currentTimeWidth}%`;

  let songCurrentTime = document.querySelector(".time span:nth-child(1)");
  let songDuration = document.querySelector(".time span:nth-child(2)");

  audio.addEventListener("loadeddata", () => {
    let audioDuration = audio.duration;
    let totalMinutes = Math.floor(audioDuration / 60);
    let totalSeconds = Math.floor(audioDuration % 60);

    if (totalSeconds < 10) {
      totalSeconds = `0${totalSeconds}`;
    }

    songDuration.textContent = `${totalMinutes}:${totalSeconds}`;
  });

  let currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);

  if (currentSeconds < 10) {
    currentSeconds = `0${currentSeconds}`;
  }

  songCurrentTime.textContent = `${currentMinutes}:${currentSeconds}`;
});

songTime.addEventListener("click", (e) => {
  let progressWidth = songTime.clientWidth;
  let clickedOffsetX = e.offsetX;
  let songDuration = audio.duration;
  audio.currentTime = (clickedOffsetX / progressWidth) * songDuration;

  playSong();
});

audio.addEventListener("ended", nextSongPlay);
