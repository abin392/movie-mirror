/* ==========================================
   1. AUTHENTICATION & PROFILE AUTO-LOAD
   ========================================== */
document.addEventListener(populateSearchOptions(), () => {
    // Automatically load User Name and Image from localStorage
    const savedName = localStorage.getItem("username");
    const savedImage = localStorage.getItem("profileImage");

    const nameElement = document.getElementById("userName");
    const imageElement = document.getElementById("userImage");

    if (savedName && nameElement) {
        nameElement.textContent = savedName;
    } else if (nameElement) {
        // NEW: Fallback for guests who aren't logged in yet
        nameElement.textContent = "Guest";
    }

    if (savedImage && imageElement) {
        imageElement.src = savedImage;
    }

    // Initialize core page functions
    initializeRevealLogic();
    startAutoScroll();
    //login to view the music page--
    // Add or update this logic in your movie.js
    document.getElementById('music').addEventListener('click', () => {
        // --- LOGIN CHECK ---
        if (localStorage.getItem("isLoggedIn") !== "true" || !localStorage.getItem("username")) {
            // Redirect to login if not authenticated
            window.location.href = "index.html";
            return;
        }
        // -------------------

        // If logged in, proceed to your music/jukebox logic
        window.location.href = 'music-viewer.html'; // Or your specific music page link
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

    const query = rawQuery.toUpperCase().trim();
    if (!query) return; // Do nothing if search is empty

    // 2. Check if the user is searching for a MOVIE
    const allMovies = Array.from(document.querySelectorAll('.movies'));
    const foundMovie = allMovies.find(movie => movie.dataset.title === query);

    if (foundMovie) {
        movieView(foundMovie); // Play the movie
        return;
    }

    // 3. If no movie matched, check if the user is searching for MUSIC/SONG
    let foundMusic = false;

    // Clean the text just like the voice assistant does
    let musicQuery = query.replace(/\b(SONG|SONGS|MUSIC|AUDIO|PLAY)\b/g, '')
        .replace(/\s+/g, ' ')
        .trim();

    // Use the global MUSIC_TRAINING dictionary (from voice-assistant.js) to fix spelling
    if (typeof MUSIC_TRAINING !== 'undefined') {
        for (const [correctName, variants] of Object.entries(MUSIC_TRAINING)) {
            if (variants.includes(musicQuery)) {
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

        // A. Check if they searched for a full Album (e.g., "Dude Songs" -> "DUDE")
        if (movieContainer) {
            const movieTitle = (movieContainer.dataset.title || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
            if (cleanSearchStr && (movieTitle === cleanSearchStr || movieTitle.includes(cleanSearchStr))) {
                localStorage.setItem('targetSongIndex', 0);
                btn.click(); // Triggers the music player redirect
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
                    btn.click(); // Triggers the music player redirect
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

    setTimeout(() => {
        skeleton.style.display = "none";
        real.style.display = "block";

        realSections.forEach((section, index) => {
            section.style.opacity = "0";
            section.style.transform = "translateY(20px)";
            section.style.transition = "opacity 0.5s ease, transform 0.5s ease";

            setTimeout(() => {
                section.style.opacity = "1";
                section.style.transform = "translateY(0)";
            }, index * 300);
        });
    }, 800);
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
   7. DYNAMIC SEARCH AUTOCOMPLETE
   ========================================== */
function populateSearchOptions() {
    const uniqueTitles = new Set(); // Using a Set prevents duplicate suggestions

    // 1. Grab all Movie Titles from data-title
    const movieCards = document.querySelectorAll('.movies');
    movieCards.forEach(card => {
        const title = card.dataset.title;
        if (title && title.trim() !== "") {
            uniqueTitles.add(title.toUpperCase().trim());
        }
    });

    // 2. Grab all Song Titles from the music buttons
    const musicButtons = document.querySelectorAll('i#music');
    musicButtons.forEach(btn => {
        for (let i = 1; i <= 20; i++) {
            const songTitle = btn.dataset[`songtitle${i}`] || btn.dataset[`songTitle${i}`];
            if (songTitle) {
                // Clean up underscores from song names (e.g., "Singari__Dude" -> "SINGARI DUDE")
                const cleanTitle = songTitle.replace(/_+/g, ' ').toUpperCase().trim();
                uniqueTitles.add(cleanTitle);
            }
        }
    });

    // 3. Populate ALL datalists on the page (handles both PC Nav and Mobile search boxes)
    const dataLists = document.querySelectorAll('datalist#search-option');
    dataLists.forEach(dataList => {
        dataList.innerHTML = ''; // Clear the old hardcoded options (DUDE, AMPULI)

        // Sort them alphabetically and create the <option> elements
        Array.from(uniqueTitles).sort().forEach(title => {
            const option = document.createElement('option');
            option.value = title;
            dataList.appendChild(option);
        });
    });
}