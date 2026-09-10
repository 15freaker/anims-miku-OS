const mp3Files = import.meta.glob('../assets/miku-music/*.mp3', { eager: true });

const playlist = Object.keys(mp3Files).map((filePath) => {
    const fileName = filePath.split('/').pop().replace(/\.mp3$/i, '');
    const fileModule = mp3Files[filePath];
    const srcUrl = typeof fileModule === 'string' ? fileModule : (fileModule.default || filePath);

    return {
        title: decodeURIComponent(fileName),
        artist: 'Hatsune Miku',
        src: srcUrl
    };
});

let currentTrackIndex = 0;

export function initMusicPlayer() {
    const audio = document.getElementById('audioElement');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevTrackBtn');
    const nextBtn = document.getElementById('nextTrackBtn');
    const progressBar = document.getElementById('musicProgress');
    const currentTimeEl = document.getElementById('currentTime');
    const totalTimeEl = document.getElementById('totalTime');
    const trackTitleEl = document.getElementById('trackTitle');
    const playlistBtn = document.getElementById('playlistBtn');
    const playlistOverlay = document.getElementById('playlistOverlay');
    const playlistItemsContainer = document.getElementById('playlistItems');
    const closePlaylistBtn = document.getElementById('closePlaylistBtn');
    const likeBtn = document.getElementById('likeBtn');

    if (!audio || !playPauseBtn) return;

    function renderPlaylist() {
        if (!playlistItemsContainer) return;
        playlistItemsContainer.innerHTML = '';

        if (playlist.length === 0) {
            playlistItemsContainer.innerHTML = '<div class="playlist-empty">No .mp3 files found in miku-music/</div>';
            return;
        }

        playlist.forEach((track, index) => {
            const item = document.createElement('div');
            item.className = `playlist-item ${index === currentTrackIndex ? 'active' : ''}`;
            item.innerHTML = `
                <span class="track-number">${index + 1}</span>
                <span class="track-name">${track.title}</span>
            `;
            item.addEventListener('click', () => {
                currentTrackIndex = index;
                loadTrack(currentTrackIndex);
                audio.play().then(() => {
                    playPauseBtn.textContent = '⏸';
                }).catch((err) => console.error("Playback error:", err));
                playlistOverlay?.classList.remove('open');
            });
            playlistItemsContainer.appendChild(item);
        });
    }

    function loadTrack(index) {
        if (playlist.length === 0) {
            if (trackTitleEl) trackTitleEl.textContent = "No Audio Files";
            return;
        }
        const track = playlist[index];
        audio.src = track.src;
        if (trackTitleEl) trackTitleEl.textContent = track.title;
        renderPlaylist();
    }

    function formatTime(seconds) {
        if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    loadTrack(currentTrackIndex);

    playPauseBtn.addEventListener('click', () => {
        if (playlist.length === 0) return;
        if (audio.paused) {
            audio.play().then(() => {
                playPauseBtn.textContent = '⏸';
            }).catch((err) => console.error("Playback error:", err));
        } else {
            audio.pause();
            playPauseBtn.textContent = '▶';
        }
    });

    prevBtn?.addEventListener('click', () => {
        if (playlist.length === 0) return;
        currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        loadTrack(currentTrackIndex);
        audio.play().then(() => playPauseBtn.textContent = '⏸').catch(() => {});
    });

    nextBtn?.addEventListener('click', () => {
        if (playlist.length === 0) return;
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(currentTrackIndex);
        audio.play().then(() => playPauseBtn.textContent = '⏸').catch(() => {});
    });

    audio.addEventListener('timeupdate', () => {
        if (!isNaN(audio.duration) && audio.duration > 0) {
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            progressBar.value = progressPercent;
            currentTimeEl.textContent = formatTime(audio.currentTime);
            totalTimeEl.textContent = formatTime(audio.duration);
        }
    });

    progressBar?.addEventListener('input', () => {
        if (!isNaN(audio.duration)) {
            audio.currentTime = (progressBar.value / 100) * audio.duration;
        }
    });

    playlistBtn?.addEventListener('click', () => playlistOverlay?.classList.toggle('open'));
    closePlaylistBtn?.addEventListener('click', () => playlistOverlay?.classList.remove('open'));
    likeBtn?.addEventListener('click', () => {
        likeBtn.classList.toggle('liked');
        likeBtn.textContent = likeBtn.classList.contains('liked') ? '♥' : '♡';
    });
}