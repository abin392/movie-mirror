// Function to load and display user profile data
window.addEventListener("DOMContentLoaded", () => {
    const storedName = localStorage.getItem("userName");
    const storedImage = localStorage.getItem("userImage");

    if (storedName) {
        document.getElementById("userName").innerText = storedName;
    }

    if (storedImage) {
        document.getElementById("userImage").src = storedImage;
    }
});

// Logout function to clear session
function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.replace("index.html");
}

// Redirect to login if not logged in
if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.replace("index.html");
}

// SEARCH FUNCTION
// 1. Function to handle the search logic
function executeSearch() {
    const query = document.getElementById("movieSearchInput").value.toUpperCase().trim();
    const allMovies = document.querySelectorAll('.movies');
    let foundMovie = null;

    // Use if/else logic to find a match
    allMovies.forEach(movie => {
        if (movie.dataset.title === query) {
            foundMovie = movie;
        }
    });

    if (foundMovie) {
        movieView(foundMovie);
    } else {
        showStyledError("Movie not found! Please check the title."); // New style
    }
}

// 2. Event listener for the "Enter" key
document.getElementById("movieSearchInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent page refresh
        executeSearch();
    }
});

// ==========================================
// SYNCED ONE-BY-ONE REVEAL LOGIC
// ==========================================
window.addEventListener("load", () => {
    const skeleton = document.getElementById("skeletonLoader");
    const real = document.getElementById("realContent");
    
    // Get every direct section/div inside the real content
    const realSections = real.querySelectorAll(":scope > section, :scope > div");

    setTimeout(() => {
        // 1. Hide the loader and show the real container at the exact same time
        skeleton.style.display = "none";
        real.style.display = "block";

        // 2. Loop through every section to show them one-by-one
        realSections.forEach((section, index) => {
            // Set initial invisible state
            section.style.opacity = "0";
            section.style.transform = "translateY(20px)";
            section.style.transition = "opacity 0.5s ease, transform 0.5s ease";

            // Trigger the reveal with a staggered delay based on its index
            setTimeout(() => {
                section.style.opacity = "1";
                section.style.transform = "translateY(0)";
            }, index * 300); // 600ms delay between each section
        });

    }, 800); // How long the skeleton stays visible
});

// auto scroll in cart//
const scroller = document.querySelector('.scroller');
const carts = Array.from(scroller.querySelectorAll('.cart'));

let index = 0;
let autoScrollInterval;
let isHoveringCart = false;

function scrollCartToCenter(cart) {
    const cartRect = cart.getBoundingClientRect();
    const scrollerRect = scroller.getBoundingClientRect();

    const target =
        scroller.scrollLeft +
        (cartRect.left + cartRect.width / 2) -
        (scrollerRect.left + scrollerRect.width / 2);

    scroller.scrollTo({
        left: target,
        behavior: 'smooth'
    });
}

// Start auto-scroll with a delay to allow initial content load
function startAutoScroll() {
    stopAutoScroll(); // avoid duplicates
    autoScrollInterval = setInterval(() => {
        if (isHoveringCart) return; // pause on hover

        index++;
        if (index >= carts.length) index = 0;
        scrollCartToCenter(carts[index]);
    }, 5000);
}

// Stop auto-scroll when user interacts with the cart
function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

// Pause auto-scroll when hovering any cart
carts.forEach(cart => {
    cart.addEventListener('mouseenter', () => {
        isHoveringCart = true;
        stopAutoScroll();
    });

    cart.addEventListener('mouseleave', () => {
        isHoveringCart = false;
        startAutoScroll();
    });
});

// Touch devices (mobile / TV)
carts.forEach(cart => {
    cart.addEventListener('touchstart', stopAutoScroll);
    cart.addEventListener('touchend', startAutoScroll);
});

// Start auto-scroll
startAutoScroll();


//movie click to go movie-view page
function movieView(element) {
    const movie = element.closest('.movies');

    const movieData = {
        title: movie.dataset.title,
        video: movie.dataset.link1,
        hero: movie.dataset.name,
        year: movie.dataset.year,
        language: movie.dataset.language,
        image: movie.dataset.img,
        // Collect episodes into an array
        episodes: [
            {
                link: movie.dataset.link2,
                title: movie.dataset.episode1,
                time: movie.dataset.time
            },
            {
                link: movie.dataset.link3,
                title: movie.dataset.episode2,
                time: movie.dataset.time2
            },
            {
                link: movie.dataset.link4,
                title: movie.dataset.episode3,
                time: movie.dataset.time3
            },
            {
                link: movie.dataset.link5,
                title: movie.dataset.episode4,
                time: movie.dataset.time4
            },
            {
                link: movie.dataset.link6,
                title: movie.dataset.episode5,
                time: movie.dataset.time5
            },
            {
                link: movie.dataset.link7,
                title: movie.dataset.episode6,
                time: movie.dataset.time6
            },
            {
                link: movie.dataset.link8,
                title: movie.dataset.episode7,
                time: movie.dataset.time7
            },
            {
                link: movie.dataset.link9,
                title: movie.dataset.episode8,
                time: movie.dataset.time8
            },
            {
                link: movie.dataset.link10,
                title: movie.dataset.episode9,
                time: movie.dataset.time9
            },
            {
                link: movie.dataset.link11,
                title: movie.dataset.episode10,
                time: movie.dataset.time410
            },
            {
                link: movie.dataset.link12,
                title: movie.dataset.episode11,
                time: movie.dataset.time11
            },
            {
                link: movie.dataset.link13,
                title: movie.dataset.episode12,
                time: movie.dataset.time12
            },
            {
                link: movie.dataset.link14,
                title: movie.dataset.episode13,
                time: movie.dataset.time13
            },
            {
                link: movie.dataset.link15,
                title: movie.dataset.episode14,
                time: movie.dataset.time14
            },
            {
                link: movie.dataset.link16,
                title: movie.dataset.episode15,
                time: movie.dataset.time15
            },
            {
                link: movie.dataset.link17,
                title: movie.dataset.episode16,
                time: movie.dataset.time16
            }

        ]
    };

    localStorage.setItem('selectedMovie', JSON.stringify(movieData));
    window.location.href = 'movie-view.html';
}


// HOVER TRAILER PREVIEW
document.querySelectorAll(".cart").forEach(card => {
    const video = card.querySelector("video");

    if (!video) return;

    card.addEventListener("mouseenter", () => {
        video.currentTime = 0;
        video.play().catch(() => { });
    });

    card.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
    });
});


//menu function//
const menu = document.getElementById('menu');
const menuIcon = document.getElementById('menuIcon');

menuIcon.addEventListener('click', () => {
    menu.classList.toggle('active');
    menuIcon.classList.toggle('fa-bars');
    menuIcon.classList.toggle('fa-xmark'); // toggle between bars and X icon
});

if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.replace("login.html");
}


//login to store use & img save function//
document.addEventListener("DOMContentLoaded", () => {
    const savedName = localStorage.getItem("username");
    const savedImage = localStorage.getItem("profileImage");

    if (savedName) {
        document.getElementById("userName").textContent = savedName;
    }

    if (savedImage) {
        document.getElementById("userImage").src = savedImage;
    }
});


//logout function//
function logout() {
    // 1️ Clear all storage
    localStorage.clear();
    sessionStorage.clear();

    // 2️ Delete ALL cookies for this site
    document.cookie.split(";").forEach(cookie => {
        document.cookie = cookie
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/");
    });

    // 3️ Clear Cache Storage (PWA / Chrome supported)
    if ("caches" in window) {
        caches.keys().then(keys => {
            keys.forEach(key => caches.delete(key));
        });
    }

    // 4️ Disable back navigation
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
    };

    // 5️ Redirect to login page (hard replace)
    window.location.replace("index.html");
}


document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("username")) {
        window.location.replace("index.html");
    }
});


function changeImage() {
    document.getElementById("imageInput").click();
}

document.getElementById("imageInput").addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function () {
        localStorage.setItem("profileImage", reader.result);

        // Update image instantly if exists on page
        const img1 = document.getElementById("userImage");
        const img2 = document.getElementById("profilePic");

        if (img1) img1.src = reader.result;
        if (img2) img2.src = reader.result;
    };
    reader.readAsDataURL(file);
});

document.addEventListener("DOMContentLoaded", () => {
    const name = localStorage.getItem("username");
    const img = localStorage.getItem("profileImage");

    if (name) document.getElementById("userName").innerText = name;
    if (img) document.getElementById("userImage").src = img;
});



//download icon click to add download details//
function addToDownloads(icon) {
    const movie = icon.closest(".movies");

    const movieData = {
        title: movie.dataset.title,
        image: movie.dataset.img,
        link: movie.dataset.link,
        downloaded: false,
        addedAt: Date.now()
    };

    let downloads = JSON.parse(localStorage.getItem("downloads")) || [];
    const exists = downloads.some(d => d.link === movieData.link);

    const toast = document.getElementById("download-toast");
    const toastMsg = document.getElementById("toast-message");

    if (exists) {
        toastMsg.innerText = "Already in Downloads!";
        showToastAndRedirect(false);
        return;
    }

    downloads.push(movieData);
    localStorage.setItem("downloads", JSON.stringify(downloads));

    toastMsg.innerText = "Movie saved to Downloads";
    showToastAndRedirect(true);
}

// Show toast notification and optionally redirect to download page
function showToastAndRedirect(shouldRedirect) {
    const toast = document.getElementById("download-toast");

    // Show the notification
    toast.classList.add("show");

    // Wait 2 seconds, then hide and move to download page
    setTimeout(() => {
        toast.classList.remove("show");
        if (shouldRedirect) {
            window.location.href = "download.html"; // Ensure this filename is correct
        }
    }, 2000);
}

// Styled error message function
function showStyledError(message) {
    // Prevent multiple toasts from stacking
    const existingToast = document.querySelector('.movie-error-toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'movie-error-toast';
    toast.innerHTML = `<i class="fas fa-exclamation-circle"></i> <span>${message}</span>`;
    document.body.appendChild(toast);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}