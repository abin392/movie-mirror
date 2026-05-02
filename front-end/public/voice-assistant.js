const MOVIE_TRAINING = {
    "DUDE": ["DUDEMOVIE", "DOOD", "DUD", "DEWD", "DOODLE", "DUDES", "DEW", "DUDDY", "DUDLY", "DUDLEY", "DUDES", "DEWDE", "DUDDY", "DUDLY", "DUDLEY", "BUILD", "DUDEY", "DUDES", "DEWDE", "DUDDY", "DUDLY", "DUDLEY", "DUDE MOVIE", "DOOD MOVIE", "DUD MOVIE", "DEWD MOVIE", "DOODLE MOVIE", "DUDES MOVIE", "DEW MOVIE", "DUDDY MOVIE", "DUDLY MOVIE", "DUDLEY MOVIE", "DUDES MOVIE", "DEWDE MOVIE", "DUDDY MOVIE", "DUDLY MOVIE", "DUDLEY MOVIE", "BUILD MOVIE", "DUDEY MOVIE", "DUNE MOVIE"],
    "AMPULI": ["AMBULI", "AMPULI", "AMPU LEE", "AMBLY", "AMBILY", "AMBERLY", "AMBOLI", "HUMBLY", "AMBALI", "AMB", "AMPU", "AMPU LEE", "AMPULI", "AMBULI", "AMPU LEE", "AMBLY", "AMBILY", "AMBERLY", "AMBOLI", "HUMBLY", "AMBALI", "AMB", "AMPU", "AMPU LEE", "AMPULI", "AMBULI", "AMPU LEE", "AMBLY", "AMBILY", "AMBERLY", "AMBOLI", "HUMBLY", "AMBALI", "AMB", "AMPU"],
    "IDLI KADAI": ["IDLI KADAI", "ITALY KADAI", "IDLY KADAI", "IDLI KADAY", "ITALY", "IDLY", "IDLI KADAI", "ITALY KADAI", "IDLY KADAY", "IDLI KADAI", "ITALY KADAI", "IDLY KADAY"],
    "DARBAR": ["DARBAAR", "DARBAR", "DARPAR"]
};

// --- NEW: Add this right below MOVIE_TRAINING ---
const MUSIC_TRAINING = {
    "OORUM BLOOD": ["OORUM BLOOD", "ORUM BLOOD", "OORAM BLOOD", "OUR BLOOD", "ROOM BLOOD", "OORUM BLED", "OORUM BLUE", "OORUM BLU", "OORUM", "BLOOD"],
    "SINGARI": ["SINGARI", "SINGARY", "SHINGARI", "CHINGARI", "SINGARI SONG", "SINGARY SONG", "SHINGARI SONG", "CHINGARI SONG"],
    "KANNUKULLA": ["KANNUKULLA", "KANUKULLA", "KANNUKULA", "KANNU KULLA", "CANNUKULA"],
    "NALLARU PO": ["NALLARU PO", "NALARU PO", "NALLARU PAA", "NALLA RUPU"],
    "YUMABAIBESA": ["YUMABAIBESA", "YUMA", "YAMBAI", "YAMABAI", "YUMMABAI"],
    "JUKEBOX": ["JUKEBOX", "JUKE BOX", "ALL SONGS", "FULL ALBUM", "DUDE SONGS"],
    // --- NEW: Added Idli Kadai variations here ---
    "IDLI KADAI": ["IDLI KADAI", "ITALY KADAI", "IDLY KADAI", "IDLI KADAY", "ITALY", "IDLY", "IDLY KADAY", "ILLY KADAI", "IDLI KADA", "IDLI KADAI ALBUM"],
    "Ethana_Saami__Idli_Kadai": ["Ethana Saami", "Ethana Sami", "Ethana Saamy", "Ethana Saami Song", "Ethana Sami Song", "Ethana Saamy Song", " Eterna", "Eterna Song", "Idli Kadai Ethana Saami", "Idli Kadai Ethana Sami", "Idli Kadai Ethana Saamy", "Etna Sami", "Etna Saami", "Etna Saamy"],
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
    // 1. Change this to TRUE to allow live-text updates while speaking
    window.recognition.interimResults = true;

    statusText.innerText = searchType === 'movie' ? 'Say "Playing Dude"' : 'Say "Playing Dude Song"';
    overlay.classList.remove('voice-hidden');
    isVoiceProcessing = true;

    window.recognition.onresult = (event) => {
        // Get the live transcript of what the user is currently saying
        const transcript = event.results[0][0].transcript;
        const statusText = document.getElementById('voice-status');

        // 2. Automatically change the text under the mic to the user's spoken words
        statusText.innerText = `"${transcript}"`;

        // 3. Only run the search logic when the user FINISHES speaking (isFinal)
        if (event.results[0].isFinal) {
            const finalTranscript = transcript.toLowerCase();
            const match = finalTranscript.match(/(?:playing|play|open)\s+(.*)/);

            if (match && match[1]) {
                let spokenName = match[1].trim().toUpperCase();

                // Clean up extra words
                spokenName = spokenName.replace(/\b(MOVIE|TAMIL|TELUGU|MALAYALAM|HINDI|ENGLISH|FULL|HD)\b/g, '')
                    .replace(/\s+/g, ' ')
                    .trim();

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

                        const movieCards = Array.from(document.querySelectorAll('.movies'));
                        const foundCard = movieCards.find(card => card.dataset.title.toUpperCase() === spokenName && card.style.display !== 'none');

                        if (foundCard) {
                            assistantSpeak(`Now playing ${spokenName.toLowerCase()} movie`);

                            // Visual feedback before redirecting
                            statusText.innerText = `Found ${spokenName}! Playing in 2s...`;

                            // 4. Delay exactly 2 seconds (2000ms) before playing
                            setTimeout(() => {
                                if (typeof movieView === "function") {
                                    movieView(foundCard);
                                }
                            }, 2000);
                        } else {
                            assistantSpeak(`Sorry, I couldn't find ${spokenName.toLowerCase()}`);
                            statusText.innerText = `Couldn't find "${spokenName}"`;
                            setTimeout(resetVoiceState, 2000);
                        }
                    } else {
                        assistantSpeak(`Now playing ${spokenName.toLowerCase()}`);
                        statusText.innerText = `Playing ${spokenName} in 2s...`;

                        // 4. Delay exactly 2 seconds (2000ms) before playing
                        setTimeout(() => {
                            window.location.href = `movie.html?autoPlay=${encodeURIComponent(spokenName)}`;
                        }, 2000);
                    }
                } else if (searchType === 'music') {
                    // 1. Strip out extra words to isolate the song name
                    let cleanedSongName = spokenName.replace(/\b(SONG|SONGS|MUSIC|AUDIO|TRACK|PLAYING|PLAY)\b/g, '')
                        .replace(/\s+/g, ' ')
                        .trim();

                    // 2. Check the spoken phrase against the MUSIC_TRAINING dictionary
                    for (const [correctName, variants] of Object.entries(MUSIC_TRAINING)) {
                        if (variants.includes(cleanedSongName)) {
                            cleanedSongName = correctName; // Force it to the correct spelling
                            break;
                        }
                    }

                    // 3. Update the UI and search
                    statusText.innerText = `Searching for ${cleanedSongName}...`;
                    handleMusicSearch(cleanedSongName);

                }
            } else {
                // Let the user know if they forgot to say "Play"
                statusText.innerText = "Please start with 'Play' or 'Playing'.";
                setTimeout(resetVoiceState, 2000);
            }
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

    // Connect to the visual UI Tracker
    const statusText = document.getElementById('voice-status');

    for (let btn of musicButtons) {
        const data = btn.dataset;
        const movieContainer = btn.closest('.movies');

        // 1. Check if the user asked for a Movie's album
        if (movieContainer) {
            const movieTitle = movieContainer.dataset.title || "";
            const cleanMovieTitle = movieTitle.toUpperCase().replace(/[^A-Z0-9]/g, "");

            if (cleanMovieTitle === searchQuery || cleanMovieTitle.includes(searchQuery)) {
                assistantSpeak(`Now playing ${movieTitle.toLowerCase()} playlist`);

                // Visual Tracking & 2-second Delay
                if (statusText) statusText.innerText = `Found ${movieTitle} Playlist! Playing in 2s...`;
                localStorage.setItem('targetSongIndex', 0);
                setTimeout(() => { btn.click(); }, 2000);

                found = true;
                break;
            }
        }

        // 2. Check if the user asked for a Specific Song Track
        for (let i = 1; i <= 20; i++) {
            const titleVal = data[`songtitle${i}`] || data[`songTitle${i}`];
            if (titleVal) {
                const cleanTitle = titleVal.toUpperCase().replace(/[^A-Z0-9]/g, "");
                if (cleanTitle.includes(searchQuery) || searchQuery.includes(cleanTitle)) {
                    assistantSpeak(`Now playing ${songName.toLowerCase()}`);

                    // Visual Tracking & 2-second Delay
                    if (statusText) statusText.innerText = `Found ${songName}! Playing in 2s...`;
                    localStorage.setItem('targetSongIndex', i - 1);
                    setTimeout(() => { btn.click(); }, 2000);

                    found = true;
                    break;
                }
            }
        }
        if (found) break;
    }

    // 3. If the song is not found
    if (!found) {
        assistantSpeak(`I couldn't find the song ${songName.toLowerCase()}`);
        if (statusText) statusText.innerText = `Couldn't find "${songName}"`;

        // Delay 2 seconds so the user can read the text, then hide the overlay
        setTimeout(resetVoiceState, 2000);
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