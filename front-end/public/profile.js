/**
 * PROFILE PAGE LOGIC - FULL REWRITE
 * Handles: Sidebar, Avatar Modal, Profile Editing, and Session Management
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initial Data Load
    loadUserProfile();

    // 2. Setup File Input Listener for Custom Uploads
    const imageInput = document.getElementById("imageInput");
    if (imageInput) {
        imageInput.addEventListener("change", handleCustomImageUpload);
    }
});

// --- USER DATA MANAGEMENT ---

function loadUserProfile() {
    const username = localStorage.getItem("username") || "New User";
    const profileImage = localStorage.getItem("profileImage") || "img/user.png";

    const displayElem = document.getElementById("displayName");
    const picElem = document.getElementById("profilePic");

    if (displayElem) displayElem.innerText = username;
    if (picElem) picElem.src = profileImage;
}

function editUsername() {
    const display = document.getElementById("displayName");
    const input = document.getElementById("usernameInput");
    const editBtn = document.getElementById("editBtn");
    const saveBtn = document.getElementById("saveBtn");
    const cancelBtn = document.getElementById("cancelBtn");

    // Toggle Visibility
    display.style.display = "none";
    input.hidden = false;
    input.value = display.innerText;
    input.focus();

    editBtn.hidden = true;
    saveBtn.hidden = false;
    cancelBtn.hidden = false;
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

function saveUsername() {
    const input = document.getElementById("usernameInput");
    const newName = input.value.trim();

    if (newName === "") {
        alert("Username cannot be empty!");
        return;
    }

    // Save to Storage
    localStorage.setItem("username", newName);
    
    // Update UI and Reset Buttons
    document.getElementById("displayName").innerText = newName;
    cancelEdit();
}

// --- AVATAR & IMAGE LOGIC ---

function openAvatarModal() {
    // If you have a specific modal for selecting pre-set avatars
    const modal = document.getElementById("avatarModal");
    if (modal) {
        modal.classList.add("show");
    } else {
        // Fallback: Just trigger file upload if no modal exists
        document.getElementById("imageInput").click();
    }
}

function closeAvatarModal() {
    const modal = document.getElementById("avatarModal");
    if (modal) modal.classList.remove("show");
}

function updateAvatar(src) {
    const picElem = document.getElementById("profilePic");
    picElem.src = src;
    localStorage.setItem("profileImage", src);
    closeAvatarModal();
}

function handleCustomImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const result = e.target.result;
        document.getElementById("profilePic").src = result;
        localStorage.setItem("profileImage", result);
        closeAvatarModal();
    };
    reader.readAsDataURL(file);
}

// --- SIDEBAR & NAVIGATION ---

function toggleSidebar() {
    const sidebar = document.getElementById("navSidebar");
    if (sidebar) {
        sidebar.classList.toggle("active");
    }
}

// Close sidebar when clicking outside on mobile
document.addEventListener("click", (e) => {
    const sidebar = document.getElementById("navSidebar");
    const menuBtn = document.querySelector(".menu-toggle");
    
    if (sidebar && sidebar.classList.contains("active")) {
        if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
            sidebar.classList.remove("active");
        }
    }
});

// --- SESSION CONTROL ---

function logout() {
    // Clear login status but keep settings if preferred, 
    // or use localStorage.clear() to wipe everything.
    localStorage.removeItem("isLoggedIn");
    window.location.replace("index.html");
}

document.addEventListener("DOMContentLoaded", () => {
    // Load initial data
    const savedName = localStorage.getItem("username");
    const savedImg = localStorage.getItem("profileImage");

    if (savedName) document.getElementById("displayName").innerText = savedName;
    if (savedImg) document.getElementById("profilePic").src = savedImg;

    // Listen for custom file upload
    document.getElementById("imageInput").addEventListener("change", function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                updateAvatar(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
});

// Modal Controls
function openAvatarModal() {
    document.getElementById("avatarModal").classList.add("show");
}

function closeAvatarModal() {
    document.getElementById("avatarModal").classList.remove("show");
}

// Function to actually save and update the UI
function updateAvatar(source) {
    // 1. Update UI
    document.getElementById("profilePic").src = source;
    
    // 2. Save to LocalStorage
    localStorage.setItem("profileImage", source);
    
    // 3. Close Modal
    closeAvatarModal();
}

// --- IMAGE PREVIEW LOGIC ---//
// Get Preview Elements
const imagePreview = document.getElementById("imagePreview");
const previewImg = document.getElementById("previewImg");
const closeBtn = document.querySelector(".image-preview .close");
const profilePic = document.getElementById("profilePic");

// 1. Open Preview when clicking the Profile Picture
if (profilePic) {
    profilePic.style.cursor = "zoom-in"; // Visual hint for user
    profilePic.addEventListener("click", () => {
        imagePreview.style.display = "flex";
        previewImg.src = profilePic.src;
    });
}

// 2. Close Preview when clicking the 'X'
if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        imagePreview.style.display = "none";
    });
}

// 3. Close Preview when clicking the dark background
imagePreview.addEventListener("click", (e) => {
    if (e.target === imagePreview) {
        imagePreview.style.display = "none";
    }
});