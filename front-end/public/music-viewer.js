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
    }, 3000);
}

// Auto-play the next song when the current one ends
audioPlayer.onended = () => {
    let nextIndex = (currentIndex + 1) % playlist.length; // Loops back to start after song 6
    playSong(nextIndex);
};

// Create the list of 6 songs in the UI
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

    // Start playing the first song immediately
    playSong(0);
}