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
        // Fallback for guests who aren't logged in yet
        nameElement.textContent = "Guest";
    }

    if (savedImage && imageElement) {
        imageElement.src = savedImage;
    }

    // --- ONLY CALL THESE ONCE ---
    initializeRevealLogic();
    startAutoScroll();
    setupEventListeners();

    // Safely trigger the Custom Search Dropdown
    if (typeof populateSearchOptions === "function") {
        populateSearchOptions();
    }

    // Login check to view the music page (Applies to ALL music buttons)
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
    // Automatically load User Name and Image from localStorage
    const savedName = localStorage.getItem("username");
    const savedImage = localStorage.getItem("profileImage");

    const nameElement = document.getElementById("userName");
    const imageElement = document.getElementById("userImage");

    if (savedName && nameElement) {
        nameElement.textContent = savedName;
    }

    if (savedImage && imageElement) {
        imageElement.src = savedImage;
    }

    // Initialize core page functions
    initializeRevealLogic();
    startAutoScroll();
    setupEventListeners();

    // --- NEW: Generate Search Box Suggestions ---
    populateSearchOptions();
});

/* ==========================================
   2. SEARCH LOGIC (MOVIES & MUSIC)
   ========================================== */
function executeSearch() {
    // 1. Safely get the typed text from EITHER the PC or Mobile search box
    const inputs = document.querySelectorAll('input[type="search"]');
    let rawQuery = "";
    inputs.forEach(input => {
        if (input.value.trim() !== "") rawQuery = input.value;
    });

    let query = rawQuery.toUpperCase().trim();
    if (!query) return; // Do nothing if search is empty

    // --- NEW: Case-Insensitive Movie Auto-Correct ---
    if (typeof MOVIE_TRAINING !== 'undefined') {
        for (const [correctName, variants] of Object.entries(MOVIE_TRAINING)) {
            // Converts your dictionary words to uppercase on-the-fly to prevent case mismatches!
            if (variants.some(variant => variant.toUpperCase() === query)) {
                query = correctName;
                break;
            }
        }
    }
    // ------------------------------------------------

    // 2. Check if the user is searching for a MOVIE
    const allMovies = Array.from(document.querySelectorAll('.movies'));
    const foundMovie = allMovies.find(movie => movie.dataset.title === query);

    if (foundMovie) {
        movieView(foundMovie); // Play the movie
        return;
    }

    // 3. If no movie matched, check if the user is searching for MUSIC/SONG
    let foundMusic = false;

    let musicQuery = query.replace(/\b(SONG|SONGS|MUSIC|AUDIO|PLAY)\b/g, '')
        .replace(/\s+/g, ' ')
        .trim();

    // --- NEW: Case-Insensitive Music Auto-Correct ---
    if (typeof MUSIC_TRAINING !== 'undefined') {
        for (const [correctName, variants] of Object.entries(MUSIC_TRAINING)) {
            if (variants.some(variant => variant.toUpperCase() === musicQuery)) {
                musicQuery = correctName; 
                break;
            }
        }
    }
    // ------------------------------------------------

    const cleanSearchStr = musicQuery.replace(/[^A-Z0-9]/g, "");
    const musicButtons = document.querySelectorAll('i#music');

    for (let btn of musicButtons) {
        const data = btn.dataset;
        const movieContainer = btn.closest('.movies');

        // A. Check if they searched for a full Album
        if (movieContainer) {
            const movieTitle = (movieContainer.dataset.title || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
            if (cleanSearchStr && (movieTitle === cleanSearchStr || movieTitle.includes(cleanSearchStr))) {
                localStorage.setItem('targetSongIndex', 0);
                btn.click(); 
                foundMusic = true;
                break;
            }
        }

        // B. Check if they searched for a Specific Song Track
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

    // 4. If neither a movie nor a song was found
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

    // Reduced initial delay from 800ms to 300ms
    setTimeout(() => {
        skeleton.style.display = "none";
        real.style.display = "block";

        realSections.forEach((section, index) => {
            section.style.opacity = "0";
            section.style.transform = "translateY(20px)";
            section.style.transition = "opacity 0.4s ease, transform 0.4s ease";

            // Reduced stagger delay from 300ms to 80ms! Content loads instantly now.
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

    clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(() => {
        if (isHoveringCart) return;

        scrollIndex++;
        if (scrollIndex >= carts.length) scrollIndex = 0;

        const cart = carts[scrollIndex];
        const cartRect = cart.getBoundingClientRect();
        const scrollerRect = scroller.getBoundingClientRect();
        const target = scroller.scrollLeft + (cartRect.left + cartRect.width / 2) - (scrollerRect.left + scrollerRect.width / 2);

        scroller.scrollTo({ left: target, behavior: 'smooth' });
    }, 5000);
}

/* ==========================================
   5. EVENT LISTENERS & UTILITIES
   ========================================== */
function setupEventListeners() {
    // --- UPDATED: Attach Enter key to ALL search boxes (PC & Mobile) ---
    const searchInputs = document.querySelectorAll('input[type="search"]');
    searchInputs.forEach(input => {
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                e.preventDefault(); // Stop the page from reloading
                executeSearch();    // Trigger the movie & music search logic

                // Optional: Hide the keyboard on mobile after pressing Enter
                input.blur();
            }
        });
    });

    // Hover Trailer Previews (Your existing logic)
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
    //login to view movie page--
    // --- NEW LOGIC: Check if logged in before proceeding ---
    if (localStorage.getItem("isLoggedIn") !== "true" || !localStorage.getItem("username")) {
        // If not logged in, redirect them to the login page
        window.location.href = "index.html";
        return; // Stop the rest of the function from running
    }
    // -------------------------------------------------------

    // Your existing logic remains completely unchanged below this line
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
// --- NEW: Clear search boxes when returning to the page (Back Button) ---
window.addEventListener('pageshow', (event) => {
    // This runs every time the page is shown, including when using the Back button
    const searchInputs = document.querySelectorAll('input[type="search"]');
    searchInputs.forEach(input => {
        input.value = ''; // Instantly clear the text
    });
});


/* ==========================================
   7. DYNAMIC SEARCH AUTOCOMPLETE (CUSTOM & TV READY)
========================================== */
let availableSearchTerms = [];

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function populateSearchOptions() {
    try {
        const uniqueTitles = new Set(); 

        // Grab all Movie Titles
        const movieCards = document.querySelectorAll('.movies');
        movieCards.forEach(card => {
            const title = card.dataset.title;
            if (title && title.trim() !== "") uniqueTitles.add(title.toUpperCase().trim());
        });

        // Grab all Song Titles
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

        // Setup Custom Dropdowns for all search inputs
        const searchInputs = document.querySelectorAll('input[type="search"]');
        
        searchInputs.forEach(input => {
            input.removeAttribute('list');
            input.setAttribute('autocomplete', 'off');

            const dropdown = document.createElement('div');
            dropdown.className = 'custom-dropdown';
            input.parentElement.appendChild(dropdown);

            let currentFocus = -1; // Tracks which option is highlighted via keyboard/remote

            // 1. When the user TYPES
            input.addEventListener('input', function() {
                const val = this.value.toUpperCase().trim();
                dropdown.innerHTML = ''; 
                currentFocus = -1; // Reset focus on new input

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

            // 2. NEW: PC Keyboard & Smart TV Remote Navigation
            input.addEventListener('keydown', function(e) {
                const options = dropdown.querySelectorAll('.custom-option');
                if (!options || options.length === 0) return;

                if (e.keyCode === 40) { // Arrow Down (PC or TV Remote)
                    e.preventDefault(); // Stop cursor from moving in input box
                    currentFocus++;
                    addActive(options);
                } else if (e.keyCode === 38) { // Arrow Up (PC or TV Remote)
                    e.preventDefault();
                    currentFocus--;
                    addActive(options);
                } else if (e.keyCode === 13) { // Enter / OK Button
                    // If dropdown is open and an item is highlighted, select it!
                    if (currentFocus > -1 && dropdown.style.display === 'block') {
                        e.preventDefault(); 
                        options[currentFocus].click(); 
                    }
                    // If no item is highlighted, your existing setupEventListeners handles the normal search.
                }
            });

            // Helper function to add highlight and scroll
            function addActive(options) {
                removeActive(options);
                if (currentFocus >= options.length) currentFocus = 0; // Loop to top
                if (currentFocus < 0) currentFocus = (options.length - 1); // Loop to bottom
                
                const activeOption = options[currentFocus];
                activeOption.classList.add("active");
                
                // Keeps the highlighted item visible by auto-scrolling the dropdown
                activeOption.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }

            // Helper function to remove highlights
            function removeActive(options) {
                options.forEach(opt => opt.classList.remove("active"));
            }

            // Close dropdown on outside click
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