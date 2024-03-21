const { ipcRenderer } = require("electron");

ipcRenderer.on('selected-file', (event, filePath) => {
    console.log('Selected file path renderer', filePath);
    const videoPlayer = document.getElementById('videoPlayer');
    // Set the source of the video player to the selected file path
    videoPlayer.src = filePath;
    // Load and play the video
    videoPlayer.load();

    // Handle playback error
    videoPlayer.onerror = (event) => {
        console.error('Error loading the video:', event.target.error);
    };

    // Play the video once it's loaded
    videoPlayer.onloadeddata = () => {
        videoPlayer.play();
    };
});