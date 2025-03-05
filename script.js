document.addEventListener('DOMContentLoaded', () => {
  const audioPlayer = document.getElementById('audio-player');
  const playlist = document.getElementById('playlist');
  const tracks = playlist.getElementsByTagName('li');
  const playPauseButton = document.getElementById('play-pause');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  const progress = document.getElementById('progress');
  const trackImage = document.getElementById('track-image');
  const carousel = document.getElementById('carousel');
  let currentTrackIndex = 0;
  let carouselIndex = 0;

  const images = [
    'abracadabra.png', 'rush.png', 'tfm.jpeg', 'hm.jpeg', 'disease.png', 'dointime.png',
    'dwas.jpeg', 'phoebe.jpeg', 'pretty.png', 'Melodrama.jpeg', 'WhatsApp Image 2025-02-26 at 09.05.39 (1).jpeg',
    'WhatsApp Image 2025-02-26 at 09.05.39 (2).jpeg', 'WhatsApp Image 2025-02-26 at 09.05.39.jpeg',
    'WhatsApp Image 2025-02-26 at 09.05.40 (2).jpeg', 'WhatsApp Image 2025-02-26 at 09.05.40.jpeg',
    'WhatsApp Image 2025-02-26 at 09.05.41 (1).jpeg', 'WhatsApp Image 2025-02-26 at 09.05.41 (2).jpeg',
    'WhatsApp Image 2025-02-26 at 09.05.41 (3).jpeg', 'WhatsApp Image 2025-02-26 at 09.05.41.jpeg',
    'WhatsApp Image 2025-02-26 at 09.05.42 (1).jpeg', 'WhatsApp Image 2025-02-26 at 09.05.42 (2).jpeg',
    'WhatsApp Image 2025-02-26 at 09.05.42.jpeg', 'WhatsApp Image 2025-02-26 at 09.05.43.jpeg',
    'WhatsApp Image 2025-02-26 at 09.31.29.jpeg'
  ];

  function loadTrack(index) {
    audioPlayer.src = tracks[index].getAttribute('data-src');
    trackImage.src = tracks[index].getAttribute('data-img');
    audioPlayer.play();
    updateProgressBar();
  }

  function playPause() {
    if (audioPlayer.paused) {
      audioPlayer.play();
      playPauseButton.textContent = 'Pausa';
    } else {
      audioPlayer.pause();
      playPauseButton.textContent = 'Reproducir';
    }
  }

  function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
  }

  function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
  }

  function updateProgressBar() {
    audioPlayer.addEventListener('timeupdate', () => {
      if (audioPlayer.duration) {
        const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progress.style.width = percentage + '%';
      }
    });
  }

  playPauseButton.addEventListener('click', playPause);
  prevButton.addEventListener('click', prevTrack);
  nextButton.addEventListener('click', nextTrack);

  for (let i = 0; i < tracks.length; i++) {
    tracks[i].addEventListener('click', function() {
      currentTrackIndex = i;
      loadTrack(currentTrackIndex);
    });
  }

  document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key >= '1' && key <= '4') {
      const trackIndex = parseInt(key) - 1;
      if (trackIndex < tracks.length) {
        currentTrackIndex = trackIndex;
        loadTrack(currentTrackIndex);
      }
    }
  });

  // Load the first track by default
  loadTrack(currentTrackIndex);

  // Carousel functionality
  setInterval(() => {
    carouselIndex = (carouselIndex + 1) % images.length;
    carousel.src = images[carouselIndex];
  }, 30000);
});
