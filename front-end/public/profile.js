/**
 * PROFILE PAGE LOGIC
 * Handles: Auto-loading Profile, Sidebar, Avatar Modal, Editing, and Tab Identity
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initial Data Load (Username, Image, Title, and Favicon)
    loadUserProfile();

    // 2. Setup File Input Listener for Custom Uploads
    const imageInput = document.getElementById("imageInput");
    if (imageInput) {
        imageInput.addEventListener("change", handleCustomImageUpload);
    }
});

// --- USER DATA MANAGEMENT ---

function loadUserProfile() {
    // Pull data from localStorage
    const username = localStorage.getItem("username") || "New User";
    const profileImage = localStorage.getItem("profileImage") || "img/user.png";

    // Update Page Elements
    const displayElem = document.getElementById("displayName");
    const picElem = document.getElementById("profilePic");

    if (displayElem) displayElem.innerText = username;
    if (picElem) picElem.src = profileImage;

    // UPDATE BROWSER TAB IDENTITY
    // Set tab title to the username
    document.title = username;

    // Set tab icon (favicon) to the user's profile image
    let favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
        favicon.href = profileImage;
    } else {
        const newFavicon = document.createElement('link');
        newFavicon.rel = 'icon';
        newFavicon.href = profileImage;
        document.head.appendChild(newFavicon);
    }
}

// --- EDITING LOGIC ---

function editUsername() {
    const display = document.getElementById("displayName");
    const input = document.getElementById("usernameInput");
    const editBtn = document.getElementById("editBtn");
    const saveBtn = document.getElementById("saveBtn");
    const cancelBtn = document.getElementById("cancelBtn");

    display.style.display = "none";
    input.hidden = false;
    input.value = display.innerText;
    input.focus();

    editBtn.hidden = true;
    saveBtn.hidden = false;
    cancelBtn.hidden = false;
}

function saveUsername() {
    const input = document.getElementById("usernameInput");
    const newName = input.value.trim();

    if (newName) {
        // Save to LocalStorage
        localStorage.setItem("username", newName);
        
        // Refresh UI and Tab Title
        loadUserProfile();
        cancelEdit();
    }
}

function cancelEdit() {
    const display = document.getElementById("displayName");
    const input = document.getElementById("usernameInput");
    const editBtn = document.getElementById("editBtn");
    const saveBtn = document.getElementById("saveBtn");
    const cancelBtn = document.getElementById("cancelBtn");

    display.style.display = "block";
    input.hidden = true;
    editBtn.hidden = false;
    saveBtn.hidden = true;
    cancelBtn.hidden = true;
}

// --- AVATAR & IMAGE LOGIC ---

function openAvatarModal() {
    document.getElementById("avatarModal").classList.add("show");
}

function closeAvatarModal() {
    document.getElementById("avatarModal").classList.remove("show");
}

function updateAvatar(source) {
    // Save to LocalStorage
    localStorage.setItem("profileImage", source);
    
    // Refresh UI and Tab Icon
    loadUserProfile();
    closeAvatarModal();
}

function handleCustomImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            updateAvatar(e.target.result);
        };
        reader.readAsDataURL(file);
    }
}

// --- UI & NAVIGATION ---

function toggleSidebar() {
    const sidebar = document.getElementById("navSidebar");
    sidebar.classList.toggle("active");
}

function logout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace("index.html");
}

// --- IMAGE PREVIEW POPUP ---
const imagePreview = document.getElementById("imagePreview");
const previewImg = document.getElementById("previewImg");
const closeBtn = document.querySelector(".image-preview .close");
const profilePic = document.getElementById("profilePic");

if (profilePic) {
    profilePic.addEventListener("click", () => {
        imagePreview.style.display = "flex";
        previewImg.src = profilePic.src;
    });
}

if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        imagePreview.style.display = "none";
    });
}