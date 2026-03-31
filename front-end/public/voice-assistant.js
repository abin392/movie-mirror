// Pronunciation Training Map
const MOVIE_TRAINING = {
    "DUDE": ["DUDE", "DOOD", "DUD", "DEWD"],
    "AMPULI": ["AMBULI", "AMPULI", "AMPU LEE", "AMBLY", "AMBILY", "AMBERLY", "AMBOLI", "HUMBLY", "AMBALI", "AMB"],
    "IDLI KADAI": ["IDLI KADAI", "ITALY KADAI", "IDLY KADAI", "IDLI KADAY", "ITALY"]
};

// State variable to prevent repeat triggers
let isVoiceProcessing = false;

function startVoiceRecognition() {
    if (isVoiceProcessing) return; // Stop if already processing a command

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    const overlay = document.getElementById('listening-overlay');
    const statusText = document.getElementById('voice-status');

    recognition.lang = 'en-US';
    recognition.continuous = false; // Ensure it stops after one phrase
    recognition.interimResults = false;

    overlay.classList.remove('voice-hidden');
    isVoiceProcessing = true; // Set flag to busy

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        const match = transcript.match(/(?:playing|play)\s+(.*)/);

        if (match && match[1]) {
            let spokenName = match[1].trim().toUpperCase();
            
            // Apply Training Corrections
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
                                card.click();
                                found = true;
                            }
                        });

                        if (!found) {
                            showStyledError(`Movie "${spokenName}" not found!`);
                        }
                        resetVoiceState(); // Reset after processing
                    }, 600);
                }
            } else {
                window.location.href = `movie.html?autoPlay=${encodeURIComponent(spokenName)}`;
            }
        } else {
            // If the user said something but not "Play [Movie]"
            resetVoiceState();
        }
    };

    recognition.onerror = () => resetVoiceState();
    recognition.onend = () => {
        setTimeout(() => {
            overlay.classList.add('voice-hidden');
            isVoiceProcessing = false; // Allow next click after 1 second
        }, 1000);
    };

    recognition.start();
}

function resetVoiceState() {
    const overlay = document.getElementById('listening-overlay');
    if (overlay) overlay.classList.add('voice-hidden');
    isVoiceProcessing = false;
}

function showStyledError(message) {
    // Check if a toast already exists to prevent duplicates
    if (document.querySelector('.voice-error-toast')) return;

    const toast = document.createElement('div');
    toast.className = 'voice-error-toast';
    toast.innerHTML = `<i class="fas fa-search"></i> <span>${message}</span>`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// Auto-play logic remains the same...