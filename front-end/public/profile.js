// Retrieve and display user data from localStorage
const username = localStorage.getItem("username");
const profileImage = localStorage.getItem("profileImage");

if (username && profileImage) {
    document.getElementById("displayName").innerText = username;
    document.getElementById("profilePic").src = profileImage;
} else {
    document.getElementById("displayName").innerText = "No user data found.";
}

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
// On page load, set the profile details

if (username) document.getElementById("displayName").innerText = username;
if (profileImage) document.getElementById("profilePic").src = profileImage;

function logout() {
    //  Clear all storage
    localStorage.clear();
    sessionStorage.clear();

    //  Delete ALL cookies for this site
    document.cookie.split(";").forEach(cookie => {
        document.cookie = cookie
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/");
    });

    //  Clear Cache Storage (PWA / Chrome supported)
    if ("caches" in window) {
        caches.keys().then(keys => {
            keys.forEach(key => caches.delete(key));
        });
    }

    // Disable back navigation
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
    };

    // Redirect to login page (hard replace)
    window.location.replace("index.html");
}

document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("username")) {
        window.location.replace("index.html");
    }
});


const profilePic = document.getElementById("profilePic");
const imagePreview = document.getElementById("imagePreview");
const previewImg = document.getElementById("previewImg");
const closeBtn = document.querySelector(".close");

// Load saved data

if (username) document.getElementById("displayName").innerText = username;
if (profileImage) profilePic.src = profileImage;

// Click image to view
profilePic.addEventListener("click", () => {
    if (!profilePic.src) return;
    previewImg.src = profilePic.src;
    imagePreview.style.display = "flex";
});

// Close popup
closeBtn.addEventListener("click", () => {
    imagePreview.style.display = "none";
});

// Close on background click
imagePreview.addEventListener("click", (e) => {
    if (e.target === imagePreview) {
        imagePreview.style.display = "none";
    }
});

const displayName = document.getElementById("displayName");
const usernameInput = document.getElementById("usernameInput");
const editBtn = document.getElementById("editBtn");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

function editUsername() {
    usernameInput.value = displayName.innerText;
    displayName.style.display = "none";
    usernameInput.hidden = false;

    editBtn.hidden = true;
    saveBtn.hidden = false;
    cancelBtn.hidden = false;
}

function saveUsername() {
    const newName = usernameInput.value.trim();

    if (newName === "") {
        alert("Username cannot be empty!");
        return;
    }

    // Store updated name
    localStorage.setItem("username", newName);

    // Update UI
    displayName.innerText = newName;

    cancelEdit();

    // Force reload target page so new data is picked up
    window.location.href = "movie.html?reload=" + new Date().getTime();
}

function cancelEdit() {
    usernameInput.hidden = true;
    displayName.style.display = "inline";

    editBtn.hidden = false;
    saveBtn.hidden = true;
    cancelBtn.hidden = true;
}