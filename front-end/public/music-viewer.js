const playlist = JSON.parse(localStorage.getItem('currentPlaylist'));
const listContainer = document.getElementById('musicList');
const audioPlayer = document.getElementById('mainAudio');
const titleDisplay = document.getElementById('currentTitle');
const imgDisplay = document.getElementById('currentImg');
const alertBox = document.getElementById('music-alert');
const alertText = document.getElementById('alert-text');

let currentIndex = 0;

// Add this function to the bottom of music-viewer.js
function updateCardBackground(imgElement) {
    const nowPlayingCard = document.querySelector('.now-playing');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    imgElement.onload = function () {
        // Draw image to canvas to get pixel data
        canvas.width = imgElement.naturalWidth;
        canvas.height = imgElement.naturalHeight;
        ctx.drawImage(imgElement, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let r = 0, g = 0, b = 0;

        // Sample pixels
        for (let i = 0; i < imageData.length; i += 40) { // Increment by 40 for performance
            r += imageData[i];
            g += imageData[i + 1];
            b += imageData[i + 2];
        }

        const count = imageData.length / 40;
        r = Math.floor(r / count);
        g = Math.floor(g / count);
        b = Math.floor(b / count);

        // Apply a dark version of the color to the card background
        // Using rgba with 0.7 opacity ensures the text remains readable against your dark theme
        nowPlayingCard.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.7)`;

        // Optional: Update the glow effect of the image to match
        imgElement.style.boxShadow = `0 0 30px rgb(${r}, ${g}, ${b})`;
    };

    // Trigger if image is already loaded (cached)
    if (imgElement.complete) imgElement.onload();
}

// Update your playSong function to trigger the color change
function playSong(index) {
    if (!playlist || index < 0 || index >= playlist.length) return;

    currentIndex = index;
    const song = playlist[index];

    audioPlayer.src = song.url;
    titleDisplay.innerText = song.title;
    imgDisplay.src = song.image;

    // Call the new background update function
    updateCardBackground(imgDisplay);

    audioPlayer.play();
    updateActiveHighlight();
    showMusicAlert("Now Playing: " + song.title);
}

function updateActiveHighlight() {
    // Get all cart items
    const allItems = document.querySelectorAll('.cart-item');

    // Remove the 'playing' class from everyone
    allItems.forEach(item => item.classList.remove('playing'));

    // Add the 'playing' class to the current one
    if (allItems[currentIndex]) {
        allItems[currentIndex].classList.add('playing');

        // Automatically scroll to the playing song if it's hidden in the list
        allItems[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Navigation functions
function showMusicAlert(message) {
    alertText.innerText = message;
    alertBox.classList.add('show');

    // Hide the message after 3 seconds
    setTimeout(() => {
        alertBox.classList.remove('show');
    }, 4000);
}

// Auto-play the next song when the current one ends
audioPlayer.onended = () => {
    let nextIndex = (currentIndex + 1) % playlist.length; // Loops back to start after song 6
    playSong(nextIndex);
};

// Create the list of songs in the UI
if (playlist && playlist.length > 0) {
    listContainer.innerHTML = ""; // Clear existing placeholder items

    playlist.forEach((song, index) => {
        const item = document.createElement('div');
        item.className = 'cart-item';
        item.innerHTML = `
            <img src="${song.image}" alt="cover">
            <div class="cart-item-info">
                <h4>${song.title}</h4>
            </div>
        `;
        item.onclick = () => playSong(index);
        listContainer.appendChild(item);
    });

    // --- NEW LOGIC FOR SPECIFIC SONG START ---
    // Read the targeted song index from Voice Assistant, default to 0 if not present
    let startIndex = parseInt(localStorage.getItem('targetSongIndex')) || 0;
    
    // Safety check: ensure index exists in the playlist
    if (startIndex < 0 || startIndex >= playlist.length) {
        startIndex = 0; 
    }

    // Start playing the targeted song immediately
    playSong(startIndex);

    // Clear the stored index so manual clicks default back to index 0 next time
    localStorage.removeItem('targetSongIndex');
    // -----------------------------------------
}

// New Selectors
const progressSlider = document.getElementById('progressSlider');
const volumeSlider = document.getElementById('volumeSlider');
const currentTimeText = document.getElementById('currentTime');
const durationTimeText = document.getElementById('durationTime');

// Format time from seconds to MM:SS
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

// Update Progress Slider and Timer
audioPlayer.ontimeupdate = () => {
    if (!isNaN(audioPlayer.duration)) {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressSlider.value = progress;
        currentTimeText.innerText = formatTime(audioPlayer.currentTime);
    }
};

// Set duration once metadata is loaded
audioPlayer.onloadedmetadata = () => {
    durationTimeText.innerText = formatTime(audioPlayer.duration);
};

// Seek song position
progressSlider.oninput = () => {
    const seekTime = (progressSlider.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
};

// Volume Control
volumeSlider.oninput = () => {
    audioPlayer.volume = volumeSlider.value;
    const icon = document.getElementById('volumeIcon');
    if (audioPlayer.volume === 0) icon.className = "fas fa-volume-mute";
    else if (audioPlayer.volume < 0.5) icon.className = "fas fa-volume-down";
    else icon.className = "fas fa-volume-up";
};

// Keep your existing Play/Pause/Next/Prev listeners from the previous step!

// New Selectors for the buttons
const playPauseBtn = document.getElementById('playPauseBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

// Play/Pause Toggle Logic
playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
});

// Update Play/Pause icon based on audio state
audioPlayer.onplay = () => {
    playPauseBtn.classList.replace('fa-play', 'fa-pause');
};
audioPlayer.onpause = () => {
    playPauseBtn.classList.replace('fa-pause', 'fa-play');
};

// Next Song Logic (Reuses your existing calculation)
nextBtn.addEventListener('click', () => {
    let nextIndex = (currentIndex + 1) % playlist.length;
    playSong(nextIndex);
});

// Previous Song Logic
prevBtn.addEventListener('click', () => {
    let prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playSong(prevIndex);
});