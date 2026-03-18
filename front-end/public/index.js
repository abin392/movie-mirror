function showAlert(message, title = "Alert") {
        document.getElementById("alertTitle").innerText = title;
        document.getElementById("alertMessage").innerText = message;
        document.getElementById("customAlert").classList.add("show");
    }

    function closeAlert() {
        document.getElementById("customAlert").classList.remove("show");
    }

        // Auto redirect if already logged in
    if (localStorage.getItem("isLoggedIn") === "true") {
        window.location.replace("movie.html");
    }

    function login() {
        const username = document.getElementById("username").value.trim();
        const imageInput = document.getElementById("profileImage");

        if (!username || imageInput.files.length === 0) {
            showAlert("Please enter username and select image", "Login Required");
            return;
        }

        const reader = new FileReader();
        reader.onload = function () {
            localStorage.setItem("username", username);
            localStorage.setItem("profileImage", reader.result);
            localStorage.setItem("isLoggedIn", "true");

            // Prevent back button
            window.location.replace("movie.html");
        };

        reader.readAsDataURL(imageInput.files[0]);
    }

    //Live image preview
    const imageInput = document.getElementById("profileImage");
    const previewImage = document.getElementById("yourImage");

    imageInput.addEventListener("change", () => {
        const file = imageInput.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            previewImage.src = reader.result;
        };
        reader.readAsDataURL(file);
    });