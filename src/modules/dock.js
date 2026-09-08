import { openWindow } from './windowManager.js';
import { openCalculator } from './apps/calculator.js';
import { openNotesApp } from './apps/notes.js';
import { openWikipediaApp } from './apps/wikipedia.js';
import { openGoogleApp } from './apps/google.js';

export function initDock() {
    const dock = document.getElementById('macDock');
    if (!dock) return;

    const icons = dock.querySelectorAll('.dock-app');

    dock.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;

        icons.forEach(icon => {
            const rect = icon.getBoundingClientRect();
            const iconCenterX = rect.left + rect.width / 2;
            const distance = Math.abs(mouseX - iconCenterX);

            const maxDistance = 140;
            const maxScale = 1.5;
            const minScale = 1.0;

            if (distance < maxDistance) {
                const scale = maxScale - (distance / maxDistance) * (maxScale - minScale);
                icon.style.transform = `scale(${scale}) translateY(-${(scale - 1) * 18}px)`;
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

    icons.forEach(icon => {
        icon.addEventListener('click', () => {
            const app = icon.getAttribute('data-app');
            if (app === 'google') openGoogleApp();
            else if (app === 'wikipedia') openWikipediaApp();
            else if (app === 'calculator') openCalculator();
            else if (app === 'notes') openNotesApp();
            else if (app === 'miku-folder') openWindow('miku-folder', '<p>Welcome to miku-folder.</p>');
            else if (app === 'terminal') openWindow('Terminal', '<p style="color:#00ff66;">miku-os:~ user$</p>');
        });
    });
}