 // Call the boost here
    // Start with 2 (200%). If it's still too low, try 3 or 4.
    boostVolume(video, 2);
    //based on this section
    function changeEpisode(url, title) {
    const video = document.getElementById('movieVideo');
    const source = document.getElementById('videoSource');

    source.src = url;
    video.load();

    // Call the boost here
    // Start with 2 (200%). If it's still too low, try 3 or 4.
    boostVolume(video, 2);

    video.play();
    document.getElementById('movieTitle').textContent = title;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Boost volume function
// Add this at the very top of your movie-view.js file, outside any functions
let audioCtx;
let gainNode;

function boostVolume(videoElement, multiplier) {
    // 1. Fix CORS issues (Required if video is from another site)
    videoElement.crossOrigin = "anonymous";

    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        // 2. Create nodes
        const source = audioCtx.createMediaElementSource(videoElement);
        gainNode = audioCtx.createGain();

        // 3. Connect: Video -> Gain -> Speakers
        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
    }

    // 4. Set the boost level
    gainNode.gain.value = multiplier;

    // 5. Resume context on user click (Browser security)
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}