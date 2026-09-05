import { openWindow } from './windowManager.js';
import { openCalculator } from './apps/calculator.js';
import { openNotesApp } from './apps/notes.js';
import appsLogoPath from '../assets/apps-miku-button.jpg';

export function initDock() {
    const appsLogoImg = document.getElementById('apps-logo');
    if (appsLogoImg) {
        appsLogoImg.src = appsLogoPath;
    }

    const radialItems = document.querySelectorAll('.radial-item[data-app]');

    radialItems.forEach((item) => {
        item.addEventListener('click', () => {
            const appType = item.getAttribute('data-app');

            if (appType === 'calculator') {
                openCalculator();
            } else if (appType === 'notes') {
                openNotesApp();
            } else if (appType === 'finder') {
                openWindow('Finder', '<p>Welcome to Finder. File system active.</p>');
            } else if (appType === 'terminal') {
                openWindow('Terminal', '<p style="font-family: monospace; color: #00ff66;">miku-os:~ user$ echo "Hello World"</p>');
            } else if (appType === 'settings') {
                openWindow('Settings', '<p>System Settings & Configuration.</p>');
            }
        });
    });
}