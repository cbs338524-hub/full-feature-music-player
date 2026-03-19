const songs = [
    {
        title: "Demo Song",
        artist: "SoundHelix",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        cover : "https://images.unsplash.com/photo-1497032205916-ac775f0649ae",
    }
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const currentTimeEl = document.getElementById("current");
const durationEl = document.getElementById("duration");

const playlist = document.getElementById("playlist");

let currentSong = 0;

function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    title.innerText = song.title;
    artist.innerText = song.artist;
    cover.src = song.cover;
}

function playSong() {
    if (!audio.src) return;

    audio.play()
        .then(() => {
            playBtn.innerText = "⏸";
        })
        .catch(err => {
            console.log("Play error:", err);
        });
}

function pauseSong() {
    audio.pause();
    playBtn.innerText = "▶";
}

playBtn.onclick = () => {
    if (!audio.src) {
        loadSong(currentSong);
    }

    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
};

nextBtn.onclick = () => {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    playSong();
};

prevBtn.onclick = () => {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    playSong();
};

audio.ontimeupdate = () => {
    if (!audio.duration) return;

    progress.value = (audio.currentTime / audio.duration) * 100;

    let m = Math.floor(audio.currentTime / 60);
    let s = Math.floor(audio.currentTime % 60);
    currentTimeEl.innerText = `${m}:${s < 10 ? "0" : ""}${s}`;
};

audio.onloadedmetadata = () => {
    let m = Math.floor(audio.duration / 60);
    let s = Math.floor(audio.duration % 60);
    durationEl.innerText = `${m}:${s < 10 ? "0" : ""}${s}`;
};

progress.oninput = () => {
    if (!audio.duration) return;
    audio.currentTime = (progress.value / 100) * audio.duration;
};

volume.oninput = () => {
    audio.volume = volume.value;
};

audio.onended = () => {
    nextBtn.click();
};

function loadPlaylist() {
    playlist.innerHTML = "";
    songs.forEach((song, index) => {
        const li = document.createElement("li");
        li.innerText = song.title;
        li.onclick = () => {
            currentSong = index;
            loadSong(index);
            playSong();
        };
        playlist.appendChild(li);
    });
}

loadSong(currentSong);
loadPlaylist();