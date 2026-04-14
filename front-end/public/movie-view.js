/**
 * Movie View Controller
 * Handles: Playback, Volume Gain (Web Audio API), TV Navigation, and Episode Management
 */

// --- 1. Constants & State ---
const video = document.getElementById('movieVideo');
const source = document.getElementById('videoSource');
const container = document.getElementById('fullscreenContainer');
const overlay = document.getElementById('overlayControls');
const progressBar = document.getElementById('progressBar');
const progressContainer = document.getElementById('progressContainer');
const volumeSlider = document.getElementById('volumeSlider');
const currentTimeDisplay = document.getElementById('currentTime');
const durationTimeDisplay = document.getElementById('durationTime');

const TV_KEYS = {
    UP: 38, DOWN: 40, LEFT: 37, RIGHT: 39, ENTER: 13,
    BACK: 8, BACK_ALT: 461, BACK_TIZEN: 10009,
    PLAY_PAUSE: 179, REWIND: 412, FORWARD: 417, A_KEY: 65
};

let audioCtx, gainNode, track, uiTimeout;

// --- 2. Core Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    const savedMovie = localStorage.getItem('selectedMovie');
    if (!savedMovie) {
        document.getElementById('movieTitle').textContent = "Movie Not Found";
        return;
    }

    const movieData = JSON.parse(savedMovie);
    renderMovieDetails(movieData);
    renderEpisodes(movieData);
    setupInitialVideo(movieData.video);
    makeElementsFocusable();

    // TV Auto-focus
    setTimeout(() => {
        const playBtn = document.querySelector('.main-controls button');
        if (playBtn) playBtn.focus();
    }, 500);
});

function renderMovieDetails(data) {
    document.getElementById('movieTitle').textContent = data.title;
    document.getElementById('movieInfo').innerHTML = `
        Hero: ${data.hero} <br>
        Year: ${data.year} <br>
        Language: ${data.language}
    `;
}

function renderEpisodes(data) {
    const grid = document.getElementById('episodesGrid');
    grid.innerHTML = '';

    data.episodes.forEach((ep) => {
        if (ep.link && ep.title) {
            const card = document.createElement('div');
            card.className = 'episode-card';
            card.tabIndex = 0;
            card.onclick = () => changeEpisode(ep.link, ep.title);
            card.innerHTML = `
                <div class="episode-thumbnail">
                    <img src="${data.image}" alt="${ep.title}">
                    <i class="fas fa-play-circle play-icon"></i>
                </div>
                <div class="episode-info">
                    <h4>${ep.title}</h4>
                    <p>${ep.time || 'N/A'}</p>
                </div>`;
            grid.appendChild(card);
        }
    });
}

function setupInitialVideo(url) {
    if (url) {
        source.src = url;
        video.load();
        video.play().catch(err => console.log("Autoplay prevented", err));
    }
}

// --- 3. Playback & Navigation Logic ---
function togglePlay() {
    video.paused ? video.play() : video.pause();
    showUI();
}

function changeEpisode(url, title) {
    progressBar.style.width = '0%';
    source.src = url;
    video.load();
    video.play();
    document.getElementById('movieTitle').textContent = title;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function seekForward() {
    video.currentTime = Math.min(video.duration, video.currentTime + 10);
    showAlert("⏩ +10s");
    showUI();
}

function seekBackward() {
    video.currentTime = Math.max(0, video.currentTime - 10);
    showAlert("⏪ -10s");
    showUI();
}

function playNext() {
    const movieData = JSON.parse(localStorage.getItem('selectedMovie'));
    const currentIndex = movieData.episodes.findIndex(ep => source.src.includes(ep.link));

    if (currentIndex !== -1 && currentIndex < movieData.episodes.length - 1) {
        const next = movieData.episodes[currentIndex + 1];
        changeEpisode(next.link, next.title);
    } else {
        showAlert("This is the last episode.");
    }
}

function playPrevious() {
    const movieData = JSON.parse(localStorage.getItem('selectedMovie'));
    const currentIndex = movieData.episodes.findIndex(ep => source.src.includes(ep.link));

    if (currentIndex > 0) {
        const prev = movieData.episodes[currentIndex - 1];
        changeEpisode(prev.link, prev.title);
    } else {
        showAlert("This is the first episode.");
    }
}

// --- 4. Video Event Listeners ---
video.addEventListener('play', () => {
    document.getElementById('playIcon').classList.replace('fa-play', 'fa-pause');
    if (audioCtx?.state === 'suspended') audioCtx.resume();
});

video.addEventListener('pause', () => {
    document.getElementById('playIcon').classList.replace('fa-pause', 'fa-play');
});

video.addEventListener('timeupdate', () => {
    if (video.duration) {
        const percentage = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${percentage}%`;
        currentTimeDisplay.textContent = formatTime(video.currentTime);
    }
});

video.addEventListener('loadedmetadata', () => {
    durationTimeDisplay.textContent = formatTime(video.duration);
});

video.addEventListener('ended', () => {
    const movieData = JSON.parse(localStorage.getItem('selectedMovie'));
    if (!movieData) return;

    // Logic for Trailer -> Episode 1
    if (source.src.includes(movieData.video)) {
        if (movieData.episodes?.length > 0) {
            const firstEp = movieData.episodes[0];
            showAlert(`🎥 Trailer Ended. Starting: ${firstEp.title}`);
            setTimeout(() => changeEpisode(firstEp.link, firstEp.title), 1500);
        }
    }
    // Logic for Next Episode
    else {
        const currentIndex = movieData.episodes.findIndex(ep => source.src.includes(ep.link));
        if (currentIndex !== -1 && currentIndex < movieData.episodes.length - 1) {
            const nextEp = movieData.episodes[currentIndex + 1];
            showAlert(`🎬 Up Next: ${nextEp.title}`);
            setTimeout(() => changeEpisode(nextEp.link, nextEp.title), 1000);
        }
    }
});

// --- 5. Audio & Volume (Web Audio API) ---
function initAudio() {
    if (audioCtx) return;
    const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioCtxClass();
    track = audioCtx.createMediaElementSource(video);
    gainNode = audioCtx.createGain();
    track.connect(gainNode).connect(audioCtx.destination);
    video.volume = 1;
}

volumeSlider.addEventListener('input', (e) => {
    initAudio();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const val = parseFloat(e.target.value);
    if (gainNode) gainNode.gain.value = val;

    const icon = document.getElementById('volumeIcon');
    if (val === 0) icon.className = "fas fa-volume-mute";
    else if (val < 0.5) icon.className = "fas fa-volume-down";
    else icon.className = "fas fa-volume-up";

    icon.style.color = val > 1 ? "#8e44ad" : "white";
});

// --- 6. UI & Utility Functions ---
function showUI() {
    overlay.style.opacity = "1";
    overlay.style.pointerEvents = "auto";
    container.style.cursor = "default";
    clearTimeout(uiTimeout);
    uiTimeout = setTimeout(() => {
        if (!video.paused) {
            overlay.style.opacity = "0";
            overlay.style.pointerEvents = "none";
            container.style.cursor = "none";
        }
    }, 2500);
}

// This function remains in your movie-view.js
function toggleCustomFullscreen() {
    const icon = document.getElementById('fullScreenIcon');
    container.classList.toggle('custom-fullscreen');

    const isFull = container.classList.contains('custom-fullscreen');

    // Switch icons
    icon.classList.replace(isFull ? 'fa-expand' : 'fa-compress', isFull ? 'fa-compress' : 'fa-expand');

    // Update Tooltip text dynamically
    const fsBtn = document.querySelector('.fullscreen-btn');
    fsBtn.setAttribute('data-tooltip', isFull ? "Exit Full Screen (A)" : "Full Screen (A)");

    // Prevent scrolling behind fullscreen
    document.body.style.overflow = isFull ? "hidden" : "auto";

    // Show alert for feedback
    showAlert(isFull ? "Full Screen Enabled" : "Exit Full Screen");
}

function showAlert(message) {
    const alertBox = document.getElementById("custom-alert");
    document.getElementById("alert-text").innerText = message;
    alertBox.classList.add("show");
    setTimeout(() => alertBox.classList.remove("show"), 3000);
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

function makeElementsFocusable() {
    document.querySelectorAll('button, .episode-card, input[type="range"]')
        .forEach(item => item.setAttribute('tabindex', '0'));
}

// --- 7. Input Handlers (Mouse, Touch, Remote) ---
container.addEventListener('mousemove', showUI);
container.addEventListener('click', showUI);
progressContainer.addEventListener('click', (e) => {
    const rect = progressContainer.getBoundingClientRect();
    if (video.duration) {
        video.currentTime = ((e.clientX - rect.left) / rect.width) * video.duration;
    }
});

// Double Click/Tap Seeking
container.addEventListener('dblclick', (e) => {
    const rect = container.getBoundingClientRect();
    (e.clientX - rect.left > rect.width / 2) ? seekForward() : seekBackward();
});

let lastTap = 0;
container.addEventListener('touchstart', (e) => {
    showUI();
    const now = Date.now();
    if (now - lastTap < 300) {
        e.preventDefault();
        const rect = container.getBoundingClientRect();
        const touchX = e.touches[0].clientX - rect.left;
        (touchX > rect.width / 2) ? seekForward() : seekBackward();
    }
    lastTap = now;
}, { passive: false });

// Keydown / TV Remote Logic
document.addEventListener('keydown', (e) => {
    const code = e.keyCode;
    const isInput = ['BUTTON', 'INPUT'].includes(document.activeElement.tagName);

    if (code === TV_KEYS.A_KEY) {
        e.preventDefault();
        toggleCustomFullscreen();
    } else if (code === TV_KEYS.PLAY_PAUSE) {
        togglePlay();
    } else if (code === TV_KEYS.REWIND || (code === TV_KEYS.LEFT && !isInput)) {
        seekBackward();
    } else if (code === TV_KEYS.FORWARD || (code === TV_KEYS.RIGHT && !isInput)) {
        seekForward();
    } else if ([TV_KEYS.BACK, TV_KEYS.BACK_ALT, TV_KEYS.BACK_TIZEN].includes(code)) {
        if (container.classList.contains('custom-fullscreen')) {
            toggleCustomFullscreen();
            e.preventDefault();
        }
    }
});