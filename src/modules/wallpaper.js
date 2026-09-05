import { openWindow } from './windowManager.js';

const wallpaperModules = import.meta.glob('../assets/walpaper-*.*', { eager: true, as: 'url' });
const wallpapers = Object.values(wallpaperModules);

export function initWallpaper() {
    const bgBtn = document.getElementById('change-bg-btn');
    const bgUpload = document.getElementById('bg-upload');

    if (wallpapers.length > 0) {
        document.body.style.backgroundImage = `url('${wallpapers[0]}')`;
    }

    bgBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        openWallpaperPicker();
    });

    bgBtn?.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        e.stopPropagation();
        bgUpload?.click();
    });

    bgUpload?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            document.body.style.backgroundImage = `url('${imageUrl}')`;
        }
    });
}

function openWallpaperPicker() {
    let gridHTML = '<div class="wallpaper-grid">';
    
    wallpapers.forEach((url, index) => {
        gridHTML += `
            <div class="wallpaper-card" data-url="${url}">
                <img src="${url}" alt="Wallpaper ${index + 1}" />
                <span>Wallpaper ${index + 1}</span>
            </div>
        `;
    });
    
    gridHTML += '</div>';

    openWindow('Wallpaper Gallery', gridHTML, { width: 520, height: 380 });

    setTimeout(() => {
        const cards = document.querySelectorAll('.wallpaper-card');
        cards.forEach((card) => {
            card.addEventListener('click', () => {
                const selectedUrl = card.getAttribute('data-url');
                document.body.style.backgroundImage = `url('${selectedUrl}')`;
                
                cards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
            });
        });
    }, 50);
}