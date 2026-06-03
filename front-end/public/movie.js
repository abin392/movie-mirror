/* ==========================================
   1. AUTHENTICATION & PROFILE AUTO-LOAD
   ========================================== */
document.addEventListener("DOMContentLoaded", () => {
    // Automatically load User Name and Image from localStorage
    const savedName = localStorage.getItem("username");
    const savedImage = localStorage.getItem("profileImage");

    const nameElement = document.getElementById("userName");
    const imageElement = document.getElementById("userImage");

    if (savedName && nameElement) {
        nameElement.textContent = savedName;
    } else if (nameElement) {
        nameElement.textContent = "Guest";
    }

    if (savedImage && imageElement) {
        imageElement.src = savedImage;
    }

    // Initialize core page functions ONCE
    initializeRevealLogic();
    startAutoScroll();
    setupEventListeners();

    // Safely trigger the Custom Search Dropdown
    if (typeof populateSearchOptions === "function") {
        populateSearchOptions();
    }

    // ADD THIS LINE HERE: Auto-train your voice engine instantly on load
    initializeVoiceTraining();

    // Login check to view the music page
    document.querySelectorAll('i#music').forEach(musicBtn => {
        musicBtn.addEventListener('click', (e) => {
            if (localStorage.getItem("isLoggedIn") !== "true" || !localStorage.getItem("username")) {
                window.location.href = "index.html";
                e.stopPropagation();
            } else {
                window.location.href = 'music-viewer.html';
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Wait a brief moment to ensure any dynamic content/fetch calls have rendered the items
    setTimeout(() => {
        trainAssistantFromPage();
    }, 800);
});

function trainAssistantFromPage() {
    // Ensure the voice training arrays are globally accessible
    window.MOVIE_TRAINING = window.MOVIE_TRAINING || [];
    window.MUSIC_TRAINING = window.MUSIC_TRAINING || [];

    // 1. EXTRACT MOVIES (Adjust the selector '.movie-card' or '.movie-title' to match your HTML)
    const movieElements = document.querySelectorAll(".movie-card, .movie-item, [data-type='movie']");
    movieElements.forEach(element => {
        // Grabs text from the element or from specific title classes inside it
        const titleText = element.querySelector(".movie-title") ? element.querySelector(".movie-title").innerText : element.innerText;
        const dataTitle = element.getAttribute("data-title"); // Fallback if you use data attributes

        processAndPushToken(titleText, window.MOVIE_TRAINING);
        if (dataTitle) processAndPushToken(dataTitle, window.MOVIE_TRAINING);
    });

    // 2. EXTRACT SONGS (Adjust the selector '.song-item' or '.music-title' to match your HTML)
    const songElements = document.querySelectorAll(".song-item, .audio-track, [data-type='song']");
    songElements.forEach(element => {
        const songText = element.querySelector(".song-title") ? element.querySelector(".song-title").innerText : element.innerText;
        const dataSong = element.getAttribute("data-song-name");
        const artistText = element.querySelector(".artist-name") ? element.querySelector(".artist-name").innerText : "";

        processAndPushToken(songText, window.MUSIC_TRAINING);
        if (dataSong) processAndPushToken(dataSong, window.MUSIC_TRAINING);
        if (artistText) processAndPushToken(artistText, window.MUSIC_TRAINING); // Trains voice to recognize singer names too
    });

    // 3. Clean up duplicates instantly for high-speed local processing
    window.MOVIE_TRAINING = [...new Set(window.MOVIE_TRAINING)];
    window.MUSIC_TRAINING = [...new Set(window.MUSIC_TRAINING)];

    console.log("Voice Assistant Trained Successfully!");
    console.log("Loaded Movies:", window.MOVIE_TRAINING.length);
    console.log("Loaded Songs:", window.MUSIC_TRAINING.length);
}

// Helper function to clean text, handle combined languages, and isolate items
function processAndPushToken(rawText, targetArray) {
    if (!rawText) return;

    // Clean up extra spaces, line breaks, and convert to uppercase
    let cleanText = rawText.replace(/\s+/g, ' ').trim().toUpperCase();

    if (cleanText) {
        targetArray.push(cleanText);

        // If a title contains both Tamil and English (e.g., "Amaran அமரன்"), split and train both individually
        if (/[\u0b80-\u0bff]/.test(cleanText) && /[A-Z]/.test(cleanText)) {
            // Split by dashes, parentheses, or spaces between language boundaries
            const fragments = cleanText.split(/[-()]/);
            fragments.forEach(frag => {
                const trimmedFrag = frag.trim();
                if (trimmedFrag.length > 1) {
                    targetArray.push(trimmedFrag);
                }
            });
        }
    }
}



/* ==========================================
   2. SEARCH LOGIC (MOVIES & MUSIC)
   ========================================== */
function executeSearch() {
    const inputs = document.querySelectorAll('input[type="search"]');
    let rawQuery = "";
    inputs.forEach(input => {
        if (input.value.trim() !== "") rawQuery = input.value;
    });

    let query = rawQuery.toUpperCase().trim();
    if (!query) return;

    // Case-Insensitive Movie Auto-Correct
    if (typeof MOVIE_TRAINING !== 'undefined') {
        for (const [correctName, variants] of Object.entries(MOVIE_TRAINING)) {
            if (variants.some(variant => variant.toUpperCase() === query)) {
                query = correctName;
                break;
            }
        }
    }

    // Check for MOVIE
    const allMovies = Array.from(document.querySelectorAll('.movies'));
    const foundMovie = allMovies.find(movie => movie.dataset.title === query);

    if (foundMovie) {
        movieView(foundMovie);
        return;
    }

    // Check for MUSIC/SONG
    let foundMusic = false;
    let musicQuery = query.replace(/\b(SONG|SONGS|MUSIC|AUDIO|PLAY)\b/g, '').replace(/\s+/g, ' ').trim();

    if (typeof MUSIC_TRAINING !== 'undefined') {
        for (const [correctName, variants] of Object.entries(MUSIC_TRAINING)) {
            if (variants.some(variant => variant.toUpperCase() === musicQuery)) {
                musicQuery = correctName;
                break;
            }
        }
    }

    const cleanSearchStr = musicQuery.replace(/[^A-Z0-9]/g, "");
    const musicButtons = document.querySelectorAll('i#music');

    for (let btn of musicButtons) {
        const data = btn.dataset;
        const movieContainer = btn.closest('.movies');

        // Check full Album
        if (movieContainer) {
            const movieTitle = (movieContainer.dataset.title || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
            if (cleanSearchStr && (movieTitle === cleanSearchStr || movieTitle.includes(cleanSearchStr))) {
                localStorage.setItem('targetSongIndex', 0);
                btn.click();
                foundMusic = true;
                break;
            }
        }

        // Check Specific Song Track
        for (let i = 1; i <= 20; i++) {
            const titleVal = data[`songtitle${i}`] || data[`songTitle${i}`];
            if (titleVal) {
                const cleanTitle = titleVal.toUpperCase().replace(/[^A-Z0-9]/g, "");
                if (cleanSearchStr && (cleanTitle.includes(cleanSearchStr) || cleanSearchStr.includes(cleanTitle))) {
                    localStorage.setItem('targetSongIndex', i - 1);
                    btn.click();
                    foundMusic = true;
                    break;
                }
            }
        }
        if (foundMusic) break;
    }

    if (!foundMusic) {
        showStyledError("Movie or Song not found! Please check the title.");
    }
}

/* ==========================================
   3. CONTENT REVEAL (SKELETON TO REAL)
   ========================================== */
function initializeRevealLogic() {
    const skeleton = document.getElementById("skeletonLoader");
    const real = document.getElementById("realContent");

    if (!skeleton || !real) return;

    const realSections = real.querySelectorAll(":scope > section, :scope > div");

    setTimeout(() => {
        skeleton.style.display = "none";
        real.style.display = "block";

        realSections.forEach((section, index) => {
            section.style.opacity = "0";
            section.style.transform = "translateY(20px)";
            section.style.transition = "opacity 0.4s ease, transform 0.4s ease";

            setTimeout(() => {
                section.style.opacity = "1";
                section.style.transform = "translateY(0)";
            }, index * 80);
        });
    }, 300);
}

/* ==========================================
   4. SCROLLER & INTERACTION LOGIC
   ========================================== */
let autoScrollInterval;
let isHoveringCart = false;
let scrollIndex = 0;

function startAutoScroll() {
    const scroller = document.querySelector('.scroller');
    const carts = Array.from(document.querySelectorAll('.scroller .cart'));
    if (!scroller || carts.length === 0) return;

    // Optional: Keep track of manual scrolling so auto-scroll doesn't jerk backwards
    scroller.addEventListener('scroll', () => {
        if (!isHoveringCart) {
            scrollIndex = Math.round(scroller.scrollLeft / scroller.clientWidth);
        }
    }, { passive: true });

    clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(() => {
        if (isHoveringCart) return;

        scrollIndex++;
        if (scrollIndex >= carts.length) scrollIndex = 0;

        // Since each cart is 100vw, we just multiply the index by the container's width
        const targetLeft = scroller.clientWidth * scrollIndex;

        scroller.scrollTo({ left: targetLeft, behavior: 'smooth' });
    }, 5000); // 5 seconds per slide
}

/* ==========================================
   5. EVENT LISTENERS & UTILITIES
   ========================================== */
function setupEventListeners() {
    const searchInputs = document.querySelectorAll('input[type="search"]');
    searchInputs.forEach(input => {
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                executeSearch();
                input.blur();
            }
        });
    });

    document.querySelectorAll(".cart").forEach(card => {
        const video = card.querySelector("video");
        if (!video) return;

        card.addEventListener("mouseenter", () => {
            isHoveringCart = true;
            video.currentTime = 0;
            video.play().catch(() => { });
        });

        card.addEventListener("mouseleave", () => {
            isHoveringCart = false;
            video.pause();
            video.currentTime = 0;
        });
    });
}

function movieView(element) {
    if (localStorage.getItem("isLoggedIn") !== "true" || !localStorage.getItem("username")) {
        window.location.href = "index.html";
        return;
    }

    const movie = element.closest('.movies');
    const movieData = {
        title: movie.dataset.title,
        video: movie.dataset.link1,
        hero: movie.dataset.name,
        year: movie.dataset.year,
        language: movie.dataset.language,
        image: movie.dataset.img,
        episodes: Array.from({ length: 16 }, (_, i) => ({
            link: movie.dataset[`link${i + 2}`],
            title: movie.dataset[`episode${i + 1}`],
            time: movie.dataset[`time${i === 0 ? '' : i + 1}`]
        }))
    };
    localStorage.setItem('selectedMovie', JSON.stringify(movieData));
    window.location.href = 'movie-view.html';
}

function logout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace("index.html");
}

function showStyledError(message) {
    const existing = document.querySelector('.movie-error-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'movie-error-toast';
    toast.innerHTML = `<i class="fas fa-exclamation-circle"></i> <span>${message}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

/* ==========================================
   6. PAGE NAVIGATION RESETS
   ========================================== */
window.addEventListener('pageshow', (event) => {
    const searchInputs = document.querySelectorAll('input[type="search"]');
    searchInputs.forEach(input => {
        input.value = '';
    });
});

/* ==========================================
   7. DYNAMIC SEARCH AUTOCOMPLETE
========================================== */
let availableSearchTerms = [];

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function populateSearchOptions() {
    try {
        const uniqueTitles = new Set();

        const movieCards = document.querySelectorAll('.movies');
        movieCards.forEach(card => {
            const title = card.dataset.title;
            if (title && title.trim() !== "") uniqueTitles.add(title.toUpperCase().trim());
        });

        const musicButtons = document.querySelectorAll('i#music');
        musicButtons.forEach(btn => {
            for (let i = 1; i <= 20; i++) {
                const songTitle = btn.dataset[`songtitle${i}`] || btn.dataset[`songTitle${i}`];
                if (songTitle) {
                    const cleanTitle = songTitle.replace(/_+/g, ' ').toUpperCase().trim();
                    uniqueTitles.add(cleanTitle);
                }
            }
        });

        availableSearchTerms = Array.from(uniqueTitles).sort();

        const searchInputs = document.querySelectorAll('input[type="search"]');

        searchInputs.forEach(input => {
            input.removeAttribute('list');
            input.setAttribute('autocomplete', 'off');

            const dropdown = document.createElement('div');
            dropdown.className = 'custom-dropdown';
            input.parentElement.appendChild(dropdown);

            let currentFocus = -1;

            input.addEventListener('input', function () {
                const val = this.value.toUpperCase().trim();
                dropdown.innerHTML = '';
                currentFocus = -1;

                if (!val) {
                    dropdown.style.display = 'none';
                    return;
                }

                const matches = availableSearchTerms.filter(term => term.includes(val));

                if (matches.length > 0) {
                    matches.forEach(match => {
                        const option = document.createElement('div');
                        option.className = 'custom-option';

                        const safeVal = escapeRegExp(val);
                        const regex = new RegExp(`(${safeVal})`, "gi");
                        const highlightedMatch = match.replace(regex, "<span style='color: #00ff88; font-weight: bold;'>$1</span>");

                        option.innerHTML = `<i class="fas fa-search"></i> ${highlightedMatch}`;

                        option.addEventListener('click', () => {
                            input.value = match;
                            dropdown.style.display = 'none';
                            executeSearch();
                        });

                        dropdown.appendChild(option);
                    });
                    dropdown.style.display = 'block';
                } else {
                    dropdown.style.display = 'none';
                }
            });

            input.addEventListener('keydown', function (e) {
                const options = dropdown.querySelectorAll('.custom-option');
                if (!options || options.length === 0) return;

                if (e.keyCode === 40) {
                    e.preventDefault();
                    currentFocus++;
                    addActive(options);
                } else if (e.keyCode === 38) {
                    e.preventDefault();
                    currentFocus--;
                    addActive(options);
                } else if (e.keyCode === 13) {
                    if (currentFocus > -1 && dropdown.style.display === 'block') {
                        e.preventDefault();
                        options[currentFocus].click();
                    }
                }
            });

            function addActive(options) {
                removeActive(options);
                if (currentFocus >= options.length) currentFocus = 0;
                if (currentFocus < 0) currentFocus = (options.length - 1);

                const activeOption = options[currentFocus];
                activeOption.classList.add("active");
                activeOption.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }

            function removeActive(options) {
                options.forEach(opt => opt.classList.remove("active"));
            }

            document.addEventListener('click', (e) => {
                if (e.target !== input && e.target !== dropdown) {
                    dropdown.style.display = 'none';
                }
            });
        });
    } catch (error) {
        console.error("Autocomplete initialized safely with bypass.", error);
    }
}


/* ==========================================
   8. AUTOMATED VOICE ENGINE SYNCHRONIZATION
========================================== */
function initializeVoiceTraining() {
    // Setup global training dictionaries if not initialized yet
    window.MOVIE_TRAINING = window.MOVIE_TRAINING || {};
    window.MUSIC_TRAINING = window.MUSIC_TRAINING || {};

    // 1. Core Language Dictionary (Tamil Script + Slang mapping to match your elements)
    const baselineMovies = {
        "AMARAN": ["AMARAN", "அமரன்", "AMARAN MOVIE", "AMARAN PADAM", "SIVAKARTHIKEYAN AMARAN"],
        "DUDE": ["DUDE", "டூட்", "DUDE MOVIE", "DUDE PADAM", "PRADEEP DUDE"],
        "AVATAR": ["AVATAR", "அவதார்", "AVATAR MOVIE", "AVATAR 2"],
        "DARBAR": ["DARBAR", "தர்பார்", "DARBAR MOVIE", "THALAIVAR DARBAR"],
        "AQUAMAN": ["AQUAMAN", "அக்வாமேன்", "AQUAMAN MOVIE"],
        "KATASI VIVASAYE": ["KATASI VIVASAYE", "KATAISY VIWASAYI", "கடைசி விவசாயி"],
        "AMPULI": ["AMPULI", "AMPULI(2012)", "அம்புலி", "AMBLY", "AMPU LEE"],
        "CAPTAIN AMERICA": ["CAPTAIN AMERICA", "CAPTAN AMERICA", "CAPTAIN AMERICAN"],
        "BISON": ["BISON", "BYSON", "BAYSAN", "POISON"],
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

    const baselineMusic = {
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

    // Apply native localized mappings safely
    Object.assign(window.MOVIE_TRAINING, baselineMovies);
    Object.assign(window.MUSIC_TRAINING, baselineMusic);

    // 2. Dynamic DOM Scraper for Movies
    // Automatically extracts data-title items from your catalog elements
    const movieCards = document.querySelectorAll('.movies');
    movieCards.forEach(card => {
        const title = card.dataset.title;
        if (title && title.trim() !== "") {
            const upperTitle = title.toUpperCase().trim();
            // If movie isn't in baseline dictionary, generate its standard voice lookup formats
            if (!window.MOVIE_TRAINING[upperTitle]) {
                window.MOVIE_TRAINING[upperTitle] = [
                    upperTitle,
                    `${upperTitle} MOVIE`,
                    `${upperTitle} PADAM`,
                    `${upperTitle} FILM`
                ];
            }
        }
    });


    // Inside your movie.js -> executeSearch(text, isMusic) function:
    if (isMusic) {
        const cleanQuery = text.toUpperCase().trim();
        console.log("Voice searching music for query:", cleanQuery);

        /* =================================================================
           SAFE FALLBACK: CHECK IF USER SAID A MOVIE NAME TO PLAY ITS SONGS
           ================================================================= */
        let movieSongMatches = [];
        const musicPlayerButtons = document.querySelectorAll('i#music');

        musicPlayerButtons.forEach(btn => {
            // Scan all 20 possible song slots embedded in your player markup
            for (let i = 1; i <= 20; i++) {
                const trackName = btn.dataset[`songtitle${i}`] || btn.dataset[`songTitle${i}`];
                if (trackName) {
                    const cleanTrack = trackName.toUpperCase();

                    // Matches standard names or tracks split with file formatting (e.g., "HUKUM__JAILER")
                    if (cleanTrack.includes(cleanQuery) || cleanTrack.includes(cleanQuery.replace(/\s+/g, '_'))) {
                        movieSongMatches.push({ element: btn, trackIndex: i, name: trackName });
                    }
                }
            }
        });

        // If tracks associated with that movie are found, play the first one instantly
        if (movieSongMatches.length > 0) {
            const targetSong = movieSongMatches[0];
            console.log(`Voice Match Success! Playing track: ${targetSong.name} from movie context.`);

            // 1. Open the music player interface safely if it's closed
            if (typeof openMusicPlayer === "function") {
                openMusicPlayer(targetSong.element);
            } else {
                targetSong.element.click(); // Trigger native click click fallback
            }

            // 2. Fire your player's index selection if available
            if (typeof playTrackByIndex === "function") {
                playTrackByIndex(targetSong.trackIndex);
            } else if (typeof setTrack === "function") {
                setTrack(targetSong.trackIndex);
            }

            return; // EXIT EARLY - Successfully handled without touching remaining search code!
        }

        /* =================================================================
           YOUR EXISTING EXACT SONG MATCHING LOGIC CONTINUES BELOW...
           ================================================================= */
    }

    // 3. Dynamic DOM Scraper for Song/Audio Assets
    // Loops through the song titles hidden inside your music player triggers
    const musicButtons = document.querySelectorAll('i#music');
    musicButtons.forEach(btn => {
        for (let i = 1; i <= 20; i++) {
            const songTitle = btn.dataset[`songtitle${i}`] || btn.dataset[`songTitle${i}`];
            if (songTitle) {
                // Convert underscores to cleaner conversational phrase lookups
                const cleanTitle = songTitle.replace(/_+/g, ' ').toUpperCase().trim();
                if (!window.MUSIC_TRAINING[cleanTitle]) {
                    // Extract track segment before album identifier tags (e.g. "__Ambuli")
                    const simpleName = cleanTitle.split(/__/)[0].trim();

                    window.MUSIC_TRAINING[cleanTitle] = [
                        cleanTitle,
                        simpleName,
                        `${simpleName} SONG`,
                        `${cleanTitle} AUDIO`
                    ];
                }
            }
        }
    });

    console.log("Voice Control Engine Successfully Synced With Page Elements:", {
        totalMoviesLoaded: Object.keys(window.MOVIE_TRAINING).length,
        totalSongsLoaded: Object.keys(window.MUSIC_TRAINING).length
    });
}