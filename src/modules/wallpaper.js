import { openWindow } from './windowManager.js';

const wallpaperModules = import.meta.glob(
    '../assets/wallpaper*.png',
    {
        eager: true,
        as: 'url'
    }
);

const wallpapers = Object.values(wallpaperModules);

let customWallpaperUrl = null;

export function initWallpaper() {
    const bgUpload =
        document.getElementById('bg-upload');

    const savedWallpaper =
        localStorage.getItem(
            'miku_wallpaper'
        );

    if (savedWallpaper) {
        document.body.style.backgroundImage =
            `url("${savedWallpaper}")`;
    } else if (wallpapers.length > 0) {
        document.body.style.backgroundImage =
            `url("${wallpapers[0]}")`;
    }

    bgUpload?.addEventListener(
        'change',
        event => {
            const file =
                event.target.files?.[0];

            if (!file) {
                return;
            }

            if (customWallpaperUrl) {
                URL.revokeObjectURL(
                    customWallpaperUrl
                );
            }

            customWallpaperUrl =
                URL.createObjectURL(file);

            document.body.style.backgroundImage =
                `url("${customWallpaperUrl}")`;
        }
    );
}

export function openWallpaperApp() {
    const container =
        document.createElement('div');

    container.className =
        'wallpaper-app';

    const title =
        document.createElement('div');

    title.className =
        'wallpaper-app-title';

    title.textContent =
        'Choose your wallpaper';

    const grid =
        document.createElement('div');

    grid.className =
        'wallpaper-grid';

    wallpapers.forEach(
        (url, index) => {
            const card =
                document.createElement('button');

            card.type = 'button';

            card.className =
                'wallpaper-card';

            const image =
                document.createElement('img');

            image.src = url;

            image.alt =
                `Wallpaper ${index + 1}`;

            const name =
                document.createElement('span');

            name.textContent =
                `Wallpaper ${index + 1}`;

            card.appendChild(
                image
            );

            card.appendChild(
                name
            );

            card.addEventListener(
                'click',
                () => {
                    setWallpaper(url);

                    grid
                        .querySelectorAll(
                            '.wallpaper-card'
                        )
                        .forEach(
                            item => {
                                item.classList.remove(
                                    'active'
                                );
                            }
                        );

                    card.classList.add(
                        'active'
                    );
                }
            );

            grid.appendChild(
                card
            );
        }
    );

    const uploadButton =
        document.createElement('button');

    uploadButton.type =
        'button';

    uploadButton.className =
        'wallpaper-upload-btn';

    uploadButton.textContent =
        'Choose image from computer';

    uploadButton.addEventListener(
        'click',
        () => {
            document
                .getElementById('bg-upload')
                ?.click();
        }
    );

    container.appendChild(
        title
    );

    container.appendChild(
        grid
    );

    container.appendChild(
        uploadButton
    );

    openWindow(
        'Wallpaper',
        container,
        {
            appId: 'wallpaper',
            width: 620,
            height: 480
        }
    );
}

function setWallpaper(url) {
    document.body.style.backgroundImage =
        `url("${url}")`;

    localStorage.setItem(
        'miku_wallpaper',
        url
    );
}