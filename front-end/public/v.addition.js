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