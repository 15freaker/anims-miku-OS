import { runBootSequence } from './modules/boot.js';
import { initClock } from './modules/clock.js';
import { initWallpaper } from './modules/wallpaper.js';
import { initDock } from './modules/dock.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Run boot sequence first
    await runBootSequence();

    // Initialize OS components
    initClock();
    initWallpaper();
    initDock();
});