const MOVIE_TRAINING = {
    "DUDE": ["DUDE", "DOOD", "DUD", "DEWD", "DOODLE", "DUDES", "DEW", "DUDDY", "DUDLY", "DUDLEY", "DUDES", "DEWDE", "DUDDY", "DUDLY", "DUDLEY", "BUILD", "DUDEY", "DUDES", "DEWDE", "DUDDY", "DUDLY", "DUDLEY", "DUDE MOVIE", "DOOD MOVIE", "DUD MOVIE", "DEWD MOVIE", "DOODLE MOVIE", "DUDES MOVIE", "DEW MOVIE", "DUDDY MOVIE", "DUDLY MOVIE", "DUDLEY MOVIE", "DUDES MOVIE", "DEWDE MOVIE", "DUDDY MOVIE", "DUDLY MOVIE", "DUDLEY MOVIE", "BUILD MOVIE", "DUDEY MOVIE", "DUNE MOVIE"],
    "AMPULI": ["AMBULI", "AMPULI", "AMPU LEE", "AMBLY", "AMBILY", "AMBERLY", "AMBOLI", "HUMBLY", "AMBALI", "AMB", "AMPU", "AMPU LEE", "AMPULI", "AMBULI", "AMPU LEE", "AMBLY", "AMBILY", "AMBERLY", "AMBOLI", "HUMBLY", "AMBALI", "AMB", "AMPU", "AMPU LEE", "AMPULI", "AMBULI", "AMPU LEE", "AMBLY", "AMBILY", "AMBERLY", "AMBOLI", "HUMBLY", "AMBALI", "AMB", "AMPU"],
    "IDLI KADAI": ["IDLI KADAI", "ITALY KADAI", "IDLY KADAI", "IDLI KADAY", "ITALY", "IDLY", "IDLI KADAI", "ITALY KADAI", "IDLY KADAY", "IDLI KADAI", "ITALY KADAI", "IDLY KADAY"]
};

let isVoiceProcessing = false;

// Voice Response Logic
function assistantSpeak(text) {
    const synth = window.speechSynthesis;
    synth.cancel(); // Stop any overlapping voices
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1.0;
    synth.speak(utterance);
}

function toggleVoiceMenu() {
    const menu = document.getElementById('voice-options-menu');
    if (menu) {
        menu.classList.toggle('voice-hidden');
        assistantSpeak(""); // Unlocks audio on user click
    }
}

function startVoiceRecognition(searchType = 'movie') {
    if (isVoiceProcessing) return;

    const menu = document.getElementById('voice-options-menu');
    if (menu) menu.classList.add('voice-hidden');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    // We attach this to 'window' so stopVoiceRecognition() can see it
    window.recognition = new SpeechRecognition();

    const overlay = document.getElementById('listening-overlay');
    const statusText = document.getElementById('voice-status');

    window.recognition.lang = 'en-US';
    window.recognition.continuous = false;
    window.recognition.interimResults = false;

    statusText.innerText = searchType === 'movie' ? 'Say "Playing Dude"' : 'Say "Playing Dude Song"';
    overlay.classList.remove('voice-hidden');
    isVoiceProcessing = true;

    window.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        const match = transcript.match(/(?:playing|play|open)\s+(.*)/);

        if (match && match[1]) {
            let spokenName = match[1].trim().toUpperCase();

            if (searchType === 'movie') {
                for (const [correctName, variants] of Object.entries(MOVIE_TRAINING)) {
                    if (variants.includes(spokenName)) {
                        spokenName = correctName;
                        break;
                    }
                }

                const searchInput = document.getElementById("movieSearchInput");
                if (searchInput) {
                    searchInput.value = spokenName;
                    if (typeof executeSearch === "function") {
                        executeSearch();

                        setTimeout(() => {
                            const movieCards = document.querySelectorAll('.movies');
                            let found = false;

                            movieCards.forEach(card => {
                                if (card.dataset.title.toUpperCase() === spokenName && card.style.display !== 'none') {
                                    assistantSpeak(`Now playing ${spokenName.toLowerCase()} movie`);
                                    setTimeout(() => { card.click(); }, 1500);
                                    found = true;
                                }
                            });

                            if (!found) {
                                assistantSpeak(`Sorry, I couldn't find ${spokenName.toLowerCase()}`);
                            }
                            resetVoiceState();
                        }, 600);
                    }
                } else {
                    assistantSpeak(`Now playing ${spokenName.toLowerCase()}`);
                    setTimeout(() => {
                        window.location.href = `movie.html?autoPlay=${encodeURIComponent(spokenName)}`;
                    }, 1500);
                }
            } else if (searchType === 'music') {
                const cleanedSongName = spokenName.replace(" SONG", "").trim();
                handleMusicSearch(cleanedSongName);
                resetVoiceState();
            }
        } else {
            resetVoiceState();
        }
    };

    window.recognition.onerror = (event) => {
        console.log("Speech Recognition Error Fired:", event.error); // Add this line!
        
        switch (event.error) {
            case 'no-speech':
                assistantSpeak("No speech detected. Please try again.");
                break;
            case 'audio-capture':
                assistantSpeak("No microphone found. Please check your settings.");
                break;
            case 'not-allowed':
                assistantSpeak("Microphone permission denied.");
                break;
            default:
                assistantSpeak("A voice recognition error occurred.");
        }
        resetVoiceState();
    };

    window.recognition.onend = () => {
        // REMOVED the 1000ms timeout here so it closes instantly
        overlay.classList.add('voice-hidden');
        isVoiceProcessing = false;
    };

    window.recognition.start();
}

// --- voice-assistant.js ---

function stopVoiceRecognition() {
    // This stops the mic instantly and ignores any results
    if (window.recognition) {
        window.recognition.abort();
    }

    const overlay = document.getElementById('listening-overlay');
    if (overlay) {
        overlay.classList.add('voice-hidden');
    }

    // Stop assistant from speaking if it's currently talking
    window.speechSynthesis.cancel();

    isVoiceProcessing = false;
}

function handleMusicSearch(songName) {
    let found = false;
    const musicButtons = document.querySelectorAll('i#music');
    const searchQuery = songName.toUpperCase().replace(/[^A-Z0-9]/g, "");

    for (let btn of musicButtons) {
        const data = btn.dataset;
        for (let i = 1; i <= 20; i++) {
            const titleVal = data[`songtitle${i}`] || data[`songTitle${i}`];
            if (titleVal) {
                const cleanTitle = titleVal.toUpperCase().replace(/[^A-Z0-9]/g, "");
                if (cleanTitle.includes(searchQuery) || searchQuery.includes(cleanTitle)) {
                    assistantSpeak(`Now playing ${songName.toLowerCase()} song`);

                    // ADDED TIMEOUT: Wait 1.5s for voice before playing music
                    setTimeout(() => {
                        btn.click();
                    }, 1500);

                    found = true;
                    break;
                }
            }
        }
        if (found) break;
    }

    if (!found) {
        assistantSpeak(`I couldn't find the song ${songName.toLowerCase()}`);
    }
}


function resetVoiceState() {
    const overlay = document.getElementById('listening-overlay');
    if (overlay) overlay.classList.add('voice-hidden');
    isVoiceProcessing = false;
}



// --- Samsung TV Remote Integration ---
document.addEventListener('keydown', function (e) {
    // Key codes for Samsung Smart TV remotes
    const KEY_SEARCH = 10225; // Search button
    const KEY_RED = 403;    // Red color button
    const KEY_GREEN = 404;  // Green color button
    const KEY_ENTER = 13;   // OK/Enter button
    const KEY_RETURN = 10009; // Return/Back button

    switch (e.keyCode) {
        case KEY_SEARCH:
            // Triggers your existing menu toggle
            if (typeof toggleVoiceMenu === "function") toggleVoiceMenu();
            break;

        case KEY_RED:
            // Directly starts Movie search
            if (typeof startVoiceRecognition === "function") startVoiceRecognition('movie');
            break;

        case KEY_GREEN:
            // Directly starts Music search
            if (typeof startVoiceRecognition === "function") startVoiceRecognition('music');
            break;

        case KEY_RETURN:
            // Hide menu if return is pressed while menu is open
            const menu = document.getElementById('voice-options-menu');
            if (menu && !menu.classList.contains('voice-hidden')) {
                menu.classList.add('voice-hidden');
            }
            break;
    }
});



// --- PC/Laptop Keyboard Shortcuts for Voice Assistant ---
document.addEventListener('keydown', function (e) {
    // 1. Prevent shortcuts from triggering if the user is typing in a search bar or text input
    const activeTag = document.activeElement.tagName;
    if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;

    // 2. Ignore if modifier keys are pressed (like Ctrl+S to save)
    if (e.ctrlKey || e.altKey || e.metaKey) return;

    const key = e.key.toLowerCase();

    switch (key) {
        case 'v':
            e.preventDefault(); // Stop default browser behavior
            // Click the main button if it exists, otherwise just toggle the menu
            const voiceBtn = document.getElementById('voice-assistant-btn');
            if (voiceBtn) {
                voiceBtn.click();
            } else if (typeof toggleVoiceMenu === 'function') {
                toggleVoiceMenu();
            }
            break;

        case 'm':
            e.preventDefault();
            // Start Movie Search
            if (typeof startVoiceRecognition === 'function') {
                startVoiceRecognition('movie');
            }
            break;

        case 's':
            e.preventDefault();
            // Start Music Search
            if (typeof startVoiceRecognition === 'function') {
                startVoiceRecognition('music');
            }
            break;
    }
});