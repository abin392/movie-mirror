// ==========================================
// 1. MOVIE TITLE TRAINING (data-title)
// ==========================================
const MOVIE_TRAINING = {
    "AMARAN": ["AMARAN", "AMARON", "AMARIN"],
    "தூங்கி எழுந்தாச்சா": ["தூங்கி எழுந்தாச்சா", "தூங்கி எழுந்தாச்சா", "THUNGI EZHUNTHAACHAA"],
    "DUDE": ["DUDE", "DOOD", "DUD", "DEWD", "DOODLE", "DUDES", "DEW", "DUDDY", "DUNE", "build", "WEIRD", "DEER", "BEARD", "FOOD", "DUE", "VIEW", "VIEWED", "DUDE MOVIE", "DUDE MOVIES"],
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
    "AATHA NEE PETHAAYE": [
        "AATHA NEE PETHAAYE", "AATHA NEE PETHAYE", "Adan", "HORROR", "ORDER",
        "AATHAA NEE PETHAYAE", "ATHA NEE PETHAYE", "ATHA NI PETHAYE", "AATHA NI PETHAYA",
        "AATHANEE PETHAYE", "AATHANI PETHAYE", "ATHANI PETHAYE", "AATA NEE PETHAYE",
        "AATTA NEE PETHAYE", "AMBULI SONG", "AMBULI AATHA SONG", "AMPULI SONG"
    ],
    "YEN PAATTAN SAAMI VARUM": [
        "YEN PAATTAN SAAMI VARUM", "EN PAATTAN SAAMI VARUM", "YEN PATTAN SAMI VARUM",
        "EN PATTAN SAMI VARUM", "YEN PATTAN SAAMY VARUM", "EN PATTAN SWAMY VARUM",
        "EN PATAN SAMI VARUM", "YEN PAATAN SAMI VARUM", "YENPATTAN SAMI VARUM",
        "ENPATTAN SAAMI VARUM", "YEN PATTANSAMI VARUM", "EN PATTAN SAMIVARUM",
        "YEN PATTAN SAMI", "EN PATTAN SAMI", "PAATTAN SAAMI VARUM", "PATTAN SAMI",
        "IDLI KADAI YEN PATTAN", "IDLI KADAI PATTAN SAMI", "IDLI KADAI SONG"
    ],
    "ENNA SUGAM": ["ENNA SUGAM", "ENA SUGAM"],
    "ETHANA SAAMI": ["ETHANA SAAMI", "ETHANA SAMI", "ETNA SAMI", "ETHANA SAAMY"],
    "ENJAAMI THANDHAANE": [
        "ENJAAMI THANDHAANE", "ENJAMI TANDHANE", "ENJAMI", "YENJAAMI THANDHAANE",
        "YENJAMI THANTHANE", "ENJAAMI THANTHANE", "ENJAMI THANDHANE", "ANJAAMI THANDHAANE",
        "ANJAMI THANTHANE", "ENJAAMITHANDHAANE", "YENJAMITHANTHANE", "ENJAMITHANDHANE",
        "ENJAMI TANTANE", "ENJAAMI DHANDHAANE", "ENJAMI TANDANE", "ENJAAMI SONG",
        "YENJAMI SONG", "IDLI KADAI ENJAAMI"
    ],
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
    }
}

// ==========================================
// 4. CORE VOICE & UI FUNCTIONS
// ==========================================
let isVoiceProcessing = false;
window.keepMicAlive = false;       
window.keepTypeMicAlive = false;   

// 🔴 TIMER SCRUBBING SYSTEM
window.voiceTimeouts = [];
function setVoiceTimeout(callback, delay) {
    const id = setTimeout(callback, delay);
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
        position: fixed;
        bottom: 120px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(42, 14, 60, 0.9);
        color: #fff;
        padding: 12px 25px;
        border-radius: 50px;
        font-family: sans-serif;
        font-size: 15px;
        font-weight: bold;
        letter-spacing: 1px;
        box-shadow: 0 0 20px rgba(142, 68, 173, 0.6);
        border: 1px solid rgba(142, 68, 173, 0.8);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        transition: opacity 0.4s ease, transform 0.4s ease;
        backdrop-filter: blur(10px);
        pointer-events: none;
    `;
    toast.innerHTML = `<i class="fas fa-microphone" style="color: #00ff88; text-shadow: 0 0 5px #00ff88;"></i> <span>Say "HEY MIRROR"</span>`;
    
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translate(-50%, 10px)';
        setTimeout(() => toast.remove(), 400); 
    }, 3000);
}

function resetVoiceState() {
    const overlay = document.getElementById('listening-overlay');
    if (overlay) overlay.classList.add('voice-hidden');
    isVoiceProcessing = false;
    
    if (!document.hidden) {
        startWakeWordListening(); 
    }
}

// 🔴 THE X BUTTON CLICK EVENT 
function stopVoiceRecognition() {
    window.keepMicAlive = false; 
    window.keepTypeMicAlive = false;
    isVoiceProcessing = false; 
    
    clearVoiceTimeouts(); 

    if (window.recognition) { try { window.recognition.abort(); } catch(e){} }
    if (window.typeRecognizer) { try { window.typeRecognizer.abort(); } catch(e){} }
    
    window.speechSynthesis.cancel();
    
    const overlay = document.getElementById('listening-overlay');
    if (overlay) overlay.classList.add('voice-hidden');

    if (!document.hidden) {
        startWakeWordListening();
    }
}

// ==========================================
// 5. MAIN SEARCH LOGIC (MOVIE / MUSIC)
// ==========================================
function startVoiceRecognition(searchType = 'movie') {
    if (isVoiceProcessing) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.warn("Speech Recognition API is not supported in this browser.");
        return;
    }

    const menu = document.getElementById('voice-options-menu');
    if (menu) menu.classList.add('voice-hidden');

    window.recognition = new SpeechRecognition();
    const overlay = document.getElementById('listening-overlay');
    const statusText = document.getElementById('voice-status');

    window.recognition.lang = 'en-IN';
    // 🔴 RESTORED CONTINUOUS FALSE: This guarantees perfect live text word-by-word
    window.recognition.continuous = false; 
    window.recognition.interimResults = true; 

    let matchFound = false;

    window.recognition.onstart = () => {
        if (!matchFound) {
            statusText.innerText = "Listening...";
        }
    };

    statusText.innerText = 'Starting Mic...';
    overlay.classList.remove('voice-hidden');
    
    stopWakeWordListening(); 
    isVoiceProcessing = true;
    window.keepMicAlive = true; 

    window.recognition.onresult = (event) => {
        if (matchFound) return; 

        // Live text perfectly displayed
        const transcript = event.results[0][0].transcript;
        statusText.innerText = `"${transcript}"`;

        if (event.results[0].isFinal) {
            let spokenName = transcript.toUpperCase().replace(/\b(PLAYING|PLAY|OPEN|SEARCH FOR|SEARCH|SHOW ME|I WANT TO WATCH|START)\b/g, '').trim();

            if (spokenName.length > 0) {
                matchFound = true; 
                window.keepMicAlive = false; 
                try { window.recognition.abort(); } catch(e){}

                if (searchType === 'movie') {
                    // 🔴 Professional "Searching" Loading State
                    statusText.innerHTML = `<i class="fas fa-circle-notch fa-spin" style="margin-right:8px;"></i> Searching for "${spokenName}"...`;
                    
                    setVoiceTimeout(() => {
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
                    }, 1000); // 1-second browsing visual delay

                }
                else if (searchType === 'music') {
                    // MUSIC SEARCH LOGIC
                    let cleanedSongName = spokenName.replace(/\b(SONG|SONGS|MUSIC|AUDIO|TRACK|PLAYLIST|ALBUM)\b/g, '').replace(/\s+/g, ' ').trim();
                    
                    if (cleanedSongName === "") {
                        assistantSpeak("Please tell me the specific song name.");
                        statusText.innerText = "Waiting for song name...";
                        setVoiceTimeout(() => {
                            matchFound = false;
                            window.keepMicAlive = true;
                            statusText.innerText = 'Listening...';
                            try { window.recognition.start(); } catch(e){}
                        }, 2000);
                        return;
                    }

                    statusText.innerHTML = `<i class="fas fa-circle-notch fa-spin" style="margin-right:8px;"></i> Searching for "${cleanedSongName}"...`;
                    
                    setVoiceTimeout(() => {
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

                        handleMusicSearch(cleanedSongName, () => { matchFound = false; }); 
                    }, 1000); // 1-second browsing visual delay
                }
            } else {
                statusText.innerText = 'Listening...';
            }
        }
    };

    window.recognition.onerror = (event) => {
        if (matchFound) return; 

        const statusText = document.getElementById('voice-status');

        switch (event.error) {
            case 'not-allowed':
                window.keepMicAlive = false;
                assistantSpeak("Microphone permission denied.");
                if (statusText) statusText.innerText = "Mic Permission Denied!";
                setVoiceTimeout(resetVoiceState, 3500);
                break;
            case 'audio-capture':
                window.keepMicAlive = false;
                assistantSpeak("No microphone found.");
                if (statusText) statusText.innerText = "No Microphone Found!";
                setVoiceTimeout(resetVoiceState, 3500);
                break;
            case 'no-speech':
                if (statusText) statusText.innerText = "Listening... (Speak louder)";
                break;
            case 'aborted':
                break;
            default:
                assistantSpeak("A voice error occurred, please try again.");
                if (statusText) statusText.innerText = "Voice Error!";
                setVoiceTimeout(() => {
                    if (isVoiceProcessing) {
                        statusText.innerText = 'Listening...';
                        try { window.recognition.start(); } catch(e){}
                    }
                }, 2500);
        }
    };

    window.recognition.onend = () => {
        if (window.keepMicAlive && !document.hidden && !matchFound) {
            try { window.recognition.start(); } catch(e){}
        }
    };

    window.recognition.start();
}

function handleMusicSearch(songName, unlockCallback) {
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
                    assistantSpeak(`Now playing ${songName.toLowerCase()} song`);
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
        if (!isVoiceProcessing && isWakeWordListening && !document.hidden) {
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

function handoffToSearch(type, spokenText) {
    const synth = window.speechSynthesis;
    synth.cancel(); 
    
    const statusText = document.getElementById('voice-status');
    // 🔴 Professional "Processing" State during handoff
    statusText.innerHTML = `<i class="fas fa-circle-notch fa-spin" style="margin-right:8px;"></i> Processing...`; 

    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.lang = 'en-IN';
    utterance.rate = 1.0;
    
    let handoffComplete = false;

    const triggerNext = () => {
        if (handoffComplete || !isVoiceProcessing) return; 
        handoffComplete = true;
        
        // 🔴 FIX: 400ms Audio Hardware Release Delay
        // Prevents the browser's echo cancellation from creating a "Deaf Microphone"
        setVoiceTimeout(() => {
            isVoiceProcessing = false; 
            startVoiceRecognition(type); 
        }, 400); 
    };

    utterance.onend = triggerNext;
    utterance.onerror = triggerNext;

    synth.speak(utterance);
    setVoiceTimeout(triggerNext, 2000); 
}

function listenForSearchType() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const typeRecognizer = new SpeechRecognition();
    window.typeRecognizer = typeRecognizer; 

    typeRecognizer.lang = 'en-IN';
    // 🔴 RESTORED CONTINUOUS FALSE: Guarantees perfect live text for the prompt
    typeRecognizer.continuous = false; 
    typeRecognizer.interimResults = true;

    const statusText = document.getElementById('voice-status');
    let choiceMade = false;
    window.keepTypeMicAlive = true; 

    typeRecognizer.onstart = () => {
        if (!choiceMade) {
            statusText.innerText = "Listening...";
        }
    };

    typeRecognizer.onresult = (event) => {
        if (choiceMade) return; 

        // Grabs the exact syllable the user is saying in real-time
        const transcript = event.results[0][0].transcript;
        statusText.innerText = `"${transcript}"`;

        if (event.results[0].isFinal) {
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
                assistantSpeak("Sorry, I didn't catch that.");
                statusText.innerText = "Command not recognized.";
                
                window.keepTypeMicAlive = false; 
                try { typeRecognizer.abort(); } catch(e){}

                setVoiceTimeout(() => {
                    if (isVoiceProcessing) { 
                        window.keepTypeMicAlive = true;
                        statusText.innerText = 'Listening...';
                        try { typeRecognizer.start(); } catch(e){}
                    }
                }, 2000);
            }
        }
    };

    typeRecognizer.onerror = (event) => {
        if (choiceMade) return; 

        if (event.error === 'not-allowed') {
            window.keepTypeMicAlive = false;
            assistantSpeak("Microphone permission denied.");
            if (statusText) statusText.innerText = "Mic Permission Denied!";
            setVoiceTimeout(resetVoiceState, 3500);
        } else if (event.error === 'audio-capture') {
            window.keepTypeMicAlive = false;
            assistantSpeak("No microphone found.");
            if (statusText) statusText.innerText = "No Microphone Found!";
            setVoiceTimeout(resetVoiceState, 3500);
        } else if (event.error === 'no-speech') {
            window.keepTypeMicAlive = false;
            assistantSpeak("I didn't hear a response. Please say Hey Mirror to try again.");
            if (statusText) statusText.innerText = "No response detected. Canceling...";
            setVoiceTimeout(resetVoiceState, 3000); 
        } else if (event.error !== 'aborted') {
            window.keepTypeMicAlive = false;
            resetVoiceState();
        }
    };

    typeRecognizer.onend = () => {
        if (window.keepTypeMicAlive && !document.hidden && !choiceMade) {
            try { typeRecognizer.start(); } catch(e){}
        }
    };

    typeRecognizer.start();
}


// ==========================================
// 7. HARDWARE & BROWSER TAB INTEGRATION
// ==========================================
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        window.keepMicAlive = false;
        window.keepTypeMicAlive = false;
        if (window.recognition) { try { window.recognition.abort(); } catch(e){} }
        if (window.typeRecognizer) { try { window.typeRecognizer.abort(); } catch(e){} }
        stopWakeWordListening();
    } else {
        if (mirrorInitialized && !isVoiceProcessing) {
            startWakeWordListening();
        }
    }
});

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

let mirrorInitialized = false;

const voiceBtnElement = document.getElementById('voice-assistant-btn');
if (voiceBtnElement) {
    voiceBtnElement.addEventListener('click', () => {
        if (!mirrorInitialized) {
            initMirrorAssistant();
            mirrorInitialized = true;
            console.log("Hey Mirror background listener is active!");
        }
    });
}