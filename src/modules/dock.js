import { openCalculator } from './apps/calculator.js';
import { openNotesApp } from './apps/notes.js';
import { openWikipediaApp } from './apps/wikipedia.js';
import { openGoogleApp } from './apps/google.js';
import { openTerminalApp } from './apps/terminal.js';
import { openMikuFolderApp } from './apps/mikuFolder.js';
import {
    openMikuStore,
    getMikuStoreApps,
    launchInstalledApp
} from './apps/mikuStore.js';

export function initDock() {
    const dock =
        document.getElementById('macDock');

    if (!dock) {
        return;
    }

    const appLaunchers = {
        google: openGoogleApp,
        wikipedia: openWikipediaApp,
        calculator: openCalculator,
        notes: openNotesApp,
        'miku-folder': openMikuFolderApp,
        terminal: openTerminalApp,
        'miku-store': openMikuStore
    };

    loadInstalledApps(
        dock,
        appLaunchers
    );

    setupDockEffects(
        dock,
        appLaunchers
    );

    window.addEventListener(
        'mikuAppsChanged',
        () => {
            loadInstalledApps(
                dock,
                appLaunchers
            );

            setupClickHandlers(
                dock,
                appLaunchers
            );
        }
    );
}

function getInstalledApps() {
    try {
        const installed =
            JSON.parse(
                localStorage.getItem(
                    'miku_installed_apps'
                )
            );

        return Array.isArray(installed)
            ? installed
            : [];
    } catch {
        return [];
    }
}

function loadInstalledApps(
    dock,
    appLaunchers
) {
    const installed =
        getInstalledApps();

    const storeApps =
        getMikuStoreApps();

    dock
        .querySelectorAll(
            '.miku-installed-app'
        )
        .forEach(icon => {
            icon.remove();
        });

    installed.forEach(appId => {
        const app =
            storeApps.find(
                item => item.id === appId
            );

        if (!app) {
            return;
        }

        if (
            dock.querySelector(
                `[data-app="${app.id}"]`
            )
        ) {
            return;
        }

        const icon =
            document.createElement('div');

        icon.className =
            'dock-app miku-installed-app';

        icon.style.width = '52px';
        icon.style.height = '52px';
        icon.style.display = 'flex';
        icon.style.alignItems = 'center';
        icon.style.justifyContent = 'center';
        icon.style.flexShrink = '0';
        icon.style.borderRadius = '13px';
        icon.style.overflow = 'hidden';

        icon.setAttribute(
            'data-app',
            app.id
        );

        icon.setAttribute(
            'title',
            app.name
        );

        icon.innerHTML = `
            <img
                src="${app.icon}"
                alt="${app.name}"
                style="
                    width:42px;
                    height:42px;
                    max-width:42px;
                    max-height:42px;
                    object-fit:contain;
                    display:block;
                    flex-shrink:0;
                    border-radius:10px;
                "
            >
        `;

        dock.appendChild(icon);
    });

    setupClickHandlers(
        dock,
        appLaunchers
    );
}

function setupClickHandlers(
    dock,
    appLaunchers
) {
    const icons =
        dock.querySelectorAll(
            '.dock-app'
        );

    icons.forEach(icon => {
        if (
            icon.dataset.dockReady ===
            'true'
        ) {
            return;
        }

        icon.dataset.dockReady =
            'true';

        icon.addEventListener(
            'click',
            event => {
                event.stopPropagation();

                const appId =
                    icon.getAttribute(
                        'data-app'
                    );

                if (!appId) {
                    return;
                }

                icon.style.transition =
                    'transform 0.15s ease';

                icon.style.transform =
                    'scale(0.85) translateY(0px)';

                setTimeout(
                    async () => {
                        icon.style.transition =
                            '';

                        icon.style.transform =
                            '';

                        if (
                            appId ===
                            'wallpaper'
                        ) {
                            try {
                                const module =
                                    await import(
                                        './wallpaper.js'
                                    );

                                if (
                                    typeof module
                                        .openWallpaperApp ===
                                    'function'
                                ) {
                                    module
                                        .openWallpaperApp();
                                }
                            } catch (error) {
                                console.error(
                                    'Wallpaper failed to open:',
                                    error
                                );
                            }

                            return;
                        }

                        if (
                            appLaunchers[appId]
                        ) {
                            appLaunchers[
                                appId
                            ]();

                            return;
                        }

                        const installed =
                            getInstalledApps();

                        if (
                            installed.includes(
                                appId
                            )
                        ) {
                            launchInstalledApp(
                                appId
                            );
                        }
                    },
                    120
                );
            }
        );
    });
}

function setupDockEffects(
    dock,
    appLaunchers
) {
    if (
        dock.dataset.effectsReady ===
        'true'
    ) {
        setupClickHandlers(
            dock,
            appLaunchers
        );

        return;
    }

    dock.dataset.effectsReady =
        'true';

    dock.addEventListener(
        'mousemove',
        event => {
            const icons =
                dock.querySelectorAll(
                    '.dock-app'
                );

            const mouseX =
                event.clientX;

            const maxDistance = 140;
            const maxScale = 1.4;
            const minScale = 1;

            icons.forEach(icon => {
                const rect =
                    icon.getBoundingClientRect();

                const centerX =
                    rect.left +
                    rect.width / 2;

                const distance =
                    Math.abs(
                        mouseX -
                        centerX
                    );

                if (
                    distance <
                    maxDistance
                ) {
                    const scale =
                        maxScale -
                        (
                            distance /
                            maxDistance
                        ) *
                        (
                            maxScale -
                            minScale
                        );

                    icon.style.transform =
                        `scale(${scale}) translateY(-${(scale - 1) * 12}px)`;
                } else {
                    icon.style.transform =
                        'scale(1) translateY(0px)';
                }
            });
        }
    );

    dock.addEventListener(
        'mouseleave',
        () => {
            dock
                .querySelectorAll(
                    '.dock-app'
                )
                .forEach(icon => {
                    icon.style.transform =
                        'scale(1) translateY(0px)';
                });
        }
    );

    setupClickHandlers(
        dock,
        appLaunchers
    );
}