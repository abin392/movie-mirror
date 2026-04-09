const MOVIE_TRAINING = {
    "DUDE": ["DUDE", "DOOD", "DUD", "DEWD"],
    "AMPULI": ["AMBULI", "AMPULI", "AMPU LEE", "AMBLY", "AMBILY", "AMBERLY", "AMBOLI", "HUMBLY", "AMBALI", "AMB"],
    "IDLI KADAI": ["IDLI KADAI", "ITALY KADAI", "IDLY KADAI", "IDLI KADAY", "ITALY"]
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

    const recognition = new SpeechRecognition();
    const overlay = document.getElementById('listening-overlay');
    const statusText = document.getElementById('voice-status');

    recognition.lang = 'en-US';
    recognition.continuous = false; 
    recognition.interimResults = false;

    statusText.innerText = searchType === 'movie' ? 'Say "Playing Dude"' : 'Say "Playing Dude Song"';
    overlay.classList.remove('voice-hidden');
    isVoiceProcessing = true; 

    recognition.onresult = (event) => {
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
                                    
                                    // ADDED TIMEOUT: Wait 1.5s for voice to finish before clicking
                                    setTimeout(() => {
                                        card.click();
                                    }, 1500);
                                    
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
                    // ADDED TIMEOUT: Wait 1.5s before page redirect
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

    recognition.onerror = () => resetVoiceState();
    recognition.onend = () => {
        setTimeout(() => {
            overlay.classList.add('voice-hidden');
            isVoiceProcessing = false; 
        }, 1000);
    };

    recognition.start();
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