let activeZIndex = 100;
let windowCounter = 0;

export function openWindow(title, contentHTML, options = {}) {
    const desktop = document.getElementById('desktop');
    const windowId = `win-${Date.now()}-${++windowCounter}`;

    const width = options.width ? `${options.width}px` : '520px';
    const height = options.height ? `${options.height}px` : '360px';

    const win = document.createElement('div');
    win.className = 'os-window';
    win.id = windowId;
    win.style.width = width;
    win.style.height = height;
    win.style.top = `${60 + Math.random() * 30}px`;
    win.style.left = `${100 + Math.random() * 50}px`;
    win.style.zIndex = ++activeZIndex;

    win.innerHTML = `
        <div class="window-header">
            <div class="window-controls">
                <button class="control-btn btn-close" title="Close"></button>
                <button class="control-btn btn-minimize" title="Minimize"></button>
                <button class="control-btn btn-maximize" title="Maximize"></button>
            </div>
            <div class="window-title">${title}</div>
        </div>
        <div class="window-body">${contentHTML}</div>
    `;

    win.addEventListener('mousedown', () => {
        win.style.zIndex = ++activeZIndex;
    });

    // Close
    win.querySelector('.btn-close').addEventListener('click', (e) => {
        e.stopPropagation();
        removeTrayPill(windowId);
        win.remove();
    });

    // Minimize -> Moves window into side tray
    win.querySelector('.btn-minimize').addEventListener('click', (e) => {
        e.stopPropagation();
        minimizeToTray(win, title, windowId);
    });

    // Maximize
    win.querySelector('.btn-maximize').addEventListener('click', (e) => {
        e.stopPropagation();
        win.classList.toggle('maximized');
    });

    makeDraggable(win);
    desktop.appendChild(win);
}

function minimizeToTray(win, title, windowId) {
    win.classList.add('minimized');
    
    // Choose tray side dynamically to keep dock balanced
    const leftTray = document.getElementById('leftTray');
    const rightTray = document.getElementById('rightTray');
    const targetTray = leftTray.children.length <= rightTray.children.length ? leftTray : rightTray;

    if (!document.getElementById(`pill-${windowId}`)) {
        const pill = document.createElement('button');
        pill.className = 'dock-item tray-pill';
        pill.id = `pill-${windowId}`;
        pill.textContent = title;

        pill.addEventListener('click', () => {
            win.classList.remove('minimized');
            win.style.zIndex = ++activeZIndex;
            pill.remove();
        });

        targetTray.appendChild(pill);
    }
}

function removeTrayPill(windowId) {
    const pill = document.getElementById(`pill-${windowId}`);
    if (pill) pill.remove();
}

// Fast hardware-accelerated drag handler
function makeDraggable(win) {
    const header = win.querySelector('.window-header');
    let isDragging = false;
    let startX = 0, startY = 0;
    let initialLeft = 0, initialTop = 0;
    let rafId = null;

    header.addEventListener('mousedown', (e) => {
        if (win.classList.contains('maximized')) return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialLeft = win.offsetLeft;
        initialTop = win.offsetTop;
        document.body.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            win.style.left = `${initialLeft + dx}px`;
            win.style.top = `${initialTop + dy}px`;
        });
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            document.body.style.cursor = 'default';
        }
    });
}