import { openCalculator } from './apps/calculator.js';
import { openNotesApp } from './apps/notes.js';
import { openWikipediaApp } from './apps/wikipedia.js';
import { openGoogleApp } from './apps/google.js';
import { openTerminalApp } from './apps/terminal.js';
import { openMikuFolderApp } from './apps/mikuFolder.js';

export function initDock() {
    const dock = document.getElementById('macDock');
    if (!dock) return;

    const icons = dock.querySelectorAll('.dock-app');

    // App launch router mapping
    const appLaunchers = {
        'google': openGoogleApp,
        'wikipedia': openWikipediaApp,
        'calculator': openCalculator,
        'notes': openNotesApp,
        'miku-folder': openMikuFolderApp,
        'terminal': openTerminalApp
    };

    // Smooth macOS Magnification Effect
    dock.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const maxDistance = 140;
        const maxScale = 1.4;
        const minScale = 1.0;

        icons.forEach(icon => {
            const rect = icon.getBoundingClientRect();
            const iconCenterX = rect.left + rect.width / 2;
            const distance = Math.abs(mouseX - iconCenterX);

            if (distance < maxDistance) {
                const scale = maxScale - (distance / maxDistance) * (maxScale - minScale);
                icon.style.transform = `scale(${scale}) translateY(-${(scale - 1) * 12}px)`;
            } else {
                icon.style.transform = `scale(1) translateY(0px)`;
            }
        });
    });

    dock.addEventListener('mouseleave', () => {
        icons.forEach(icon => {
            icon.style.transform = `scale(1) translateY(0px)`;
        });
    });

    // App Launch Click Handlers with bounce feedback
    icons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.stopPropagation();
            const app = icon.getAttribute('data-app');

            if (app && appLaunchers[app]) {
                // Click bounce animation feedback
                icon.style.transition = 'transform 0.15s ease';
                icon.style.transform = 'scale(0.85) translateY(0px)';

                setTimeout(() => {
                    icon.style.transition = '';
                    appLaunchers[app]();
                }, 120);
            } else {
                console.warn(`No launcher defined for app: "${app}"`);
            }
        });
    });
}