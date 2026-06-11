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
    loadRecentContent(); // <--- ADD THIS LINE HERE

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

/* ==========================================
   UPDATED: TRAINING LOGIC
   ========================================== */
function trainAssistantFromPage() {
    // Standardize as Arrays to prevent Object/Array collisions
    window.MOVIE_TRAINING = Array.isArray(window.MOVIE_TRAINING) ? window.MOVIE_TRAINING : [];
    window.MUSIC_TRAINING = Array.isArray(window.MUSIC_TRAINING) ? window.MUSIC_TRAINING : [];

    // 1. EXTRACT MOVIES
    const movieElements = document.querySelectorAll(".movie-card, .movie-item, [data-type='movie'], .movies");
    movieElements.forEach(element => {
        const titleText = element.querySelector("h4") ? element.querySelector("h4").innerText : "";
        const dataTitle = element.getAttribute("data-title");

        processAndPushToken(titleText, window.MOVIE_TRAINING);
        if (dataTitle) processAndPushToken(dataTitle, window.MOVIE_TRAINING);
    });

    // 2. EXTRACT SONGS
    const musicButtons = document.querySelectorAll('i#music');
    musicButtons.forEach(btn => {
        for (let i = 1; i <= 20; i++) {
            // Check both camelCase and lowercase dataset attributes
            const songTitle = btn.dataset[`songtitle${i}`] || btn.dataset[`songTitle${i}`];
            if (songTitle) {
                // Clean up underscores from data attributes (e.g., "Oorum_Blood__Dude")
                const cleanTitle = songTitle.replace(/_+/g, ' ');
                processAndPushToken(cleanTitle, window.MUSIC_TRAINING);
            }
        }
    });

    // Remove duplicates
    window.MOVIE_TRAINING = [...new Set(window.MOVIE_TRAINING)];
    window.MUSIC_TRAINING = [...new Set(window.MUSIC_TRAINING)];
}

function processAndPushToken(rawText, targetArray) {
    if (!rawText) return;
    let cleanText = rawText.replace(/\s+/g, ' ').trim().toUpperCase();
    if (cleanText) {
        targetArray.push(cleanText);
    }
}

/* ==========================================
   UPDATED: SEARCH LOGIC
   ========================================== */
// Now accepts an optional parameter so your voice script can pass transcripts directly
function executeSearch(voiceQuery = null) {
    closeSearchFocus();

    let rawQuery = "";

    // 1. Determine Source (Voice vs. Typed)
    if (voiceQuery && typeof voiceQuery === 'string') {
        rawQuery = voiceQuery;
    } else {
        const inputs = document.querySelectorAll('input[type="search"]');
        inputs.forEach(input => {
            if (input.value.trim() !== "") rawQuery = input.value;
        });
    }

    let query = rawQuery.toUpperCase().trim();
    if (!query) return;

    // 2. Movie Search
    const allMovies = Array.from(document.querySelectorAll('.movies'));
    const foundMovie = allMovies.find(movie => {
        const title = (movie.dataset.title || "").toUpperCase().trim();
        return title === query || title.includes(query);
    });

    if (foundMovie) {
        movieView(foundMovie);
        return;
    }

    // 3. Aggressive Music Search cleanup
    // Strips "PLAYING", "PLAY", "SONG" so "playing oorum blood song" becomes "OORUM BLOOD"
    let musicQuery = query.replace(/\b(PLAYING|PLAY|SONG|SONGS|MUSIC|AUDIO)\b/g, '').replace(/\s+/g, ' ').trim();
    const cleanSearchStr = musicQuery.replace(/[^A-Z0-9]/g, "");

    if (!cleanSearchStr) return; // Prevent empty searches

    let foundMusic = false;
    const musicButtons = document.querySelectorAll('i#music');

    for (let btn of musicButtons) {
        const data = btn.dataset;

        for (let i = 1; i <= 20; i++) {
            const titleVal = data[`songtitle${i}`] || data[`songTitle${i}`];
            if (titleVal) {
                // Remove underscores and special chars for a pure alphanumeric match
                const cleanTitle = titleVal.toUpperCase().replace(/[^A-Z0-9]/g, "");

                if (cleanTitle.includes(cleanSearchStr) || cleanSearchStr.includes(cleanTitle)) {
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

    // Smart matching for Hero Scroller Carts
    if (movie.classList.contains('cart')) {
        const heroTitle = movie.querySelector('h2')?.innerText.trim().toUpperCase();
        const actualDataCard = Array.from(document.querySelectorAll('.movies')).find(card =>
            card.dataset.title && card.dataset.title.toUpperCase().trim() === heroTitle
        );
        if (actualDataCard) {
            movie = actualDataCard;
        } else {
            showStyledError("Full movie data not found for: " + (heroTitle || "Unknown"));
            return;
        }
    }

    const title = movie.dataset.title || movie.querySelector('h2')?.innerText || "Unknown";

    // --- NEW: Check if this movie is already in recents to resume progress ---
    let recentMovies = JSON.parse(localStorage.getItem('recentMovies')) || [];
    let existingRecent = recentMovies.find(m => m.title === title);

    const movieData = {
        title: title,
        video: movie.dataset.link1 || "",
        hero: movie.dataset.name || "",
        year: movie.dataset.year || "",
        language: movie.dataset.language || "",
        image: movie.dataset.img || movie.querySelector('img')?.src || "",
        episodes: Array.from({ length: 16 }, (_, i) => ({
            link: movie.dataset[`link${i + 2}`],
            title: movie.dataset[`episode${i + 1}`],
            time: movie.dataset[`time${i === 0 ? '' : i + 1}`]
        })),
        // --- NEW: Carry over the exact episode they were on, or default to the main video ---
        lastPlayedLink: existingRecent?.lastPlayedLink || movie.dataset.link1 || "",
        lastPlayedTitle: existingRecent?.lastPlayedTitle || title,
        currentTime: existingRecent?.currentTime || 0, // <--- ADDED
        duration: existingRecent?.duration || 0        // <--- ADDED
    };

    localStorage.setItem('selectedMovie', JSON.stringify(movieData));

    // Update Recent Movies Array
    recentMovies = recentMovies.filter(m => m.title !== movieData.title);
    recentMovies.unshift(movieData);
    if (recentMovies.length > 15) recentMovies.pop();
    localStorage.setItem('recentMovies', JSON.stringify(recentMovies));

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

        const collections = document.querySelectorAll('.movie-collection');
        collections.forEach(collection => {
            // Only map items if the collection section is actually visible
            if (collection.style.display !== 'none') {

                // 1. Map the new "Play All" button as its own row above the cards
                const playAllBtn = collection.querySelector('#play-all-recent-songs');
                if (playAllBtn) {
                    navGrid.push([playAllBtn]);
                }

                // 2. Map the movie/song cards
                const container = collection.querySelector('.movie-container');
                if (container) {
                    const movies = Array.from(container.querySelectorAll('.movies'));
                    if (movies.length > 0) navGrid.push(movies);
                }
            }
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
        else if (currentInner === 'icon-remove') newEl = cell.querySelector('.remove-recent-icon') || cell; // <--- ADD THIS LINE

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
        } else if (newEl.id === 'play-all-recent-songs') {
            // NEW: Center the container perfectly when the Play All button is focused
            const parentSection = newEl.closest('.movie-collection');
            if (parentSection) {
                parentSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                newEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            // Changed here as well for fallback elements
            newEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        }

        if (newEl.tagName === 'INPUT') {
            newEl.focus();
        } else {
            if (document.activeElement && document.activeElement.tagName === 'INPUT') {
                document.activeElement.blur();

                // --- YOUR EXISTING FIX ---
                const openDropdowns = document.querySelectorAll('.custom-dropdown');
                openDropdowns.forEach(dropdown => dropdown.style.display = 'none');

                closeSearchFocus(); // <--- ADD THIS LINE HERE
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
        // ADDED ' ' (Space) to the allowed keys array
        const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', ' '];
        if (!keys.includes(e.key)) return;

        // Handle Smart TV logic when inside the Search Box
        if (document.activeElement && document.activeElement.id === 'movieSearchInput') {
            const dropdown = document.querySelector('.custom-dropdown');
            if (dropdown && dropdown.style.display === 'block' && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
                return;
            }
            // CRITICAL: Allow Left/Right, and ALLOW SPACE so they can type multi-word searches!
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === ' ') return;
        }

        // TRIGGER FOR BOTH ENTER AND SPACE
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); // Stops the Spacebar from scrolling the page down
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
        // D-PAD LOGIC
        if (e.key === 'ArrowDown') {
            // ADDED icon-remove to this check
            if (currentInner === 'icon-music' || currentInner === 'icon-dl' || currentInner === 'icon-remove') {
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
                // ADDED .remove-recent-icon to the detection condition
            } else if (currentInner === 'main' && (cell.querySelector('#music') || cell.querySelector('#movie-dots') || cell.querySelector('.remove-recent-icon'))) {

                // ADDED routing logic to focus the specific icon
                if (cell.querySelector('.remove-recent-icon')) {
                    currentInner = 'icon-remove';
                } else {
                    currentInner = cell.querySelector('#movie-dots') ? 'icon-dl' : 'icon-music';
                }
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
        // TRIGGER EXECUTION FOR BOTH ENTER AND SPACE
        if (e.key === 'Enter' || e.key === ' ') {
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
                        // ONLY Enter should trigger the search query (Space just typed a space)
                        if (e.key === 'Enter') {
                            if (focusedEl.value.trim() !== '') {
                                executeSearch();
                                focusedEl.blur();
                            } else {
                                focusedEl.focus();
                            }
                        }
                    } else if (focusedEl.tagName === 'BUTTON' && focusedEl.closest('.search-order')) {
                        executeSearch();
                    } else if (focusedEl.tagName === 'I' || focusedEl.tagName === 'BUTTON') {
                        focusedEl.click();
                    } else if (focusedEl.closest('#recent-movies-section') || focusedEl.closest('#recent-songs-section')) {
                        // NEW FIX: Safely trigger the inline click event for recent dynamically generated cards
                        focusedEl.click();
                    } else {
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
            selector: '.movie-collection .movies #movie-dots', // <--- NEW DOWNLOAD STEP
            text: "Click the <b>Download icon</b> on any movie card to securely save the movie or its soundtrack directly to your device!"
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





/* ==========================================
   10. SEARCH BOX FOCUS (CENTER & BLUR LOGIC)
========================================== */
document.addEventListener("DOMContentLoaded", () => {
    const blurOverlay = document.createElement('div');
    blurOverlay.id = 'search-blur-overlay';
    document.body.appendChild(blurOverlay);

    const searchInput = document.getElementById('movieSearchInput');
    const searchBox = document.querySelector('.search-box');
    const navBar = document.querySelector('nav'); // <--- Select the Nav

    if (searchInput && searchBox && navBar) {
        searchInput.addEventListener('focus', () => {
            blurOverlay.classList.add('active');
            searchBox.classList.add('active-center');
            navBar.classList.add('search-active'); // <--- Elevates the Nav
        });

        blurOverlay.addEventListener('click', closeSearchFocus);
    }
});

function closeSearchFocus() {
    const blurOverlay = document.getElementById('search-blur-overlay');
    const searchBox = document.querySelector('.search-box');
    const searchInput = document.getElementById('movieSearchInput');
    const dropdown = document.querySelector('.custom-dropdown');
    const navBar = document.querySelector('nav'); // <--- Select the Nav

    if (blurOverlay) blurOverlay.classList.remove('active');
    if (searchBox) searchBox.classList.remove('active-center');
    if (navBar) navBar.classList.remove('search-active'); // <--- Restores the Nav
    if (searchInput) searchInput.blur();
    if (dropdown) dropdown.style.display = 'none';
}



/* ==========================================
   ENHANCED DOWNLOAD MODAL LOGIC (MOVIE & SONG)
========================================== */
function addToDownloads(element) {
    // Prevent the click from opening the movie viewing page
    if (event) event.stopPropagation();

    // Get the main card container
    const movieCard = element.closest('.movies') || element.closest('.cart');
    if (!movieCard) return;

    // Extract necessary data dynamically
    const title = movieCard.dataset.title || movieCard.querySelector('h2')?.innerText || "Unknown Movie";
    const image = movieCard.dataset.img || movieCard.querySelector('img')?.src || "";
    const musicIcon = movieCard.querySelector('#music'); // Used to grab song links

    // Trigger the centered visual modal
    showDownloadModal(movieCard, musicIcon, title, image);
}

function showDownloadModal(movieCard, musicIcon, title, image) {
    // Clean up any existing modal to prevent duplicates
    const existingModal = document.getElementById('download-choice-modal');
    if (existingModal) existingModal.remove();

    // Check if this specific movie actually has songs available
    let hasSongs = false;
    if (musicIcon) {
        for (let i = 1; i <= 20; i++) {
            if (musicIcon.dataset[`song${i}`]) hasSongs = true;
        }
    }

    // 1. Create the blurred, centered overlay
    const overlay = document.createElement('div');
    overlay.id = 'download-choice-modal';
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(11, 5, 16, 0.85); backdrop-filter: blur(10px);
        z-index: 10050; display: flex; align-items: center; justify-content: center;
        opacity: 0; transition: opacity 0.3s ease;
    `;

    // 2. Create the Modal Box
    const modalBox = document.createElement('div');
    modalBox.style.cssText = `
        background: linear-gradient(135deg, #2a0e3c, #111);
        padding: 30px; border-radius: 20px; border: 1px solid #8e44ad;
        text-align: center; color: white; width: 90%; max-width: 350px;
        box-shadow: 0 15px 40px rgba(0,0,0,0.6); transform: translateY(20px);
        transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;

    // 3. Populate Modal HTML
    modalBox.innerHTML = `
        <h3 style="margin-top: 0; color: #fff; font-family: 'Poppins', sans-serif;">Download Asset</h3>
        <p style="color: #ccc; font-size: 14px; margin-bottom: 25px; font-family: 'Poppins', sans-serif;">What would you like to download for<br><b style="color:#00ff88;">${title}</b>?</p>
        <div style="display: flex; flex-direction: column; gap: 15px;">
            <button id="btn-dl-movie" style="background: #8e44ad; color: white; border: none; padding: 12px; border-radius: 10px; font-weight: bold; font-family: 'Poppins', sans-serif; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: all 0.3s ease;">
                <i class="fas fa-film"></i> Movie Download
            </button>
            ${hasSongs ? `
            <button id="btn-dl-song" style="background: #00ff88; color: #111; border: none; padding: 12px; border-radius: 10px; font-weight: bold; font-family: 'Poppins', sans-serif; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: all 0.3s ease;">
                <i class="fas fa-music"></i> Song Download
            </button>
            ` : ''}
            <button id="btn-dl-cancel" style="background: transparent; color: #aaa; border: 1px solid rgba(255,255,255,0.2); padding: 10px; border-radius: 10px; font-weight: bold; font-family: 'Poppins', sans-serif; cursor: pointer; transition: all 0.3s ease;">
                Cancel
            </button>
        </div>
    `;

    overlay.appendChild(modalBox);
    document.body.appendChild(overlay);

    // Apply smooth hover styling dynamically
    const applyHover = (btn, bgHover, colorHover) => {
        if (!btn) return;
        const originalBg = btn.style.background;
        const originalColor = btn.style.color;
        btn.onmouseenter = () => { btn.style.background = bgHover; btn.style.color = colorHover; };
        btn.onmouseleave = () => { btn.style.background = originalBg; btn.style.color = originalColor; };
    };
    applyHover(document.getElementById('btn-dl-movie'), '#a24be3', 'white');
    if (hasSongs) applyHover(document.getElementById('btn-dl-song'), '#33ff9f', 'black');
    applyHover(document.getElementById('btn-dl-cancel'), 'rgba(255,255,255,0.1)', 'white');

    // Reveal Animation
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        modalBox.style.transform = 'translateY(0)';
    });

    // Close Modal Logic
    const close = () => {
        overlay.style.opacity = '0';
        modalBox.style.transform = 'translateY(20px)';
        setTimeout(() => overlay.remove(), 300);
    };

    // Button Triggers
    document.getElementById('btn-dl-cancel').onclick = close;

    document.getElementById('btn-dl-movie').onclick = () => {
        processMovieDownload(movieCard, title, image);
        close();
    };

    if (hasSongs) {
        document.getElementById('btn-dl-song').onclick = () => {
            processSongDownload(musicIcon, title, image);
            close();
        };
    }
}

// 4. Extracts ALL Movie links and pushes them to download.html
function processMovieDownload(movieCard, title, image) {
    let downloads = JSON.parse(localStorage.getItem("downloads")) || [];
    let addedAnyLink = false;

    // Process main telegram link if present
    if (movieCard.dataset.link) {
        const isDuplicate = downloads.some(d => d.link === movieCard.dataset.link);
        if (!isDuplicate) {
            downloads.push({ title: title + " (Main Link)", image, link: movieCard.dataset.link, downloaded: false });
            addedAnyLink = true;
        }
    }

    // Process all episodes dynamically (data-link1 through data-link20)
    for (let i = 1; i <= 20; i++) {
        const link = movieCard.dataset[`link${i}`];
        const epTitle = movieCard.dataset[`episode${i}`] || `Episode ${i}`;
        if (link) {
            const isDuplicate = downloads.some(d => d.link === link);
            if (!isDuplicate) {
                downloads.push({ title: `${title} - ${epTitle}`, image, link, downloaded: false });
                addedAnyLink = true;
            }
        }
    }

    if (!addedAnyLink) {
        alert("No movie download links found for this item, or they are already in your downloads list!");
        return;
    }

    // Save and Automatically transfer user to download.html
    localStorage.setItem("downloads", JSON.stringify(downloads));
    window.location.href = "download.html";
}

// 5. Extracts ALL Song links and pushes them to download.html
function processSongDownload(musicIcon, title, image) {
    let downloads = JSON.parse(localStorage.getItem("downloads")) || [];
    let addedAnyLink = false;

    // Process all songs dynamically (data-song1 through data-song20)
    for (let i = 1; i <= 20; i++) {
        const songLink = musicIcon.dataset[`song${i}`];
        const songTitle = musicIcon.dataset[`songTitle${i}`] || musicIcon.dataset[`songtitle${i}`] || `Song ${i}`;
        if (songLink) {
            const isDuplicate = downloads.some(d => d.link === songLink);
            if (!isDuplicate) {
                downloads.push({ title: `${title} - ${songTitle}`, image, link: songLink, downloaded: false });
                addedAnyLink = true;
            }
        }
    }

    if (!addedAnyLink) {
        alert("No song download links found, or they are already in your downloads list!");
        return;
    }

    // Save and Automatically transfer user to download.html
    localStorage.setItem("downloads", JSON.stringify(downloads));
    window.location.href = "download.html";
}



/* ==========================================
   DOWNLOAD MODAL - SMART TV & KEYBOARD CONTROL (FIXED)
========================================== */
// 1. Trap Arrow Keys & Escape on KEYDOWN for smooth UI movement
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('download-choice-modal');
    if (!modal) return;

    const keys = ['ArrowUp', 'ArrowDown', 'Enter', ' ', 'Escape'];
    if (!keys.includes(e.key)) return;

    // Block the background movie grid from scrolling
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    // Quick Escape Support
    if (e.key === 'Escape') {
        const cancelBtn = document.getElementById('btn-dl-cancel');
        if (cancelBtn) cancelBtn.click();
        return;
    }

    const buttons = Array.from(modal.querySelectorAll('button'));
    if (buttons.length === 0) return;

    let currentIndex = buttons.findIndex(btn => btn.classList.contains('modal-tv-focus'));

    // Handle Up / Down Arrows
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        if (currentIndex !== -1) {
            buttons[currentIndex].classList.remove('modal-tv-focus');
            buttons[currentIndex].style.outline = "none";
            buttons[currentIndex].style.transform = "scale(1)";
        }

        if (e.key === 'ArrowDown') {
            currentIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % buttons.length;
        } else if (e.key === 'ArrowUp') {
            currentIndex = currentIndex === -1 ? buttons.length - 1 : (currentIndex - 1 + buttons.length) % buttons.length;
        }

        const focusedBtn = buttons[currentIndex];
        focusedBtn.classList.add('modal-tv-focus');
        focusedBtn.style.outline = "3px solid #00ff88"; // Neon green highlight
        focusedBtn.style.outlineOffset = "4px";
        focusedBtn.style.transform = "scale(1.05)";
    }
}, true); // 'true' forces this to run BEFORE your background movie grid

// 2. Trap Enter and Space on KEYUP to execute clicks safely (Prevents Ghost Clicks)
document.addEventListener('keyup', (e) => {
    const modal = document.getElementById('download-choice-modal');
    if (!modal) return;

    const keys = ['Enter', ' '];
    if (!keys.includes(e.key)) return;

    // Swallow the event so the background movie card doesn't re-open the modal
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    const buttons = Array.from(modal.querySelectorAll('button'));
    let currentIndex = buttons.findIndex(btn => btn.classList.contains('modal-tv-focus'));

    // Click the highlighted button, or default to the top button if none are highlighted
    if (currentIndex !== -1) {
        buttons[currentIndex].click();
    } else {
        buttons[0].click();
    }
}, true);


/* ==========================================
   DYNAMIC RECENTLY WATCHED / PLAYED LOADER
========================================== */
function loadRecentContent() {
    // --- LOAD RECENT MOVIES ---
    const recentMovies = JSON.parse(localStorage.getItem('recentMovies')) || [];
    const moviesSection = document.getElementById('recent-movies-section');
    const moviesContainer = document.getElementById('recent-movies-container');

    if (moviesSection && moviesContainer) {
        if (recentMovies.length > 0) {
            moviesContainer.innerHTML = '';
            
            recentMovies.forEach(movie => {
                const div = document.createElement('div');
                div.className = 'movies';

                // Show a neon green subtitle if they are on a specific episode
                const subTitle = (movie.lastPlayedTitle && movie.lastPlayedTitle !== movie.title)
                    ? `<p style="color:#00ff88; font-size:0.75rem; margin:-5px 0 10px 0; width:100%; text-align:center; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${movie.lastPlayedTitle}</p>`
                    : ``;

                // Calculate and inject progress bar
                const percentage = (movie.currentTime && movie.duration) ? Math.min((movie.currentTime / movie.duration) * 100, 100) : 0;
                const progressHTML = (percentage > 0) ? `
                    <div style="width: 100%; height: 4px; background: rgba(255,255,255,0.2); border-radius: 2px; margin-top: -5px; margin-bottom: 10px; overflow: hidden; pointer-events: none;">
                        <div style="width: ${percentage}%; height: 100%; background: #00ff88; box-shadow: 0 0 5px rgba(0, 255, 136, 0.5);"></div>
                    </div>
                ` : '';

                div.innerHTML = `
                    <i class="fas fa-times remove-recent-icon" onclick="removeRecentItem(event, 'movie', '${movie.title.replace(/'/g, "\\'")}')"></i>
                    <img src="${movie.image}" alt="${movie.title}" loading="lazy" style="pointer-events: none;">
                    <h4>${movie.title}</h4>
                    ${subTitle}
                    ${progressHTML}
                    <button style="pointer-events: none;">Resume</button>
                `;

                div.onclick = function () {
                    let currentRecents = JSON.parse(localStorage.getItem('recentMovies')) || [];
                    currentRecents = currentRecents.filter(m => m.title !== movie.title);
                    currentRecents.unshift(movie);
                    localStorage.setItem('recentMovies', JSON.stringify(currentRecents));

                    localStorage.setItem('selectedMovie', JSON.stringify(movie));
                    window.location.href = 'movie-view.html';
                };
                moviesContainer.appendChild(div);
            });
            moviesSection.style.display = 'block'; // Reveal the container
        } else {
            // NEW: Instantly hide the container if the list is empty
            moviesContainer.innerHTML = '';
            moviesSection.style.display = 'none'; 
        }
    }

    // --- LOAD RECENT SONGS ---
    const recentSongs = JSON.parse(localStorage.getItem('recentSongs')) || [];
    const songsSection = document.getElementById('recent-songs-section');
    const songsContainer = document.getElementById('recent-songs-container');
    const playAllRecentBtn = document.getElementById('play-all-recent-songs');

    if (songsSection && songsContainer) {
        if (recentSongs.length > 0) {
            // Play All Button Logic
            if (playAllRecentBtn) {
                playAllRecentBtn.onclick = function (e) {
                    e.stopPropagation(); 
                    const completePlaylist = recentSongs.map(s => ({
                        title: s.title,
                        url: s.url,
                        image: s.image
                    }));
                    localStorage.setItem('currentPlaylist', JSON.stringify(completePlaylist));
                    localStorage.setItem('targetSongIndex', 0); 
                    window.location.href = 'music-viewer.html';
                };
            }
            
            songsContainer.innerHTML = '';
            recentSongs.forEach(song => {
                const div = document.createElement('div');
                div.className = 'movies'; 
                div.innerHTML = `
                    <i class="fas fa-times remove-recent-icon" onclick="removeRecentItem(event, 'song', '${song.url}')"></i>
                    <img src="${song.image}" alt="${song.title}" loading="lazy" style="pointer-events: none;">
                    <h4>${song.title}</h4>
                    <button style="pointer-events: none;">Play</button>
                `;
                
                div.onclick = function () {
                    let currentRecents = JSON.parse(localStorage.getItem('recentSongs')) || [];
                    currentRecents = currentRecents.filter(s => s.url !== song.url);
                    currentRecents.unshift(song);
                    localStorage.setItem('recentSongs', JSON.stringify(currentRecents));

                    const playlist = [{ title: song.title, url: song.url, image: song.image }];
                    localStorage.setItem('currentPlaylist', JSON.stringify(playlist));
                    localStorage.setItem('targetSongIndex', 0);
                    window.location.href = 'music-viewer.html';
                };
                songsContainer.appendChild(div);
            });
            songsSection.style.display = 'block'; // Reveal the container
            
            // Re-show the Play All button if it was previously hidden
            if (playAllRecentBtn) playAllRecentBtn.style.display = 'flex';
        } else {
            // NEW: Instantly hide the container and Play All button if the list is empty
            songsContainer.innerHTML = '';
            songsSection.style.display = 'none'; 
            if (playAllRecentBtn) playAllRecentBtn.style.display = 'none';
        }
    }
}


/* ==========================================
   REMOVE RECENT ITEMS LOGIC
========================================== */
window.removeRecentItem = function (e, type, key) {
    e.stopPropagation(); // Stops the movie/song from playing when you click delete

    if (type === 'movie') {
        let currentRecents = JSON.parse(localStorage.getItem('recentMovies')) || [];
        currentRecents = currentRecents.filter(m => m.title !== key);
        localStorage.setItem('recentMovies', JSON.stringify(currentRecents));
    } else if (type === 'song') {
        let currentRecents = JSON.parse(localStorage.getItem('recentSongs')) || [];
        currentRecents = currentRecents.filter(s => s.url !== key);
        localStorage.setItem('recentSongs', JSON.stringify(currentRecents));
    }

    // Instantly refresh the UI
    loadRecentContent();
};





/* ==========================================
   UNIVERSAL JSON LOADER FOR ALL CATEGORIES
========================================== */
async function loadMovieCategory(jsonFileName, containerId) {
    try {
        const response = await fetch(jsonFileName);
        const moviesData = await response.json();
        const container = document.getElementById(containerId);
        
        if (!container) return;
        
        container.innerHTML = ''; // Clear loading state

        moviesData.forEach(data => {
            const movieDiv = document.createElement('div');
            movieDiv.className = 'movies';

            // 1. Inject Movie Attributes
            for (const [key, value] of Object.entries(data.movieAttributes)) {
                movieDiv.setAttribute(key, value);
            }

            // 2. Build Download Icon
            const downloadIcon = document.createElement('i');
            downloadIcon.className = 'fas fa-download';
            downloadIcon.id = 'movie-dots';
            downloadIcon.setAttribute('onclick', 'addToDownloads(this)');
            movieDiv.appendChild(downloadIcon);

            // 3. Build Music Icon
            if (data.songAttributes && Object.keys(data.songAttributes).length > 0) {
                const musicIcon = document.createElement('i');
                musicIcon.className = 'fas fas fa-music';
                musicIcon.id = 'music';
                musicIcon.setAttribute('onclick', 'openMusicPlayer(this)');
                
                for (const [key, value] of Object.entries(data.songAttributes)) {
                    musicIcon.setAttribute(key, value);
                }
                movieDiv.appendChild(musicIcon);
            }

            // 4. Build Image
            const img = document.createElement('img');
            img.src = data.movieAttributes['data-img'];
            img.setAttribute('onclick', 'movieView(this)');
            img.setAttribute('alt', data.movieAttributes['data-title'] || 'Movie Poster');
            img.setAttribute('loading', 'lazy');
            movieDiv.appendChild(img);

            // 5. Build Title
            const h4 = document.createElement('h4');
            h4.textContent = data.movieAttributes['data-title'] || 'Unknown Title';
            movieDiv.appendChild(h4);

            // 6. Build Watch Button
            const btn = document.createElement('button');
            btn.setAttribute('onclick', 'movieView(this)');
            btn.textContent = 'Watch';
            movieDiv.appendChild(btn);

            container.appendChild(movieDiv);
        });
        
        return true; // Signal completion
    } catch (error) {
        console.error(`JSON Engine Error: Failed to load ${jsonFileName}`, error);
        return false;
    }
}

/* ==========================================
   INITIALIZE ALL COLLECTIONS ON LOAD
========================================== */
document.addEventListener("DOMContentLoaded", async () => {
    // Run all fetches in parallel for maximum loading speed
    await Promise.all([
        loadMovieCategory('Top tamil movies.json', 'top-tamil-movies-container'),
        loadMovieCategory('Top hindi movies.json', 'top-hindi-movies-container'),
    //=====>>>>//loadMovieCategory('Top tamil horror movies.json', 'top-tamil-horror-movies-container'),
        // Add your other JSON files here as you create them:
        // loadMovieCategory('Top malaiyalam movies.json', 'top-malaiyalam-movies-container'),
        // loadMovieCategory('Top english movies.json', 'top-english-movies-container')
    ]);

    // ==========================================
    // CRITICAL SYNC: Re-train Global Systems
    // ==========================================
    // Fire this only AFTER all JSON data is completely painted on the screen
    setTimeout(() => {
        if (typeof trainAssistantFromPage === 'function') trainAssistantFromPage();
        if (typeof populateSearchOptions === 'function') populateSearchOptions();
        if (typeof refreshGrid === 'function') refreshGrid(); // Re-index TV Grid
    }, 800);
});