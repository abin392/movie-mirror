function openMusicPlayer(element) {
    const playlist = [];
    
    // Loop through 1 to 6 to collect all data-song and data-songTitle attributes
    for (let i = 1; i <= 6; i++) {
        const songUrl = element.getAttribute(`data-song${i}`);
        const songTitle = element.getAttribute(`data-songTitle${i}`);
        
        if (songUrl) {
            playlist.push({
                title: songTitle.replace(/__/g, " "), // Cleans up titles like "Song__Name"
                url: songUrl,
                image: element.closest('.movies').querySelector('img').src // Uses the movie poster as the cover
            });
        }
    }
    
    // Save the entire list to localStorage
    localStorage.setItem('currentPlaylist', JSON.stringify(playlist));
    
    // Move to the viewer page
    window.location.href = 'music-viewer.html';
}