//Get details from localStorage in movie.html and populate the movie view page
document.addEventListener("DOMContentLoaded", () => {
    const savedMovie = localStorage.getItem('selectedMovie');
    const video = document.getElementById('movieVideo');

    //Switch to next episode when current one ends
    video.addEventListener('ended', () => {
        const savedMovie = localStorage.getItem('selectedMovie');
        if (!savedMovie) return;

        const movieData = JSON.parse(savedMovie);
        const currentSrc = document.getElementById('videoSource').src;

        // Find the index of the episode that just finished
        const currentIndex = movieData.episodes.findIndex(ep => ep.link === currentSrc);

        // Check if there is a next episode available
        if (currentIndex !== -1 && currentIndex < movieData.episodes.length - 1) {
            const nextEpisode = movieData.episodes[currentIndex + 1];

            // Show a quick "Playing Next" message (Optional)
            showAutoPlayToast(nextEpisode.title);

            // Wait 2 seconds then play next
            setTimeout(() => {
                changeEpisode(nextEpisode.link, nextEpisode.title);
            }, 500);
        } else {
            console.log("End of series/movie.");
        }
    });

    // Simple toast to tell the user the next episode is starting
    function showAutoPlayToast(title) {
        const toast = document.createElement('div');
        toast.innerHTML = `Up Next: ${title}`;
        toast.style.cssText = `
        position: fixed; bottom: 50px; right: 20px; 
        background: #2a0e3c; color: white; border: 1px solid #8e44ad;
        padding: 15px 25px; border-radius: 10px; z-index: 10000;
    `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    if (savedMovie) {
        const movieData = JSON.parse(savedMovie);

        // 1. Fill Main Movie Details
        document.getElementById('movieTitle').textContent = movieData.title;
        document.getElementById('videoSource').src = movieData.video;
        document.getElementById('movieVideo').load();
        document.getElementById('movieInfo').innerHTML = `
            Hero: ${movieData.hero} <br>
            Year: ${movieData.year} <br>
            Language: ${movieData.language}
        `;

        // 2. Generate Episode Cards Automatically
        const grid = document.getElementById('episodesGrid');
        grid.innerHTML = ''; // Clear existing static content

        movieData.episodes.forEach((ep) => {
            // Only create the card if the episode data exists
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
    }
});


// Function to show the styled alert
function showAlert(message) {
    const alertBox = document.getElementById("custom-alert");
    const alertText = document.getElementById("alert-text");

    alertText.innerText = message;
    alertBox.classList.add("show");

    // Hide it automatically after 3 seconds
    setTimeout(() => {
        alertBox.classList.remove("show");
    }, 3000);
}

//Video play and pause button logic
function togglePlay() {
    const video = document.getElementById('movieVideo');
    const icon = document.getElementById('playIcon');

    if (video.paused) {
        video.play();
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
        console.log("Video Playing");
    } else {
        video.pause();
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
        console.log("Video Paused");
    }

    // Call showUI to ensure controls don't hide immediately while pausing
    showUI();
}

// Sync icon if video is played/paused via native controls or other scripts
movieVideo.addEventListener('play', () => {
    document.getElementById('playIcon').classList.replace('fa-play', 'fa-pause');
});

movieVideo.addEventListener('pause', () => {
    document.getElementById('playIcon').classList.replace('fa-pause', 'fa-play');
});
//end

//Play next episode
function playNext() {
    const savedMovie = localStorage.getItem('selectedMovie');
    if (!savedMovie) return;

    const movieData = JSON.parse(savedMovie);
    const currentSrc = document.getElementById('videoSource').src;
    const currentIndex = movieData.episodes.findIndex(ep => ep.link === currentSrc);

    // ... your existing logic ...
    if (currentIndex !== -1 && currentIndex < movieData.episodes.length - 1) {
        const next = movieData.episodes[currentIndex + 1];
        changeEpisode(next.link, next.title);
    } else {
        showAlert("This is the last episode."); // Updated!
    }
}

// Play previous episode function
function playPrevious() {
    const savedMovie = localStorage.getItem('selectedMovie');
    if (!savedMovie) return;

    const movieData = JSON.parse(savedMovie);
    const currentSrc = document.getElementById('videoSource').src;
    const currentIndex = movieData.episodes.findIndex(ep => ep.link === currentSrc);

    // ... your existing logic ...
    if (currentIndex > 0) {
        const prev = movieData.episodes[currentIndex - 1];
        changeEpisode(prev.link, prev.title);
    } else {
        showAlert("This is the first episode."); // Updated!
    }
}

//change episode function to update video source and title
function changeEpisode(url, title) {
    const video = document.getElementById('movieVideo');
    const source = document.getElementById('videoSource');

    source.src = url;
    video.load();


    video.play();
    document.getElementById('movieTitle').textContent = title;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the saved movie data
    const savedMovie = localStorage.getItem('selectedMovie');

    if (savedMovie) {
        const movieData = JSON.parse(savedMovie);

        // Inject text details 
        document.getElementById('movieTitle').textContent = movieData.title;
        document.getElementById('movieInfo').innerHTML = `
                    Hero: ${movieData.hero} <br>
                    Year: ${movieData.year} <br>
                    Language: ${movieData.language} <br>
                `;

        // Inject video and play
        if (movieData.video) {
            const videoElement = document.getElementById('movieVideo');
            const sourceElement = document.getElementById('videoSource');

            sourceElement.src = movieData.video;
            videoElement.load(); // Crucial: forces the player to load the new source
            videoElement.play().catch(err => console.log("Autoplay prevented", err));
        }
    } else {
        document.getElementById('movieTitle').textContent = "Movie Not Found";
    }
});

// Detect if the device is touch-enabled
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (isTouchDevice) {
    // Single tap on video shows/hides controls
    container.addEventListener('click', function () {
        if (overlay.classList.contains('inactive')) {
            showUI();
        } else {
            // Optional: Hide immediately on second tap
            // overlay.classList.add('inactive');
        }
    });
}


// This ensures that when a user taps a button on mobile, 
// the tooltip shows up but doesn't get "stuck"
const navButtons = document.querySelectorAll('.nav-btn');

navButtons.forEach(btn => {
    btn.addEventListener('touchstart', function () {
        // The CSS :hover will trigger on touch
        // We just ensure the UI timer is reset so they can see the name
        showUI();
    });
});


// Additional Controls Logic (Volume, Timer, Custom Fullscreen)
const video = document.getElementById('movieVideo');
const volumeSlider = document.getElementById('volumeSlider');
const currentTimeDisplay = document.getElementById('currentTime');
const durationTimeDisplay = document.getElementById('durationTime');

// 1. Volume Control
volumeSlider.addEventListener('input', (e) => {
    video.volume = e.target.value;
    const icon = document.getElementById('volumeIcon');
    if (video.volume == 0) icon.className = "fas fa-volume-mute";
    else icon.className = "fas fa-volume-up";
});

// 2. Timer Control (Format seconds to MM:SS)
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

video.addEventListener('loadedmetadata', () => {
    durationTimeDisplay.textContent = formatTime(video.duration);
});

video.addEventListener('timeupdate', () => {
    currentTimeDisplay.textContent = formatTime(video.currentTime);
});

// 3. Custom Fullscreen (Z-Index Method)
function toggleCustomFullscreen() {
    const container = document.getElementById('fullscreenContainer');
    const icon = document.getElementById('fullScreenIcon');
    
    container.classList.toggle('custom-fullscreen');

    if (container.classList.contains('custom-fullscreen')) {
        icon.classList.replace('fa-expand', 'fa-compress');
        document.body.style.overflow = "hidden"; // Prevent scrolling behind
    } else {
        icon.classList.replace('fa-compress', 'fa-expand');
        document.body.style.overflow = "auto";
    }
}

// Ensure UI shows on hover (already in your logic, just verify)
function showUI() {
    const overlay = document.getElementById('overlayControls');
    overlay.style.opacity = "1";
    overlay.style.pointerEvents = "auto";
    
    clearTimeout(window.uiTimeout);
    window.uiTimeout = setTimeout(() => {
        if (!video.paused) {
            overlay.style.opacity = "0";
            overlay.style.pointerEvents = "none";
        }
    }, 3000);
}

document.getElementById('fullscreenContainer').addEventListener('mousemove', showUI);

// Progress Bar Logic
const progressBar = document.getElementById('progressBar');
const progressContainer = document.getElementById('progressContainer');

// 1. Update the Bar as the Video Plays
video.addEventListener('timeupdate', () => {
    if (video.duration) {
        const percentage = (video.currentTime / video.duration) * 100;
        // The ball moves because it's attached to the right side of this bar
        progressBar.style.width = `${percentage}%`;
        
        document.getElementById('currentTime').textContent = formatTime(video.currentTime);
    }
});

// 2. Click to Seek (Jump to a specific time)
progressContainer.addEventListener('click', (e) => {
    const containerWidth = progressContainer.offsetWidth;
    const clickX = e.offsetX; // Where the user clicked
    const duration = video.duration;

    if (duration) {
        // Calculate new time: (click position / total width) * total duration
        video.currentTime = (clickX / containerWidth) * duration;
    }
});

// 3. Reset Bar on Episode Change
// Add this inside your existing changeEpisode(url, title) function
function changeEpisode(url, title) {
    const video = document.getElementById('movieVideo');
    const source = document.getElementById('videoSource');

    progressBar.style.width = '0%'; // Reset visual bar
    source.src = url;
    video.load();
    
    video.play();
    document.getElementById('movieTitle').textContent = title;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Optional: Show tooltip on progress bar hover (for desktop)
// Hide cursor and UI when inactive
let timeout;
const container = document.getElementById('fullscreenContainer');
const overlay = document.getElementById('overlayControls');

function hideControls() {
    if (video.paused) return; // Don't hide if paused
    overlay.style.opacity = "0";
    container.style.cursor = "none";
}

container.addEventListener('mousemove', () => {
    overlay.style.opacity = "1";
    container.style.cursor = "default";
    clearTimeout(timeout);
    timeout = setTimeout(hideControls, 1500);
});

// Update the volume icon dynamically
volumeSlider.addEventListener('input', (e) => {
    const val = e.target.value;
    video.volume = val;
    const icon = document.getElementById('volumeIcon');
    if (val == 0) icon.className = "fas fa-volume-mute";
    else if (val < 0.5) icon.className = "fas fa-volume-down";
    else icon.className = "fas fa-volume-up";
});