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
const hoverTimer = document.getElementById('hover-timer');
const bufferBar = document.getElementById('bufferBar');

const TV_KEYS = {
    UP: 38, DOWN: 40, LEFT: 37, RIGHT: 39, ENTER: 13,
    BACK: 8, BACK_ALT: 461, BACK_TIZEN: 10009,
    PLAY_PAUSE: 179, REWIND: 412, FORWARD: 417, A_KEY: 65
};

let audioCtx, gainNode, track, uiTimeout;

// --- NEW: YouTube Integration Variables ---
let currentPlaybackMode = 'MP4';
let currentPlayingUrl = '';
let ytPlayer = null;
let ytProgressTimer = null;

// 1. Load the YouTube API in the background
const ytScript = document.createElement('script');
ytScript.src = "https://www.youtube.com/iframe_api";
const firstScript = document.getElementsByTagName('script')[0];
firstScript.parentNode.insertBefore(ytScript, firstScript);

// 2. Initialize the YouTube Player
function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('youtubePlayer', {
        events: { 'onStateChange': onPlayerStateChange }
    });
}

// 3. Sync YouTube states with your custom Play/Pause UI and Loading Border
function onPlayerStateChange(event) {
    if (currentPlaybackMode !== 'YOUTUBE') return;

    const playBtn = document.querySelector('.play-btn');

    if (event.data === YT.PlayerState.BUFFERING) {
        playBtn.classList.add('is-loading');
        showUI(); // <-- NEW: Instantly show the UI so the user sees the loading ring
    } else {
        playBtn.classList.remove('is-loading');
    }

    if (event.data === YT.PlayerState.PLAYING) {
        document.getElementById('playIcon').classList.replace('fa-play', 'fa-pause');
        startYTProgress();
        showUI(); // <-- NEW: Restart the auto-hide timer now that the video is playing again
    } else if (event.data === YT.PlayerState.PAUSED) {
        document.getElementById('playIcon').classList.replace('fa-pause', 'fa-play');
        clearInterval(ytProgressTimer);
    } else if (event.data === YT.PlayerState.ENDED) {
        clearInterval(ytProgressTimer);
        handleAutoNext();
    }
}

// 4. Custom Progress Bar & Buffer Tracker for YouTube
function startYTProgress() {
    clearInterval(ytProgressTimer);
    ytProgressTimer = setInterval(() => {
        if (ytPlayer && ytPlayer.getCurrentTime) {
            const current = ytPlayer.getCurrentTime();
            const total = ytPlayer.getDuration();

            if (total) {
                // Update Progress Line & Timers
                progressBar.style.width = `${(current / total) * 100}%`;
                currentTimeDisplay.textContent = formatTime(current);
                durationTimeDisplay.textContent = formatTime(total);

                // NEW: Update the Buffer Bar (Download Line) for YouTube
                const loadedFraction = ytPlayer.getVideoLoadedFraction(); // returns a decimal 0.0 to 1.0
                if (loadedFraction) {
                    bufferBar.style.width = `${loadedFraction * 100}%`;
                }
            }
        }
    }, 500);
}

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
    // --- UPDATED: Start from the specific episode they left off on ---
    setupInitialVideo(movieData.lastPlayedLink || movieData.video);
    document.getElementById('movieTitle').textContent = movieData.lastPlayedTitle || movieData.title;
    makeElementsFocusable();

    // TV Auto-focus
    setTimeout(() => {
        const playBtn = document.querySelector('.main-controls button');
        if (playBtn) playBtn.focus();
    }, 500);

    // ==========================================
    // NEW: FIRST-TIME BUTTON-TARGETED TOOLTIP
    // ==========================================
    if (!localStorage.getItem('hasSeenFullscreenAlert')) {
        setTimeout(() => {
            const fsBtn = document.querySelector('.fullscreen-btn');
            if (fsBtn) {
                // Wake up the UI so the button is actually visible on screen
                showUI();

                // Create a temporary clone of your TV tooltip
                const introTip = document.createElement('div');
                introTip.className = 'tv-remote-tooltip';
                introTip.innerHTML = "Tip: Double-Tap 'OK' or press 'A' to Fullscreen";
                document.body.appendChild(introTip);

                // Calculate position dynamically so it's always attached to the button
                const rect = fsBtn.getBoundingClientRect();
                introTip.style.left = `${rect.left + (rect.width / 2)}px`;

                // Smart positioning: if button is top-right (normal view), show BELOW it.
                // If button is bottom-right (fullscreen mode), show ABOVE it.
                if (rect.top < 60) {
                    introTip.style.top = `${rect.bottom + 15}px`;
                } else {
                    introTip.style.top = `${rect.top - 45}px`;
                }
                
                introTip.style.opacity = '1';

                // Fade out and safely remove after 5 seconds
                setTimeout(() => {
                    introTip.style.opacity = '0';
                    setTimeout(() => introTip.remove(), 300); // Clean up DOM
                }, 5000);

                // Save to localStorage so it only shows on the very first visit
                localStorage.setItem('hasSeenFullscreenAlert', 'true');
            }
        }, 1500); 
    }
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
                </div>
                <div class="episode-info">
                    <h4>${ep.title}</h4>
                    <p>${ep.time}</p>
                </div>`;
            grid.appendChild(card);
        }
    });
}

// --- NEW: Helper function to detect and format YouTube URLs ---
// --- UPDATED: Play logic to handle Custom Controls on YouTube ---
function getYouTubeEmbedUrl(url) {
    if (!url) return null;
    let videoId = "";
    if (url.includes("youtu.be/")) videoId = url.split("youtu.be/")[1]?.split("?")[0];
    else if (url.includes("youtube.com/watch")) videoId = url.split("v=")[1]?.split("&")[0];

    // Added controls=0 (hides YT UI) and enablejsapi=1 (links our custom buttons)
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&controls=0&enablejsapi=1&disablekb=1` : null;
}

function playMedia(url) {
    currentPlayingUrl = url; // Save URL for Auto-Next logic
    const ytEmbedUrl = getYouTubeEmbedUrl(url);
    const ytPlayerIframe = document.getElementById('youtubePlayer');
    const overlay = document.getElementById('overlayControls');

    if (ytEmbedUrl) {
        currentPlaybackMode = 'YOUTUBE';
        video.style.display = 'none';
        video.pause();

        // --- NEW: Stop MP4 Ambilight and Start YouTube Ambilight ---
        cancelAnimationFrame(ambilightFrameId);

        let videoId = "";
        if (url.includes("youtu.be/")) videoId = url.split("youtu.be/")[1]?.split("?")[0];
        else if (url.includes("youtube.com/watch")) videoId = url.split("v=")[1]?.split("&")[0];

        if (videoId) applyYouTubeAmbilight(videoId);
        // -----------------------------------------------------------

        ytPlayerIframe.style.display = 'block';
        ytPlayerIframe.src = ytEmbedUrl;

        overlay.style.display = 'flex'; // FORCE your custom controls to show
    } else if (url) {
        currentPlaybackMode = 'MP4';
        ytPlayerIframe.style.display = 'none';
        ytPlayerIframe.style.boxShadow = "none"; // Clear YT shadow
        if (ytPlayer && typeof ytPlayer.stopVideo === 'function') ytPlayer.stopVideo();

        video.style.display = 'block';
        overlay.style.display = 'flex';

        source.src = url;
        video.load();
        video.play().catch(err => console.log("Autoplay prevented", err));
    }
}

function setupInitialVideo(url) {
    playMedia(url);
}

function changeEpisode(url, title) {
    progressBar.style.width = '0%';
    bufferBar.style.width = '0%'; // Reset buffer view

    playMedia(url); // Uses the new smart function

    document.getElementById('movieTitle').textContent = title;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // --- NEW: SAVE EPISODE PROGRESS STATE GLOBALLY ---
    const savedMovieStr = localStorage.getItem('selectedMovie');
    if (savedMovieStr) {
        let movieData = JSON.parse(savedMovieStr);
        movieData.lastPlayedLink = url;
        movieData.lastPlayedTitle = title;
        localStorage.setItem('selectedMovie', JSON.stringify(movieData));

        // Sync with Recently Watched so movie.html knows immediately
        let recentMovies = JSON.parse(localStorage.getItem('recentMovies')) || [];
        let index = recentMovies.findIndex(m => m.title === movieData.title);
        if (index !== -1) {
            recentMovies[index].lastPlayedLink = url;
            recentMovies[index].lastPlayedTitle = title;
            localStorage.setItem('recentMovies', JSON.stringify(recentMovies));
        }
    }
}

// --- 3. Playback & Navigation Logic ---
function togglePlay() {
    if (currentPlaybackMode === 'YOUTUBE' && ytPlayer) {
        const state = ytPlayer.getPlayerState();
        if (state === YT.PlayerState.PLAYING) ytPlayer.pauseVideo();
        else ytPlayer.playVideo();
    } else {
        video.paused ? video.play() : video.pause();
    }
    showUI();
}

function seekForward() {
    if (currentPlaybackMode === 'YOUTUBE' && ytPlayer) {
        ytPlayer.seekTo(ytPlayer.getCurrentTime() + 10, true);
    } else {
        video.currentTime = Math.min(video.duration, video.currentTime + 10);
    }
    showAlert("+10s ⏩");
    showUI();
}

function seekBackward() {
    if (currentPlaybackMode === 'YOUTUBE' && ytPlayer) {
        ytPlayer.seekTo(Math.max(0, ytPlayer.getCurrentTime() - 10), true);
    } else {
        video.currentTime = Math.max(0, video.currentTime - 10);
    }
    showAlert("⏪ -10s");
    showUI();
}



// Ensure clicking the background pauses/plays the video properly
container.addEventListener('click', (e) => {
    showUI();
    // If they click on the video area itself (not the controls), toggle play
    if (e.target === container || e.target === document.getElementById('youtubePlayer') || e.target === video) {
        togglePlay();
    }
});

// --- Auto-Next Episode Logic ---
function handleAutoNext() {
    const movieData = JSON.parse(localStorage.getItem('selectedMovie'));
    if (!movieData) return;

    if (currentPlayingUrl === movieData.video) {
        if (movieData.episodes?.length > 0) {
            const firstEp = movieData.episodes[0];
            showAlert(`🎥 Trailer Ended. Starting: ${firstEp.title}`);
            setTimeout(() => changeEpisode(firstEp.link, firstEp.title), 1500);
        }
    } else {
        const currentIndex = movieData.episodes.findIndex(ep => currentPlayingUrl === ep.link);
        if (currentIndex !== -1 && currentIndex < movieData.episodes.length - 1) {
            const nextEp = movieData.episodes[currentIndex + 1];
            showAlert(`🎬 Up Next: ${nextEp.title}`);
            setTimeout(() => changeEpisode(nextEp.link, nextEp.title), 1000);
        }
    }
}
// Listen for MP4 ending (YouTube ending is handled in onPlayerStateChange)
video.addEventListener('ended', handleAutoNext);

// --- MP4 Buffering / Loading State Trackers ---
video.addEventListener('waiting', () => {
    if (currentPlaybackMode === 'MP4') {
        document.querySelector('.play-btn').classList.add('is-loading');
        showUI(); // <-- NEW: Show UI while loading
    }
});

video.addEventListener('playing', () => {
    if (currentPlaybackMode === 'MP4') {
        document.querySelector('.play-btn').classList.remove('is-loading');
        showUI(); // <-- NEW: Restart the auto-hide timer
    }
});

video.addEventListener('canplay', () => {
    if (currentPlaybackMode === 'MP4') {
        document.querySelector('.play-btn').classList.remove('is-loading');
    }
});

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

// --- 5. Audio & Volume ---
volumeSlider.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value); // 0 to 3 scale

    if (currentPlaybackMode === 'YOUTUBE' && ytPlayer) {
        // YouTube API handles volume from 0 to 100. It cannot boost past 100%.
        // If slider is 1 (normal), YT is 100%. If slider is 0.5, YT is 50%.
        let ytVol = Math.min(val * 100, 100);

        if (val === 0) {
            ytPlayer.mute();
        } else {
            ytPlayer.unMute();
            ytPlayer.setVolume(ytVol);
        }
    } else {
        // Standard MP4 Web Audio API Logic
        initAudio();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        if (gainNode) gainNode.gain.value = val;
    }

    // Update the UI Icon
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
        let isPlaying = false;

        // NEW: Check if the play button currently has the loading ring on it
        let isLoading = document.querySelector('.play-btn').classList.contains('is-loading');

        if (currentPlaybackMode === 'YOUTUBE' && ytPlayer && typeof ytPlayer.getPlayerState === 'function') {
            isPlaying = (ytPlayer.getPlayerState() === YT.PlayerState.PLAYING);
        } else if (video) {
            isPlaying = !video.paused;
        }

        // Hide the UI ONLY if the video is actively playing AND it is NOT currently buffering
        if (isPlaying && !isLoading) {
            overlay.style.opacity = "0";
            overlay.style.pointerEvents = "none";
            container.style.cursor = "none";
        }
    }, 2500);
}

// This function remains in your movie-view.js
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

    // --- NEW: Re-apply the static YouTube background if switching screen modes ---
    if (currentPlaybackMode === 'YOUTUBE') {
        if (typeof updateAmbilightUI === 'function') updateAmbilightUI();
    }
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

// Define the layout of our controls for 2D navigation (Up/Down/Left/Right)
// We organize them into "Rows"
// ==========================================
// SMART TV & PC KEYBOARD NAVIGATION SYSTEM
// ==========================================

let tvRows = [];
let currentRow = -1;
let currentCol = 1; // Default to the Play Button
let focusTimeout = null;
let tvTooltip = null; // The floating name label

function initTVNavigation() {
    // 1. Create the Tooltip Element dynamically
    tvTooltip = document.createElement('div');
    tvTooltip.className = 'tv-remote-tooltip';
    document.body.appendChild(tvTooltip);

    // 2. Map the buttons
    const prevBtn = document.querySelector('.main-controls .nav-btn:nth-child(1)');
    const playBtn = document.querySelector('.play-btn');
    const nextBtn = document.querySelector('.main-controls .nav-btn:nth-child(3)');
    const timeline = document.getElementById('progressContainer');
    const volume = document.getElementById('volumeSlider');
    const fullscreen = document.querySelector('.fullscreen-btn');

    // 3. Set custom names for the TV Tooltip
    if (prevBtn) prevBtn.dataset.tvName = "Previous Episode";
    if (playBtn) playBtn.dataset.tvName = "Play / Pause";
    if (nextBtn) nextBtn.dataset.tvName = "Next Episode";
    if (timeline) timeline.dataset.tvName = "Time Line";
    if (volume) volume.dataset.tvName = "Volume Control";
    if (fullscreen) fullscreen.dataset.tvName = "Full Screen Option";

    // 4. Organize into strict vertical Rows for Up/Down navigation
    tvRows = [
        [prevBtn, playBtn, nextBtn].filter(Boolean), // Row 0: Main Controls
        [timeline].filter(Boolean),                  // Row 1: Timeline
        [volume].filter(Boolean),                    // Row 2: Volume
        [fullscreen].filter(Boolean)                 // Row 3: Fullscreen
    ];
}

document.addEventListener("DOMContentLoaded", initTVNavigation);

function updateFocusUI() {
    // 1. Remove old focus and hide tooltip
    document.querySelectorAll('.tv-focused').forEach(el => el.classList.remove('tv-focused'));
    tvTooltip.style.opacity = '0';

    if (currentRow === -1 || !tvRows[currentRow] || !tvRows[currentRow][currentCol]) return;

    // 2. Apply focus to new element
    const target = tvRows[currentRow][currentCol];
    target.classList.add('tv-focused');

    // 3. Show the Tooltip directly above the focused element!
    const rect = target.getBoundingClientRect();
    tvTooltip.textContent = target.dataset.tvName || "Control";
    tvTooltip.style.left = `${rect.left + (rect.width / 2)}px`;
    tvTooltip.style.top = `${rect.top - 45}px`; // 45px above the button
    tvTooltip.style.opacity = '1';

    showUI();

    // Auto-hide the ring AND the tooltip after 2 seconds
    clearTimeout(focusTimeout);
    focusTimeout = setTimeout(() => {
        target.classList.remove('tv-focused');
        tvTooltip.style.opacity = '0';
    }, 2000);
}

// Add this variable right above your keydown listener
let lastEnterTime = 0;

// --- The Keydown Listener ---
document.addEventListener('keydown', (e) => {

    // 1. STRICT DEVICE DETECTION (Allows ONLY PCs & Laptops. Blocks Mobile, Tablets, & TVs)
    const ua = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobi|Tablet/i.test(ua);
    const isMacTablet = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    const isSmartTV = /TV|SmartTV|Web0S|Tizen|Roku|Android TV|BRAVIA|Viera/i.test(ua);

    // If it is a phone, tablet, OR Smart TV, block this keyboard logic completely.
    if (isMobile || isMacTablet || isSmartTV) {
        return;
    }

    // 2. PAGE BODY PROTECTION LOGIC (Allows normal webpage scrolling on PC)
    const isFullscreen = container.classList.contains('custom-fullscreen');

    if (!isFullscreen) {
        const isHovering = container.matches(':hover');
        const isFocused = container.contains(document.activeElement);
        if (!isHovering && !isFocused) {
            return; // Allow the spacebar and arrows to scroll the page normally
        }
    }

    const code = e.keyCode;
    const isInput = ['BUTTON', 'INPUT', 'TEXTAREA'].includes(document.activeElement.tagName) && e.target.id !== 'volumeSlider';

    // --- ADD THIS LINE ---
    // If the user is typing in a text box (like a search bar), ignore video hotkeys
    if (isInput) return;

    // ==========================================
    // NEW: DOUBLE-TAP (ENTER) FOR TV REMOTE 
    // ==========================================
    if (code === TV_KEYS.ENTER) {
        const now = Date.now();
        if (now - lastEnterTime < 400) { // If pressed twice within 400ms
            e.preventDefault();
            toggleCustomFullscreen();
            lastEnterTime = 0; // Reset the timer
            return; 
        }
        lastEnterTime = now;
    }

    // 3. GLOBAL HOTKEYS 
    if (code === 32 || code === TV_KEYS.PLAY_PAUSE) {
        e.preventDefault();
        togglePlay();
        updateFocusUI();
        return;
    }

    // --- RESTORED: "A" Key for Fullscreen ---
    if (code === TV_KEYS.A_KEY || code === 65) {
        e.preventDefault();
        toggleCustomFullscreen();
        return;
    }
    // ----------------------------------------

    if ([TV_KEYS.BACK, TV_KEYS.BACK_ALT, TV_KEYS.BACK_TIZEN].includes(code)) {
        if (isFullscreen) {
            toggleCustomFullscreen();
            e.preventDefault();
        }
        return;
    }


    // 3. Cinematic / Wake-up Logic
    const isFocusVisible = document.querySelector('.tv-focused');

    if (overlay.style.opacity === "0" || overlay.style.opacity === "" || !isFocusVisible) {
        if (code === TV_KEYS.ENTER) togglePlay();
        else if (code === TV_KEYS.LEFT) seekBackward();
        else if (code === TV_KEYS.RIGHT) seekForward();

        // --- UPDATED: Smart Wake-up targeting ---
        if (code === TV_KEYS.UP) {
            currentRow = 0; currentCol = 1; // Wakes up on Play
        }
        else if (code === TV_KEYS.DOWN) {
            currentRow = 1; currentCol = 0; // Wakes up on Timeline
        }
        else if (code === TV_KEYS.LEFT || code === TV_KEYS.RIGHT) {
            currentRow = 1; currentCol = 0; // Wakes up directly on Timeline for seamless scrubbing!
        }
        else {
            currentRow = 0; currentCol = 1; // Default to Play for ENTER
        }

        updateFocusUI();
        e.preventDefault();
        return;
    }

    // 4. VERTICAL NAVIGATION (UP/DOWN)
    if (code === TV_KEYS.UP) {
        e.preventDefault();
        if (currentRow > 0) {
            currentRow--;
            currentCol = Math.min(currentCol, tvRows[currentRow].length - 1);
            updateFocusUI();
        }
    }
    else if (code === TV_KEYS.DOWN) {
        e.preventDefault();
        if (currentRow < tvRows.length - 1) {
            currentRow++;
            currentCol = Math.min(currentCol, tvRows[currentRow].length - 1);
            updateFocusUI();
        }
    }
    // 5. HORIZONTAL ACTION LOGIC (LEFT/RIGHT)
    else if (code === TV_KEYS.LEFT) {
        e.preventDefault();
        const target = tvRows[currentRow][currentCol];

        if (currentRow === 0) {
            // Only navigate between Prev -> Play if on Row 0
            if (currentCol > 0) { currentCol--; updateFocusUI(); }
        } else if (target && target.id === 'volumeSlider') {
            volumeSlider.value = Math.max(0, parseFloat(volumeSlider.value) - 0.1);
            volumeSlider.dispatchEvent(new Event('input'));
            updateFocusUI();
        } else {
            seekBackward();
            updateFocusUI();
        }
    }
    else if (code === TV_KEYS.RIGHT) {
        e.preventDefault();
        const target = tvRows[currentRow][currentCol];

        if (currentRow === 0) {
            // Only navigate between Play -> Next if on Row 0
            if (currentCol < tvRows[currentRow].length - 1) { currentCol++; updateFocusUI(); }
        } else if (target && target.id === 'volumeSlider') {
            volumeSlider.value = Math.min(3, parseFloat(volumeSlider.value) + 0.1);
            volumeSlider.dispatchEvent(new Event('input'));
            updateFocusUI();
        } else {
            seekForward();
            updateFocusUI();
        }
    }
    // 6. ENTER KEY LOGIC
    else if (code === TV_KEYS.ENTER) {
        e.preventDefault();
        if (currentRow !== -1) {
            const target = tvRows[currentRow][currentCol];
            if (target) target.click();
            updateFocusUI();
        }
    }
});


// Optional: Handle TV-specific focus navigation if needed (e.g., for episode cards)
// --- 8. Dynamic Top/Bottom Ambilight Logic ---
const ambilightCanvas = document.createElement('canvas');
const ambilightCtx = ambilightCanvas.getContext('2d', { willReadFrequently: true });
let ambilightFrameId;

function updateAmbilight() {
    if (video.paused || video.ended) return;

    try {
        // Sample a small version of the video for performance
        ambilightCanvas.width = 64;
        ambilightCanvas.height = 64;
        ambilightCtx.drawImage(video, 0, 0, ambilightCanvas.width, ambilightCanvas.height);

        const imageData = ambilightCtx.getImageData(0, 0, 64, 64).data;
        let r = 0, g = 0, b = 0, count = 0;

        // Calculate average color
        for (let i = 0; i < imageData.length; i += 16) {
            r += imageData[i];
            g += imageData[i + 1];
            b += imageData[i + 2];
            count++;
        }

        r = Math.floor(r / count);
        g = Math.floor(g / count);
        b = Math.floor(b / count);

        const color = `rgba(${r}, ${g}, ${b}, 0.8)`;
        const shadowStr = `0px -35px 50px -15px ${color}, 0px 35px 50px -15px ${color}`;

        // --- NEW: Smart Fullscreen Glow Routing for MP4 ---
        if (container.classList.contains('custom-fullscreen')) {
            // In Fullscreen: The glow directly wraps the video element in the center of the screen!
            container.style.boxShadow = "none";
            video.style.boxShadow = shadowStr;

            const bgR = Math.floor(r * 0.2);
            const bgG = Math.floor(g * 0.2);
            const bgB = Math.floor(b * 0.2);

            container.style.background = `linear-gradient(
                to bottom, 
                rgb(${bgR}, ${bgG}, ${bgB}) 0%, 
                #000 15%, 
                #000 85%, 
                rgb(${bgR}, ${bgG}, ${bgB}) 100%
            )`;
        } else {
            // In Normal View: The glow wraps the outer container so it doesn't get cut off
            video.style.boxShadow = "none";
            container.style.boxShadow = shadowStr;
            container.style.background = "#000";
        }

    } catch (e) {
        console.error("Ambilight Error:", e);
    }

    ambilightFrameId = requestAnimationFrame(updateAmbilight);
}

// Attach listeners without affecting existing logic
video.addEventListener('play', () => updateAmbilight());
video.addEventListener('pause', () => cancelAnimationFrame(ambilightFrameId));
video.addEventListener('ended', () => cancelAnimationFrame(ambilightFrameId));


//currect calculation for the timer line
// --- NEW: YouTube Static Ambilight Workaround ---
// Grabs the average color of the YouTube thumbnail since CORS blocks live pixel reading
let currentAmbilightColor = { r: 0, g: 0, b: 0 }; // Store for fullscreen toggling

function applyYouTubeAmbilight(videoId) {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Allows us to legally read the image pixels
    img.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

    img.onload = () => {
        try {
            ambilightCanvas.width = 64;
            ambilightCanvas.height = 64;
            ambilightCtx.drawImage(img, 0, 0, 64, 64);

            const imageData = ambilightCtx.getImageData(0, 0, 64, 64).data;
            let r = 0, g = 0, b = 0, count = 0;

            for (let i = 0; i < imageData.length; i += 16) {
                r += imageData[i];
                g += imageData[i + 1];
                b += imageData[i + 2];
                count++;
            }

            // Save the colors globally
            currentAmbilightColor = {
                r: Math.floor(r / count),
                g: Math.floor(g / count),
                b: Math.floor(b / count)
            };

            updateAmbilightUI();
        } catch (e) {
            console.error("YouTube Ambilight Error (CORS):", e);
        }
    };
}


// Applies the calculated colors to the HTML elements
function updateAmbilightUI() {
    const { r, g, b } = currentAmbilightColor;
    const color = `rgba(${r}, ${g}, ${b}, 0.8)`;
    const shadowStr = `0px -35px 50px -15px ${color}, 0px 35px 50px -15px ${color}`;
    const ytPlayerIframe = document.getElementById('youtubePlayer');

    if (container.classList.contains('custom-fullscreen')) {
        // Fullscreen: Glow wraps the YouTube iframe
        container.style.boxShadow = "none";
        if (ytPlayerIframe) ytPlayerIframe.style.boxShadow = shadowStr;

        const bgR = Math.floor(r * 0.2);
        const bgG = Math.floor(g * 0.2);
        const bgB = Math.floor(b * 0.2);
        container.style.background = `linear-gradient(to bottom, rgb(${bgR}, ${bgG}, ${bgB}) 0%, #000 15%, #000 85%, rgb(${bgR}, ${bgG}, ${bgB}) 100%)`;
    } else {
        // Normal View: Glow wraps the container
        if (ytPlayerIframe) ytPlayerIframe.style.boxShadow = "none";
        container.style.boxShadow = shadowStr;
        container.style.background = "#000";
    }
}

// ==========================================
// UNIFIED PROGRESS BAR LOGIC (CLICK, TOUCH & DRAG)
// ==========================================
let isDragging = false;

function scrub(e) {
    // 1. Get the exact X position (works for both Mouse Clicks and Mobile Touches)
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;

    // 2. Calculate the percentage of where the user clicked on the bar
    const rect = progressContainer.getBoundingClientRect();
    let pos = (clientX - rect.left) / rect.width;
    pos = Math.max(0, Math.min(1, pos)); // Keep between 0% and 100%

    // 3. Route the command to the active player
    if (currentPlaybackMode === 'YOUTUBE' && ytPlayer && typeof ytPlayer.getDuration === 'function') {
        const ytDuration = ytPlayer.getDuration();
        if (ytDuration > 0) {
            ytPlayer.seekTo(pos * ytDuration, true);
            progressBar.style.width = `${pos * 100}%`;
        }
    } else if (video && video.duration) {
        video.currentTime = pos * video.duration;
        progressBar.style.width = `${pos * 100}%`;
    }
}

// --- Event Listeners for the Timeline ---

// Mouse Events (PC/Laptop)
progressContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    scrub(e); // Seek immediately on click
});
window.addEventListener('mousemove', (e) => {
    if (isDragging) scrub(e); // Seek while moving
});
window.addEventListener('mouseup', () => {
    isDragging = false;
});

// Touch Events (Mobile/Tablet)
progressContainer.addEventListener('touchstart', (e) => {
    isDragging = true;
    scrub(e);
}, { passive: true });
window.addEventListener('touchmove', (e) => {
    if (isDragging) scrub(e);
}, { passive: true });
window.addEventListener('touchend', () => {
    isDragging = false;
});


//download video time-line view
video.addEventListener('progress', () => {
    if (video.duration > 0) {
        for (let i = 0; i < video.buffered.length; i++) {
            // Check if the current time of the video is within a buffered range
            if (video.buffered.start(video.buffered.length - 1 - i) < video.currentTime) {
                const bufferedEnd = video.buffered.end(video.buffered.length - 1 - i);
                const width = (bufferedEnd / video.duration) * 100;
                bufferBar.style.width = `${width}%`;
                break;
            }
        }
    }
});



// Hover to view my cloud video,youtube video time on the top 
progressContainer.addEventListener('mousemove', (e) => {
    // 1. Determine which duration to use (MP4 or YouTube)
    let duration = 0;
    if (currentPlaybackMode === 'YOUTUBE' && ytPlayer && typeof ytPlayer.getDuration === 'function') {
        duration = ytPlayer.getDuration();
    } else if (video.duration) {
        duration = video.duration;
    }

    // 2. Only show the hover timer if we successfully found a duration
    if (duration > 0) {
        const rect = progressContainer.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const width = rect.width;

        // Calculate the percentage of the bar hovered
        const percent = Math.max(0, Math.min(1, offsetX / width));

        // Calculate the time at that specific point
        const hoverTime = percent * duration;

        // Update the tooltip text
        hoverTimer.textContent = formatTime(hoverTime);

        // Move the tooltip to follow the mouse
        hoverTimer.style.left = `${offsetX}px`;
        hoverTimer.style.display = 'block'; // Ensure it becomes visible
    }
});

// Ensure it hides correctly when mouse leaves
progressContainer.addEventListener('mouseleave', () => {
    hoverTimer.style.display = 'none';
});

progressContainer.addEventListener('mouseenter', () => {
    // Re-check duration so it doesn't show an empty box if no video is loaded
    let hasDuration = (currentPlaybackMode === 'YOUTUBE' && ytPlayer) || video.duration;
    if (hasDuration) hoverTimer.style.display = 'block';
});