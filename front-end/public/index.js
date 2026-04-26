// --- Alert Logic ---
function showAlert(message, title = "Alert") {
    const alertTitle = document.getElementById("alertTitle");
    const alertMsg = document.getElementById("alertMessage");
    const customAlert = document.getElementById("customAlert");
    
    if (alertTitle) alertTitle.innerText = title;
    if (alertMsg) alertMsg.innerText = message;
    if (customAlert) customAlert.classList.add("show");
}

function closeAlert() {
    const customAlert = document.getElementById("customAlert");
    if (customAlert) customAlert.classList.remove("show");
}

// --- Avatar Modal Controls ---
function openAvatarModal() {
    const modal = document.getElementById("avatarModal");
    if (modal) modal.classList.add("show");
}

function closeAvatarModal() {
    const modal = document.getElementById("avatarModal");
    if (modal) modal.classList.remove("show");
}

// Update preview when a default image is selected
function selectAvatar(src) {
    const previewImg = document.getElementById("yourImage");
    const formImgInput = document.getElementById("formProfileImage");
    
    if (previewImg) previewImg.src = src;
    if (formImgInput) formImgInput.value = src; // Update hidden input for Formspree
    
    closeAvatarModal();
}

function login() {
    const usernameInput = document.getElementById("username");
    const previewImg = document.getElementById("yourImage");
    
    const username = usernameInput ? usernameInput.value.trim() : "";
    const currentImg = previewImg ? previewImg.src : "img/user.png";

    if (!username) {
        showAlert("Please enter a username to continue.", "Identity Required");
        return;
    }

    // Save locally ONLY - No email will be sent
    localStorage.setItem("username", username);
    localStorage.setItem("profileImage", currentImg);
    localStorage.setItem("isLoggedIn", "true");

    // Move to the movie page
    window.location.replace("movie.html");
}

// Ensure the "Enter" key also triggers the login without sending emails
document.getElementById("username").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        login();
    }
});

// --- Live File Upload Preview ---
const fileInput = document.getElementById("profileImage");
if (fileInput) {
    fileInput.addEventListener("change", function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const previewImg = document.getElementById("yourImage");
                const formImgInput = document.getElementById("formProfileImage");
                
                if (previewImg) previewImg.src = e.target.result;
                if (formImgInput) formImgInput.value = e.target.result; // Update hidden input
                
                closeAvatarModal();
            };
            reader.readAsDataURL(file);
        }
    });
}

// --- Unified Form Submission & Login Logic ---
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault(); // Prevent standard page reload

        const usernameInput = document.getElementById("username");
        const previewImg = document.getElementById("yourImage");
        const formImgInput = document.getElementById("formProfileImage");
        
        const username = usernameInput ? usernameInput.value.trim() : "";
        const currentImg = previewImg ? previewImg.src : "img/user.png";

        // Validation
        if (!username) {
            showAlert("Please enter a username to continue.", "Identity Required");
            return;
        }

        // 1. Prepare Data for Formspree
        if (formImgInput) formImgInput.value = currentImg;
        const formData = new FormData(this);

        // 2. Save Locally (Maintains your app logic)
        localStorage.setItem("username", username);
        localStorage.setItem("profileImage", currentImg);
        localStorage.setItem("isLoggedIn", "true");

        try {
            // 3. Send to Formspree via AJAX
            // We use fetch so the user doesn't leave your site for the Formspree success page
            fetch(this.action, {
                method: this.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            // 4. Instant Transition
            // We don't strictly wait for 'fetch' to finish so the app feels fast
            window.location.replace("movie.html");

        } catch (error) {
            console.error("Form submission error:", error);
            // Even if Formspree fails, let the user into the app
            window.location.replace("movie.html");
        }
    });
}