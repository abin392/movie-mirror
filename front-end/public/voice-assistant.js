/* ==========================================
   HEY MIRROR / J.A.R.V.I.S. VOICE ENGINE (MANUAL TRIGGER EDITION)
   ========================================== */

// 1. UI STYLES
const jarvisStyle = document.createElement('style');
jarvisStyle.innerHTML = `
    .voice-assistant-wrapper { position: fixed; bottom: 30px; right: 30px; z-index: 9999; }
    #jarvis-btn { width: 60px; height: 60px; border-radius: 50%; background: rgba(0, 20, 40, 0.8); border: 2px solid #9000ff; display: flex; justify-content: center; align-items: center; cursor: pointer; box-shadow: 0 0 15px rgba(0, 210, 255, 0.4); position: relative; overflow: hidden; transition: all 0.3s; }
    #jarvis-btn:hover { box-shadow: 0 0 25px rgba(162, 0, 255, 0.8); transform: scale(1.05); }
    .arc-core { width: 20px; height: 20px; background: #9000ff; border-radius: 50%; box-shadow: 0 0 10px #ffffff, 0 0 20px #9000ff; }
    .arc-ring { position: absolute; width: 45px; height: 45px; border: 2px dashed #9000ff; border-radius: 50%; animation: spin 4s linear infinite; }
    

    #listening-overlay,
    #jarvis-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        /* Replaces the solid rgba(11, 5, 16, 0.9) with your body's radial-gradient theme */
        background: radial-gradient(circle at top, rgba(42, 14, 60, 0.95) 0%, rgba(0, 0, 0, 0.95) 100%);
        backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.3s ease;
    }
    #jarvis-overlay.voice-hidden { opacity: 0; pointer-events: none; }
    
    .jarvis-center { text-align: center; display: flex; flex-direction: column; align-items: center; }
    .jarvis-orb { position: relative; width: 150px; height: 150px; display: flex; justify-content: center; align-items: center; margin-bottom: 30px; }
    .orb-core { width: 60px; height: 60px; background: #ffffff; border-radius: 50%; box-shadow: 0 0 40px #9000ff, 0 0 80px #9000ff, inset 0 0 20px #9000ff; z-index: 10; transition: transform 0.1s; }
    .orb-ring { position: absolute; border-radius: 50%; border: 2px solid transparent; }
    .ring-1 { width: 100px; height: 100px; border-top: 2px solid #9000ff; border-bottom: 2px solid #9000ff; animation: spin 3s linear infinite; }
    .ring-2 { width: 130px; height: 130px; border-left: 2px dashed rgba(144, 0, 255, 0.5); border-right: 2px dashed rgba(0, 210, 255, 0.5); animation: spin-reverse 5s linear infinite; }
    .ring-3 { width: 160px; height: 160px; border-top: 1px solid rgba(119, 0, 255, 0.3); animation: spin 7s linear infinite; }
    
    .tech-text { color: #9000ff; font-family: 'Courier New', monospace; font-size: 1.5rem; letter-spacing: 4px; text-shadow: 0 0 10px rgba(0, 210, 255, 0.5); margin-bottom: 10px; }
    .tech-text-sub { color: #ffffff; font-family: 'Courier New', monospace; font-size: 1rem; opacity: 0.7; min-height: 20px; }
    
    .orb-listening .orb-core { transform: scale(1.2); box-shadow: 0 0 60px #9000ff, 0 0 100px #ffffff; }
    .orb-processing .ring-1, .orb-processing .ring-2 { border-color: #0000ff; animation-duration: 1s; }
    
    @keyframes spin { 100% { transform: rotate(360deg); } }
    @keyframes spin-reverse { 100% { transform: rotate(-360deg); } }
`;
document.head.appendChild(jarvisStyle);

// 2. DICTIONARIES & PRE-COMPILED REGEX
const MOVIE_TRAINING = {
    "AMARAN": ["AMARAN", "AMARON", "AMARIN"],
    "தூங்கி எழுந்தாச்சா": ["தூங்கி எழுந்தாச்சா", "THUNGI EZHUNTHAACHAA"],
    "DUDE": ["DUDE", "DOOD", "DUD", "DEWD", "DOODLE", "DUDES", "DEW"],
    "AVATAR": ["AVATAR", "AVATHAR", "AVATOR", "AWTAR"],
    "DARBAR": ["DARBAR", "DARBAAR", "DARPAR", "DURBAR"],
    "AQUAMAN": ["AQUAMAN", "AQUA MAN", "ACCUA MAN", "AKUAMAN"],
    "KATASI VIVASAYI": ["KATASI VIVASAYI", "KADAISI VIVASAYI", "KADASI VIVASAYI"],
    "CAPTAIN AMERICA": ["CAPTAIN AMERICA", "CAPTAN AMERICA", "CAPTAIN AMERICAN"],
    "BISON": ["BISON", "BYSON", "BAYSAN", "POISON"],
    "AMBULI": ["AMBULI", "AMBERLY", "HUMBLY", "UNBOLI", "AMPU LEE", "AMPULI"],
    "IDLI KADAI": ["IDLI KADAI", "ITALY KADAI", "IDLY KADAI", "ITLY", "ITLI", "ITALY"],
    "KAANTHA": ["KAANTHA", "KANTHA", "KANTA", "KAANTA"],
    "AARYAN": ["AARYAN", "ARYAN", "ARIAN"],
    "DIESEL": ["DIESEL", "DEESEL", "DEZEL", "DISEL"],
    "RAAYAN": ["RAAYAN", "RAYAN", "RYAN"],
    "KASETHAN KADAVULATA": ["KASETHAN KADAVULATA", "KASETHAN KADAVULADA", "KASU THAN KADAVULADA"],
    "CAPTAIN MILLER": ["CAPTAIN MILLER", "CAPTAN MILLER"],
    "ASURAN": ["ASURAN", "ASHURAN", "ASURAM"],
    "SARPATTA PARAMBARAI": ["SARPATTA PARAMBARAI", "SARBATA PARAMBARAI", "SARPATTA"],
    "BAASHSHA": ["BAASHSHA", "BASHA", "BAASHA", "PAASHA"],
    "JAI BHIM": ["JAI BHIM", "JAI BEEM", "JAY BHIM", "JAI BHEEM"],
    "RETRO(2025)": ["RETRO", "RETRO 2025", "RETROW"],
    "VIKRAM": ["VIKRAM", "VICRAM", "VICKRAM"],
    "KUTUMPASTHAN": ["KUTUMPASTHAN", "KUDUMBASTHAN", "KUTUMBASTHAN"],
    "TEYVA MAKAN": ["TEYVA MAKAN", "DEVA MAGAN", "THEVA MAGAN"],
    "PIREMALU": ["PIREMALU", "PREMALU", "PREM ALU"]
};

const MUSIC_TRAINING = {
    "JUKEBOX": ["JUKEBOX", "JUKE BOX", "ALL SONGS", "FULL ALBUM", "PLAYLIST"],
    "OORUM BLOOD": ["OORUM BLOOD", "ORUM BLOOD", "OORAM BLOOD", "OUR BLOOD", "ROOM BLOOD"],
    "SINGARI": ["SINGARI", "SINGARY", "SHINGARI", "CHINGARI"],
    "KANNUKULLA": ["KANNUKULLA", "KANUKULLA", "KANNUKULA", "KANNU KULLA", "CANNUKULA"],
    "NALLARU PO": ["NALLARU PO", "NALARU PO", "NALLARU PAA", "NALLA RUPU"],
    "YUMABAIBESA": ["YUMABAIBESA", "YUMA", "YAMBAI", "YAMABAI", "YUMMABAI"],
    "Idli_Kadai_-_Full_Album": ["IDLI KADAI FULL ALBUM", "ITALY KADAI FULL ALBUM", "IDLY KADAI FULL ALBUM", "ITLY FULL ALBUM", "ITLI FULL ALBUM", "ITALY FULL ALBUM", "IDLI KADAI SONG", "IDLI KADAI SONGS"],
    "AATHA NEE PETHAAYE": ["AATHA NEE PETHAAYE", "AATHA NEE PETHAYE", "AATHAA NEE PETHAYAE", "ATHA NEE PETHAYE"],
    "YEN PAATTAN SAAMI VARUM": ["YEN PAATTAN SAAMI VARUM", "EN PAATTAN SAAMI VARUM", "YEN PATTAN SAMI VARUM"],
    "ENNA SUGAM": ["ENNA SUGAM", "ENA SUGAM"],
    "ETHANA SAAMI": ["ETHANA SAAMI", "ETHANA SAMI", "ETNA SAMI", "ETHANA SAAMY"],
    "ENJAAMI THANDHAANE": ["ENJAAMI THANDHAANE", "ENJAMI TANDHANE", "ENJAMI", "YENJAAMI THANDHAANE", "ENJAAMI THANTHANE"],
    "MY HEARTU SPINNING": ["MY HEARTU SPINNING", "MY HEART SPINNING", "HEART SPINNING"],
    "KULASAMY KAAVAL KAAKA": ["KULASAMY KAAVAL KAAKA", "KULASAMI KAVAL KAKA", "KULASAMY"]
};

// Replace your old STOP_WORDS_REGEX with this comprehensive multi-language version:
const STOP_WORDS_REGEX = /\b(CAN|YOU|PLEASE|PLAY|PLAYING|OPEN|SEARCH|FOR|SHOW|ME|I|WANT|TO|WATCH|THE|A|AN|PUT|ON|SONG|SONGS|MUSIC|AUDIO|TRACK|PLAYLIST|MOVIE|MOVIES|FILM|FILMS|PADAM|PATTU|PAATU|POTTU|KAATU|POODU|THEDU|VANDU|VENUM|KAAMI|PANNU|LATEST|NEW|PUDHUSA|PUTHU|PUDHU|OLD|PAZHAYA|HIT|SUPER|TOP|படம்|பாட்டு|தேடு|ப்ளே|போடு|TAMIL|ENGLISH|தமிழ்|ஆங்கிலம்)\b/g;

// 3. ENGINE STATE & DOM CACHING
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const State = {
    recognition: null,
    isListening: false,
    jarvisVoice: null,
    cachedMovies: [],
    cachedMusicBtns: [],
    searchInputs: []
};

// Cache DOM elements instantly on load
document.addEventListener("DOMContentLoaded", () => {
    State.cachedMovies = Array.from(document.querySelectorAll('.movies'));
    State.cachedMusicBtns = document.querySelectorAll('i#music');
    State.searchInputs = document.querySelectorAll('input[type="search"]');
});

function loadJarvisVoice() {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    State.jarvisVoice = voices.find(v => v.name.includes("Google UK English Male") || v.name.includes("Great Britain") || v.lang === "en-GB") || voices[0];
}
if (speechSynthesis.onvoiceschanged !== undefined) loadJarvisVoice();

function jarvisSpeak(text, callback) {
    const synth = window.speechSynthesis;
    updateStatus(text); // Keep the text update instant

    if (synth) {
        synth.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        if (State.jarvisVoice) utterance.voice = State.jarvisVoice;
        utterance.pitch = 0.9;
        utterance.rate = 1.0;

        // 1. Wait until speech is fully complete to trigger the microphone
        utterance.onend = () => {
            if (callback) callback();
        };

        // 2. Failsafe: If speech fails or gets interrupted, open the mic anyway so the UI doesn't freeze
        utterance.onerror = (e) => {
            console.warn("Speech synthesis error or interruption", e);
            if (callback) callback();
        };

        // 3. Mobile Device Fix: Store a temporary global reference to the utterance.
        // This prevents aggressive mobile browsers (like Safari) from garbage-collecting 
        // the utterance before it finishes, ensuring 'onend' actually fires.
        window._activeJarvisUtterance = utterance;

        synth.speak(utterance);
    } else {
        // Fallback if the browser doesn't support speech synthesis at all
        if (callback) callback();
    }
}





// ==========================================
// MOVIE.JS - MODULAR ADDITIONS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. SKELETON LOADER LIFECYCLE (Runs parallel to your other load events)
    setTimeout(() => {
        const loader = document.getElementById("skeletonLoader");
        const realContent = document.getElementById("realContent");

        if (loader) loader.style.display = "none";
        if (realContent) realContent.style.display = "block";
    }, 1200);

    // 2. BACKGROUND COLOR AUTOMATION
    // Safely targets the active container without disrupting existing layout scripts
    const nowPlayingContainer = document.querySelector(".now-playing");
    if (nowPlayingContainer) {
        nowPlayingContainer.style.transition = "background-color 0.3s ease-in-out";
        // Additional dynamic background color logic can safely hook in here
    }

    // 3. SEARCH ENGINE EVENT LISTENERS (Attaches without overwriting)
    const searchInput = document.getElementById("movieSearchInput");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            if (e.target.value === "") executeModularSearch(""); 
        });
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") executeModularSearch(searchInput.value);
        });
    }
});

// Scoped search function to prevent naming collisions with your existing logic
function executeModularSearch(query) {
    if (!query) query = "";
    query = query.toLowerCase().trim();
    
    const movieCards = document.querySelectorAll(".movies");
    const scrollerCarts = document.querySelectorAll(".scroller .cart");

    movieCards.forEach(card => {
        const title = (card.getAttribute("data-title") || "").toLowerCase();
        card.style.display = title.includes(query) ? "block" : "none";
    });

    scrollerCarts.forEach(cart => {
        const cardTitleEl = cart.querySelector("h2");
        const titleText = cardTitleEl ? cardTitleEl.textContent.toLowerCase() : "";
        cart.style.display = titleText.includes(query) ? "inline-block" : "none";
    });
}




// 4. UI CONTROLS
function updateStatus(mainText, subText = "") {
    const status = document.getElementById('jarvis-status');
    const transcript = document.getElementById('jarvis-transcript');
    if (status) status.innerText = mainText.toUpperCase();
    if (transcript) transcript.innerText = subText;
}

function toggleJarvis() {
    State.isListening ? closeJarvisUI() : startListening();
}

function closeJarvisUI() {
    State.isListening = false;
    if (State.recognition) State.recognition.abort();

    const overlay = document.getElementById('jarvis-overlay');
    const orb = document.querySelector('.jarvis-orb');
    if (overlay) overlay.classList.add('voice-hidden');
    if (orb) orb.classList.remove('orb-listening', 'orb-processing');
}

function triggerGoBack() {
    jarvisSpeak("Returning to the main database.", () => {
        closeJarvisUI();
        window.location.href = "movie.html";
    });
}

// 5. MAIN RECOGNITION (Manual Trigger Only)
function startListening() {
    const overlay = document.getElementById('jarvis-overlay');
    const orb = document.querySelector('.jarvis-orb');

    if (overlay) overlay.classList.remove('voice-hidden');
    if (orb) orb.classList.add('orb-listening');
    updateStatus("ONLINE", "Awaiting directive...");

    jarvisSpeak("Yes, sir?", () => {
        State.recognition = new window.SpeechRecognition();
        State.recognition.lang = 'en-IN';
        State.recognition.continuous = false;

        State.recognition.onstart = () => { State.isListening = true; };

        State.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toUpperCase().trim();
            if (orb) {
                orb.classList.remove('orb-listening');
                orb.classList.add('orb-processing');
            }
            updateStatus("SEARCHING...", `"${transcript}"`);

            // Execute instantly
            processCommand(transcript);
        };

        State.recognition.onerror = () => jarvisSpeak("I didn't catch that.", closeJarvisUI);

        State.recognition.onend = () => {
            if (State.isListening && document.getElementById('jarvis-status').innerText !== "SEARCHING...") {
                closeJarvisUI();
            }
        };

        State.recognition.start();
    });
}

// 6. DIRECT SUBSTRING & FUZZY EXTRACTOR
function calculateSimilarity(s1, s2) {
    if (!s1 || !s2) return 0;
    let longer = s1.length > s2.length ? s1 : s2;
    let shorter = s1.length > s2.length ? s2 : s1;
    let costs = new Array();
    for (let i = 0; i <= longer.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= shorter.length; j++) {
            if (i === 0) costs[j] = j;
            else {
                if (j > 0) {
                    let newValue = costs[j - 1];
                    if (longer.charAt(i - 1) !== shorter.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0) costs[shorter.length] = lastValue;
    }
    return (longer.length - costs[shorter.length]) / parseFloat(longer.length);
}

function extractEntity(transcript, dictionary) {
    let bestKey = null;
    let maxLength = 0;

    // A. Direct Substring Match
    for (const [key, variants] of Object.entries(dictionary)) {
        for (const variant of variants) {
            if (transcript.includes(variant) && variant.length > maxLength) {
                maxLength = variant.length;
                bestKey = key;
            }
        }
    }
    if (bestKey) return bestKey;

    // B. Fuzzy Match Fallback
    let cleanTranscript = transcript.replace(STOP_WORDS_REGEX, '').replace(/\s+/g, ' ').trim();
    if (!cleanTranscript) return null;
    let ultraCleanTranscript = cleanTranscript.replace(/[^A-Z0-9]/g, "");

    let highestScore = 0;
    for (const [key, variants] of Object.entries(dictionary)) {
        for (const variant of variants) {
            let score1 = calculateSimilarity(cleanTranscript, variant);
            let score2 = calculateSimilarity(ultraCleanTranscript, variant.replace(/[^A-Z0-9]/g, ""));
            let bestScore = Math.max(score1, score2);

            if (bestScore > highestScore && bestScore >= 0.75) {
                highestScore = bestScore;
                bestKey = key;
            }
        }
    }
    return bestKey;
}

// 7. INTENT ROUTER & NAVIGATION
function processCommand(transcript) {
    let rawText = transcript.toUpperCase();

    if (rawText.includes("GO BACK") || rawText.includes("BACK TO HOME") || rawText.includes("MAIN MENU") || rawText.includes("HOME PAGE")) {
        return triggerGoBack();
    }

    // A. FAST LOCAL ANALYSIS: Instantly strip tail-end speech filler/action verbs common in Tamil syntax
    rawText = rawText.replace(/\b(POTTU KAATU|PANNU|KAAMI|THEDU|தேடு|போடு|காட்டு|ப்ளே)\b/g, "").trim();

    // B. DUAL-LANGUAGE INTENT DETECTION: Parse English, Tamil script, and spoken Tanglish keywords
    const isSongIntent = /\b(SONG|SONGS|MUSIC|AUDIO|TRACK|PLAYLIST|PATTU|PAATU|பாட்டு|பாடல்)\b/.test(rawText);
    const isMovieIntent = /\b(MOVIE|MOVIES|FILM|FILMS|WATCH|PADAM|படம்)\b/.test(rawText);

    let movieMatch = extractEntity(rawText, MOVIE_TRAINING);
    let musicMatch = extractEntity(rawText, MUSIC_TRAINING);

    let fallbackQuery = rawText.replace(STOP_WORDS_REGEX, '').replace(/\s+/g, ' ').trim();

    if (!movieMatch && !musicMatch && !fallbackQuery) {
        return jarvisSpeak("I couldn't identify a title from that command.", closeJarvisUI);
    }

    if (isSongIntent) {
        triggerMedia(musicMatch || movieMatch || fallbackQuery, true);
    } else if (isMovieIntent) {
        triggerMedia(movieMatch || musicMatch || fallbackQuery, false);
    } else {
        if (musicMatch && movieMatch) triggerMedia(movieMatch, false);
        else if (musicMatch) triggerMedia(musicMatch, true);
        else if (movieMatch) triggerMedia(movieMatch, false);
        else triggerMedia(fallbackQuery, false);
    }
}

// 8. DIRECT DOM EXECUTION 
function triggerMedia(query, isMusic) {
    const typeLabel = isMusic ? "track" : "movie";

    jarvisSpeak(`Accessing ${query} ${typeLabel}.`, () => {
        closeJarvisUI();

        const normalizedQuery = query.toUpperCase().replace(/[^A-Z0-9]/g, "");
        let executionSuccess = false;

        // Use cached DOM elements for blazing fast lookup
        if (isMusic) {
            const musicButtons = State.cachedMusicBtns.length ? State.cachedMusicBtns : document.querySelectorAll('i#music');
            for (let btn of musicButtons) {
                const data = btn.dataset;
                const container = btn.closest('.movies');

                if (container && container.dataset.title && container.dataset.title.toUpperCase().replace(/[^A-Z0-9]/g, "") === normalizedQuery) {
                    localStorage.setItem('targetSongIndex', 0);
                    btn.click();
                    executionSuccess = true; break;
                }

                for (let i = 1; i <= 20; i++) {
                    const songName = data[`songtitle${i}`] || data[`songTitle${i}`];
                    if (songName) {
                        const cleanSong = songName.toUpperCase().replace(/[^A-Z0-9]/g, "");
                        if (cleanSong.includes(normalizedQuery) || normalizedQuery.includes(cleanSong)) {
                            localStorage.setItem('targetSongIndex', i - 1);
                            btn.click();
                            executionSuccess = true; break;
                        }
                    }
                }
                if (executionSuccess) break;
            }
        } else {
            const movieCards = State.cachedMovies.length ? State.cachedMovies : Array.from(document.querySelectorAll('.movies'));
            for (let card of movieCards) {
                if (card.dataset.title && card.dataset.title.toUpperCase().replace(/[^A-Z0-9]/g, "") === normalizedQuery) {
                    if (typeof movieView === "function") {
                        movieView(card);
                        executionSuccess = true; break;
                    }
                }
            }
        }

        // Cross-Page Routing
        if (!executionSuccess) {
            const searchBars = State.searchInputs.length ? State.searchInputs : document.querySelectorAll('input[type="search"]');
            if (searchBars.length > 0) {
                searchBars.forEach(input => {
                    input.value = query;
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                });
                if (typeof executeSearch === 'function') executeSearch();
            } else {
                const param = isMusic ? 'autoPlaySong' : 'autoPlay';
                window.location.href = `movie.html?${param}=${encodeURIComponent(query)}`;
            }
        }
    });
}

// 9. VISIBILITY & SHORTCUTS
document.addEventListener("visibilitychange", () => {
    if (document.hidden) closeJarvisUI();
});

window.addEventListener('beforeunload', () => {
    if (State.recognition) State.recognition.abort();
});

document.addEventListener('keydown', (e) => {
    const activeTag = document.activeElement ? document.activeElement.tagName : '';
    if (['INPUT', 'TEXTAREA'].includes(activeTag) || e.ctrlKey || e.altKey || e.metaKey) return;

    if (e.key.toLowerCase() === 'v') {
        e.preventDefault();
        toggleJarvis();
    }
    if (e.key === 'Escape') {
        e.preventDefault();
        triggerGoBack();
    }
});


// Run this function after your app fetches its main media list from the database
function autoTrainVoiceAssistant(allMoviesList, allSongsList) {
    if (allMoviesList && Array.isArray(allMoviesList)) {
        allMoviesList.forEach(item => {
            if (item.title) MOVIE_TRAINING.push(item.title.toUpperCase());
            if (item.tamil_title) MOVIE_TRAINING.push(item.tamil_title.toUpperCase());
        });
    }

    if (allSongsList && Array.isArray(allSongsList)) {
        allSongsList.forEach(item => {
            if (item.title) MUSIC_TRAINING.push(item.title.toUpperCase());
            if (item.artist) MUSIC_TRAINING.push(item.artist.toUpperCase());
        });
    }
    
    // De-duplicate arrays instantly using a Set for faster runtime lookup performance
    window.MOVIE_TRAINING = [...new Set(MOVIE_TRAINING)];
    window.MUSIC_TRAINING = [...new Set(MUSIC_TRAINING)];
}