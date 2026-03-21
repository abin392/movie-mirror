const playlist = JSON.parse(localStorage.getItem('currentPlaylist'));
const listContainer = document.getElementById('musicList');
const audioPlayer = document.getElementById('mainAudio');
const titleDisplay = document.getElementById('currentTitle');
const imgDisplay = document.getElementById('currentImg');
const alertBox = document.getElementById('music-alert');
const alertText = document.getElementById('alert-text');

let currentIndex = 0;

function playSong(index) {
    if (!playlist || index < 0 || index >= playlist.length) return;

    currentIndex = index;
    const song = playlist[index];

    // 1. Update Player Content
    audioPlayer.src = song.url;
    titleDisplay.innerText = song.title;
    imgDisplay.src = song.image;
    audioPlayer.play();

    // 2. Update the Cart-Item View (The Hover/Active effect)
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