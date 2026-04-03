// --- Alert Logic ---
function showAlert(message, title = "Alert") {
    document.getElementById("alertTitle").innerText = title;
    document.getElementById("alertMessage").innerText = message;
    document.getElementById("customAlert").classList.add("show");
}

function closeAlert() {
    document.getElementById("customAlert").classList.remove("show");
}

// --- Avatar Modal Logic ---
// --- Modal Controls ---
function openAvatarModal() {
    document.getElementById("avatarModal").classList.add("show");
}

function closeAvatarModal() {
    document.getElementById("avatarModal").classList.remove("show");
}

// Automatically update preview when a default image is clicked
function selectAvatar(src) {
    document.getElementById("yourImage").src = src;
    closeAvatarModal();
}

// --- Enhanced Login Logic ---
function login() {
    const username = document.getElementById("username").value.trim();
    const currentImg = document.getElementById("yourImage").src;

    if (!username) {
        // Reusing your custom alert logic
        showAlert("Please enter a username to continue.", "Identity Required");
        return;
    }

    // Save state for the media portal
    localStorage.setItem("username", username);
    localStorage.setItem("profileImage", currentImg);
    localStorage.setItem("isLoggedIn", "true");

    // Seamless transition to movie page
    window.location.replace("movie.html");
}

// --- Live File Upload Preview ---
document.getElementById("profileImage").addEventListener("change", function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById("yourImage").src = e.target.result;
            closeAvatarModal(); // Close modal after successful upload
        };
        reader.readAsDataURL(file);
    }
});