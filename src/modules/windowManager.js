let activeZIndex = 100;
let windowCounter = 0;

export function updateDockIndicator(appId, isOpen) {
    if (!appId) {
        return;
    }

    const dockIcon = document.querySelector(
        `.dock-app[data-app="${appId}"]`
    );

    if (!dockIcon) {
        return;
    }

    if (isOpen) {
        dockIcon.classList.add('active');
    } else {
        dockIcon.classList.remove('active');
    }
}

export function openWindow(title, contentHTML, options = {}) {
    const desktop =
        document.getElementById('desktop') ||
        document.body;

    const appId =
        typeof options === 'string'
            ? options
            : (
                options.appId ||
                title
                    .toLowerCase()
                    .replace(/\s+/g, '-')
            );

    let win =
        document.querySelector(
            `.os-window[data-app-id="${appId}"]`
        );

    if (win) {
        win.classList.remove('minimized');
        win.style.display = 'flex';
        win.style.zIndex = ++activeZIndex;

        updateDockIndicator(
            appId,
            true
        );

        return win;
    }

    const windowId =
        `win-${Date.now()}-${++windowCounter}`;

    const width = options.width
        ? `${options.width}px`
        : '520px';

    const height = options.height
        ? `${options.height}px`
        : '360px';

    win = document.createElement('div');

    win.className = 'os-window';
    win.id = windowId;
    win.setAttribute(
        'data-app-id',
        appId
    );

    win.style.width = width;
    win.style.height = height;
    win.style.top =
        `${60 + Math.random() * 30}px`;
    win.style.left =
        `${100 + Math.random() * 50}px`;
    win.style.zIndex =
        ++activeZIndex;

    win.innerHTML = `
        <div class="window-header">
            <div class="window-controls">
                <button
                    class="control-btn btn-close"
                    title="Close"
                ></button>

                <button
                    class="control-btn btn-minimize"
                    title="Minimize"
                ></button>

                <button
                    class="control-btn btn-maximize"
                    title="Maximize"
                ></button>
            </div>

            <div class="window-title">
                ${title}
            </div>
        </div>

        <div class="window-body"></div>
    `;

    const windowBody =
        win.querySelector(
            '.window-body'
        );

    if (
        contentHTML instanceof Node
    ) {
        windowBody.appendChild(
            contentHTML
        );
    } else {
        windowBody.innerHTML =
            contentHTML;
    }

    win.addEventListener(
        'mousedown',
        () => {
            win.style.zIndex =
                ++activeZIndex;
        }
    );

    const closeButton =
        win.querySelector(
            '.btn-close'
        );

    const minimizeButton =
        win.querySelector(
            '.btn-minimize'
        );

    const maximizeButton =
        win.querySelector(
            '.btn-maximize'
        );

    closeButton?.addEventListener(
        'click',
        event => {
            event.stopPropagation();

            updateDockIndicator(
                appId,
                false
            );

            win.remove();
        }
    );

    minimizeButton?.addEventListener(
        'click',
        event => {
            event.stopPropagation();

            win.classList.add(
                'minimized'
            );

            win.style.display =
                'none';
        }
    );

    maximizeButton?.addEventListener(
        'click',
        event => {
            event.stopPropagation();

            win.classList.toggle(
                'maximized'
            );
        }
    );

    makeDraggable(win);

    desktop.appendChild(win);

    updateDockIndicator(
        appId,
        true
    );

    return win;
}

function makeDraggable(win) {
    const header =
        win.querySelector(
            '.window-header'
        );

    if (!header) {
        return;
    }

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;
    let rafId = null;

    header.addEventListener(
        'mousedown',
        event => {
            if (
                win.classList.contains(
                    'maximized'
                )
            ) {
                return;
            }

            if (
                event.target.closest(
                    '.window-controls'
                )
            ) {
                return;
            }

            isDragging = true;

            startX = event.clientX;
            startY = event.clientY;

            initialLeft =
                win.offsetLeft;

            initialTop =
                win.offsetTop;

            document.body.style.cursor =
                'grabbing';
        }
    );

    document.addEventListener(
        'mousemove',
        event => {
            if (!isDragging) {
                return;
            }

            if (rafId) {
                cancelAnimationFrame(
                    rafId
                );
            }

            rafId =
                requestAnimationFrame(
                    () => {
                        const dx =
                            event.clientX -
                            startX;

                        const dy =
                            event.clientY -
                            startY;

                        win.style.left =
                            `${initialLeft + dx}px`;

                        win.style.top =
                            `${initialTop + dy}px`;
                    }
                );
        }
    );

    document.addEventListener(
        'mouseup',
        () => {
            if (!isDragging) {
                return;
            }

            isDragging = false;

            document.body.style.cursor =
                'default';
        }
    );
}