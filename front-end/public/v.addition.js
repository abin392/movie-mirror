// ==========================================
// 1. MOVIE TITLE TRAINING (data-title)
// ==========================================

//this above all logic no affect to adding new one, user enter my webpage for first time to show the voice assistant instraction for only one time.
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
function getLearnedDictionary(baseDict, storageKey) {
    let merged = JSON.parse(JSON.stringify(baseDict));
    let learned = JSON.parse(localStorage.getItem(storageKey)) || {};
    for (let key in learned) {
        if (merged[key]) {
            merged[key] = [...new Set([...merged[key], ...learned[key]])];
        }
    }
    return merged;
}

let SMART_MOVIE_DICT = getLearnedDictionary(MOVIE_TRAINING, "learned_movies");
let SMART_MUSIC_DICT = getLearnedDictionary(MUSIC_TRAINING, "learned_music");

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

function saveLearnedSlang(spokenWord, masterKey, storageKey, memoryDict) {
    let learned = JSON.parse(localStorage.getItem(storageKey)) || {};
    if (!learned[masterKey]) learned[masterKey] = [];

    if (!learned[masterKey].includes(spokenWord)) {
        learned[masterKey].push(spokenWord);
        localStorage.setItem(storageKey, JSON.stringify(learned));
        memoryDict[masterKey].push(spokenWord);
        console.log(`🤖 AI Learned new slang: "${spokenWord}" mapped to "${masterKey}"`);
    }
}

// ==========================================
// 5. CORE VOICE FUNCTIONS
// ==========================================
function assistantSpeak(text) {
    const synth = window.speechSynthesis;
    synth.cancel(); 
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN'; 
    utterance.rate = 1.0;
    synth.speak(utterance);
}

function toggleVoiceMenu() {
    const menu = document.getElementById('voice-options-menu');
    if (menu) {
        menu.classList.toggle('voice-hidden');
        assistantSpeak(""); 
    }
}

function resetVoiceState() {
    const overlay = document.getElementById('listening-overlay');
    if (overlay) overlay.classList.add('voice-hidden');
    isVoiceProcessing = false;
    
    // Resume background listening for "Hey Mirror" after a pause
    startWakeWordListening(); 
}

function stopVoiceRecognition() {
    if (window.recognition) window.recognition.abort();
    window.speechSynthesis.cancel();
    resetVoiceState();
}

// ==========================================
// 6. MAIN SEARCH LOGIC (MOVIE / MUSIC)
// ==========================================
function startVoiceRecognition(searchType = 'movie') {
    if (isVoiceProcessing) return;

    const menu = document.getElementById('voice-options-menu');
    if (menu) menu.classList.add('voice-hidden');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    window.recognition = new SpeechRecognition();
    const overlay = document.getElementById('listening-overlay');
    const statusText = document.getElementById('voice-status');

    window.recognition.lang = 'en-IN';
    window.recognition.continuous = false;
    window.recognition.interimResults = true;

    statusText.innerText = searchType === 'movie' ? 'Say a Movie Name...' : 'Say a Song Name...';
    overlay.classList.remove('voice-hidden');
    
    stopWakeWordListening(); // Pause wake word while actively searching
    isVoiceProcessing = true;

    window.recognition.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            transcript += event.results[i][0].transcript;
        }
        
        // Show live text on the screen
        statusText.innerText = `"${transcript}"`;

        if (event.results[event.results.length - 1].isFinal) {
            let spokenName = transcript.toUpperCase().replace(/\b(PLAYING|PLAY|OPEN|SEARCH FOR|SEARCH|SHOW ME|I WANT TO WATCH|START)\b/g, '').trim();

            if (spokenName.length > 0) {
                if (searchType === 'movie') {
                    let bestMatch = null;
                    let highestScore = 0;

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
                        if (highestScore < 1.0) saveLearnedSlang(spokenName, bestMatch, "learned_movies", SMART_MOVIE_DICT);
                        spokenName = bestMatch;
                    }

                    const searchInput = document.getElementById("movieSearchInput");
                    if (searchInput) {
                        searchInput.value = spokenName;
                        const movieCards = Array.from(document.querySelectorAll('.movies'));
                        const foundCard = movieCards.find(card => card.dataset.title.toUpperCase() === spokenName && card.style.display !== 'none');

                        if (foundCard) {
                            assistantSpeak(`Now playing ${spokenName.toLowerCase()} movie`);
                            statusText.innerText = `Found ${spokenName}! Playing...`;
                            setTimeout(() => {
                                if (typeof movieView === "function") movieView(foundCard);
                                resetVoiceState();
                            }, 1500);
                        } else {
                            assistantSpeak(`Sorry, I couldn't find ${spokenName.toLowerCase()}`);
                            statusText.innerText = `Couldn't find "${spokenName}"`;
                            setTimeout(resetVoiceState, 2000);
                        }
                    } else {
                        assistantSpeak(`Now playing ${spokenName.toLowerCase()}`);
                        statusText.innerText = `Playing ${spokenName}...`;
                        setTimeout(() => {
                            window.location.href = `movie.html?autoPlay=${encodeURIComponent(spokenName)}`;
                        }, 1500);
                    }
                }
                else if (searchType === 'music') {
                    let cleanedSongName = spokenName.replace(/\b(SONG|SONGS|MUSIC|AUDIO|TRACK)\b/g, '').replace(/\s+/g, ' ').trim();
                    let bestMatch = null;
                    let highestScore = 0;

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
                        if (highestScore < 1.0) saveLearnedSlang(cleanedSongName, bestMatch, "learned_music", SMART_MUSIC_DICT);
                        cleanedSongName = bestMatch;
                    }

                    statusText.innerText = `Searching for ${cleanedSongName}...`;
                    handleMusicSearch(cleanedSongName);
                }
            } else {
                statusText.innerText = "Please say a movie or song name.";
                setTimeout(resetVoiceState, 2000);
            }
        }
    };

    window.recognition.onerror = (event) => {
        resetVoiceState();
    };

    window.recognition.onend = () => {
        resetVoiceState(); 
    };

    window.recognition.start();
}

function handleMusicSearch(songName) {
    let found = false;
    const musicButtons = document.querySelectorAll('i#music');
    const searchQuery = songName.toUpperCase().replace(/[^A-Z0-9]/g, "");
    const statusText = document.getElementById('voice-status');

    for (let btn of musicButtons) {
        const data = btn.dataset;
        const movieContainer = btn.closest('.movies');

        if (movieContainer) {
            const movieTitle = movieContainer.dataset.title || "";
            const cleanMovieTitle = movieTitle.toUpperCase().replace(/[^A-Z0-9]/g, "");

            if (cleanMovieTitle === searchQuery || cleanMovieTitle.includes(searchQuery)) {
                assistantSpeak(`Now playing ${movieTitle.toLowerCase()} playlist`);
                if (statusText) statusText.innerText = `Found ${movieTitle} Playlist! Playing...`;
                localStorage.setItem('targetSongIndex', 0);
                setTimeout(() => { btn.click(); resetVoiceState(); }, 1500);
                found = true;
                break;
            }
        }

        for (let i = 1; i <= 20; i++) {
            const titleVal = data[`songtitle${i}`] || data[`songTitle${i}`];
            if (titleVal) {
                const cleanTitle = titleVal.toUpperCase().replace(/[^A-Z0-9]/g, "");
                if (cleanTitle.includes(searchQuery) || searchQuery.includes(cleanTitle)) {
                    assistantSpeak(`Now playing ${songName.toLowerCase()} song`);
                    if (statusText) statusText.innerText = `Found ${songName}! Playing...`;
                    localStorage.setItem('targetSongIndex', i - 1);
                    setTimeout(() => { btn.click(); resetVoiceState(); }, 1500);
                    found = true;
                    break;
                }
            }
        }
        if (found) break;
    }

    if (!found) {
        assistantSpeak(`I couldn't find the song ${songName.toLowerCase()}`);
        if (statusText) statusText.innerText = `Couldn't find "${songName}"`;
        setTimeout(resetVoiceState, 2000);
    }
}

// ==========================================
// 7. HARDWARE INTEGRATION
// ==========================================
document.addEventListener('keydown', function (e) {
    const KEY_SEARCH = 10225, KEY_RED = 403, KEY_GREEN = 404, KEY_RETURN = 10009;
    switch (e.keyCode) {
        case KEY_SEARCH: if (typeof toggleVoiceMenu === "function") toggleVoiceMenu(); break;
        case KEY_RED: if (typeof startVoiceRecognition === "function") startVoiceRecognition('movie'); break;
        case KEY_GREEN: if (typeof startVoiceRecognition === "function") startVoiceRecognition('music'); break;
        case KEY_RETURN: 
            const menu = document.getElementById('voice-options-menu');
            if (menu && !menu.classList.contains('voice-hidden')) menu.classList.add('voice-hidden');
            break;
    }
});

document.addEventListener('keydown', function (e) {
    const activeTag = document.activeElement.tagName;
    if (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || e.ctrlKey || e.altKey || e.metaKey) return;

    switch (e.key.toLowerCase()) {
        case 'v': e.preventDefault(); document.getElementById('voice-assistant-btn')?.click() || toggleVoiceMenu?.(); break;
        case 'm': e.preventDefault(); startVoiceRecognition?.('movie'); break;
        case 's': e.preventDefault(); startVoiceRecognition?.('music'); break;
    }
});

// ==========================================
// 8. "HEY MIRROR" WAKE-WORD ASSISTANT
// ==========================================
let wakeWordRecognizer = null;
let isWakeWordListening = false;

function initMirrorAssistant() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    wakeWordRecognizer = new SpeechRecognition();
    wakeWordRecognizer.lang = 'en-IN';
    wakeWordRecognizer.continuous = true; 
    wakeWordRecognizer.interimResults = true; 

    wakeWordRecognizer.onresult = (event) => {
        if (isVoiceProcessing) return;

        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            transcript += event.results[i][0].transcript;
        }
        transcript = transcript.toLowerCase().trim();

        if (transcript.includes("hey mirror") || transcript.includes("mirror")) {
            console.log("Wake word detected!");

            stopWakeWordListening();
            isVoiceProcessing = true; 

            const overlay = document.getElementById('listening-overlay');
            const statusText = document.getElementById('voice-status');
            overlay.classList.remove('voice-hidden');
            statusText.innerText = "Hey Mirror activated...";

            askForSearchType();
        }
    };

    wakeWordRecognizer.onend = () => {
        if (!isVoiceProcessing && isWakeWordListening) {
            try { wakeWordRecognizer.start(); } catch (e) { }
        }
    };
    
    wakeWordRecognizer.onerror = (e) => {
        if (e.error === 'not-allowed' || e.error === 'audio-capture') {
            isWakeWordListening = false;
        }
    };
    
    startWakeWordListening();
}

function startWakeWordListening() {
    if (wakeWordRecognizer && !isWakeWordListening && !isVoiceProcessing) {
        isWakeWordListening = true;
        try { wakeWordRecognizer.start(); } catch (e) { }
    }
}

function stopWakeWordListening() {
    if (wakeWordRecognizer) {
        isWakeWordListening = false;
        try { wakeWordRecognizer.stop(); } catch (e) { }
    }
}

function askForSearchType() {
    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance("What is your search? Say Movie or Song.");
    utterance.lang = 'en-IN';
    utterance.rate = 1.0;

    const statusText = document.getElementById('voice-status');
    statusText.innerText = 'Say "Movie" or "Song"';

    utterance.onend = () => {
        listenForSearchType();
    };

    synth.speak(utterance);
}

// 🔴 FLAWLESS HANDOFF LOGIC
function handoffToSearch(type, spokenText) {
    const synth = window.speechSynthesis;
    synth.cancel(); // Clear any stuck speech
    
    // 1. Immediately show visual feedback on the glowing mic
    const statusText = document.getElementById('voice-status');
    statusText.innerText = spokenText + "..."; 

    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.lang = 'en-IN';
    utterance.rate = 1.0;
    
    let handoffComplete = false;

    // 2. The function that safely turns the next microphone on
    const triggerNext = () => {
        if (handoffComplete) return; // Prevent double-firing
        handoffComplete = true;
        isVoiceProcessing = false; // Unlock the system
        startVoiceRecognition(type); // Launch Movie or Music search
    };

    // 3. Trigger next when speaking finishes naturally
    utterance.onend = triggerNext;
    utterance.onerror = triggerNext;

    synth.speak(utterance);
    
    // 4. BULLETPROOF FALLBACK: Guarantee the mic turns on after 1.5s 
    // even if the browser's speech synthesis engine crashes or skips
    setTimeout(triggerNext, 1500);
}

function listenForSearchType() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const typeRecognizer = new SpeechRecognition();
    typeRecognizer.lang = 'en-IN';
    typeRecognizer.continuous = true; // Prevents the mic from cutting off too early
    typeRecognizer.interimResults = true;

    const statusText = document.getElementById('voice-status');
    let choiceMade = false;

    typeRecognizer.onresult = (event) => {
        if (choiceMade) return; // Stop processing once a choice is made

        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            transcript += event.results[i][0].transcript;
        }
        
        statusText.innerText = `"${transcript}"`;
        const finalTranscript = transcript.toLowerCase();

        // 🔴 THE FIX: We check instantly as you speak, zero latency.
        if (finalTranscript.includes("movie")) {
            choiceMade = true;
            typeRecognizer.stop();
            handoffToSearch('movie', "Opening Movie Search");

        } else if (finalTranscript.includes("song") || finalTranscript.includes("music")) {
            choiceMade = true;
            typeRecognizer.stop();
            handoffToSearch('music', "Opening Music Search");

        // Only throw an error if the sentence completely finished but lacked the trigger words
        } else if (event.results[event.results.length - 1].isFinal) {
            choiceMade = true;
            assistantSpeak("Sorry, I didn't catch that.");
            statusText.innerText = "Command not recognized.";
            setTimeout(() => {
                resetVoiceState();
            }, 2000);
        }
    };

    typeRecognizer.onerror = (e) => {
        // Ignore the 'aborted' error that triggers when we manually stop it
        if (!choiceMade && e.error !== 'aborted') {
            resetVoiceState();
        }
    };

    typeRecognizer.start();
}

// Initialize on first interaction to bypass browser auto-play/mic blocks
let mirrorInitialized = false;
document.addEventListener('click', () => {
    if (!mirrorInitialized) {
        initMirrorAssistant();
        mirrorInitialized = true;
        console.log("Hey Mirror background listener is active!");
    }
}, { once: true });







//// ==========================================
// 0. DYNAMIC CSS FOR GLOWING MIC EFFECT (AUDIO REACTIVE + MOBILE FALLBACK)
// ==========================================
const micStyle = document.createElement('style');
micStyle.innerHTML = `
    .mic-listening-active {
        width: 100px !important; 
        height: 100px !important; 
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        margin: 0 auto !important;
        border-color: transparent !important;
        border-width: 2px !important; 
        border-style: solid !important; 
        border-radius: 50% !important; 
        transition: transform 0.05s ease-out, box-shadow 0.05s ease-out !important; 
        transform-origin: center !important;
    }
    .mic-listening-active i {
        color: #f6d0ff !important;
        text-shadow: 0 0 15px #8e44ad, 0 0 30px #8e44ad !important;
        margin: 0 !important;
    }
    /* MOBILE HARDWARE LOCK FALLBACK ANIMATION */
    @keyframes fallback-pulse {
        0% { transform: scale(1); box-shadow: 0 0 15px rgba(142,68,173,0.4), inset 0 0 10px rgba(142,68,173,0.3); }
        50% { transform: scale(1.15); box-shadow: 0 0 25px rgba(142,68,173,0.8), inset 0 0 15px rgba(142,68,173,0.6); }
        100% { transform: scale(1); box-shadow: 0 0 15px rgba(142,68,173,0.4), inset 0 0 10px rgba(142,68,173,0.3); }
    }
    .mic-fallback-pulse {
        animation: fallback-pulse 1.2s infinite ease-in-out !important;
    }
`;
document.head.appendChild(micStyle);

// Audio Context Variables
let audioContext = null;
let analyser = null;
let microphoneStream = null;
let visualizerFrame = null;

// Normalize SpeechRecognition API globally
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

async function startAudioVisualizer() {
    const micWrapper = document.querySelector('.mic-glow');
    if (!micWrapper) return;

    if (audioContext && audioContext.state === 'running') return; 

    try {
        microphoneStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();
        
        // CRITICAL FOR MOBILE: Force resume suspended audio contexts
        if (audioContext.state === 'suspended') {
            await audioContext.resume();
        }

        analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(microphoneStream);
        
        source.connect(analyser);
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        function renderFrame() {
            if (!micWrapper.classList.contains('mic-listening-active')) return;
            
            visualizerFrame = requestAnimationFrame(renderFrame);
            analyser.getByteFrequencyData(dataArray);
            
            let sum = 0;
            for(let i = 0; i < bufferLength; i++) { sum += dataArray[i]; }
            let averageVolume = sum / bufferLength;
            
            let targetScale = 1 + (averageVolume / 120); 
            if (targetScale > 1.35) targetScale = 1.35; 
            
            let shadowSpread = 15 + (averageVolume * 1.5);
            let shadowOpacity = Math.min(0.9, 0.4 + (averageVolume / 100));

            micWrapper.style.transform = `scale(${targetScale})`;
            micWrapper.style.boxShadow = `0 0 ${shadowSpread}px rgba(142, 68, 173, ${shadowOpacity}), inset 0 0 15px rgba(142, 68, 173, 0.5)`;
        }
        renderFrame();
    } catch (err) {
        console.warn("Visualizer Mic locked by Speech API (Common on Mobile). Using CSS Fallback.", err);
        // MOBILE FIX: If dual-mic access is blocked, use a CSS animation so it still looks alive
        micWrapper.classList.add('mic-fallback-pulse');
    }
}

function stopAudioVisualizer() {
    if (visualizerFrame) {
        cancelAnimationFrame(visualizerFrame);
        visualizerFrame = null;
    }
    if (microphoneStream) {
        microphoneStream.getTracks().forEach(track => {
            track.stop();
            track.enabled = false;
        });
        microphoneStream = null;
    }
    if (audioContext && audioContext.state !== 'closed') {
        audioContext.close().catch(() => {});
        audioContext = null;
    }
    
    const micWrapper = document.querySelector('.mic-glow');
    if (micWrapper) {
        micWrapper.style.transform = 'scale(1)';
        micWrapper.style.boxShadow = 'none';
        micWrapper.classList.remove('mic-fallback-pulse'); // Remove mobile fallback
    }
}

function setMicGlowState(isActive) {
    const micGlowWrapper = document.querySelector('.mic-glow');
    if (micGlowWrapper) {
        if (isActive) {
            micGlowWrapper.classList.add('mic-listening-active');
            startAudioVisualizer(); 
        } else {
            micGlowWrapper.classList.remove('mic-listening-active');
            stopAudioVisualizer(); 
        }
    }
}

// ==========================================
// 1. MOVIE TITLE TRAINING (data-title)
// ==========================================
const MOVIE_TRAINING = {
    // Tamil Movies
    "AMARAN": ["AMARAN", "AMARON", "AMARIN"],
    "தூங்கி எழுந்தாச்சா": ["தூங்கி எழுந்தாச்சா", "THUNGI EZHUNTHAACHAA"],
    "DUDE": ["DUDE", "DOOD", "DUD", "DEWD", "DOODLE", "DUDES", "DEW", "DUDDY", "DUNE", "build", "WEIRD", "DEER", "BEARD", "FOOD", "DUE", "VIEW", "VIEWED", "DUDE MOVIE", "DUDE MOVIES", "DOOD MOVIE", "DOOD MOVIES"],
    "AVATAR": ["AVATAR", "AVATHAR", "AVATOR", "AWTAR"],
    "DARBAR": ["DARBAR", "DARBAAR", "DARPAR", "DURBAR"],
    "AQUAMAN": ["AQUAMAN", "AQUA MAN", "ACCUA MAN", "AKUAMAN"],
    "KATASI VIVASAYI": ["KATASI VIVASAYI", "KADAISI VIVASAYI", "KADASI VIVASAYI", "KATAISY VIWASAYI", "KATASI VIVASAYE"],
    "CAPTAIN AMERICA": ["CAPTAIN AMERICA", "CAPTAN AMERICA", "CAPTAIN AMERICAN"],
    "BISON": ["BISON", "BYSON", "BAYSAN", "POISON"],
    "AMBULI": ["AMBULI", "AMBERLY", "HUMBLY", "UNBOLI", "AMPU LEE", "AMBULY", "AMPULI", "AMBLY", "AMBILY", "AMPU", "AMBULLY"],
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
    "JUKEBOX": ["JUKEBOX", "JUKE BOX", "ALL SONGS", "FULL ALBUM", "PLAYLIST"],
    "OORUM BLOOD": ["OORUM BLOOD", "ORUM BLOOD", "OORAM BLOOD", "OUR BLOOD", "ROOM BLOOD"],
    "SINGARI": ["SINGARI", "SINGARY", "SHINGARI", "CHINGARI"],
    "KANNUKULLA": ["KANNUKULLA", "KANUKULLA", "KANNUKULA", "KANNU KULLA", "CANNUKULA"],
    "NALLARU PO": ["NALLARU PO", "NALARU PO", "NALLARU PAA", "NALLA RUPU"],
    "YUMABAIBESA": ["YUMABAIBESA", "YUMA", "YAMBAI", "YAMABAI", "YUMMABAI"],
    "AATHA NEE PETHAAYE": ["AATHA NEE PETHAAYE", "AATHA NEE PETHAYE", "Adan", "HORROR", "ORDER", "AATHAA NEE PETHAYAE", "ATHA NEE PETHAYE", "ATHA NI PETHAYE", "AATHA NI PETHAYA", "AATHANEE PETHAYE", "AATHANI PETHAYE", "ATHANI PETHAYE", "AATA NEE PETHAYE", "AATTA NEE PETHAYE", "AMBULI SONG", "AMBULI AATHA SONG", "AMPULI SONG"],
    "YEN PAATTAN SAAMI VARUM": ["YEN PAATTAN SAAMI VARUM", "EN PAATTAN SAAMI VARUM", "YEN PATTAN SAMI VARUM", "EN PATTAN SAMI VARUM", "YEN PATTAN SAAMY VARUM", "EN PATTAN SWAMY VARUM", "EN PATAN SAMI VARUM", "YEN PAATAN SAMI VARUM", "YENPATTAN SAMI VARUM", "ENPATTAN SAAMI VARUM", "YEN PATTANSAMI VARUM", "EN PATTAN SAMIVARUM", "YEN PATTAN SAMI", "EN PATTAN SAMI", "PAATTAN SAAMI VARUM", "PATTAN SAMI", "IDLI KADAI YEN PATTAN", "IDLI KADAI PATTAN SAMI", "IDLI KADAI SONG"],
    "ENNA SUGAM": ["ENNA SUGAM", "ENA SUGAM"],
    "ETHANA SAAMI": ["ETHANA SAAMI", "ETHANA SAMI", "ETNA SAMI", "ETHANA SAAMY"],
    "ENJAAMI THANDHAANE": ["ENJAAMI THANDHAANE", "ENJAMI TANDHANE", "ENJAMI", "YENJAAMI THANDHAANE", "YENJAMI THANTHANE", "ENJAAMI THANTHANE", "ENJAMI THANDHANE", "ANJAAMI THANDHAANE", "ANJAMI THANTHANE", "ENJAAMITHANDHAANE", "YENJAMITHANTHANE", "ENJAMITHANDHANE", "ENJAMI TANTANE", "ENJAAMI DHANDHAANE", "ENJAMI TANDANE", "ENJAAMI SONG", "YENJAMI SONG", "IDLI KADAI ENJAAMI"],
    "MY HEARTU SPINNING": ["MY HEARTU SPINNING", "MY HEART SPINNING", "HEART SPINNING"],
    "KULASAMY KAAVAL KAAKA": ["KULASAMY KAAVAL KAAKA", "KULASAMI KAVAL KAKA", "KULASAMY"]
};

// ==========================================
// 3. AI AUTO-LEARNING & FUZZY MATCHING ENGINE
// ==========================================
function getLearnedDictionary(baseDict, storageKey) {
    let merged = JSON.parse(JSON.stringify(baseDict));
    let learned = JSON.parse(localStorage.getItem(storageKey)) || {};
    for (let key in learned) {
        if (merged[key]) {
            merged[key] = [...new Set([...merged[key], ...learned[key]])];
        }
    }
    for (let key in merged) {
        merged[key] = merged[key].map(v => v.toUpperCase());
    }
    return merged;
}

let SMART_MOVIE_DICT = getLearnedDictionary(MOVIE_TRAINING, "learned_movies");
let SMART_MUSIC_DICT = getLearnedDictionary(MUSIC_TRAINING, "learned_music");

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

function saveLearnedSlang(spokenWord, masterKey, storageKey, memoryDict) {
    let learned = JSON.parse(localStorage.getItem(storageKey)) || {};
    if (!learned[masterKey]) learned[masterKey] = [];
    
    let upperSpoken = spokenWord.toUpperCase();
    if (!learned[masterKey].includes(upperSpoken)) {
        learned[masterKey].push(upperSpoken);
        localStorage.setItem(storageKey, JSON.stringify(learned));
        if(!memoryDict[masterKey].includes(upperSpoken)){
            memoryDict[masterKey].push(upperSpoken);
        }
    }
}

// ==========================================
// 4. CORE VOICE & UI FUNCTIONS
// ==========================================
let isVoiceProcessing = false;
window.keepMicAlive = false;       
window.keepTypeMicAlive = false;   
let mirrorInitialized = false;

window.voiceTimeouts = [];
function setVoiceTimeout(callback, delay) {
    const id = setTimeout(() => {
        callback();
        window.voiceTimeouts = window.voiceTimeouts.filter(t => t !== id);
    }, delay);
    window.voiceTimeouts.push(id);
    return id;
}
function clearVoiceTimeouts() {
    window.voiceTimeouts.forEach(id => clearTimeout(id));
    window.voiceTimeouts = [];
}

function assistantSpeak(text) {
    const synth = window.speechSynthesis;
    synth.cancel(); 
    if(text === "") return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN'; 
    utterance.rate = 1.0;
    synth.speak(utterance);
}

function toggleVoiceMenu() {
    const menu = document.getElementById('voice-options-menu');
    if (menu) {
        menu.classList.toggle('voice-hidden');
        assistantSpeak(""); 
    }
    showMirrorHint();
}

function showMirrorHint() {
    let existing = document.getElementById('mirror-hint-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'mirror-hint-toast';
    toast.style.cssText = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: rgba(30, 10, 45, 0.95); color: #fff; padding: 25px 40px;
        border-radius: 20px; font-family: sans-serif; font-size: 18px; font-weight: bold;
        letter-spacing: 1px; box-shadow: 0 0 30px rgba(142, 68, 173, 0.7);
        border: 1px solid rgba(142, 68, 173, 0.8); display: flex; flex-direction: column;
        align-items: center; justify-content: center; gap: 20px; z-index: 10000;
        transition: opacity 0.4s ease, transform 0.4s ease; backdrop-filter: blur(12px); text-align: center;
    `;
    
    toast.innerHTML = `
        <div>
        <div style="display: flex; align-items: center; gap: 15px;">
            <i class="fas fa-microphone" style="color: #00ff88; font-size: 28px; text-shadow: 0 0 15px #00ff88;"></i> 
            <span>Click OK button to say "HEY MIRROR"</span>
        </div>
        <button id="hint-ok-btn" style="
            background: linear-gradient(45deg, #8e44ad, #2a0e3c); border: 1px solid #00ff88;
            color: white; padding: 10px 35px; border-radius: 30px; font-size: 16px;
            font-weight: bold; cursor: pointer; box-shadow: 0 0 15px rgba(0, 255, 136, 0.3); 
            transition: all 0.3s ease; margin-top: 5px;
        ">OK</button>
        </div>
    `;
    document.body.appendChild(toast);

    const btn = document.getElementById('hint-ok-btn');
    let isClosed = false;
    const closeHint = (e) => {
        if(e) e.preventDefault();
        if (isClosed) return;
        isClosed = true;
        toast.style.opacity = '0';
        toast.style.transform = 'translate(-50%, -45%)';
        setTimeout(() => toast.remove(), 400); 
    };

    // Unified Mobile/PC event handler
    btn.addEventListener('click', closeHint);
    btn.addEventListener('touchend', closeHint, { passive: false });
}

function resetVoiceState() {
    setMicGlowState(false);
    const overlay = document.getElementById('listening-overlay');
    if (overlay) overlay.classList.add('voice-hidden');
    isVoiceProcessing = false;
    window.keepMicAlive = false;
    window.keepTypeMicAlive = false;
    
    const typeLabel = document.getElementById('permanent-search-label');
    if (typeLabel) typeLabel.style.display = 'none';

    if (!document.hidden && mirrorInitialized) {
        startWakeWordListening(); 
    }
}

// 🔴 THE MASTER KILL SWITCH
function stopVoiceRecognition() {
    setMicGlowState(false);
    window.keepMicAlive = false; 
    window.keepTypeMicAlive = false;
    isVoiceProcessing = false; 
    
    clearVoiceTimeouts(); 

    if (window.recognition) { try { window.recognition.abort(); } catch(e){} }
    if (window.typeRecognizer) { try { window.typeRecognizer.abort(); } catch(e){} }
    if (wakeWordRecognizer) { try { wakeWordRecognizer.abort(); } catch(e){} }
    
    window.speechSynthesis.cancel();
    
    const overlay = document.getElementById('listening-overlay');
    if (overlay) overlay.classList.add('voice-hidden');

    const typeLabel = document.getElementById('permanent-search-label');
    if (typeLabel) typeLabel.style.display = 'none';

    isWakeWordListening = false;
    mirrorInitialized = false; 
}

// ==========================================
// 5. MAIN SEARCH LOGIC (MOVIE / MUSIC)
// ==========================================
function startVoiceRecognition(searchType = 'movie') {
    if (isVoiceProcessing) return;

    if (!window.SpeechRecognition) {
        alert("Microphone features are not supported or blocked in this browser.");
        return;
    }

    const menu = document.getElementById('voice-options-menu');
    if (menu) menu.classList.add('voice-hidden');

    window.recognition = new window.SpeechRecognition();
    const overlay = document.getElementById('listening-overlay');
    const statusText = document.getElementById('voice-status');

    let typeLabel = document.getElementById('permanent-search-label');
    if (!typeLabel) {
        typeLabel = document.createElement('div');
        typeLabel.id = 'permanent-search-label';
        typeLabel.style.cssText = `
            color: #00ff88; font-size: 1.5rem; font-weight: bold; margin-bottom: 25px;
            letter-spacing: 2px; text-transform: uppercase; text-shadow: 0 0 15px rgba(0, 255, 136, 0.6);
            text-align: center; width: 100%;
        `;
        const micNode = document.querySelector('.mic-glow');
        if (micNode && micNode.parentNode) {
            micNode.parentNode.insertBefore(typeLabel, micNode);
        } else if (statusText && statusText.parentNode) {
            statusText.parentNode.insertBefore(typeLabel, statusText);
        } else if (overlay) {
            overlay.prepend(typeLabel);
        }
    }
    
    if (typeLabel) {
        typeLabel.innerText = searchType === 'movie' ? '🎬 SAY A MOVIE NAME' : '🎵 SAY A SONG NAME';
        typeLabel.style.display = 'block';
    }

    window.recognition.lang = 'en-IN';
    window.recognition.continuous = true; 
    window.recognition.interimResults = true; 

    let matchFound = false;

    window.recognition.onstart = () => {
        if (!matchFound) {
            statusText.innerText = "Listening...";
            setMicGlowState(true); 
        }
    };

    statusText.innerText = 'Starting Mic...';
    if(overlay) overlay.classList.remove('voice-hidden');
    
    stopWakeWordListening(); 
    isVoiceProcessing = true;
    window.keepMicAlive = true; 

    window.recognition.onresult = (event) => {
        if (matchFound) return; 

        let transcript = "";
        let isFinal = false;

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            transcript += event.results[i][0].transcript;
            if (event.results[i].isFinal) isFinal = true;
        }
        
        if (transcript.trim().length > 0 && !isFinal) {
            statusText.innerText = `"${transcript.trim()}"`;
        }

        if (isFinal) {
            let spokenName = transcript.toUpperCase().replace(/\b(PLAYING|PLAY|OPEN|SEARCH FOR|SEARCH|SHOW ME|I WANT TO WATCH|START)\b/g, '').trim();

            if (spokenName.length > 0) {
                matchFound = true; 
                setMicGlowState(false); 
                window.keepMicAlive = false; 
                try { window.recognition.abort(); } catch(e){}

                if (searchType === 'movie') {
                    statusText.innerHTML = `<i class="fas fa-circle-notch fa-spin" style="margin-right:8px;"></i> Searching for "${spokenName}"...`;
                    
                    setVoiceTimeout(() => {
                        let bestMatch = null;
                        let highestScore = 0;

                        for (const [correctName, variants] of Object.entries(SMART_MOVIE_DICT)) {
                            if (variants.includes(spokenName) || variants.some(v => spokenName.includes(v))) {
                                bestMatch = correctName;
                                highestScore = 1.0;
                                break;
                            }
                            variants.forEach(variant => {
                                let score = calculateSimilarity(spokenName, variant);
                                if (score > highestScore) {
                                    highestScore = score;
                                    bestMatch = correctName;
                                }
                            });
                        }

                        if (bestMatch && highestScore >= 0.70) {
                            if (highestScore < 1.0) saveLearnedSlang(spokenName, bestMatch, "learned_movies", SMART_MOVIE_DICT);
                            spokenName = bestMatch;
                        }

                        const searchInput = document.getElementById("movieSearchInput");
                        if (searchInput) {
                            searchInput.value = spokenName;
                            const movieCards = Array.from(document.querySelectorAll('.movies'));
                            const foundCard = movieCards.find(card => card.dataset.title && card.dataset.title.toUpperCase() === spokenName && card.style.display !== 'none');

                            if (foundCard) {
                                assistantSpeak(`Now playing ${spokenName.toLowerCase()} movie`);
                                statusText.innerText = `Found ${spokenName}! Playing...`;
                                setVoiceTimeout(() => {
                                    if (typeof movieView === "function") movieView(foundCard);
                                    resetVoiceState(); 
                                }, 1500);
                            } else {
                                assistantSpeak(`Sorry, I couldn't find ${spokenName.toLowerCase()}`);
                                statusText.innerText = `Couldn't find "${spokenName}"`;
                                
                                setVoiceTimeout(() => {
                                    if (isVoiceProcessing) { 
                                        matchFound = false;
                                        window.keepMicAlive = true;
                                        statusText.innerText = 'Listening...';
                                        setMicGlowState(true);
                                        try { window.recognition.start(); } catch(e){}
                                    }
                                }, 2500);
                            }
                        } else {
                            assistantSpeak(`Now playing ${spokenName.toLowerCase()}`);
                            statusText.innerText = `Playing ${spokenName}...`;
                            setVoiceTimeout(() => {
                                window.location.href = `movie.html?autoPlay=${encodeURIComponent(spokenName)}`;
                            }, 1500);
                        }
                    }, 500);
                }
                else if (searchType === 'music') {
                    let cleanedSongName = spokenName.replace(/\b(SONG|SONGS|MUSIC|AUDIO|TRACK|PLAYLIST|ALBUM)\b/g, '').replace(/\s+/g, ' ').trim();
                    
                    if (cleanedSongName === "") {
                        assistantSpeak("Please tell me the specific song name.");
                        statusText.innerText = "Waiting for song name...";
                        setVoiceTimeout(() => {
                            matchFound = false;
                            window.keepMicAlive = true;
                            statusText.innerText = 'Listening...';
                            setMicGlowState(true);
                            try { window.recognition.start(); } catch(e){}
                        }, 2000);
                        return;
                    }

                    statusText.innerHTML = `<i class="fas fa-circle-notch fa-spin" style="margin-right:8px;"></i> Searching for "${cleanedSongName}"...`;
                    
                    setVoiceTimeout(() => {
                        let bestMatch = null;
                        let highestScore = 0;

                        for (const [correctName, variants] of Object.entries(SMART_MUSIC_DICT)) {
                            if (variants.includes(cleanedSongName) || variants.some(v => cleanedSongName.includes(v))) {
                                bestMatch = correctName;
                                highestScore = 1.0;
                                break;
                            }
                            variants.forEach(variant => {
                                let score = calculateSimilarity(cleanedSongName, variant);
                                if (score > highestScore) {
                                    highestScore = score;
                                    bestMatch = correctName;
                                }
                            });
                        }

                        if (bestMatch && highestScore >= 0.70) {
                            if (highestScore < 1.0) saveLearnedSlang(cleanedSongName, bestMatch, "learned_music", SMART_MUSIC_DICT);
                            cleanedSongName = bestMatch;
                        }

                        handleMusicSearch(cleanedSongName, () => { matchFound = false; }); 
                    }, 500); 
                }
            } else {
                statusText.innerText = 'Listening...';
            }
        }
    };

    window.recognition.onerror = (event) => {
        if (matchFound) return; 
        setMicGlowState(false); 

        switch (event.error) {
            case 'not-allowed':
            case 'audio-capture':
                window.keepMicAlive = false;
                assistantSpeak(event.error === 'not-allowed' ? "Microphone permission denied." : "No microphone found.");
                if (statusText) statusText.innerText = event.error === 'not-allowed' ? "Mic Permission Denied!" : "No Mic Found!";
                setVoiceTimeout(resetVoiceState, 3500);
                break;
            case 'no-speech':
                if (statusText && statusText.innerText === 'Starting Mic...') {
                    statusText.innerText = "Listening... (Speak louder)";
                }
                setMicGlowState(true);
                break;
            case 'aborted':
                break;
            default:
                if (statusText) statusText.innerText = "Voice Error! Restarting...";
                setVoiceTimeout(() => {
                    if (isVoiceProcessing && window.keepMicAlive) {
                        statusText.innerText = 'Listening...';
                        setMicGlowState(true);
                        try { window.recognition.start(); } catch(e){}
                    }
                }, 2000);
        }
    };

    window.recognition.onend = () => {
        if (window.keepMicAlive && !document.hidden && !matchFound) {
            // MOBILE FIX: 250ms delay prevents browser tab crash on rapid restart loops
            setTimeout(() => {
                try { window.recognition.start(); } catch(e){}
            }, 250);
        } else {
            setMicGlowState(false);
        }
    };

    try { window.recognition.start(); } catch(e) {}
}

function handleMusicSearch(songName, unlockCallback) {
    let found = false;
    const musicButtons = document.querySelectorAll('i#music');
    const searchQuery = songName.toUpperCase().replace(/[^A-Z0-9]/g, "");
    const statusText = document.getElementById('voice-status');

    for (let btn of musicButtons) {
        const data = btn.dataset;
        const movieContainer = btn.closest('.movies');

        if (movieContainer && movieContainer.dataset.title) {
            const cleanMovieTitle = movieContainer.dataset.title.toUpperCase().replace(/[^A-Z0-9]/g, "");
            if (cleanMovieTitle === searchQuery || cleanMovieTitle.includes(searchQuery)) {
                assistantSpeak(`Now playing ${movieContainer.dataset.title.toLowerCase()} playlist`);
                if (statusText) statusText.innerText = `Found ${movieContainer.dataset.title} Playlist! Playing...`;
                localStorage.setItem('targetSongIndex', 0);
                setVoiceTimeout(() => { btn.click(); resetVoiceState(); }, 1500);
                found = true;
                break;
            }
        }

        for (let i = 1; i <= 20; i++) {
            const titleVal = data[`songtitle${i}`] || data[`songTitle${i}`];
            if (titleVal) {
                const cleanTitle = titleVal.toUpperCase().replace(/[^A-Z0-9]/g, "");
                if (cleanTitle.includes(searchQuery) || searchQuery.includes(cleanTitle)) {
                    assistantSpeak(`Now playing ${songName.toLowerCase()}`);
                    if (statusText) statusText.innerText = `Found ${songName}! Playing...`;
                    localStorage.setItem('targetSongIndex', i - 1);
                    setVoiceTimeout(() => { btn.click(); resetVoiceState(); }, 1500);
                    found = true;
                    break;
                }
            }
        }
        if (found) break;
    }

    if (!found) {
        assistantSpeak(`I couldn't find the song ${songName.toLowerCase()}`);
        if (statusText) statusText.innerText = `Couldn't find "${songName}"`;
        
        setVoiceTimeout(() => {
            if (isVoiceProcessing) { 
                if(unlockCallback) unlockCallback(); 
                window.keepMicAlive = true;
                statusText.innerText = 'Listening...';
                setMicGlowState(true);
                try { window.recognition.start(); } catch(e){}
            }
        }, 2500);
    }
}

// ==========================================
// 6. "HEY MIRROR" WAKE-WORD ASSISTANT
// ==========================================
let wakeWordRecognizer = null;
let isWakeWordListening = false;

function initMirrorAssistant() {
    if (!window.SpeechRecognition) return;

    wakeWordRecognizer = new window.SpeechRecognition();
    wakeWordRecognizer.lang = 'en-IN';
    wakeWordRecognizer.continuous = true; 
    wakeWordRecognizer.interimResults = true; 

    wakeWordRecognizer.onresult = (event) => {
        if (isVoiceProcessing) return;

        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            transcript += event.results[i][0].transcript;
        }
        transcript = transcript.toLowerCase().trim();

        if (transcript.includes("hey mirror") || transcript.includes("mirror")) {
            console.log("Wake word detected!");
            stopWakeWordListening();
            isVoiceProcessing = true; 

            const overlay = document.getElementById('listening-overlay');
            const statusText = document.getElementById('voice-status');
            if(overlay) overlay.classList.remove('voice-hidden');
            if(statusText) statusText.innerText = "Hey Mirror activated...";

            const typeLabel = document.getElementById('permanent-search-label');
            if (typeLabel) typeLabel.style.display = 'none';

            askForSearchType();
        }
    };

    wakeWordRecognizer.onend = () => {
        if (!isVoiceProcessing && isWakeWordListening && !document.hidden) {
            // MOBILE FIX: 250ms debounce
            setTimeout(() => {
                try { wakeWordRecognizer.start(); } catch (e) { }
            }, 250);
        }
    };
    
    wakeWordRecognizer.onerror = (e) => {
        if (e.error === 'not-allowed' || e.error === 'audio-capture') {
            isWakeWordListening = false;
        }
    };
    
    startWakeWordListening();
}

function startWakeWordListening() {
    if (wakeWordRecognizer && !isWakeWordListening && !isVoiceProcessing && !document.hidden) {
        isWakeWordListening = true;
        try { wakeWordRecognizer.start(); } catch (e) { }
    }
}

function stopWakeWordListening() {
    if (wakeWordRecognizer) {
        isWakeWordListening = false;
        try { wakeWordRecognizer.abort(); } catch (e) { } // Changed stop() to abort() for cleaner mobile exit
    }
}

function askForSearchType() {
    assistantSpeak(""); // clear queue

    const typeLabel = document.getElementById('permanent-search-label');
    if (typeLabel) typeLabel.style.display = 'none';

    const utterance = new SpeechSynthesisUtterance("What is your search? Say Movie or Song.");
    utterance.lang = 'en-IN';
    utterance.rate = 1.0;

    const statusText = document.getElementById('voice-status');
    if(statusText) statusText.innerText = 'Say "Movie" or "Song"';

    utterance.onend = () => listenForSearchType();
    utterance.onerror = () => listenForSearchType();

    window.speechSynthesis.speak(utterance);
}

function handoffToSearch(type, spokenText) {
    assistantSpeak(""); // Clear previous
    setMicGlowState(false); 
    
    const statusText = document.getElementById('voice-status');
    if(statusText) statusText.innerHTML = `<i class="fas fa-circle-notch fa-spin" style="margin-right:8px;"></i> Processing...`; 

    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.lang = 'en-IN';
    utterance.rate = 1.0;
    
    let handoffComplete = false;

    const triggerNext = () => {
        if (handoffComplete || !isVoiceProcessing) return; 
        handoffComplete = true;
        
        setVoiceTimeout(() => {
            isVoiceProcessing = false; 
            startVoiceRecognition(type); 
        }, 100); 
    };

    utterance.onend = triggerNext;
    utterance.onerror = triggerNext;

    window.speechSynthesis.speak(utterance);
    setVoiceTimeout(triggerNext, 1500); 
}

function listenForSearchType() {
    if(!window.SpeechRecognition) return;
    
    const typeRecognizer = new window.SpeechRecognition();
    window.typeRecognizer = typeRecognizer; 

    typeRecognizer.lang = 'en-IN';
    typeRecognizer.continuous = false; 
    typeRecognizer.interimResults = true;

    const statusText = document.getElementById('voice-status');
    let choiceMade = false;
    window.keepTypeMicAlive = true; 

    typeRecognizer.onstart = () => {
        if (!choiceMade) {
            if(statusText) statusText.innerText = "Listening...";
            setMicGlowState(true); 
        }
    };

    typeRecognizer.onresult = (event) => {
        if (choiceMade) return; 

        let transcript = "";
        let isFinal = false;

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            transcript += event.results[i][0].transcript;
            if (event.results[i].isFinal) isFinal = true;
        }
        
        if (transcript.trim().length > 0 && !isFinal && statusText) {
            statusText.innerText = `"${transcript.trim()}"`;
        }

        if (isFinal) {
            const finalTranscript = transcript.toLowerCase();

            if (finalTranscript.includes("movie")) {
                choiceMade = true;
                window.keepTypeMicAlive = false; 
                try { typeRecognizer.abort(); } catch(e){}
                handoffToSearch('movie', "Opening Movie Search");

            } else if (finalTranscript.includes("song") || finalTranscript.includes("music")) {
                choiceMade = true;
                window.keepTypeMicAlive = false; 
                try { typeRecognizer.abort(); } catch(e){}
                handoffToSearch('music', "Opening Song Search");

            } else {
                setMicGlowState(false); 
                assistantSpeak("Sorry, I didn't catch that.");
                if(statusText) statusText.innerText = "Command not recognized.";
                
                window.keepTypeMicAlive = false; 
                try { typeRecognizer.abort(); } catch(e){}

                setVoiceTimeout(() => {
                    if (isVoiceProcessing) { 
                        window.keepTypeMicAlive = true;
                        if(statusText) statusText.innerText = 'Listening...';
                        setMicGlowState(true);
                        try { typeRecognizer.start(); } catch(e){}
                    }
                }, 2000);
            }
        }
    };

    typeRecognizer.onerror = (event) => {
        if (choiceMade) return; 
        setMicGlowState(false); 

        if (event.error === 'not-allowed' || event.error === 'audio-capture') {
            window.keepTypeMicAlive = false;
            assistantSpeak(event.error === 'not-allowed' ? "Microphone permission denied." : "No microphone found.");
            if (statusText) statusText.innerText = "Mic Error!";
            setVoiceTimeout(resetVoiceState, 3500);
        } else if (event.error === 'no-speech') {
            window.keepTypeMicAlive = false;
            assistantSpeak("I didn't hear a response. Please say Hey Mirror to try again.");
            if (statusText) statusText.innerText = "No response. Canceling...";
            setVoiceTimeout(resetVoiceState, 3000); 
        } else if (event.error !== 'aborted') {
            window.keepTypeMicAlive = false;
            resetVoiceState();
        }
    };

    typeRecognizer.onend = () => {
        if (window.keepTypeMicAlive && !document.hidden && !choiceMade) {
            // MOBILE FIX: 250ms debounce
            setTimeout(() => {
                try { typeRecognizer.start(); } catch(e){}
            }, 250);
        } else {
            setMicGlowState(false);
        }
    };

    try { typeRecognizer.start(); } catch(e){}
}

// ==========================================
// 7. OMNI-DEVICE CONTROL SYSTEM
// ==========================================
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        stopVoiceRecognition(); 
    } else {
        if (mirrorInitialized && !isVoiceProcessing) {
            startWakeWordListening();
        }
    }
});

document.addEventListener('keydown', function (e) {
    const activeTag = document.activeElement ? document.activeElement.tagName : '';
    if (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || e.ctrlKey || e.altKey || e.metaKey) return;

    switch (e.key.toLowerCase()) {
        case 'v': e.preventDefault(); document.getElementById('voice-assistant-btn')?.click(); break;
        case 'm': e.preventDefault(); startVoiceRecognition('movie'); break;
        case 's': e.preventDefault(); startVoiceRecognition('music'); break;
        case 'escape': 
        case 'esc': e.preventDefault(); stopVoiceRecognition(); break; 
    }

    const keyCode = e.keyCode || e.which;
    switch (keyCode) {
        case 10225: 
        case 65:    
            e.preventDefault(); 
            document.getElementById('voice-assistant-btn')?.click(); 
            break;
        case 403: 
            e.preventDefault(); startVoiceRecognition('movie'); break;
        case 404: 
            e.preventDefault(); startVoiceRecognition('music'); break;
        case 10009: 
        case 461:   
        case 8:     
            if (isVoiceProcessing || (document.getElementById('listening-overlay') && !document.getElementById('listening-overlay').classList.contains('voice-hidden'))) {
                e.preventDefault();
                stopVoiceRecognition(); 
            }
            break;
    }
});

const voiceBtnElement = document.getElementById('voice-assistant-btn');
if (voiceBtnElement) {
    // Unified Mobile/PC interaction handler to prevent double-firing
    const handleInit = (e) => {
        if(e) e.preventDefault(); // Prevents "Ghost Clicks" on Mobile Safari
        
        // Mobile trick to unlock audio synthesis on first touch
        if (window.speechSynthesis) {
            const unlockUtterance = new SpeechSynthesisUtterance("");
            window.speechSynthesis.speak(unlockUtterance);
        }

        if (!mirrorInitialized) {
            initMirrorAssistant();
            mirrorInitialized = true;
            console.log("Hey Mirror background listener is active!");
        } else if (!isVoiceProcessing) {
            // Force activate if already initialized but user pressed button
            startVoiceRecognition('movie'); // Default quick action
        }
    };
    
    // Binding both but with preventDefault avoids duplicate triggers
    voiceBtnElement.addEventListener('click', handleInit);
    voiceBtnElement.addEventListener('touchend', handleInit, { passive: false });
}

const closeVoiceBtn = document.getElementById('close-voice-btn');
if (closeVoiceBtn) {
    const handleClose = (e) => {
        if(e) e.preventDefault();
        stopVoiceRecognition();
    };
    closeVoiceBtn.addEventListener('click', handleClose);
    closeVoiceBtn.addEventListener('touchend', handleClose, { passive: false });
}

// ==========================================
// 8. FIRST-TIME USER ONBOARDING TUTORIAL
// ==========================================
function showVoiceAssistantTutorial() {
    if (localStorage.getItem('voiceTutorialSeen') === 'true') return;

    const overlay = document.createElement('div');
    overlay.id = 'voice-tutorial-overlay';
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(8px);
        display: flex; justify-content: center; align-items: center;
        z-index: 999999; opacity: 0; transition: opacity 0.5s ease;
    `;

    const modal = document.createElement('div');
    modal.style.cssText = `
        background: rgba(42, 14, 60, 0.95); border: 1px solid rgba(142, 68, 173, 0.8);
        box-shadow: 0 0 40px rgba(142, 68, 173, 0.6); border-radius: 20px;
        padding: 35px 25px; max-width: 400px; width: 90%; color: white;
        font-family: sans-serif; text-align: center; transform: translateY(30px);
        transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;

    modal.innerHTML = `
        <i class="fas fa-microphone-alt" style="font-size: 3.5rem; color: #00ff88; margin-bottom: 20px; text-shadow: 0 0 20px #00ff88;"></i>
        <h2 style="margin: 0 0 15px 0; font-size: 1.5rem; letter-spacing: 1px;">Voice Assistant Ready!</h2>
        <div style="text-align: left; font-size: 0.95rem; line-height: 1.7; margin-bottom: 25px; color: #e0e0e0; background: rgba(0,0,0,0.3); padding: 15px; border-radius: 12px;">
            <p style="margin: 5px 0;"><b>1. Hands-Free:</b> Just say <span style="color:#00ff88; font-weight: bold;">"Hey Mirror"</span> at any time.</p>
            <p style="margin: 5px 0;"><b>2. Smart Search:</b> Reply with <span style="color:#00ff88; font-weight: bold;">"Movie"</span> or <span style="color:#00ff88; font-weight: bold;">"Song"</span> to search.</p>
            <p style="margin: 5px 0;"><b>3. Master Kill:</b> Click the <b>X</b> icon or press <b>Esc</b> to securely close the mic.</p>
        </div>
        <p style="margin-bottom: 20px; font-size: 0.85rem; color: #aaa; text-align: center;">
            <i>Tip: Click anywhere on the page after closing this to activate background listening.</i>
        </p>
        <button id="close-tutorial-btn" style="
            background: linear-gradient(45deg, #8e44ad, #2a0e3c); border: 1px solid #00ff88;
            color: white; padding: 12px 40px; border-radius: 30px; font-size: 1rem;
            font-weight: bold; cursor: pointer; box-shadow: 0 0 15px rgba(0, 255, 136, 0.3); 
            transition: all 0.3s ease;
        ">Got it!</button>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const btn = document.getElementById('close-tutorial-btn');
    const closeTutorial = (e) => {
        if(e) e.preventDefault();
        overlay.style.opacity = '0';
        modal.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            overlay.remove(); 
            localStorage.setItem('voiceTutorialSeen', 'true'); 
        }, 500);
    };

    btn.addEventListener('click', closeTutorial);
    btn.addEventListener('touchend', closeTutorial, { passive: false });

    setTimeout(() => {
        overlay.style.opacity = '1';
        modal.style.transform = 'translateY(0)';
    }, 100);
}

document.addEventListener("DOMContentLoaded", showVoiceAssistantTutorial);//







/* ==========================================
   VOICE-ASSISTANT.JS (Direct Auto-Play & Hey Mirror Toggle)
   ========================================== */

// ==========================================
// 1. DYNAMIC CSS FOR GLOWING MIC EFFECT
// ==========================================
const micStyle = document.createElement('style');
micStyle.innerHTML = `
    .mic-listening-active {
        width: 100px !important; 
        height: 100px !important; 
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        margin: 0 auto !important;
        border-color: transparent !important;
        border-width: 2px !important; 
        border-style: solid !important; 
        border-radius: 50% !important; 
        transition: transform 0.05s ease-out, box-shadow 0.05s ease-out !important; 
        transform-origin: center !important;
    }
    .mic-listening-active i {
        color: #f6d0ff !important;
        text-shadow: 0 0 15px #8e44ad, 0 0 30px #8e44ad !important;
        margin: 0 !important;
    }
    @keyframes fallback-pulse {
        0% { transform: scale(1); box-shadow: 0 0 15px rgba(142,68,173,0.4), inset 0 0 10px rgba(142,68,173,0.3); }
        50% { transform: scale(1.15); box-shadow: 0 0 25px rgba(142,68,173,0.8), inset 0 0 15px rgba(142,68,173,0.6); }
        100% { transform: scale(1); box-shadow: 0 0 15px rgba(142,68,173,0.4), inset 0 0 10px rgba(142,68,173,0.3); }
    }
    .mic-fallback-pulse {
        animation: fallback-pulse 1.2s infinite ease-in-out !important;
    }
`;
document.head.appendChild(micStyle);

// ==========================================
// 2. FULL EXTENDED DICTIONARIES
// ==========================================
const MOVIE_TRAINING = {
    "AMARAN": ["AMARAN", "AMARON", "AMARIN"],
    "தூங்கி எழுந்தாச்சா": ["தூங்கி எழுந்தாச்சா", "THUNGI EZHUNTHAACHAA"],
    "DUDE": ["DUDE", "DOOD", "DUD", "DEWD", "DOODLE", "DUDES", "DEW", "DUDDY", "DUNE", "build", "WEIRD", "DEER", "BEARD", "FOOD", "DUE", "VIEW", "VIEWED", "DUDE MOVIE", "DUDE MOVIES", "DOOD MOVIE", "DOOD MOVIES"],
    "AVATAR": ["AVATAR", "AVATHAR", "AVATOR", "AWTAR"],
    "DARBAR": ["DARBAR", "DARBAAR", "DARPAR", "DURBAR"],
    "AQUAMAN": ["AQUAMAN", "AQUA MAN", "ACCUA MAN", "AKUAMAN"],
    "KATASI VIVASAYI": ["KATASI VIVASAYI", "KADAISI VIVASAYI", "KADASI VIVASAYI", "KATAISY VIWASAYI", "KATASI VIVASAYE"],
    "CAPTAIN AMERICA": ["CAPTAIN AMERICA", "CAPTAN AMERICA", "CAPTAIN AMERICAN"],
    "BISON": ["BISON", "BYSON", "BAYSAN", "POISON"],
    "AMBULI": ["AMBULI", "AMBERLY", "HUMBLY", "UNBOLI", "AMPU LEE", "AMBULY", "AMPULI", "AMBLY", "AMBILY", "AMPU", "AMBULLY"],
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

const MUSIC_TRAINING = {
    "JUKEBOX": ["JUKEBOX", "JUKE BOX", "ALL SONGS", "FULL ALBUM", "PLAYLIST"],
    "OORUM BLOOD": ["OORUM BLOOD", "ORUM BLOOD", "OORAM BLOOD", "OUR BLOOD", "ROOM BLOOD"],
    "SINGARI": ["SINGARI", "SINGARY", "SHINGARI", "CHINGARI"],
    "KANNUKULLA": ["KANNUKULLA", "KANUKULLA", "KANNUKULA", "KANNU KULLA", "CANNUKULA"],
    "NALLARU PO": ["NALLARU PO", "NALARU PO", "NALLARU PAA", "NALLA RUPU"],
    "YUMABAIBESA": ["YUMABAIBESA", "YUMA", "YAMBAI", "YAMABAI", "YUMMABAI"],
    "AATHA NEE PETHAAYE": ["AATHA NEE PETHAAYE", "AATHA NEE PETHAYE", "Adan", "HORROR", "ORDER", "AATHAA NEE PETHAYAE", "ATHA NEE PETHAYE", "ATHA NI PETHAYE", "AATHA NI PETHAYA", "AATHANEE PETHAYE", "AATHANI PETHAYE", "ATHANI PETHAYE", "AATA NEE PETHAYE", "AATTA NEE PETHAYE", "AMBULI SONG", "AMBULI AATHA SONG", "AMPULI SONG"],
    "YEN PAATTAN SAAMI VARUM": ["YEN PAATTAN SAAMI VARUM", "EN PAATTAN SAAMI VARUM", "YEN PATTAN SAMI VARUM", "EN PATTAN SAMI VARUM", "YEN PATTAN SAAMY VARUM", "EN PATTAN SWAMY VARUM", "EN PATAN SAMI VARUM", "YEN PAATAN SAMI VARUM", "YENPATTAN SAMI VARUM", "ENPATTAN SAAMI VARUM", "YEN PATTANSAMI VARUM", "EN PATTAN SAMIVARUM", "YEN PATTAN SAMI", "EN PATTAN SAMI", "PAATTAN SAAMI VARUM", "PATTAN SAMI", "IDLI KADAI YEN PATTAN", "IDLI KADAI PATTAN SAMI", "IDLI KADAI SONG"],
    "ENNA SUGAM": ["ENNA SUGAM", "ENA SUGAM"],
    "ETHANA SAAMI": ["ETHANA SAAMI", "ETHANA SAMI", "ETNA SAMI", "ETHANA SAAMY", "ETHANA SWAMY", "ETHANA SWAMI"],
    "ENJAAMI THANDHAANE": ["ENJAAMI THANDHAANE", "ENJAMI TANDHANE", "ENJAMI", "YENJAAMI THANDHAANE", "YENJAMI THANTHANE", "ENJAAMI THANTHANE", "ENJAMI THANDHANE", "ANJAAMI THANDHAANE", "ANJAMI THANTHANE", "ENJAAMITHANDHAANE", "YENJAMITHANTHANE", "ENJAMITHANDHANE", "ENJAMI TANTANE", "ENJAAMI DHANDHAANE", "ENJAMI TANDANE", "ENJAAMI SONG", "YENJAMI SONG", "IDLI KADAI ENJAAMI"],
    "MY HEARTU SPINNING": ["MY HEARTU SPINNING", "MY HEART SPINNING", "HEART SPINNING"],
    "KULASAMY KAAVAL KAAKA": ["KULASAMY KAAVAL KAAKA", "KULASAMI KAVAL KAKA", "KULASAMY"]
};

// ==========================================
// 3. GLOBAL STATE & FUZZY MATCHING AI
// ==========================================
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const State = {
    recognition: null,
    audioContext: null,
    microphoneStream: null,
    visualizerFrame: null,
    isListening: false,
    wakeWordEnabled: false, 
    wakeWordRunning: false  
};

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

// Intelligent 2-Pass Finder (Prioritizes Exact Matches)
function findBestMatch(text, dictionary) {
    let bestMatch = null;
    let highestScore = 0;

    // Pass 1: Strict Inclusion Match (Ensures exact phrases like "Oorum Blood" hit immediately)
    for (const [correctName, variants] of Object.entries(dictionary)) {
        for (const v of variants) {
            if (text === v || ` ${text} `.includes(` ${v} `)) {
                return correctName; 
            }
        }
    }

    // Pass 2: Fuzzy Similarity Match (If the user mispronounces a word)
    for (const [correctName, variants] of Object.entries(dictionary)) {
        for (const v of variants) {
            let score = calculateSimilarity(text, v);
            if (score > highestScore && score >= 0.75) {
                highestScore = score;
                bestMatch = correctName;
            }
        }
    }
    return bestMatch;
}

// ==========================================
// 4. AUDIO VISUALIZER & UI CONTROLS
// ==========================================
async function startVisualizer() {
    const micWrapper = document.querySelector('.mic-glow');
    if (!micWrapper || (State.audioContext && State.audioContext.state === 'running')) return;

    try {
        State.microphoneStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        State.audioContext = new AudioCtx();
        if (State.audioContext.state === 'suspended') await State.audioContext.resume();

        const analyser = State.audioContext.createAnalyser();
        const source = State.audioContext.createMediaStreamSource(State.microphoneStream);
        source.connect(analyser);
        analyser.fftSize = 256;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        function draw() {
            if (!State.isListening) return;
            State.visualizerFrame = requestAnimationFrame(draw);
            analyser.getByteFrequencyData(dataArray);
            
            let sum = 0;
            for(let i = 0; i < dataArray.length; i++) sum += dataArray[i];
            let avg = sum / dataArray.length;
            
            let scale = Math.min(1.35, 1 + (avg / 120));
            micWrapper.style.transform = `scale(${scale})`;
            micWrapper.style.boxShadow = `0 0 ${15 + (avg * 1.5)}px rgba(142, 68, 173, 0.8)`;
        }
        draw();
        micWrapper.classList.add('mic-listening-active');
    } catch (e) {
        micWrapper.classList.add('mic-fallback-pulse');
    }
}

function stopVisualizer() {
    cancelAnimationFrame(State.visualizerFrame);
    if (State.microphoneStream) State.microphoneStream.getTracks().forEach(t => t.stop());
    if (State.audioContext) State.audioContext.close();
    
    const micWrapper = document.querySelector('.mic-glow');
    if (micWrapper) {
        micWrapper.style.transform = 'scale(1)';
        micWrapper.style.boxShadow = 'none';
        micWrapper.classList.remove('mic-listening-active', 'mic-fallback-pulse');
    }
}

function assistantSpeak(text, onEndCallback) {
    const synth = window.speechSynthesis;
    if (!synth || !text) {
        if (onEndCallback) onEndCallback();
        return;
    }
    synth.cancel(); 
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    
    let hasTriggered = false;
    const triggerEnd = () => {
        if (!hasTriggered) {
            hasTriggered = true;
            if (onEndCallback) onEndCallback();
        }
    };

    utterance.onend = triggerEnd;
    utterance.onerror = triggerEnd;
    
    window.speechBugFix = window.speechBugFix || [];
    window.speechBugFix.push(utterance);
    
    synth.speak(utterance);
    if (onEndCallback) setTimeout(triggerEnd, (text.length * 80) + 1000);
}

// ==========================================
// 5. UNIFIED RECOGNITION ENGINE
// ==========================================
function toggleVoiceMenu() {
    const menu = document.getElementById('voice-options-menu');
    if (menu) menu.style.display = 'none';

    if (State.isListening) {
        closeVoiceUI();
        return;
    }

    if (State.wakeWordEnabled) {
        State.wakeWordEnabled = false;
        stopWakeWord();
        assistantSpeak("Mirror deactivated.");
        
        const btnIcon = document.querySelector('#voice-assistant-btn i');
        if (btnIcon) btnIcon.style.color = ""; 
    } else {
        State.wakeWordEnabled = true;
        startWakeWord();
        assistantSpeak("Hey Mirror activated. Just say, Hey Mirror.");
        
        const btnIcon = document.querySelector('#voice-assistant-btn i');
        if (btnIcon) btnIcon.style.color = "#00ff88"; 
    }
}

function closeVoiceUI() {
    State.isListening = false;
    if (State.recognition) State.recognition.abort();
    stopVisualizer();
    
    const overlay = document.getElementById('listening-overlay');
    if (overlay) overlay.classList.add('voice-hidden');

    if (State.wakeWordEnabled && !document.hidden) {
        startWakeWord();
    }
}

function startListening() {
    if (!window.SpeechRecognition) {
        alert("Your browser does not support Voice Recognition.");
        return;
    }

    stopWakeWord(); 
    const overlay = document.getElementById('listening-overlay');
    const statusText = document.getElementById('voice-status');
    
    if (overlay) overlay.classList.remove('voice-hidden');
    statusText.innerText = "Initializing...";
    
    assistantSpeak("I'm listening.", () => {
        State.recognition = new window.SpeechRecognition();
        State.recognition.lang = 'en-IN';
        State.recognition.continuous = false; 
        State.recognition.interimResults = false;

        State.recognition.onstart = () => {
            State.isListening = true;
            statusText.innerText = "Listening...";
            startVisualizer();
        };

        State.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toUpperCase().trim();
            statusText.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> Finding "${transcript}"...`;
            setTimeout(() => processIntelligentCommand(transcript), 400);
        };

        State.recognition.onerror = (event) => {
            statusText.innerText = `Error: Please try again.`;
            setTimeout(closeVoiceUI, 2000);
        };

        State.recognition.onend = () => {
            if (State.isListening) closeVoiceUI();
        };

        State.recognition.start();
    });
}

// ==========================================
// 6. INTELLIGENT MATCHING ROUTER
// ==========================================
function processIntelligentCommand(transcript) {
    const isExplicitMusic = /\b(SONG|SONGS|MUSIC|AUDIO|TRACK|PLAYLIST)\b/.test(transcript);
    const isExplicitMovie = /\b(MOVIE|MOVIES|FILM|FILMS|WATCH)\b/.test(transcript);

    // Filter out command words to isolate the title
    let cleanTranscript = transcript
        .replace(/\b(PLAY|PLAYING|OPEN|SEARCH FOR|SHOW ME|I WANT TO WATCH|START|SONG|SONGS|MUSIC|AUDIO|TRACK|PLAYLIST|MOVIE|MOVIES|FILM|FILMS|WATCH)\b/g, '')
        .replace(/\s+/g, ' ').trim();
    
    if (!cleanTranscript) cleanTranscript = transcript;

    let movieMatch = findBestMatch(cleanTranscript, MOVIE_TRAINING);
    let musicMatch = findBestMatch(cleanTranscript, MUSIC_TRAINING);

    // Execution Decision Tree
    if (isExplicitMusic) {
        if (musicMatch) executeDirectAutoPlay(musicMatch, true);
        else if (movieMatch) executeDirectAutoPlay(movieMatch, true); // E.g., "Play Dude Song"
        else executeDirectAutoPlay(cleanTranscript, true);
    } else if (isExplicitMovie) {
        if (movieMatch) executeDirectAutoPlay(movieMatch, false);
        else if (musicMatch) executeDirectAutoPlay(musicMatch, false); 
        else executeDirectAutoPlay(cleanTranscript, false);
    } else {
        // No explicit intent keyword provided
        if (musicMatch && movieMatch) {
            executeDirectAutoPlay(movieMatch, false); // Default to movie if ambiguous
        } else if (musicMatch) {
            executeDirectAutoPlay(musicMatch, true);
        } else if (movieMatch) {
            executeDirectAutoPlay(movieMatch, false);
        } else {
            executeDirectAutoPlay(cleanTranscript, false); // Default Fallback
        }
    }
}

// ==========================================
// 7. DIRECT DOM AUTO-PLAY EXECUTION
// ==========================================
function executeDirectAutoPlay(query, isMusic) {
    closeVoiceUI(); 
    
    const typeLabel = isMusic ? "song" : "movie";
    assistantSpeak(`Playing ${query} ${typeLabel}`);
    
    // We execute instantly without waiting for the speech to finish
    if (isMusic) {
        let found = false;
        const musicButtons = document.querySelectorAll('i#music');
        const searchQuery = query.toUpperCase().replace(/[^A-Z0-9]/g, "");

        // Failsafe: Prevent empty strings from matching everything
        if (!searchQuery) {
            triggerFallbackSearch(query, true);
            return;
        }

        for (let btn of musicButtons) {
            const data = btn.dataset;
            const movieContainer = btn.closest('.movies');

            // 1. Check if the user asked for a full Album / Playlist
            if (movieContainer && movieContainer.dataset.title) {
                const cleanMovieTitle = movieContainer.dataset.title.toUpperCase().replace(/[^A-Z0-9]/g, "");
                if (cleanMovieTitle === searchQuery) {
                    localStorage.setItem('targetSongIndex', 0);
                    setTimeout(() => btn.click(), 500); 
                    found = true;
                    break;
                }
            }

            // 2. Check if the user asked for a Specific Track
            for (let i = 1; i <= 20; i++) {
                const titleVal = data[`songtitle${i}`] || data[`songTitle${i}`];
                if (titleVal) {
                    const cleanTitle = titleVal.toUpperCase().replace(/[^A-Z0-9]/g, "");
                    // Matches if the clean title includes our specific search string
                    if (cleanTitle.includes(searchQuery) || searchQuery.includes(cleanTitle)) {
                        localStorage.setItem('targetSongIndex', i - 1);
                        setTimeout(() => btn.click(), 500);
                        found = true;
                        break;
                    }
                }
            }
            if (found) break;
        }

        // If not found directly in DOM, fallback to native search input
        if (!found) triggerFallbackSearch(query, true);

    } else {
        // Direct Movie Play
        const movieCards = Array.from(document.querySelectorAll('.movies'));
        const searchQuery = query.toUpperCase().replace(/[^A-Z0-9]/g, "");
        
        if (!searchQuery) {
            triggerFallbackSearch(query, false);
            return;
        }

        const foundCard = movieCards.find(card => card.dataset.title && card.dataset.title.toUpperCase().replace(/[^A-Z0-9]/g, "") === searchQuery);

        if (foundCard && typeof movieView === "function") {
            setTimeout(() => movieView(foundCard), 500);
        } else {
            triggerFallbackSearch(query, false);
        }
    }
}

// Ensures native page logic handles it if elements are hidden
function triggerFallbackSearch(query, isMusic) {
    const searchInputs = document.querySelectorAll('input[type="search"]');
    const finalSearchTerm = isMusic ? `${query} SONG` : query;

    if (searchInputs.length > 0) {
        searchInputs.forEach(input => {
            input.value = finalSearchTerm;
            // Force the DOM to recognize the input change
            input.dispatchEvent(new Event('input', { bubbles: true }));
        });
        
        setTimeout(() => {
            if (typeof executeSearch === 'function') {
                executeSearch();
            }
        }, 100);
    } else {
        const param = isMusic ? 'autoPlaySong' : 'autoPlay';
        window.location.href = `movie.html?${param}=${encodeURIComponent(query)}`;
    }
}

// ==========================================
// 8. "HEY MIRROR" WAKE WORD
// ==========================================
let wakeWordEngine = null;

function initWakeWord() {
    if (!window.SpeechRecognition) return;

    wakeWordEngine = new window.SpeechRecognition();
    wakeWordEngine.lang = 'en-IN';
    wakeWordEngine.continuous = true; 
    wakeWordEngine.interimResults = true; 

    wakeWordEngine.onresult = (event) => {
        if (State.isListening) return; 

        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            transcript += event.results[i][0].transcript.toLowerCase();
        }

        if (transcript.includes("hey mirror") || transcript.includes("mirror")) {
            stopWakeWord(); 
            startListening(); 
        }
    };

    wakeWordEngine.onend = () => {
        State.wakeWordRunning = false;
        if (State.wakeWordEnabled && !State.isListening && !document.hidden) {
            startWakeWord();
        }
    };
}

function startWakeWord() {
    if (wakeWordEngine && State.wakeWordEnabled && !State.wakeWordRunning && !State.isListening && !document.hidden) {
        State.wakeWordRunning = true;
        try { wakeWordEngine.start(); } catch (e) { }
    }
}

function stopWakeWord() {
    if (wakeWordEngine && State.wakeWordRunning) {
        State.wakeWordRunning = false;
        try { wakeWordEngine.abort(); } catch (e) { } 
    }
}

// ==========================================
// 9. EVENT LISTENERS & SETUP
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    initWakeWord();

    if (localStorage.getItem('voiceTutorialSeen') !== 'true') {
        setTimeout(showVoiceAssistantTutorial, 1000);
    }

    const voiceBtn = document.getElementById('voice-assistant-btn');
    if (voiceBtn) {
        voiceBtn.onclick = (e) => { e.preventDefault(); toggleVoiceMenu(); };
    }

    const closeVoiceBtn = document.querySelector('#listening-overlay i.fa-times');
    if (closeVoiceBtn) {
        closeVoiceBtn.onclick = closeVoiceUI;
    }
});

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        closeVoiceUI();
        stopWakeWord();
    } else {
        if (State.wakeWordEnabled) startWakeWord();
    }
});

document.addEventListener('keydown', (e) => {
    const activeTag = document.activeElement ? document.activeElement.tagName : '';
    if (['INPUT', 'TEXTAREA'].includes(activeTag) || e.ctrlKey || e.altKey || e.metaKey) return;

    if (e.key.toLowerCase() === 'v') {
        e.preventDefault();
        toggleVoiceMenu(); 
    }
    if (e.key.toLowerCase() === 'm' || e.key.toLowerCase() === 's') {
        e.preventDefault();
        if (!State.isListening) startListening(); 
    }
    if (e.key === 'Escape') {
        closeVoiceUI();
    }
});

// ==========================================
// 10. TUTORIAL MODAL
// ==========================================
function showVoiceAssistantTutorial() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.8); z-index: 999999;
        display: flex; justify-content: center; align-items: center;
    `;
    
    overlay.innerHTML = `
        <div style="background: #2a0e3c; padding: 30px; border-radius: 15px; color: white; text-align: center; border: 2px solid #8e44ad; max-width: 400px; width: 90%;">
            <i class="fas fa-microphone" style="font-size: 3rem; color: #00ff88; margin-bottom: 15px;"></i>
            <h2 style="margin-top:0;">Hey Mirror Activated!</h2>
            <p style="line-height:1.5;">Click the Mic icon to enable background listening.<br><br>Then simply say <b>"Hey Mirror"</b> followed by <b>"Play Avatar"</b> or <b>"Play Singari Song"</b>!</p>
            <button id="close-tut" style="margin-top: 15px; padding: 10px 30px; font-weight:bold; background: #00ff88; color: black; border: none; border-radius: 20px; cursor: pointer;">Got It!</button>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    document.getElementById('close-tut').onclick = () => {
        overlay.remove();
        localStorage.setItem('voiceTutorialSeen', 'true');
    };
}



/* ==========================================
   J.A.R.V.I.S. VOICE ENGINE
   ========================================== */

// 1. J.A.R.V.I.S. UI STYLES (Injected dynamically)
const jarvisStyle = document.createElement('style');
jarvisStyle.innerHTML = `
    .voice-assistant-wrapper { position: fixed; bottom: 30px; right: 30px; z-index: 9999; }
    #jarvis-btn { width: 60px; height: 60px; border-radius: 50%; background: rgba(0, 20, 40, 0.8); border: 2px solid #00d2ff; display: flex; justify-content: center; align-items: center; cursor: pointer; box-shadow: 0 0 15px rgba(0, 210, 255, 0.4); position: relative; overflow: hidden; transition: all 0.3s; }
    #jarvis-btn:hover { box-shadow: 0 0 25px rgba(0, 210, 255, 0.8); transform: scale(1.05); }
    .arc-core { width: 20px; height: 20px; background: #00d2ff; border-radius: 50%; box-shadow: 0 0 10px #ffffff, 0 0 20px #00d2ff; }
    .arc-ring { position: absolute; width: 45px; height: 45px; border: 2px dashed #00d2ff; border-radius: 50%; animation: spin 4s linear infinite; }
    
    #jarvis-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 10, 20, 0.95); z-index: 10000; display: flex; justify-content: center; align-items: center; backdrop-filter: blur(10px); opacity: 1; transition: opacity 0.3s; }
    #jarvis-overlay.voice-hidden { opacity: 0; pointer-events: none; }
    
    .jarvis-center { text-align: center; display: flex; flex-direction: column; align-items: center; }
    .jarvis-orb { position: relative; width: 150px; height: 150px; display: flex; justify-content: center; align-items: center; margin-bottom: 30px; }
    .orb-core { width: 60px; height: 60px; background: #ffffff; border-radius: 50%; box-shadow: 0 0 40px #00d2ff, 0 0 80px #00d2ff, inset 0 0 20px #00d2ff; z-index: 10; transition: transform 0.1s; }
    .orb-ring { position: absolute; border-radius: 50%; border: 2px solid transparent; }
    .ring-1 { width: 100px; height: 100px; border-top: 2px solid #00d2ff; border-bottom: 2px solid #00d2ff; animation: spin 3s linear infinite; }
    .ring-2 { width: 130px; height: 130px; border-left: 2px dashed rgba(0, 210, 255, 0.5); border-right: 2px dashed rgba(0, 210, 255, 0.5); animation: spin-reverse 5s linear infinite; }
    .ring-3 { width: 160px; height: 160px; border-top: 1px solid rgba(0, 210, 255, 0.3); animation: spin 7s linear infinite; }
    
    .tech-text { color: #00d2ff; font-family: 'Courier New', monospace; font-size: 1.5rem; letter-spacing: 4px; text-shadow: 0 0 10px rgba(0, 210, 255, 0.5); margin-bottom: 10px; }
    .tech-text-sub { color: #ffffff; font-family: 'Courier New', monospace; font-size: 1rem; opacity: 0.7; min-height: 20px; }
    
    .orb-listening .orb-core { transform: scale(1.2); box-shadow: 0 0 60px #00d2ff, 0 0 100px #ffffff; }
    .orb-processing .ring-1, .orb-processing .ring-2 { border-color: #ffaa00; animation-duration: 1s; }
    
    @keyframes spin { 100% { transform: rotate(360deg); } }
    @keyframes spin-reverse { 100% { transform: rotate(-360deg); } }
`;
document.head.appendChild(jarvisStyle);

// 2. DICTIONARIES (Retained for your robust Tamil movie/song logic)
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

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const State = {
    recognition: null,
    wakeWordEngine: null,
    isListening: false,
    wakeWordEnabled: true, 
    wakeWordRunning: false,
    jarvisVoice: null
};


//
function findMediaKey(cleanedInput) {
    const upperInput = cleanedInput.toUpperCase();
    
    // 1. Direct match check
    if (MOVIE_TRAINING[upperInput]) return upperInput;
    
    // 2. Loop through the alternate phonetic arrays
    for (const [key, aliases] of Object.entries(MOVIE_TRAINING)) {
        if (aliases.includes(upperInput)) {
            return key; // Returns the exact database key (e.g., "AMARAN")
        }
    }
    return null; // No match found
}


// This function can be used to clean the raw voice input before matching
function cleanVoiceInput(rawInput) {
    // Convert to lowercase and remove punctuation
    let cleaned = rawInput.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

    // Common voice prefixes and suffixes to strip out
    const junkWords = [
        "play", "playing", "search", "search for", 
        "find", "put on", "song", "movie"
    ];

    // Remove them dynamically with word boundaries (\b)
    junkWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'g');
        cleaned = cleaned.replace(regex, '');
    });

    // Collapse multiple spaces into one and trim edges
    return cleaned.replace(/\s+/g, ' ').trim();
}

// "playing oorum blood song" -> "oorum blood"
// "play AMARAN movie" -> "amaran"




// 3. J.A.R.V.I.S. VOICE SYNTHESIS
function loadJarvisVoice() {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    // Try to find a crisp, British/Male voice for the Jarvis feel
    State.jarvisVoice = voices.find(v => v.name.includes("Google UK English Male") || v.name.includes("Great Britain") || v.lang === "en-GB") || voices[0];
}
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadJarvisVoice;
}

function jarvisSpeak(text, callback) {
    const synth = window.speechSynthesis;
    if (!synth) return callback && callback();
    
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (State.jarvisVoice) utterance.voice = State.jarvisVoice;
    utterance.pitch = 0.9; // Slightly deeper, calmer tone
    utterance.rate = 1.0; 
    
    utterance.onend = () => callback && callback();
    utterance.onerror = () => callback && callback();
    
    synth.speak(utterance);
    updateStatus(text);
}

// 4. UI CONTROLS
function updateStatus(mainText, subText = "") {
    const status = document.getElementById('jarvis-status');
    const transcript = document.getElementById('jarvis-transcript');
    if (status) status.innerText = mainText.toUpperCase();
    if (transcript) transcript.innerText = subText;
}

function toggleJarvis() {
    if (State.isListening) {
        closeJarvisUI();
    } else {
        startListening();
    }
}

function closeJarvisUI() {
    State.isListening = false;
    if (State.recognition) State.recognition.abort();
    
    const overlay = document.getElementById('jarvis-overlay');
    const orb = document.querySelector('.jarvis-orb');
    if (overlay) overlay.classList.add('voice-hidden');
    if (orb) {
        orb.classList.remove('orb-listening', 'orb-processing');
    }

    if (State.wakeWordEnabled && !document.hidden) startWakeWord();
}

// 5. WAKE WORD ENGINE ("JARVIS")
function initWakeWord() {
    if (!window.SpeechRecognition) return;

    State.wakeWordEngine = new window.SpeechRecognition();
    State.wakeWordEngine.lang = 'en-US'; // Broad English for wake word
    State.wakeWordEngine.continuous = true; 
    State.wakeWordEngine.interimResults = true; 

    State.wakeWordEngine.onresult = (event) => {
        if (State.isListening) return; 

        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            transcript += event.results[i][0].transcript.toLowerCase();
        }

        if (transcript.includes("jarvis") || transcript.includes("hey jarvis")) {
            stopWakeWord(); 
            startListening(); 
        }
    };

    State.wakeWordEngine.onend = () => {
        State.wakeWordRunning = false;
        if (State.wakeWordEnabled && !State.isListening && !document.hidden) {
            startWakeWord();
        }
    };
}

function startWakeWord() {
    if (State.wakeWordEngine && State.wakeWordEnabled && !State.wakeWordRunning && !State.isListening && !document.hidden) {
        State.wakeWordRunning = true;
        try { State.wakeWordEngine.start(); } catch (e) {}
    }
}

function stopWakeWord() {
    if (State.wakeWordEngine && State.wakeWordRunning) {
        State.wakeWordRunning = false;
        try { State.wakeWordEngine.abort(); } catch (e) {} 
    }
}

// 6. MAIN RECOGNITION ENGINE
function startListening() {
    stopWakeWord(); 
    const overlay = document.getElementById('jarvis-overlay');
    const orb = document.querySelector('.jarvis-orb');
    
    if (overlay) overlay.classList.remove('voice-hidden');
    if (orb) orb.classList.add('orb-listening');
    updateStatus("ONLINE", "Awaiting directive...");
    
    jarvisSpeak("Yes, sir?", () => {
        State.recognition = new window.SpeechRecognition();
        State.recognition.lang = 'en-IN';
        State.recognition.continuous = false; 

        State.recognition.onstart = () => {
            State.isListening = true;
        };

        State.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toUpperCase().trim();
            if (orb) {
                orb.classList.remove('orb-listening');
                orb.classList.add('orb-processing');
            }
            updateStatus("PROCESSING...", `"${transcript}"`);
            setTimeout(() => processCommand(transcript), 500);
        };

        State.recognition.onerror = () => {
            jarvisSpeak("I didn't catch that, sir.", closeJarvisUI);
        };

        State.recognition.onend = () => {
            if (State.isListening && document.getElementById('jarvis-status').innerText !== "PROCESSING...") {
                closeJarvisUI();
            }
        };

        State.recognition.start();
    });
}

// 7. INTELLIGENT ROUTER (Full Control Features added)
function processCommand(transcript) {
    // A. System Commands
    if (transcript.includes("SCROLL DOWN")) {
        jarvisSpeak("Scrolling down, sir.");
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
        return setTimeout(closeJarvisUI, 1500);
    }
    if (transcript.includes("SCROLL UP")) {
        jarvisSpeak("Scrolling up.");
        window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
        return setTimeout(closeJarvisUI, 1500);
    }
    if (transcript.includes("GO TO HOME") || transcript.includes("MAIN MENU")) {
        jarvisSpeak("Accessing main database.");
        return window.location.href = "movie.html";
    }

    // B. Media Search Logic
    const isExplicitMusic = /\b(SONG|SONGS|MUSIC|AUDIO|PLAYLIST)\b/.test(transcript);
    const isExplicitMovie = /\b(MOVIE|MOVIES|FILM|WATCH)\b/.test(transcript);

    let cleanTranscript = transcript
        .replace(/\b(PLAY|PLAYING|OPEN|SEARCH FOR|SHOW ME|I WANT TO WATCH|START|SONG|SONGS|MUSIC|AUDIO|TRACK|PLAYLIST|MOVIE|MOVIES|FILM|FILMS|WATCH)\b/g, '')
        .replace(/\s+/g, ' ').trim();
    
    if (!cleanTranscript) cleanTranscript = transcript;

    let movieMatch = findBestMatch(cleanTranscript, MOVIE_TRAINING);
    let musicMatch = findBestMatch(cleanTranscript, MUSIC_TRAINING);

    if (isExplicitMusic) {
        executeDirectAutoPlay(musicMatch || movieMatch || cleanTranscript, true);
    } else if (isExplicitMovie) {
        executeDirectAutoPlay(movieMatch || musicMatch || cleanTranscript, false);
    } else {
        if (musicMatch && movieMatch) executeDirectAutoPlay(movieMatch, false); 
        else if (musicMatch) executeDirectAutoPlay(musicMatch, true);
        else if (movieMatch) executeDirectAutoPlay(movieMatch, false);
        else executeDirectAutoPlay(cleanTranscript, false);
    }
}

// 8. FUZZY MATCHING LOGIC (Retained)
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

function findBestMatch(text, dictionary) {
    let bestMatch = null;
    let highestScore = 0;
    for (const [correctName, variants] of Object.entries(dictionary)) {
        for (const v of variants) {
            if (text === v || ` ${text} `.includes(` ${v} `)) return correctName; 
        }
    }
    for (const [correctName, variants] of Object.entries(dictionary)) {
        for (const v of variants) {
            let score = calculateSimilarity(text, v);
            if (score > highestScore && score >= 0.75) {
                highestScore = score;
                bestMatch = correctName;
            }
        }
    }
    return bestMatch;
}

// 9. EXECUTION 
function executeDirectAutoPlay(query, isMusic) {
    const typeLabel = isMusic ? "audio track" : "file";
    
    jarvisSpeak(`Accessing ${query} ${typeLabel}. Right away, sir.`, () => {
        closeJarvisUI();
        
        if (isMusic) {
            let found = false;
            const musicButtons = document.querySelectorAll('i#music');
            const searchQuery = query.toUpperCase().replace(/[^A-Z0-9]/g, "");

            if (!searchQuery) return triggerFallbackSearch(query, true);

            for (let btn of musicButtons) {
                const data = btn.dataset;
                const movieContainer = btn.closest('.movies');
                if (movieContainer && movieContainer.dataset.title) {
                    const cleanMovieTitle = movieContainer.dataset.title.toUpperCase().replace(/[^A-Z0-9]/g, "");
                    if (cleanMovieTitle === searchQuery) {
                        localStorage.setItem('targetSongIndex', 0);
                        setTimeout(() => btn.click(), 200); 
                        found = true; break;
                    }
                }
                for (let i = 1; i <= 20; i++) {
                    const titleVal = data[`songtitle${i}`] || data[`songTitle${i}`];
                    if (titleVal) {
                        const cleanTitle = titleVal.toUpperCase().replace(/[^A-Z0-9]/g, "");
                        if (cleanTitle.includes(searchQuery) || searchQuery.includes(cleanTitle)) {
                            localStorage.setItem('targetSongIndex', i - 1);
                            setTimeout(() => btn.click(), 200);
                            found = true; break;
                        }
                    }
                }
                if (found) break;
            }
            if (!found) triggerFallbackSearch(query, true);

        } else {
            const movieCards = Array.from(document.querySelectorAll('.movies'));
            const searchQuery = query.toUpperCase().replace(/[^A-Z0-9]/g, "");
            
            if (!searchQuery) return triggerFallbackSearch(query, false);

            const foundCard = movieCards.find(card => card.dataset.title && card.dataset.title.toUpperCase().replace(/[^A-Z0-9]/g, "") === searchQuery);

            if (foundCard && typeof movieView === "function") {
                setTimeout(() => movieView(foundCard), 200);
            } else {
                triggerFallbackSearch(query, false);
            }
        }
    });
}

function triggerFallbackSearch(query, isMusic) {
    const searchInputs = document.querySelectorAll('input[type="search"]');
    const finalSearchTerm = isMusic ? `${query} SONG` : query;

    if (searchInputs.length > 0) {
        searchInputs.forEach(input => {
            input.value = finalSearchTerm;
            input.dispatchEvent(new Event('input', { bubbles: true }));
        });
        setTimeout(() => {
            if (typeof executeSearch === 'function') executeSearch();
        }, 100);
    } else {
        const param = isMusic ? 'autoPlaySong' : 'autoPlay';
        window.location.href = `movie.html?${param}=${encodeURIComponent(query)}`;
    }
}

// 10. INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
    initWakeWord();
    startWakeWord();
});

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        closeJarvisUI();
        stopWakeWord();
    } else {
        if (State.wakeWordEnabled) startWakeWord();
    }
});

document.addEventListener('keydown', (e) => {
    const activeTag = document.activeElement ? document.activeElement.tagName : '';
    if (['INPUT', 'TEXTAREA'].includes(activeTag) || e.ctrlKey || e.altKey || e.metaKey) return;

    if (e.key.toLowerCase() === 'v') {
        e.preventDefault();
        toggleJarvis(); 
    }
});