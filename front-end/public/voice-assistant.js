// ==========================================
// 1. MOVIE TITLE TRAINING (data-title)
// ==========================================
const MOVIE_TRAINING = {
    // Tamil Movies
    "AMARAN": ["AMARAN", "AMARON", "AMARIN"],
    "தூங்கி எழுந்தாச்சா": ["தூங்கி எழுந்தாச்சா", "தூங்கி எழுந்தாச்சா", "தூங்கி எழுந்தாச்சா", "தூங்கி எழுந்தாச்சா", "தூங்கி எழுந்தாச்சா", "THUNGI EZHUNTHAACHAA", "THUNGI EZHUNTHAACHAA", "THUNGI EZHUNTHAACHAA", "THUNGI EZHUNTHAACHAA", "THUNGI EZHUNTHAACHAA"],
    "DUDE": ["DUDE", "DOOD", "DUD", "DEWD", "DOODLE", "DUDES", "DEW", "DUDDY", "DUNE", "build", "WEIRD", "DEER", "BEARD", "FOOD", "DUE", "VIEW", "VIEWED", "DUDE MOVIE", "DUDE MOVIES", "DOOD MOVIE", "DOOD MOVIES"],
    "AVATAR": ["AVATAR", "AVATHAR", "AVATOR", "AWTAR"],
    "DARBAR": ["DARBAR", "DARBAAR", "DARPAR", "DURBAR"],
    "AQUAMAN": ["AQUAMAN", "AQUA MAN", "ACCUA MAN", "AKUAMAN"],
    "KATASI VIVASAYI": ["KATASI VIVASAYI", "KADAISI VIVASAYI", "KADASI VIVASAYI", "KATAISY VIWASAYI", "KATASI VIVASAYE"],
    "CAPTAIN AMERICA": ["CAPTAIN AMERICA", "CAPTAN AMERICA", "CAPTAIN AMERICAN"],
    "BISON": ["BISON", "BYSON", "BAYSAN", "POISON"],
    "AMBULI": ["AMBULI", "AMBERLY", "HUMBLY", "UNBOLI", "AMBULI", "AMPU LEE", "AMBULY", "AMPULI", "AMBLY", "AMBILY", "AMPU", "AMBULLY", "ambully"],
    "IDLI KADAI": ["IDLI KADAI", "ITALY KADAI", "IDLY KADAI", "ITLY", "ITLI", "ITALY"],
    "KAANTHA": ["KAANTHA", "KANTHA", "KANTA", "KAANTA"],
    "AARYAN": ["AARYAN", "ARYAN", "ARIAN"],
    "DIESEL": ["DIESEL", "DEESEL", "DEZEL", "DISEL"],
    "RAAYAN": ["RAAYAN", "RAYAN", "RYAN"],
    "KASETHAN KADAVULATA": ["KASETHAN KADAVULATA", "KASETHAN KADAVULADA", "KASU THAN KADAVULADA", "KASHTHAN KADAVULADA"],
    "CAPTAIN MILLER": ["CAPTAIN MILLER", "CAPTAN MILLER"],
    "ASURAN": ["ASURAN", "ASHURAN", "ASURAM"],
    "SARPATTA PARAMBARAI": ["SARPATTA PARAMBARAI", "SARBATA PARAMBARAI", "SARPATTA PARAMBARI", "SARPATTA"],
    "BAASHSHA": ["BAASHSHA", "BASHA", "BAASHA", "PAASHA"],
    "JAI BHIM": ["JAI BHIM", "JAI BEEM", "JAY BHIM", "JAI BHEEM"],
    "RETRO(2025)": ["RETRO", "RETRO 2025", "RETROW"],
    "VIKRAM": ["VIKRAM", "VICRAM", "VICKRAM"],
    "KUTUMPASTHAN": ["KUTUMPASTHAN", "KUDUMBASTHAN", "KUTUMBASTHAN"],
    "TEYVA MAKAN": ["TEYVA MAKAN", "DEVA MAGAN", "THEVA MAGAN"],
    "PIREMALU": ["PIREMALU", "PREMALU", "PREM ALU"],

    // Hindi Movies
    "MAIDAAN": ["MAIDAAN", "MAIDAN", "MYDAN", "MYDAAN"],
    "LIGER": ["LIGER", "LYGER", "LIGGER"],
    "MY NAME IS KHAN": ["MY NAME IS KHAN", "MY NAME IS KAN"],
    "ADIPURUSH": ["ADIPURUSH", "AADI PURUSH", "AADIPURUSH"],
    "ARJUN": ["ARJUN", "ARJUNAN", "ARJUNA"],
    "COCKTAIL": ["COCKTAIL", "COCK TAIL"],
    "DEVA": ["DEVA", "THEVA"],
    "GABBAR": ["GABBAR", "GABAR", "KAPPAR"],
    "GAME CHANGER": ["GAME CHANGER", "GAMECHANGER"],
    "HERO": ["HERO", "HIRO"],
    "LOVE AJEE HAL": ["LOVE AJEE HAL", "LOVE AAJ KAL", "LOVE AJ KAL"],
    "NAVABZAADE": ["NAVABZAADE", "NAWABZAADE", "NAWABZADE"],
    "PINK": ["PINK", "BINK"],
    "RAANJHANA": ["RAANJHANA", "RANJANA", "RANJHANA"],
    "RAM LEELA": ["RAM LEELA", "RAM LILA", "RAM LELA"],
    "RASCALES": ["RASCALES", "RASCALS"],
    "SHUBU MANGAL SAAVDAN": ["SHUBU MANGAL SAAVDAN", "SHUBH MANGAL SAAVDHAN"],
    "SIMMPA": ["SIMMPA", "SIMMBA", "SIMBA"],
    "SIRAI": ["SIRAI", "SHIRAI"],
    "SONU TITU SWEETY": ["SONU TITU SWEETY", "SONU KE TITU KI SWEETY"]
};

// ==========================================
// 2. MUSIC/SONG TITLE TRAINING (data-songTitle)
// ==========================================
const MUSIC_TRAINING = {
    // Universal
    "JUKEBOX": ["JUKEBOX", "JUKE BOX", "ALL SONGS", "FULL ALBUM", "PLAYLIST"],

    // Dude Songs
    "OORUM BLOOD": ["OORUM BLOOD", "ORUM BLOOD", "OORAM BLOOD", "OUR BLOOD", "ROOM BLOOD"],
    "SINGARI": ["SINGARI", "SINGARY", "SHINGARI", "CHINGARI"],
    "KANNUKULLA": ["KANNUKULLA", "KANUKULLA", "KANNUKULA", "KANNU KULLA", "CANNUKULA"],
    "NALLARU PO": ["NALLARU PO", "NALARU PO", "NALLARU PAA", "NALLA RUPU"],
    "YUMABAIBESA": ["YUMABAIBESA", "YUMA", "YAMBAI", "YAMABAI", "YUMMABAI"],

    // Ampuli Songs
    "AATHA NEE PETHAAYE": [
        // 1. Standard & Correct
        "AATHA NEE PETHAAYE",
        "AATHA NEE PETHAYE",
        "Adan",
        "HORROR",
        "ORDER",

        // 2. Typical Tanglish Spellings
        "AATHAA NEE PETHAYAE",
        "ATHA NEE PETHAYE",
        "ATHA NI PETHAYE",
        "AATHA NI PETHAYA",

        // 3. Blended Speech (How the mic hears fast Tamil)
        "AATHANEE PETHAYE",
        "AATHANI PETHAYE",
        "ATHANI PETHAYE",

        // 4. Hard Consonant Mishears
        "AATA NEE PETHAYE",
        "AATTA NEE PETHAYE",

        // 5. Context / Fallback Commands
        "AMBULI SONG",
        "AMBULI AATHA SONG",
        "AMPULI SONG"
    ],

    // Idli Kadai Songs
    "YEN PAATTAN SAAMI VARUM": [
        // 1. Standard & Correct
        "YEN PAATTAN SAAMI VARUM",
        "EN PAATTAN SAAMI VARUM",

        // 2. Typical Tanglish Variations (Yen vs En / Pattan vs Paatan / Saami vs Sami)
        "YEN PATTAN SAMI VARUM",
        "EN PATTAN SAMI VARUM",
        "YEN PATTAN SAAMY VARUM",
        "EN PATTAN SWAMY VARUM",
        "EN PATAN SAMI VARUM",
        "YEN PAATAN SAMI VARUM",

        // 3. Blended Speech (How the mic hears fast, continuous Tamil)
        "YENPATTAN SAMI VARUM",
        "ENPATTAN SAAMI VARUM",
        "YEN PATTANSAMI VARUM",
        "EN PATTAN SAMIVARUM",

        // 4. Shortened / Casual Commands (Users often drop the last word)
        "YEN PATTAN SAMI",
        "EN PATTAN SAMI",
        "PAATTAN SAAMI VARUM",
        "PATTAN SAMI",

        // 5. Context / Fallback Commands (If they include the movie name)
        "IDLI KADAI YEN PATTAN",
        "IDLI KADAI PATTAN SAMI",
        "IDLI KADAI SONG"
    ],
    "ENNA SUGAM": ["ENNA SUGAM", "ENA SUGAM"],
    "ETHANA SAAMI": ["ETHANA SAAMI", "ETHANA SAMI", "ETNA SAMI", "ETHANA SAAMY"],
    "ENJAAMI THANDHAANE": [
        // 1. Standard & Correct
        "ENJAAMI THANDHAANE", 
        "ENJAMI TANDHANE", 
        "ENJAMI",

        // 2. Typical Tanglish Variations (Yen vs En / Th vs T vs D)
        "YENJAAMI THANDHAANE",
        "YENJAMI THANTHANE",
        "ENJAAMI THANTHANE",
        "ENJAMI THANDHANE",
        "ANJAAMI THANDHAANE",
        "ANJAMI THANTHANE",

        // 3. Blended Speech (How the mic hears fast, continuous Tamil)
        "ENJAAMITHANDHAANE",
        "YENJAMITHANTHANE",
        "ENJAMITHANDHANE",

        // 4. Hard/Soft Consonant Mishears (Western mic engines struggle with 'Th')
        "ENJAMI TANTANE",
        "ENJAAMI DHANDHAANE",
        "ENJAMI TANDANE",

        // 5. Shortened / Contextual Commands
        "ENJAAMI SONG",
        "YENJAMI SONG",
        "IDLI KADAI ENJAAMI"
    ],
    "MY HEARTU SPINNING": ["MY HEARTU SPINNING", "MY HEART SPINNING", "HEART SPINNING"],
    "KULASAMY KAAVAL KAAKA": ["KULASAMY KAAVAL KAAKA", "KULASAMI KAVAL KAKA", "KULASAMY"]
};

// ==========================================
// 3. HERO/ACTOR TRAINING (data-name)
// ==========================================
const HERO_TRAINING = {
    "PRADEEP RANGANATHAN": ["PRADEEP RANGANATHAN", "PRADHEEP", "PRADEEP", "PRADIP"],
    "PARTHIBAN": ["PARTHIBAN", "PARTIBAN"],
    "DHANUSH": ["DHANUSH", "DANUSH", "THANUSH"],
    "RAJINI": ["SUPER STAR RAJINI", "RAJINI", "RAJINIKANTH", "RAJNI", "RAJINI SS"],
    "SIVA KARTHIC": ["SIVA KARTHIC", "SIVA KARTHIKEYAN", "SHIVA KARTHIK"],
    "SAM WARTHINTON": ["SAM WARTHINTON", "SAM WORTHINGTON"],
    "HARI WACKER": ["HARI WACKER", "HARI WORKER"],
    "VIJAY SETHUPATHY": ["VIJAY SETHUPATHY", "VIJAY SETHUPATHI", "VJS", "SETHUPATHI"]
};

let isVoiceProcessing = false;


// ==========================================
// 4. AI AUTO-LEARNING & FUZZY MATCHING ENGINE
// ==========================================

// A. Load learned words from LocalStorage and merge with your master lists
function getLearnedDictionary(baseDict, storageKey) {
    let merged = JSON.parse(JSON.stringify(baseDict));
    let learned = JSON.parse(localStorage.getItem(storageKey)) || {};
    for (let key in learned) {
        if (merged[key]) {
            // Combine hardcoded training with newly learned user slang
            merged[key] = [...new Set([...merged[key], ...learned[key]])];
        }
    }
    return merged;
}

let SMART_MOVIE_DICT = getLearnedDictionary(MOVIE_TRAINING, "learned_movies");
let SMART_MUSIC_DICT = getLearnedDictionary(MUSIC_TRAINING, "learned_music");

// B. Levenshtein Distance Algorithm (Scores how similar two words are from 0.0 to 1.0)
function calculateSimilarity(s1, s2) {
    let longer = s1.length > s2.length ? s1 : s2;
    let shorter = s1.length > s2.length ? s2 : s1;
    if (longer.length === 0) return 1.0;
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

// C. Save new slang to the browser so the bot gets smarter
function saveLearnedSlang(spokenWord, masterKey, storageKey, memoryDict) {
    let learned = JSON.parse(localStorage.getItem(storageKey)) || {};
    if (!learned[masterKey]) learned[masterKey] = [];

    // If the slang hasn't been learned yet, save it permanently!
    if (!learned[masterKey].includes(spokenWord)) {
        learned[masterKey].push(spokenWord);
        localStorage.setItem(storageKey, JSON.stringify(learned));
        memoryDict[masterKey].push(spokenWord); // Update active memory instantly
        console.log(`🤖 AI Learned new slang: "${spokenWord}" mapped to "${masterKey}"`);
    }
}

// Voice Response Logic
function assistantSpeak(text) {
    const synth = window.speechSynthesis;
    synth.cancel(); // Stop any overlapping voices
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US','ta-IN', 'en-IN'; // Set language to English (India) for better Tamil/Indian accent support   
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

    // Set language (You can use 'ta-IN' for Tamil or 'en-IN' for Indian English)
    window.recognition.lang = 'en-IN', 'ta-IN', 'en-US';
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
            // --- NEW: MAKE TRIGGER WORDS OPTIONAL ---
            // This instantly removes words like "Play", "Search", or "Open" if the user says them.
            // If they don't say them (e.g., they just say "AMBULI"), it keeps the word perfectly intact!
            let spokenName = transcript.toUpperCase().replace(/\b(PLAYING|PLAY|OPEN|SEARCH FOR|SEARCH|SHOW ME|I WANT TO WATCH|START)\b/g, '').trim();

            // As long as they said *something*, run your existing logic
            if (spokenName.length > 0) {

                if (searchType === 'movie') {
                    let bestMatch = null;
                    let highestScore = 0;

                    // --- AI SMART MATCHING FOR MOVIES ---
                    for (const [correctName, variants] of Object.entries(SMART_MOVIE_DICT)) {
                        if (variants.some(variant => spokenName.includes(variant.toUpperCase()))) {
                            bestMatch = correctName;
                            highestScore = 1.0; 
                            break;
                        }
                        
                        variants.forEach(variant => {
                            let score = calculateSimilarity(spokenName, variant.toUpperCase());
                            if (score > highestScore) {
                                highestScore = score;
                                bestMatch = correctName;
                            }
                        });
                    }

                    if (bestMatch && highestScore >= 0.70) {
                        if (highestScore < 1.0) {
                            saveLearnedSlang(spokenName, bestMatch, "learned_movies", SMART_MOVIE_DICT);
                        }
                        spokenName = bestMatch; 
                    }
                    // ------------------------------------

                    const searchInput = document.getElementById("movieSearchInput");
                    if (searchInput) {
                        searchInput.value = spokenName;

                        const movieCards = Array.from(document.querySelectorAll('.movies'));
                        const foundCard = movieCards.find(card => card.dataset.title.toUpperCase() === spokenName && card.style.display !== 'none');

                        if (foundCard) {
                            assistantSpeak(`Now playing ${spokenName.toLowerCase()} movie`);
                            statusText.innerText = `Found ${spokenName}! Playing in 2s...`;
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
                        setTimeout(() => {
                            window.location.href = `movie.html?autoPlay=${encodeURIComponent(spokenName)}`;
                        }, 2000);
                    }
                } 
                else if (searchType === 'music') {
                    let cleanedSongName = spokenName.replace(/\b(SONG|SONGS|MUSIC|AUDIO|TRACK)\b/g, '').replace(/\s+/g, ' ').trim();
                    let bestMatch = null;
                    let highestScore = 0;

                    // --- AI SMART MATCHING FOR MUSIC ---
                    for (const [correctName, variants] of Object.entries(SMART_MUSIC_DICT)) {
                        if (variants.some(variant => cleanedSongName.includes(variant.toUpperCase()))) {
                            bestMatch = correctName;
                            highestScore = 1.0;
                            break;
                        }
                        variants.forEach(variant => {
                            let score = calculateSimilarity(cleanedSongName, variant.toUpperCase());
                            if (score > highestScore) {
                                highestScore = score;
                                bestMatch = correctName;
                            }
                        });
                    }

                    if (bestMatch && highestScore >= 0.70) {
                        if (highestScore < 1.0) {
                            saveLearnedSlang(cleanedSongName, bestMatch, "learned_music", SMART_MUSIC_DICT);
                        }
                        cleanedSongName = bestMatch; 
                    }
                    // -----------------------------------

                    statusText.innerText = `Searching for ${cleanedSongName}...`;
                    handleMusicSearch(cleanedSongName);
                }
            } else {
                // If they accidentally clicked the mic and said nothing, or JUST said "Play"
                statusText.innerText = "Please say a movie or song name.";
                setTimeout(resetVoiceState, 2000);
            }
        }
    };

    window.recognition.onerror = (event) => {
        console.log("Speech Recognition Error Fired:", event.error); // Add this line!

        switch (event.error) {
            case 'no-speech':
                assistantSpeak("No speech detected. Please try again.");
                alert("No speech detected. Please try again.");
                break;
            case 'audio-capture':
                assistantSpeak("No microphone found. Please check your settings.");
                alert("No microphone found. Please check your settings.");
                break;
            case 'not-allowed':
                assistantSpeak("Microphone permission denied.");
                alert("Microphone permission denied.");
                break;
            default:
                assistantSpeak("A voice recognition error occurred, Pleas wait and say again");
                alert("A voice recognition error occurred, Pleas wait and say again");
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
                    assistantSpeak(`Now playing ${songName.toLowerCase()} song`);

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