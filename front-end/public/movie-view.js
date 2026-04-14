// --- 1. Global Variables & Initialization ---
const video = document.getElementById('movieVideo');
const source = document.getElementById('videoSource');
const container = document.getElementById('fullscreenContainer');
const overlay = document.getElementById('overlayControls');
const progressBar = document.getElementById('progressBar');
const progressContainer = document.getElementById('progressContainer');
const volumeSlider = document.getElementById('volumeSlider');
const currentTimeDisplay = document.getElementById('currentTime');
const durationTimeDisplay = document.getElementById('durationTime');

let uiTimeout; // Controls the auto-hide timer

// --- 2. Load Movie Data on Page Start ---
document.addEventListener("DOMContentLoaded", () => {
    const savedMovie = localStorage.getItem('selectedMovie');

    if (savedMovie) {
        const movieData = JSON.parse(savedMovie);

        // Fill Main Movie Details
        document.getElementById('movieTitle').textContent = movieData.title;
        document.getElementById('movieInfo').innerHTML = `
            Hero: ${movieData.hero} <br>
            Year: ${movieData.year} <br>
            Language: ${movieData.language}
        `;

        // Inject video and play
        if (movieData.video) {
            source.src = movieData.video;
            video.load();
            video.play().catch(err => console.log("Autoplay prevented", err));
        }

        // Generate Episode Cards Automatically
        const grid = document.getElementById('episodesGrid');
        grid.innerHTML = '';

        movieData.episodes.forEach((ep) => {
            if (ep.link && ep.title) {
                const card = document.createElement('div');
                card.className = 'episode-card';
                card.onclick = () => changeEpisode(ep.link, ep.title);

                card.innerHTML = `
                    <div class="episode-thumbnail">
                        <img src="${movieData.image}" alt="${ep.title}">
                        <i class="fas fa-play-circle play-icon"></i>
                    </div>
                    <div class="episode-info">
                        <h4>${ep.title}</h4>
                        <p>${ep.time || 'N/A'}</p>
                    </div>
                `;
                grid.appendChild(card);
            }
        });
    } else {
        document.getElementById('movieTitle').textContent = "Movie Not Found";
    }
});

// --- 3. UI Visibility (Mobile & Desktop Fix) ---
function showUI() {
    overlay.style.opacity = "1";
    overlay.style.pointerEvents = "auto";
    container.style.cursor = "default";

    clearTimeout(uiTimeout);

    // Auto-hide after 2.5 seconds if video is playing
    uiTimeout = setTimeout(() => {
        if (!video.paused) {
            overlay.style.opacity = "0";
            overlay.style.pointerEvents = "none";
            container.style.cursor = "none";
        }
    }, 2500);
}

// Show controls on mouse move (Desktop)
container.addEventListener('mousemove', showUI);

// Show controls on tap/touch (Mobile)
container.addEventListener('touchstart', showUI, { passive: true });
container.addEventListener('click', showUI);

// --- 4. Video Playback Controls ---
function togglePlay() {
    const icon = document.getElementById('playIcon');

    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    showUI(); // Keep controls visible when interacting
}

// Sync icon automatically
video.addEventListener('play', () => {
    document.getElementById('playIcon').classList.replace('fa-play', 'fa-pause');
});

video.addEventListener('pause', () => {
    document.getElementById('playIcon').classList.replace('fa-pause', 'fa-play');
});

// --- 5. Episode Navigation ---
function showAlert(message) {
    const alertBox = document.getElementById("custom-alert");
    const alertText = document.getElementById("alert-text");

    alertText.innerText = message;
    alertBox.classList.add("show");

    setTimeout(() => {
        alertBox.classList.remove("show");
    }, 3000);
}

function playNext() {
    const savedMovie = localStorage.getItem('selectedMovie');
    if (!savedMovie) return;

    const movieData = JSON.parse(savedMovie);
    const currentSrc = source.src;
    const currentIndex = movieData.episodes.findIndex(ep => ep.link === currentSrc);

    if (currentIndex !== -1 && currentIndex < movieData.episodes.length - 1) {
        const next = movieData.episodes[currentIndex + 1];
        changeEpisode(next.link, next.title);
    } else {
        showAlert("This is the last episode.");
    }
}

function playPrevious() {
    const savedMovie = localStorage.getItem('selectedMovie');
    if (!savedMovie) return;

    const movieData = JSON.parse(savedMovie);
    const currentSrc = source.src;
    const currentIndex = movieData.episodes.findIndex(ep => ep.link === currentSrc);

    if (currentIndex > 0) {
        const prev = movieData.episodes[currentIndex - 1];
        changeEpisode(prev.link, prev.title);
    } else {
        showAlert("This is the first episode.");
    }
}

function changeEpisode(url, title) {
    progressBar.style.width = '0%'; // Reset visual bar immediately
    source.src = url;
    video.load();
    video.play();

    document.getElementById('movieTitle').textContent = title;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Auto-play next episode when current ends
// Inside movie-view.js, update the 'ended' listener for a better experience
video.addEventListener('ended', () => {
    const savedMovie = localStorage.getItem('selectedMovie');
    if (!savedMovie) return;

    const movieData = JSON.parse(savedMovie);
    const currentSrc = source.src;
    const currentIndex = movieData.episodes.findIndex(ep => ep.link === currentSrc);

    if (currentIndex !== -1 && currentIndex < movieData.episodes.length - 1) {
        const nextEpisode = movieData.episodes[currentIndex + 1];

        // Use bold formatting for the title in the alert
        showAlert(`🎬 Up Next: ${nextEpisode.title}`);

        setTimeout(() => {
            changeEpisode(nextEpisode.link, nextEpisode.title);
        }, 1000); // Give them 2 seconds to read it before switching
    }
});

// --- 6. Progress Bar & Timer Logic (Mobile Safe) ---
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

video.addEventListener('loadedmetadata', () => {
    durationTimeDisplay.textContent = formatTime(video.duration);
});

video.addEventListener('timeupdate', () => {
    if (video.duration) {
        // Calculate the exact percentage of completion
        const percentage = (video.currentTime / video.duration) * 100;

        // Apply the width to the inner color line
        progressBar.style.width = `${percentage}%`;

        // Update the numbers
        document.getElementById('currentTime').textContent = formatTime(video.currentTime);
    }
});

// Mobile-safe Seeking
progressContainer.addEventListener('click', (e) => {
    // getBoundingClientRect ensures accurate click position on any screen size
    const rect = progressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const containerWidth = rect.width;

    if (video.duration) {
        video.currentTime = (clickX / containerWidth) * video.duration;
    }
});

// --- 7. Volume & Fullscreen ---
volumeSlider.addEventListener('input', (e) => {
    const val = e.target.value;
    video.volume = val;
    const icon = document.getElementById('volumeIcon');

    if (val == 0) icon.className = "fas fa-volume-mute";
    else if (val < 0.5) icon.className = "fas fa-volume-down";
    else icon.className = "fas fa-volume-up";
});

function toggleCustomFullscreen() {
    const icon = document.getElementById('fullScreenIcon');
    container.classList.toggle('custom-fullscreen');

    if (container.classList.contains('custom-fullscreen')) {
        icon.classList.replace('fa-expand', 'fa-compress');
        document.body.style.overflow = "hidden";
    } else {
        icon.classList.replace('fa-compress', 'fa-expand');
        document.body.style.overflow = "auto";
    }
}


// --- TV Remote Support Logic ---

const TV_KEYS = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    ENTER: 13,
    BACK: 8,      // Standard back
    BACK_ALT: 461, // LG WebOS back
    BACK_TIZEN: 10009, // Samsung Tizen back
    PLAY_PAUSE: 179,
    REWIND: 412,
    FORWARD: 417
};

document.addEventListener('keydown', (e) => {
    const keyCode = e.keyCode;
    const activeElement = document.activeElement;

    // 1. Handle Media Controls via Remote Buttons
    if (keyCode === TV_KEYS.PLAY_PAUSE) {
        togglePlay();
    } else if (keyCode === TV_KEYS.REWIND) {
        video.currentTime -= 10;
    } else if (keyCode === TV_KEYS.FORWARD) {
        video.currentTime += 10;
    }

    // 2. Handle Back Button (Exit Fullscreen or Go Back)
    if (keyCode === TV_KEYS.BACK || keyCode === TV_KEYS.BACK_ALT || keyCode === TV_KEYS.BACK_TIZEN) {
        if (container.classList.contains('custom-fullscreen')) {
            toggleCustomFullscreen();
            e.preventDefault();
        } else {
            // Optional: history.back() or close app logic
        }
    }

    // 3. Spatial Navigation (D-Pad)
    // Most browsers handle basic Up/Down/Left/Right focus automatically 
    // IF the elements have tabindex="0".
});

// Function to make dynamic elements focusable
function makeElementsFocusable() {
    // Make sure all buttons and the video itself can be focused
    const focusableItems = document.querySelectorAll('button, .episode-card, input[type="range"]');
    focusableItems.forEach(item => {
        item.setAttribute('tabindex', '0');
    });
}

// Call this whenever you generate your Episodes Grid
// Example: After your forEach loop that creates episode cards
makeElementsFocusable();
// Auto-focus the play button or video container for TV users
setTimeout(() => {
    const playBtn = document.querySelector('.main-controls button');
    if (playBtn) playBtn.focus();
}, 500);