//Get details from localStorage in movie.html and populate the movie view page
document.addEventListener("DOMContentLoaded", () => {
            const savedMovie = localStorage.getItem('selectedMovie');

            if (savedMovie) {
                const movieData = JSON.parse(savedMovie);

                // 1. Fill Main Movie Details
                document.getElementById('movieTitle').textContent = movieData.title;
                document.getElementById('videoSource').src = movieData.video;
                document.getElementById('movieVideo').load();
                document.getElementById('movieInfo').innerHTML = `
            Hero: ${movieData.hero} <br>
            Year: ${movieData.year} <br>
            Language: ${movieData.language}
        `;

                // 2. Generate Episode Cards Automatically
                const grid = document.getElementById('episodesGrid');
                grid.innerHTML = ''; // Clear existing static content

                movieData.episodes.forEach((ep) => {
                    // Only create the card if the episode data exists
                    if (ep.link && ep.title) {
                        const card = document.createElement('div');
                        card.className = 'episode-card';
                        card.onclick = () => changeEpisode(ep.link, ep.title);

                        card.innerHTML = `
                    <div class="episode-thumbnail">
                        <img src="${movieData.image}" alt="${ep.title}">
                        <i class="fas fa-play-circle play-icon"></i>
                    </div>
                    <div class="episode-info">
                        <h4>${ep.title}</h4>
                        <p>${ep.time || 'N/A'}</p>
                    </div>
                `;
                        grid.appendChild(card);
                    }
                });
            }
        });

        //change episode function to update video source and title
        function changeEpisode(url, title) {
            const video = document.getElementById('movieVideo');
            const source = document.getElementById('videoSource');
            source.src = url;
            video.load();
            video.play();
            document.getElementById('movieTitle').textContent = title;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        document.addEventListener("DOMContentLoaded", () => {
            // Retrieve the saved movie data
            const savedMovie = localStorage.getItem('selectedMovie');

            if (savedMovie) {
                const movieData = JSON.parse(savedMovie);

                // Inject text details
                document.getElementById('movieTitle').textContent = movieData.title;
                document.getElementById('movieInfo').innerHTML = `
                    Hero: ${movieData.hero} <br>
                    Year: ${movieData.year} <br>
                    Language: ${movieData.language} <br>
                `;

                // Inject video and play
                if (movieData.video) {
                    const videoElement = document.getElementById('movieVideo');
                    const sourceElement = document.getElementById('videoSource');

                    sourceElement.src = movieData.video;
                    videoElement.load(); // Crucial: forces the player to load the new source
                    videoElement.play().catch(err => console.log("Autoplay prevented", err));
                }
            } else {
                document.getElementById('movieTitle').textContent = "Movie Not Found";
            }
        });