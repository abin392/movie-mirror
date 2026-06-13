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

    // ==========================================
    // NEW: UPDATE HEAD TITLE AND FAVICON
    // ==========================================
    document.title = song.title; // Updates the browser tab text
    
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon && song.image) {
        favicon.href = song.image; // Updates the browser tab image
    }
    // ==========================================

    // ---> ADD THIS LINE HERE <---
    updateMusicMediaSession(song); 

    updateCardBackground(imgDisplay);

    // ==========================================
    // RECENTLY PLAYED SONGS LOGIC
    // ==========================================
    let recentSongs = JSON.parse(localStorage.getItem('recentSongs')) || [];
    recentSongs = recentSongs.filter(s => s.url !== song.url); // Remove duplicate
    recentSongs.unshift(song); // Add to top
    if (recentSongs.length > 15) recentSongs.pop(); // Keep max 15
    localStorage.setItem('recentSongs', JSON.stringify(recentSongs));
    // ==========================================

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

    // Inside your existing if (playlist && playlist.length > 0) block
    // Replace your existing playlist.forEach inside music-viewer.js with this:
    playlist.forEach((song, index) => {
        const item = document.createElement('div');
        // ADDED: tv-focusable and tabindex="0" for Smart TV navigation
        item.className = 'cart-item tv-focusable';
        item.setAttribute('tabindex', '0');
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



// === UPGRADED SMART TV & KEYBOARD CONTROL ENGINE ===
document.addEventListener('keydown', (e) => {
    const active = document.activeElement;
    const focusables = Array.from(document.querySelectorAll('.tv-focusable'));

    const isSlider = active && active.tagName.toLowerCase() === 'input' && active.type === 'range';

    const acceptedKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', ' ', 'Escape'];

    if (!acceptedKeys.includes(e.key)) return;

    // --- NEW: INTERCEPT KEYS FOR THE ONBOARDING TOUR ---
    const tooltip = document.getElementById('tour-tooltip');
    if (tooltip && tooltip.classList.contains('active')) {
        // If the tour is active and they press OK/Enter or Space
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); // Stop the page from scrolling
            const nextBtn = document.getElementById('tour-next-btn');
            if (nextBtn) nextBtn.click(); // Trigger the Next button
            return; // Stop all other background remote logic from running
        }
    }
    // ----------------------------------------------------

    // --- Global ESC Key to go back ---
    if (e.key === 'Escape') {
        e.preventDefault();
        window.history.back();
        return;
    }

    // --- NEW: Global Space Key for Play/Pause ---
    if (e.key === ' ') {
        e.preventDefault(); // Prevents the browser from scrolling down
        const playBtn = document.getElementById('playPauseBtn');
        if (playBtn) playBtn.click(); // Triggers your existing play/pause logic
        return;
    }

    // --- UPDATED: OK/Enter Key Logic ---
    if (e.key === 'Enter') {
        e.preventDefault();
        // If the user has highlighted a specific button or song, click it
        if (active && active.classList.contains('tv-focusable') && typeof active.click === 'function') {
            active.click();
        } else {
            // If they just opened the page and press OK (nothing is focused yet), Play/Pause the song
            const playBtn = document.getElementById('playPauseBtn');
            if (playBtn) playBtn.click();
        }
        return;
    }

    // Let sliders handle left/right natively
    if (isSlider && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) return;

    e.preventDefault(); // Prevent default scrolling for arrow keys

    // Default focus
    if (!active || !active.classList.contains('tv-focusable')) {
        const playBtn = document.getElementById('playPauseBtn');
        if (playBtn) playBtn.focus();
        return;
    }

    const activeRect = active.getBoundingClientRect();
    let bestMatch = null;
    let minDistance = Infinity;

    // Standard Nearest Neighbor
    focusables.forEach(item => {
        if (item === active) return;
        const rect = item.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return; // Skip hidden items

        const activeCenterX = activeRect.left + activeRect.width / 2;
        const activeCenterY = activeRect.top + activeRect.height / 2;
        const rectCenterX = rect.left + rect.width / 2;
        const rectCenterY = rect.top + rect.height / 2;

        let isMatch = false;

        if (e.key === 'ArrowUp' && rectCenterY < activeCenterY - 5) isMatch = true;
        if (e.key === 'ArrowDown' && rectCenterY > activeCenterY + 5) isMatch = true;
        if (e.key === 'ArrowLeft' && rectCenterX < activeCenterX - 5) isMatch = true;
        if (e.key === 'ArrowRight' && rectCenterX > activeCenterX + 5) isMatch = true;

        if (isMatch) {
            const dx = rectCenterX - activeCenterX;
            const dy = rectCenterY - activeCenterY;

            // Prioritize straight-line movement to easily jump across the screen
            let distance = (e.key === 'ArrowUp' || e.key === 'ArrowDown')
                ? Math.abs(dy) + Math.abs(dx) * 4
                : Math.abs(dx) + Math.abs(dy) * 4;

            if (distance < minDistance) {
                minDistance = distance;
                bestMatch = item;
            }
        }
    });

    // WRAP-AROUND LOOPING (If pressing Up at the Back Button, loop to controls)
    if (!bestMatch) {
        let wrapMatch = null;
        let extremeVal = (e.key === 'ArrowDown' || e.key === 'ArrowRight') ? Infinity : -Infinity;

        focusables.forEach(item => {
            if (item === active) return;
            const rect = item.getBoundingClientRect();
            if (rect.width === 0) return;

            const rectCenterX = rect.left + rect.width / 2;
            const rectCenterY = rect.top + rect.height / 2;

            if (e.key === 'ArrowUp') { // Wrap to bottom
                if (rectCenterY > extremeVal) { extremeVal = rectCenterY; wrapMatch = item; }
            } else if (e.key === 'ArrowDown') { // Wrap to top
                if (rectCenterY < extremeVal) { extremeVal = rectCenterY; wrapMatch = item; }
            } else if (e.key === 'ArrowLeft') { // Wrap to right
                if (rectCenterX > extremeVal) { extremeVal = rectCenterX; wrapMatch = item; }
            } else if (e.key === 'ArrowRight') { // Wrap to left
                if (rectCenterX < extremeVal) { extremeVal = rectCenterX; wrapMatch = item; }
            }
        });

        if (wrapMatch) bestMatch = wrapMatch;
    }

    // Apply Focus and Scroll
    if (bestMatch) {
        bestMatch.focus();
        bestMatch.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});


// === SMART TV INACTIVITY TIMER (FADE OUT ENGINE) ===
let tvActivityTimeout;

document.addEventListener('keydown', (e) => {
    // Only react to our specific navigation keys
    const acceptedKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', ' ', 'Escape'];
    if (!acceptedKeys.includes(e.key)) return;

    // 1. Wake up the UI (Show the focus ring)
    document.body.classList.add('show-tv-focus');

    // 2. Clear any existing sleep timers
    clearTimeout(tvActivityTimeout);

    // 3. Set a new timer to "sleep" after 3 seconds of inactivity
    tvActivityTimeout = setTimeout(() => {
        // Remove the class to trigger the CSS fade-out transition
        document.body.classList.remove('show-tv-focus');
    }, 3000); // 3000 milliseconds = 3 seconds
});

// Optional: If a mouse moves or screen is touched, hide the TV focus ring instantly
document.addEventListener('mousemove', () => document.body.classList.remove('show-tv-focus'));
document.addEventListener('touchstart', () => document.body.classList.remove('show-tv-focus'));



// === FIRST-TIME USER ONBOARDING TOUR (FLOATING VERSION) ===
function startOnboardingTour() {
    // 1. Create Overlay
    const overlay = document.createElement('div');
    overlay.id = 'tour-overlay';
    document.body.appendChild(overlay);

    // 2. Create Floating Tooltip
    const tooltip = document.createElement('div');
    tooltip.id = 'tour-tooltip';
    tooltip.innerHTML = `
        <h4 style="margin: 0 0 10px 0; color: var(--accent-light); font-size: 1.1rem;">Quick Guide</h4>
        <p id="tour-text" style="margin: 0 0 15px 0; font-size: 0.95rem; line-height: 1.4; color: var(--text-dim);"></p>
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <span id="tour-counter" style="font-size: 0.8rem; color: gray; font-weight: bold;"></span>
            <button id="tour-next-btn" style="background: var(--text-main); color: var(--primary-bg); border: none; padding: 8px 16px; border-radius: 15px; cursor: pointer; font-weight: bold; font-size: 0.9rem;">Next</button>
        </div>
    `;
    document.body.appendChild(tooltip);

    // 3. Define the Steps
    const steps = [
        {
            id: 'playPauseBtn',
            text: "Click here or press <b>Space / Enter</b> to Play or Pause."
        },
        {
            id: 'progressSlider',
            text: "Use your <b>Left / Right</b> keys to seek through the song."
        },
        {
            id: 'musicList',
            text: "Use your <b>Arrow keys</b> to navigate the playlist, and hit <b>Enter</b> to select."
        },
        {
            selector: 'button[onclick="window.history.back()"]',
            text: "Press <b>Esc</b> or click here to go back."
        }
    ];

    let currentStep = 0;

    // 4. Logic to show each step and position the tooltip
    function showStep(index) {
        document.querySelectorAll('.tour-highlight').forEach(el => {
            el.classList.remove('tour-highlight');
        });

        if (index >= steps.length) {
            overlay.remove();
            tooltip.remove();
            localStorage.setItem('hasSeenMusicTour', 'true');
            const playBtn = document.getElementById('playPauseBtn');
            if (playBtn) playBtn.focus();
            return;
        }

        const step = steps[index];
        const target = step.id ? document.getElementById(step.id) : document.querySelector(step.selector);

        if (target) {
            target.classList.add('tour-highlight');
            
            // UPGRADE 1: Added `inline: 'center'` to guarantee horizontal scrolling lists are centered perfectly
            target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });

            document.getElementById('tour-text').innerHTML = step.text;
            document.getElementById('tour-counter').innerText = `${index + 1} / ${steps.length}`;
            document.getElementById('tour-next-btn').innerText = index === steps.length - 1 ? "Done" : "Next";

            // Show UI momentarily to calculate dimensions
            tooltip.classList.add('active');
            overlay.classList.add('active');

            // --- UPGRADED FLOATING POSITION CALCULATION ENGINE ---
            // UPGRADE 2: Increased timeout to 400ms to let the smooth scrolling fully finish before calculating
            setTimeout(() => {
                const targetRect = target.getBoundingClientRect();
                const tooltipRect = tooltip.getBoundingClientRect();
                const margin = 15; // Safe padding from the edges of the screen

                // 1. Determine Vertical Position (Default to placing it directly BELOW the element)
                let topPos = targetRect.bottom + margin;

                // Smart Check 1: If placing it below pushes it off the bottom of the screen, put it ABOVE instead.
                if (topPos + tooltipRect.height > window.innerHeight - margin) {
                    topPos = targetRect.top - tooltipRect.height - margin;
                    
                    // Failsafe: If pushing it above also goes off the top edge, force it into the safe visible area.
                    if (topPos < margin) {
                        topPos = window.innerHeight - tooltipRect.height - margin; 
                    }
                }

                // 2. Determine Horizontal Position (Default to centering it with the element)
                let leftPos = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);

                // Smart Check 2: Keep it from bleeding off the Left or Right edges of the screen
                if (leftPos < margin) {
                    leftPos = margin; // Lock to the left edge safely
                } else if (leftPos + tooltipRect.width > window.innerWidth - margin) {
                    leftPos = window.innerWidth - tooltipRect.width - margin; // Lock to the right edge safely
                }

                // 3. Apply the calculated coordinates
                tooltip.style.top = `${topPos}px`;
                tooltip.style.left = `${leftPos}px`;
            }, 400); // <- 400ms allows smooth scroll to finish so the coordinates are 100% accurate

        } else {
            showStep(index + 1);
        }
    }

    document.getElementById('tour-next-btn').addEventListener('click', () => {
        showStep(++currentStep);
    });

    setTimeout(() => showStep(0), 800);
}

// === TRIGGER THE TOUR ===
if (!localStorage.getItem('hasSeenMusicTour')) {
    if (playlist && playlist.length > 0) {
        startOnboardingTour();
    }
}



/* ==========================================
   OS MEDIA CONTROLS (LOCK SCREEN & NOTIFICATIONS)
========================================== */
function updateMusicMediaSession(song) {
    if ('mediaSession' in navigator) {
        // 1. Send Title and Image to the OS Lock Screen
        navigator.mediaSession.metadata = new MediaMetadata({
            title: song.title,
            artist: 'Abin Movie Mirror',
            album: 'Music Player',
            artwork: [
                // Providing a high-res image triggers the OS's native lock-screen ambilight
                { src: song.image || 'img/cropped_circle_image (8).png', sizes: '512x512', type: 'image/jpeg' }
            ]
        });

        // 2. Link Lock Screen buttons to your existing HTML buttons
        navigator.mediaSession.setActionHandler('play', () => {
            audioPlayer.play();
        });
        navigator.mediaSession.setActionHandler('pause', () => {
            audioPlayer.pause();
        });
        navigator.mediaSession.setActionHandler('previoustrack', () => {
            document.getElementById('prevBtn').click();
        });
        navigator.mediaSession.setActionHandler('nexttrack', () => {
            document.getElementById('nextBtn').click();
        });
        
        // 3. Allow users to scrub through the timeline from their lock screen
        navigator.mediaSession.setActionHandler('seekto', (details) => {
            if (details.fastSeek && ('fastSeek' in audioPlayer)) {
                audioPlayer.fastSeek(details.seekTime);
            } else {
                audioPlayer.currentTime = details.seekTime;
            }
        });
    }
}