import { runBootSequence } from './modules/boot.js';
import { initClock } from './modules/clock.js';
import { initWallpaper } from './modules/wallpaper.js';
import { initDock } from './modules/dock.js';
import { initWidgets } from './modules/widgets.js';
import { initMusicPlayer } from './modules/musicPlayer.js';

document.addEventListener('DOMContentLoaded', async () => {
    const osElements = document.querySelectorAll('.top-bar, .desktop, .bottom-bar');
    osElements.forEach(el => {
        el.style.display = 'none';
    });

    await runBootSequence();

    osElements.forEach(el => {
        el.style.display = '';
    });

    initClock();
    initWallpaper();
    initDock();
    initWidgets();
    initMusicPlayer(); // Initiates the player & playlist
});