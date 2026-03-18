 const container = document.getElementById("downloads");
        let downloads = JSON.parse(localStorage.getItem("downloads")) || [];

        if (downloads.length === 0) {
            container.innerHTML = "<p style='padding:15px;'>No downloads yet.</p>";
        }

        downloads.forEach((movie, index) => {
            const div = document.createElement("div");
            div.className = "download-card";

            div.innerHTML = `
        <img src="${movie.image}" style='height:200px;'>
        <h4>${movie.title}</h4>
        
        <a href="${movie.link}" target="" download
           onclick="markDownloaded(${index})">
           <i class="fa-solid fa-download"></i> Download

        </a>

        <div class="remove" onclick="removeDownload(${index})">
            Remove
        </div>
    `;

            container.appendChild(div);
        });

        function markDownloaded(index) {
            downloads[index].downloaded = true;
            localStorage.setItem("downloads", JSON.stringify(downloads));
        }

        function removeDownload(index) {
            downloads.splice(index, 1);
            localStorage.setItem("downloads", JSON.stringify(downloads));
            location.reload();
        }