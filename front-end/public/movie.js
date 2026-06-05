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
    setupSmartTVNavigation(); // <--- TV Navigation Initialized

    // Safely trigger the Custom Search Dropdown
    if (typeof populateSearchOptions === "function") {
        populateSearchOptions();
    }

    // Auto-train your voice engine instantly on load
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
    setTimeout(() => {
        trainAssistantFromPage();
    }, 800);
});

function trainAssistantFromPage() {
    window.MOVIE_TRAINING = window.MOVIE_TRAINING || [];
    window.MUSIC_TRAINING = window.MUSIC_TRAINING || [];

    // 1. EXTRACT MOVIES
    const movieElements = document.querySelectorAll(".movie-card, .movie-item, [data-type='movie']");
    movieElements.forEach(element => {
        const titleText = element.querySelector(".movie-title") ? element.querySelector(".movie-title").innerText : element.innerText;
        const dataTitle = element.getAttribute("data-title");

        processAndPushToken(titleText, window.MOVIE_TRAINING);
        if (dataTitle) processAndPushToken(dataTitle, window.MOVIE_TRAINING);
    });

    // 2. EXTRACT SONGS
    const songElements = document.querySelectorAll(".song-item, .audio-track, [data-type='song']");
    songElements.forEach(element => {
        const songText = element.querySelector(".song-title") ? element.querySelector(".song-title").innerText : element.innerText;
        const dataSong = element.getAttribute("data-song-name");
        const artistText = element.querySelector(".artist-name") ? element.querySelector(".artist-name").innerText : "";

        processAndPushToken(songText, window.MUSIC_TRAINING);
        if (dataSong) processAndPushToken(dataSong, window.MUSIC_TRAINING);
        if (artistText) processAndPushToken(artistText, window.MUSIC_TRAINING);
    });

    window.MOVIE_TRAINING = [...new Set(window.MOVIE_TRAINING)];
    window.MUSIC_TRAINING = [...new Set(window.MUSIC_TRAINING)];
}

function processAndPushToken(rawText, targetArray) {
    if (!rawText) return;
    let cleanText = rawText.replace(/\s+/g, ' ').trim().toUpperCase();
    if (cleanText) {
        targetArray.push(cleanText);
        if (/[\u0b80-\u0bff]/.test(cleanText) && /[A-Z]/.test(cleanText)) {
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

    if (typeof MOVIE_TRAINING !== 'undefined' && !Array.isArray(MOVIE_TRAINING)) {
        for (const [correctName, variants] of Object.entries(MOVIE_TRAINING)) {
            if (variants.some(variant => variant.toUpperCase() === query)) {
                query = correctName;
                break;
            }
        }
    }

    const allMovies = Array.from(document.querySelectorAll('.movies'));
    const foundMovie = allMovies.find(movie => movie.dataset.title === query);

    if (foundMovie) {
        movieView(foundMovie);
        return;
    }

    let foundMusic = false;
    let musicQuery = query.replace(/\b(SONG|SONGS|MUSIC|AUDIO|PLAY)\b/g, '').replace(/\s+/g, ' ').trim();

    if (typeof MUSIC_TRAINING !== 'undefined' && !Array.isArray(MUSIC_TRAINING)) {
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

        if (movieContainer) {
            const movieTitle = (movieContainer.dataset.title || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
            if (cleanSearchStr && (movieTitle === cleanSearchStr || movieTitle.includes(cleanSearchStr))) {
                localStorage.setItem('targetSongIndex', 0);
                btn.click();
                foundMusic = true;
                break;
            }
        }

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
   3. CONTENT REVEAL
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

        const targetLeft = scroller.clientWidth * scrollIndex;
        scroller.scrollTo({ left: targetLeft, behavior: 'smooth' });
    }, 5000); 
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

    document.querySelectorAll(".cart, .movies").forEach(card => {
        const video = card.querySelector("video");
        const img = card.querySelector("img"); 
        
        if (!video) return;

        video.style.position = "absolute";
        video.style.top = "0";
        video.style.left = "0";
        video.style.width = "100%";
        video.style.height = "100%";
        video.style.objectFit = "cover"; 
        video.style.opacity = "0";
        video.style.pointerEvents = "none"; 

        if (img) {
            img.style.position = "absolute";
            img.style.top = "0";
            img.style.left = "0";
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.objectFit = "cover";
            img.style.opacity = "1";
        }

        const startPreview = () => {
            isHoveringCart = true;
            const videoSrc = video.getAttribute("src");
            if (videoSrc && videoSrc.trim() !== "") {
                if (img) img.style.opacity = "0"; 
                video.style.opacity = "1";        
                
                video.currentTime = 0;
                const playPromise = video.play();
                
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        if (img) img.style.opacity = "1";
                        video.style.opacity = "0";
                    });
                }
            }
        };

        const stopPreview = () => {
            isHoveringCart = false;
            if (img) img.style.opacity = "1"; 
            video.style.opacity = "0";        
            video.pause();
            video.currentTime = 0;
        };

        card.addEventListener("mouseenter", startPreview);
        card.addEventListener("mouseleave", stopPreview);
        card.addEventListener("touchstart", startPreview, { passive: true });
        card.addEventListener("touchend", stopPreview, { passive: true });
        card.addEventListener("touchcancel", stopPreview, { passive: true });
    });
}

function movieView(element) {
    if (localStorage.getItem("isLoggedIn") !== "true" || !localStorage.getItem("username")) {
        window.location.href = "index.html";
        return;
    }

    let movie = element.closest('.movies') || element.closest('.cart');
    if (!movie) return;

    // --- NEW: SMART MATCHING LOGIC FOR HERO SCROLLER CARTS ---
    // If the clicked element is from the top scroller, it lacks the raw data attributes.
    if (movie.classList.contains('cart')) {
        // Extract the title from the Hero cart's H2 tag safely
        const heroTitle = movie.querySelector('h2')?.innerText.trim().toUpperCase();
        
        // Scan the entire database of lower cards for the exact matching title
        const actualDataCard = Array.from(document.querySelectorAll('.movies')).find(card => 
            card.dataset.title && card.dataset.title.toUpperCase().trim() === heroTitle
        );

        if (actualDataCard) {
            // Swap the active element so the engine seamlessly pulls all 15+ episodes and links!
            movie = actualDataCard; 
        } else {
            // Failsafe in case the movie hasn't been mapped in the lower grid yet
            showStyledError("Full movie data not found for: " + (heroTitle || "Unknown"));
            return;
        }
    }
    // ---------------------------------------------------------

    const movieData = {
        title: movie.dataset.title || movie.querySelector('h2')?.innerText || "Unknown",
        video: movie.dataset.link1 || "",
        hero: movie.dataset.name || "",
        year: movie.dataset.year || "",
        language: movie.dataset.language || "",
        image: movie.dataset.img || movie.querySelector('img')?.src || "",
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

                if (e.keyCode === 40) { // ArrowDown
                    // FIX: If TV mode is active and we are at the LAST option...
                    if (document.querySelector('.tv-focus') && currentFocus === options.length - 1) {
                        dropdown.style.display = 'none'; // Close the dropdown
                        currentFocus = -1;               // Reset the active highlight
                        removeActive(options);
                        input.blur();                    // Remove text box focus
                        return; // Let the event reach the Smart TV script to jump to the scroller!
                    }
                    e.preventDefault();
                    currentFocus++;
                    addActive(options);
                } else if (e.keyCode === 38) { // ArrowUp
                    // FIX: If TV mode is active and we push up from the FIRST option...
                    if (document.querySelector('.tv-focus') && currentFocus <= 0) {
                        currentFocus = -1;               // Reset highlight
                        removeActive(options);           // Un-highlight option
                        return; // Keep focus safely in the text box so they can keep typing
                    }
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
        console.error("Autocomplete init bypassed.", error);
    }
}

/* ==========================================
   8. AUTOMATED VOICE ENGINE SYNCHRONIZATION
========================================== */
function initializeVoiceTraining() {
    // Retained from your original logic
    window.MOVIE_TRAINING = window.MOVIE_TRAINING || {};
    window.MUSIC_TRAINING = window.MUSIC_TRAINING || {};
}




/* ==========================================
   9. FULLY DEBUGGED SMART TV / PC CONTROLS
========================================== */
function setupSmartTVNavigation() {
    if (!document.getElementById('tv-focus-styles')) {
        const style = document.createElement('style');
        style.id = 'tv-focus-styles';
        style.innerHTML = `
            .tv-focus {
                outline: 2px solid #ffffff !important;
                outline-offset: 4px !important;
                transform: scale(1) !important;
                box-shadow: 0 5px 5px rgba(255, 255, 255, 0.6) !important;
                z-index: 50 !important;
                transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
            }
            *:focus { outline: none !important; }
        `;
        document.head.appendChild(style);
    }

    const isSmartTV = /(tv|smarttv|tizen|webos|appletv|roku|bravia|netcast|viera)/i.test(navigator.userAgent.toLowerCase());
    
    if (isSmartTV) {
        const tvTooltip = document.createElement('div');
        tvTooltip.innerHTML = `<i class="fas fa-microphone" style="margin-right:8px; color:#ffffff;"></i> Long Press 'OK' for Voice Assistant`;
        tvTooltip.style.cssText = `
            position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%);
            background: rgba(0, 20, 40, 0.85); border: 1px solid #ffffff; color: #fff;
            padding: 12px 24px; border-radius: 30px; font-size: 15px; font-weight: 500;
            z-index: 10000; backdrop-filter: blur(10px); box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
            transition: opacity 0.8s ease; pointer-events: none; display: flex; align-items: center;
        `;
        document.body.appendChild(tvTooltip);
        setTimeout(() => { tvTooltip.style.opacity = '0'; setTimeout(() => tvTooltip.remove(), 800); }, 7000);
    }

    let navGrid = [];
    let currentRow = -1;
    let currentCol = -1;
    let currentInner = 'main'; // Tracks nested focus: 'main', 'btn', 'icon-music', 'icon-dl'
    let isTVModeActive = false;

    let enterPressTimer;
    let isLongPress = false;
    let enterKeyDown = false;

    // 1. Grid Definition (Unified layout)
    function refreshGrid() {
        navGrid = [];
        const searchBox = document.querySelector('#movieSearchInput');
        const searchBtn = document.querySelector('.search-order button');
        let searchRow = [];
        if (searchBox) searchRow.push(searchBox);
        if (searchBtn) searchRow.push(searchBtn);
        if (searchRow.length > 0) navGrid.push(searchRow);

        const heroCarts = Array.from(document.querySelectorAll('.scroller .cart'));
        if (heroCarts.length > 0) navGrid.push(heroCarts);

        const collections = document.querySelectorAll('.movie-collection .movie-container');
        collections.forEach(container => {
            const movies = Array.from(container.querySelectorAll('.movies'));
            if (movies.length > 0) navGrid.push(movies);
        });
    }

    // 2. Process Nested Focus
    function updateFocus(row, col) {
        let oldContainer = null;
        const currentlyFocused = document.querySelector('.tv-focus');
        if (currentlyFocused) {
            currentlyFocused.classList.remove('tv-focus');
            oldContainer = currentlyFocused.closest('.cart, .movies');
        }

        currentRow = Math.max(0, Math.min(row, navGrid.length - 1));
        currentCol = Math.max(0, Math.min(col, navGrid[currentRow].length - 1));
        
        const cell = navGrid[currentRow][currentCol];
        let newEl = cell;

        // Route inner-focus to specific elements inside the card
        if (currentInner === 'btn') newEl = cell.querySelector('button') || cell;
        else if (currentInner === 'icon-music') newEl = cell.querySelector('#music') || cell;
        else if (currentInner === 'icon-dl') newEl = cell.querySelector('#movie-dots') || cell;
        
        // Self-heal logic if the card doesn't have the requested button/icon
        if (newEl === cell) currentInner = 'main'; 

        const newContainer = newEl.closest('.cart, .movies');

        // Stop Trailer if moving to a different card, OR moving away from the "Watch Now" button
        if (oldContainer) {
            if (oldContainer !== newContainer) {
                oldContainer.dispatchEvent(new Event('mouseleave')); 
            } else if (oldContainer.classList.contains('cart') && currentInner !== 'btn') {
                oldContainer.dispatchEvent(new Event('mouseleave')); 
            }
        }

        newEl.classList.add('tv-focus');

        const scrollContainer = newEl.closest('.scroller, .movie-container');
        if (scrollContainer) {
            const targetScrollEl = newContainer || newEl;
            const itemLeft = targetScrollEl.offsetLeft;
            const containerCenter = scrollContainer.clientWidth / 2;
            const itemCenter = targetScrollEl.clientWidth / 2;
            
            // Retains your exact horizontal scrolling logic
            scrollContainer.scrollTo({ left: itemLeft - containerCenter + itemCenter, behavior: 'smooth' });
            
            // Changed from 'center' to 'nearest' so it doesn't force the page position
            targetScrollEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        } else {
            // Changed here as well for fallback elements
            newEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        }

        if (newEl.tagName === 'INPUT') {
            newEl.focus(); 
        } else {
            if (document.activeElement && document.activeElement.tagName === 'INPUT') {
                document.activeElement.blur(); 
                // FIX: Automatically close the search dropdown when navigating down to the scroller
                const openDropdowns = document.querySelectorAll('.custom-dropdown');
                openDropdowns.forEach(dropdown => dropdown.style.display = 'none');
            }
            // Play Trailer ONLY on button focus for Hero .cart, otherwise keep default behavior
            if (newContainer) {
                if (newContainer.classList.contains('cart')) {
                    if (currentInner === 'btn') {
                        newContainer.dispatchEvent(new Event('mouseenter')); 
                    }
                } else if (oldContainer !== newContainer) {
                    newContainer.dispatchEvent(new Event('mouseenter')); 
                }
            }
        }
    }

    // 3. Remote Keydown Event & Internal Routing Math
    document.addEventListener('keydown', (e) => {
        const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'];
        if (!keys.includes(e.key)) return;

        // FIX: Handle Smart TV logic when inside the Search Box
        if (document.activeElement && document.activeElement.id === 'movieSearchInput') {
            const dropdown = document.querySelector('.custom-dropdown');
            // 1. If dropdown is open, let the user use Up/Down to select queries!
            if (dropdown && dropdown.style.display === 'block' && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
                return; 
            }
            // 2. Otherwise, allow Left/Right for normal text editing
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') return;
        }

        if (e.key === 'Enter') {
            e.preventDefault(); 
            if (!enterKeyDown) {
                enterKeyDown = true;
                isLongPress = false;
                enterPressTimer = setTimeout(() => {
                    isLongPress = true;
                    if (typeof toggleJarvis === 'function') toggleJarvis();
                }, 800); 
            }
            return; 
        }

        e.preventDefault(); 
        refreshGrid();
        if (navGrid.length === 0) return;

        if (!isTVModeActive) {
            isTVModeActive = true;
            currentRow = 1; currentCol = 0; currentInner = 'main';
            updateFocus(currentRow, currentCol);
            return;
        }

        let nextRow = currentRow;
        let nextCol = currentCol;
        const cell = navGrid[currentRow][currentCol];

        // MAGIC D-PAD LOGIC
        if (e.key === 'ArrowDown') {
            if (currentInner === 'icon-music' || currentInner === 'icon-dl') {
                currentInner = 'main';
            } else if (currentInner === 'main' && cell.querySelector('button')) {
                currentInner = 'btn';
            } else {
                if (currentRow < navGrid.length - 1) {
                    nextRow++; currentInner = 'main';
                    nextCol = Math.floor((currentCol / navGrid[currentRow].length) * navGrid[nextRow].length);
                    nextCol = Math.min(nextCol, navGrid[nextRow].length - 1);
                }
            }
        } else if (e.key === 'ArrowUp') {
            if (currentInner === 'btn') {
                currentInner = 'main';
            } else if (currentInner === 'main' && (cell.querySelector('#music') || cell.querySelector('#movie-dots'))) {
                currentInner = cell.querySelector('#movie-dots') ? 'icon-dl' : 'icon-music';
            } else {
                if (currentRow > 0) {
                    nextRow--; currentInner = 'main';
                    nextCol = Math.floor((currentCol / navGrid[currentRow].length) * navGrid[nextRow].length);
                    nextCol = Math.min(nextCol, navGrid[nextRow].length - 1);
                }
            }
        } else if (e.key === 'ArrowLeft') {
            if (currentInner === 'icon-dl' && cell.querySelector('#music')) {
                currentInner = 'icon-music';
            } else if (currentCol > 0) {
                nextCol--; currentInner = 'main';
            }
        } else if (e.key === 'ArrowRight') {
            if (currentInner === 'icon-music' && cell.querySelector('#movie-dots')) {
                currentInner = 'icon-dl';
            } else if (currentCol < navGrid[currentRow].length - 1) {
                nextCol++; currentInner = 'main';
            }
        }

        updateFocus(nextRow, nextCol);
    });

    // 4. Remote Keyup Event (Executes specific Inner Item)
    document.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            enterKeyDown = false;
            clearTimeout(enterPressTimer); 

            if (!isLongPress) {
                refreshGrid();
                if (navGrid.length === 0) return;
                if (!isTVModeActive) {
                    isTVModeActive = true; currentRow = 1; currentCol = 0; currentInner = 'main'; updateFocus(currentRow, currentCol); return;
                }

                const focusedEl = document.querySelector('.tv-focus');
                if (focusedEl) {
                    if (focusedEl.tagName === 'INPUT') {
                        // FIX: If the search box has text, pressing Enter will now execute the search
                        if (focusedEl.value.trim() !== '') {
                            executeSearch();
                            focusedEl.blur(); // Hides the TV keyboard after searching
                        } else {
                            focusedEl.focus(); // Opens the TV keyboard if the box is empty
                        }
                    } else if (focusedEl.tagName === 'BUTTON' && focusedEl.closest('.search-order')) {
                        executeSearch();
                    } else if (focusedEl.tagName === 'I' || focusedEl.tagName === 'BUTTON') {
                        // Natively triggers openMusicPlayer(this), addToDownloads(this), or button-click
                        focusedEl.click(); 
                    } else {
                        // Executes the main movieView for the card body
                        movieView(focusedEl); 
                    }
                }
            }
        }
    });

    // 5. Instantly disable TV mode on Mobile Touch or Mouse
    const disableTVMode = (e) => {
        if (e.type === 'mousemove' && Math.abs(e.clientX - lastMouseX) <= 10 && Math.abs(e.clientY - lastMouseY) <= 10) return;
        if (e.type === 'mousemove') { lastMouseX = e.clientX; lastMouseY = e.clientY; }

        if (isTVModeActive) {
            isTVModeActive = false;
            const el = document.querySelector('.tv-focus');
            if (el) {
                el.classList.remove('tv-focus');
                const container = el.closest('.cart, .movies');
                if (container && el.tagName !== 'INPUT') container.dispatchEvent(new Event('mouseleave'));
            }
        }
    };

    let lastMouseX = 0, lastMouseY = 0;
    document.addEventListener('mousemove', disableTVMode);
    document.addEventListener('touchstart', disableTVMode, { passive: true });
}






// ==========================================
//   FIRST-TIME USER ONBOARDING TOUR
// ==========================================
function startMovieOnboardingTour() {
    // 1. Create Overlay
    const overlay = document.createElement('div');
    overlay.id = 'tour-overlay';
    document.body.appendChild(overlay);

    // 2. Create Floating Tooltip
    const tooltip = document.createElement('div');
    tooltip.id = 'tour-tooltip';
    tooltip.innerHTML = `
        <h4 style="margin: 0 0 10px 0; color: #8e44ad; font-size: 1.1rem; font-weight: 600;">Welcome to Abin Movie Mirror</h4>
        <p id="tour-text" style="margin: 0 0 15px 0; font-size: 0.95rem; line-height: 1.4; color: #ccc;"></p>
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <span id="tour-counter" style="font-size: 0.8rem; color: gray; font-weight: bold;"></span>
            <button id="tour-next-btn" style="background: white; color: #2a0e3c; border: none; padding: 8px 16px; border-radius: 15px; cursor: pointer; font-weight: bold; font-size: 0.9rem;">Next</button>
        </div>
    `;
    document.body.appendChild(tooltip);

    // 3. Define the Steps based on movie.html elements
    const steps = [
        { 
            selector: '.search-order', 
            text: "Use the search bar to instantly find your favorite movies or songs. Type and press <b>Enter</b>." 
        },
        { 
            id: 'first-cart', 
            text: "Use your <b>Arrow keys</b> on your TV remote or keyboard to browse featured movies. Press <b>OK / Enter</b> to watch." 
        },
        { 
            selector: '.movie-collection .movies #music', 
            text: "Click the <b>Music icon</b> on any movie card to instantly listen to its album." 
        },
        { 
            id: 'jarvis-btn', 
            text: "Long-press <b>OK / Enter</b> on your remote, or click here to activate the AI Voice Assistant." 
        }
    ];

    let currentStep = 0;

    function showStep(index) {
        document.querySelectorAll('.tour-highlight').forEach(el => {
            el.classList.remove('tour-highlight');
        });

        if (index >= steps.length) {
            overlay.remove();
            tooltip.remove();
            localStorage.setItem('hasSeenMovieTour', 'true');
            // Give focus back to the page so the TV engine resumes immediately
            const scrollerItem = document.getElementById('first-cart');
            if (scrollerItem) scrollerItem.focus();
            return;
        }

        const step = steps[index];
        const target = step.id ? document.getElementById(step.id) : document.querySelector(step.selector);

        if (target) {
            target.classList.add('tour-highlight');
            
            // UPGRADE 1: Added `inline: 'center'` to guarantee horizontal scrolling lists are centered perfectly
            target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });

            document.getElementById('tour-text').innerHTML = step.text;
            document.getElementById('tour-counter').innerText = `${index + 1} / ${steps.length}`;
            document.getElementById('tour-next-btn').innerText = index === steps.length - 1 ? "Start Watching" : "Next";

            tooltip.classList.add('active');
            overlay.classList.add('active');

            // UPGRADE 2: Increased timeout to 400ms to let the smooth scrolling fully finish before calculating
            setTimeout(() => {
                const targetRect = target.getBoundingClientRect();
                const tooltipRect = tooltip.getBoundingClientRect();
                const margin = 15; 

                // Determine Vertical Position
                let topPos = targetRect.bottom + margin; 

                if (topPos + tooltipRect.height > window.innerHeight - margin) {
                    topPos = targetRect.top - tooltipRect.height - margin;
                    if (topPos < margin) {
                        topPos = window.innerHeight - tooltipRect.height - margin; 
                    }
                }

                // Determine Horizontal Position
                let leftPos = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);

                if (leftPos < margin) {
                    leftPos = margin; 
                } else if (leftPos + tooltipRect.width > window.innerWidth - margin) {
                    leftPos = window.innerWidth - tooltipRect.width - margin; 
                }

                // Apply coordinates
                tooltip.style.top = `${topPos}px`;
                tooltip.style.left = `${leftPos}px`;
                
            }, 400); // <- This 400ms delay is the secret to perfect positioning on moving containers

        } else {
            showStep(index + 1);
        }
    }

    document.getElementById('tour-next-btn').addEventListener('click', () => {
        showStep(++currentStep);
    });

    // Start tour after skeleton loaders vanish
    setTimeout(() => showStep(0), 1000); 
}

// --- GLOBAL TOUR KEYBOARD INTERCEPTION ---
// By using { capture: true }, this fires BEFORE your Smart TV engine can react, keeping them separated!
document.addEventListener('keydown', (e) => {
    const tooltip = document.getElementById('tour-tooltip');
    if (tooltip && tooltip.classList.contains('active')) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation(); // Stops the TV engine from highlighting or scrolling the page
            const nextBtn = document.getElementById('tour-next-btn');
            if (nextBtn) nextBtn.click();
        }
    }
}, true); 

// === TRIGGER THE TOUR ===
window.addEventListener('load', () => {
    if (!localStorage.getItem('hasSeenMovieTour') && localStorage.getItem('isLoggedIn') === 'true') {
        startMovieOnboardingTour();
    }
});