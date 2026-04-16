/* ==========================================
   1. AUTHENTICATION & PROFILE AUTO-LOAD
   ========================================== */
// Immediate check for login status
if (localStorage.getItem("isLoggedIn") !== "true" || !localStorage.getItem("username")) {
    window.location.replace("index.html");
}

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
});

/* ==========================================
   2. SEARCH LOGIC
   ========================================== */
function executeSearch() {
    const query = document.getElementById("movieSearchInput").value.toUpperCase().trim();
    const allMovies = document.querySelectorAll('.movies');
    let foundMovie = null;

    allMovies.forEach(movie => {
        if (movie.dataset.title === query) {
            foundMovie = movie;
        }
    });

    if (foundMovie) {
        movieView(foundMovie);
    } else {
        showStyledError("Movie not found! Please check the title.");
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
    // Search Enter Key
    document.getElementById("movieSearchInput")?.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            executeSearch();
        }
    });

    // Hover Trailer Previews
    document.querySelectorAll(".cart").forEach(card => {
        const video = card.querySelector("video");
        if (!video) return;

        card.addEventListener("mouseenter", () => {
            isHoveringCart = true;
            video.currentTime = 0;
            video.play().catch(() => {});
        });

        card.addEventListener("mouseleave", () => {
            isHoveringCart = false;
            video.pause();
            video.currentTime = 0;
        });
    });
}

function movieView(element) {
    const movie = element.closest('.movies');
    const movieData = {
        title: movie.dataset.title,
        video: movie.dataset.link1,
        hero: movie.dataset.name,
        year: movie.dataset.year,
        language: movie.dataset.language,
        image: movie.dataset.img,
        episodes: Array.from({length: 16}, (_, i) => ({
            link: movie.dataset[`link${i+2}`],
            title: movie.dataset[`episode${i+1}`],
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