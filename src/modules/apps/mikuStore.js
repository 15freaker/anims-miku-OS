import { openWindow } from '../windowManager.js';

const ICON = name =>
    new URL(
        `../../assets/icons/${name}.png`,
        import.meta.url
    ).href;

const APPS = [
    {
        id: 'text-editor',
        name: 'Text Editor',
        description: 'Write and edit plain text.',
        category: 'Productivity',
        icon: ICON('notes'),
        open: openTextEditor
    },
    {
        id: 'paint',
        name: 'Paint',
        description: 'Draw directly inside Miku-OS.',
        category: 'Creative',
        icon: ICON('paint'),
        open: openPaint
    },
    {
        id: 'calculator',
        name: 'Calculator',
        description: 'A simple scientific calculator.',
        category: 'Utilities',
        icon: ICON('calculator'),
        open: openCalculator
    },
    {
        id: 'color-picker',
        name: 'Color Picker',
        description: 'Choose colors and copy their codes.',
        category: 'Creative',
        icon: ICON('color-pick'),
        open: openColorPicker
    },
    {
        id: 'code-playground',
        name: 'Code Playground',
        description: 'Write HTML, CSS and JavaScript.',
        category: 'Development',
        icon: ICON('code-ground'),
        open: openCodePlayground
    },
    {
        id: 'json-tool',
        name: 'JSON Tool',
        description: 'Format and inspect JSON data.',
        category: 'Development',
        icon: ICON('json-view'),
        open: openJSONTool
    },
    {
        id: 'markdown',
        name: 'Markdown',
        description: 'Write Markdown and preview it.',
        category: 'Productivity',
        icon: ICON('markdown'),
        open: openMarkdown
    },
    {
        id: 'image-viewer',
        name: 'Image Viewer',
        description: 'Preview images from your computer.',
        category: 'Media',
        icon: ICON('photos'),
        open: openImageViewer
    },
    {
        id: 'stopwatch',
        name: 'Stopwatch',
        description: 'Track time with a stopwatch.',
        category: 'Utilities',
        icon: ICON('timer'),
        open: openStopwatch
    },
    {
        id: 'timer',
        name: 'Timer',
        description: 'Set a countdown timer.',
        category: 'Utilities',
        icon: ICON('timer'),
        open: openTimer
    },
    {
        id: 'unit-converter',
        name: 'Unit Converter',
        description: 'Convert common measurements.',
        category: 'Utilities',
        icon: ICON('unitconverter'),
        open: openUnitConverter
    },
    {
        id: 'qr-generator',
        name: 'QR Generator',
        description: 'Create a QR code from text.',
        category: 'Utilities',
        icon: ICON('qr'),
        open: openQRGenerator
    },
    {
        id: 'system-info',
        name: 'System Info',
        description: 'View information about Miku-OS.',
        category: 'System',
        icon: ICON('settings'),
        open: openSystemInfo
    },
    {
        id: 'music-player',
        name: 'Music Player',
        description: 'Play audio files inside Miku-OS.',
        category: 'Media',
        icon: ICON('music'),
        open: openMusicPlayer
    }
];

const STORAGE_KEY = 'miku_installed_apps';

let storeStyleAdded = false;

function addStoreStyles() {
    if (storeStyleAdded) {
        return;
    }

    storeStyleAdded = true;

    const style = document.createElement('style');

    style.textContent = `
        .miku-store {
            display: flex;
            flex-direction: column;
            gap: 18px;
            height: 100%;
            min-height: 0;
        }

        .miku-store-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 14px;
            flex-wrap: wrap;
        }

        .miku-store-title {
            font-size: 22px;
            font-weight: 700;
            color: #ffffff;
        }

        .miku-store-subtitle {
            margin-top: 4px;
            color: rgba(255,255,255,.55);
            font-size: 12px;
        }

        .miku-store-search {
            width: 220px;
            max-width: 100%;
            box-sizing: border-box;
            padding: 10px 13px;
            border-radius: 10px;
            border: 1px solid rgba(255,255,255,.13);
            background: rgba(0,0,0,.25);
            color: #ffffff;
            outline: none;
        }

        .miku-store-search:focus {
            border-color: rgba(0,243,255,.65);
        }

        .miku-store-content {
            overflow-y: auto;
            padding: 2px 4px 12px 2px;
        }

        .miku-store-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill,minmax(190px,1fr));
            gap: 14px;
        }

        .miku-store-card {
            position: relative;
            display: flex;
            flex-direction: column;
            min-height: 205px;
            padding: 15px;
            box-sizing: border-box;
            border-radius: 15px;
            border: 1px solid rgba(255,255,255,.1);
            background: linear-gradient(
                145deg,
                rgba(255,255,255,.075),
                rgba(255,255,255,.025)
            );
            transition:
                transform .2s ease,
                border-color .2s ease,
                background .2s ease;
        }

        .miku-store-card:hover {
            transform: translateY(-3px);
            border-color: rgba(0,243,255,.4);
            background: rgba(0,243,255,.055);
        }

        .miku-store-icon {
            width: 58px;
            height: 58px;
            padding: 10px;
            box-sizing: border-box;
            border-radius: 15px;
            background: rgba(255,255,255,.08);
            border: 1px solid rgba(255,255,255,.1);
            object-fit: contain;
        }

        .miku-store-card h3 {
            margin: 13px 0 5px;
            font-size: 15px;
            color: #ffffff;
        }

        .miku-store-card p {
            margin: 0;
            color: rgba(255,255,255,.55);
            font-size: 12px;
            line-height: 1.45;
            flex-grow: 1;
        }

        .miku-store-category {
            display: inline-block;
            margin-top: 10px;
            color: rgba(0,243,255,.8);
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: .6px;
        }

        .miku-store-actions {
            display: flex;
            gap: 7px;
            margin-top: 13px;
        }

        .miku-store-button {
            flex: 1;
            border: 1px solid rgba(255,255,255,.12);
            border-radius: 8px;
            padding: 8px 9px;
            color: #ffffff;
            background: rgba(255,255,255,.07);
            cursor: pointer;
            font-size: 11px;
            transition: .2s ease;
        }

        .miku-store-button:hover {
            background: rgba(0,243,255,.16);
            border-color: rgba(0,243,255,.4);
        }

        .miku-store-button.installed {
            color: #00f3ff;
        }

        .miku-store-empty {
            padding: 40px;
            text-align: center;
            color: rgba(255,255,255,.5);
        }

        .miku-app-layout {
            display: flex;
            flex-direction: column;
            gap: 12px;
            height: 100%;
        }

        .miku-app-input,
        .miku-app-textarea,
        .miku-app-select {
            box-sizing: border-box;
            width: 100%;
            border: 1px solid rgba(255,255,255,.12);
            border-radius: 8px;
            background: rgba(0,0,0,.3);
            color: #ffffff;
            padding: 9px 10px;
            outline: none;
        }

        .miku-app-textarea {
            resize: vertical;
            min-height: 130px;
            font-family: monospace;
        }

        .miku-app-button {
            border: 1px solid rgba(0,243,255,.35);
            background: rgba(0,243,255,.1);
            color: #00f3ff;
            border-radius: 8px;
            padding: 9px 13px;
            cursor: pointer;
        }

        .miku-app-button:hover {
            background: rgba(0,243,255,.2);
        }

        .miku-app-row {
            display: flex;
            gap: 8px;
            align-items: center;
        }

        .miku-code-editor {
            flex: 1;
            min-height: 220px;
            font-family: monospace;
            font-size: 13px;
            background: #071018;
            color: #d9faff;
            border: 1px solid rgba(255,255,255,.1);
            border-radius: 8px;
            padding: 12px;
            resize: none;
            box-sizing: border-box;
        }

        .miku-preview {
            flex: 1;
            min-height: 220px;
            background: #ffffff;
            border-radius: 8px;
            border: none;
        }

        .miku-big-number {
            font-family: monospace;
            font-size: 34px;
            color: #00f3ff;
            text-align: center;
            padding: 18px;
        }

        .miku-color-preview {
            height: 130px;
            border-radius: 12px;
            border: 1px solid rgba(255,255,255,.12);
        }

        .miku-info-grid {
            display: grid;
            grid-template-columns: 150px 1fr;
            gap: 8px;
            font-size: 13px;
        }

        .miku-info-label {
            color: rgba(255,255,255,.5);
        }

        .miku-qr {
            width: 220px;
            height: 220px;
            max-width: 100%;
            margin: auto;
            display: block;
        }

        .miku-store-toast {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 100000;
            background: rgba(8,20,28,.95);
            border: 1px solid rgba(0,243,255,.4);
            color: #ffffff;
            padding: 10px 16px;
            border-radius: 9px;
            font-size: 12px;
            pointer-events: none;
        }
    `;

    document.head.appendChild(style);
}

function getInstalledApps() {
    try {
        const apps = JSON.parse(
            localStorage.getItem(STORAGE_KEY)
        );

        return Array.isArray(apps)
            ? apps
            : [];
    } catch {
        return [];
    }
}

function saveInstalledApps(apps) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(apps)
    );

    window.dispatchEvent(
        new CustomEvent('mikuAppsChanged')
    );
}

function isInstalled(id) {
    return getInstalledApps().includes(id);
}

function installApp(id) {
    const installed = getInstalledApps();

    if (!installed.includes(id)) {
        installed.push(id);
        saveInstalledApps(installed);
        showToast('App installed');
    }
}

function uninstallApp(id) {
    const installed =
        getInstalledApps().filter(
            appId => appId !== id
        );

    saveInstalledApps(installed);
    showToast('App removed');
}

function showToast(message) {
    const old =
        document.querySelector(
            '.miku-store-toast'
        );

    old?.remove();

    const toast =
        document.createElement('div');

    toast.className =
        'miku-store-toast';

    toast.textContent =
        message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 1600);
}

export function getMikuStoreApps() {
    return APPS.map(app => ({
        ...app
    }));
}

export function openMikuStore() {
    addStoreStyles();

    const root =
        document.createElement('div');

    root.className =
        'miku-store';

    root.innerHTML = `
        <div class="miku-store-top">
            <div>
                <div class="miku-store-title">
                    Miku Store
                </div>

                <div class="miku-store-subtitle">
                    Applications made for Miku-OS
                </div>
            </div>

            <input
                class="miku-store-search"
                type="search"
                placeholder="Search apps..."
            >
        </div>

        <div class="miku-store-content">
            <div class="miku-store-grid"></div>
        </div>
    `;

    const grid =
        root.querySelector(
            '.miku-store-grid'
        );

    const search =
        root.querySelector(
            '.miku-store-search'
        );

    function render(filter = '') {
        const query =
            filter.trim().toLowerCase();

        const apps =
            APPS.filter(app =>
                `${app.name} ${app.description} ${app.category}`
                    .toLowerCase()
                    .includes(query)
            );

        grid.innerHTML = '';

        if (!apps.length) {
            grid.innerHTML = `
                <div class="miku-store-empty">
                    No apps found
                </div>
            `;

            return;
        }

        apps.forEach(app => {
            const installed =
                isInstalled(app.id);

            const card =
                document.createElement('div');

            card.className =
                'miku-store-card';

            card.innerHTML = `
                <img
                    class="miku-store-icon"
                    src="${app.icon}"
                    alt="${app.name}"
                >

                <h3>${app.name}</h3>

                <p>${app.description}</p>

                <span class="miku-store-category">
                    ${app.category}
                </span>

                <div class="miku-store-actions">
                    <button
                        class="miku-store-button install-button ${installed ? 'installed' : ''}"
                    >
                        ${installed ? 'Installed' : 'Install'}
                    </button>

                    <button
                        class="miku-store-button open-button"
                    >
                        Open
                    </button>
                </div>
            `;

            const icon =
                card.querySelector(
                    '.miku-store-icon'
                );

            icon.addEventListener(
                'error',
                () => {
                    icon.removeAttribute('src');
                    icon.alt = app.name;
                }
            );

            const installButton =
                card.querySelector(
                    '.install-button'
                );

            const openButton =
                card.querySelector(
                    '.open-button'
                );

            installButton.addEventListener(
                'click',
                () => {
                    if (isInstalled(app.id)) {
                        uninstallApp(app.id);
                    } else {
                        installApp(app.id);
                    }

                    render(search.value);
                }
            );

            openButton.addEventListener(
                'click',
                () => {
                    if (!isInstalled(app.id)) {
                        installApp(app.id);
                    }

                    app.open();
                    render(search.value);
                }
            );

            grid.appendChild(card);
        });
    }

    search.addEventListener(
        'input',
        () => {
            render(search.value);
        }
    );

    render();

    return openWindow(
        'Miku Store',
        root,
        {
            appId: 'miku-store',
            width: 850,
            height: 600
        }
    );
}

export function launchInstalledApp(id) {
    const app =
        APPS.find(
            item => item.id === id
        );

    if (!app) {
        return;
    }

    if (!isInstalled(id)) {
        installApp(id);
    }

    app.open();
}

function createApp(
    title,
    content,
    width = 600,
    height = 450
) {
    addStoreStyles();

    return openWindow(
        title,
        content,
        {
            appId:
                `store-${title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')}`,
            width,
            height
        }
    );
}

function openTextEditor() {
    const root =
        document.createElement('div');

    root.className =
        'miku-app-layout';

    root.innerHTML = `
        <div class="miku-app-row">
            <button class="miku-app-button save">
                Save
            </button>

            <button class="miku-app-button clear">
                Clear
            </button>
        </div>

        <textarea
            class="miku-app-textarea"
            style="flex:1;min-height:280px"
            placeholder="Start writing..."
        ></textarea>
    `;

    const textarea =
        root.querySelector('textarea');

    textarea.value =
        localStorage.getItem(
            'miku_store_text_editor'
        ) || '';

    root.querySelector('.save')
        .addEventListener(
            'click',
            () => {
                localStorage.setItem(
                    'miku_store_text_editor',
                    textarea.value
                );

                showToast(
                    'Text saved'
                );
            }
        );

    root.querySelector('.clear')
        .addEventListener(
            'click',
            () => {
                textarea.value = '';
            }
        );

    createApp(
        'Text Editor',
        root,
        620,
        500
    );
}

function openPaint() {
    const root =
        document.createElement('div');

    root.className =
        'miku-app-layout';

    root.innerHTML = `
        <div class="miku-app-row">
            <input
                type="color"
                value="#00f3ff"
                class="color"
            >

            <input
                type="range"
                min="1"
                max="40"
                value="5"
                class="size"
            >

            <button class="miku-app-button clear">
                Clear
            </button>
        </div>

        <canvas
            style="
                flex:1;
                min-height:300px;
                width:100%;
                background:#ffffff;
                border-radius:10px;
                cursor:crosshair;
                touch-action:none;
            "
        ></canvas>
    `;

    const canvas =
        root.querySelector('canvas');

    const ctx =
        canvas.getContext('2d');

    const color =
        root.querySelector('.color');

    const size =
        root.querySelector('.size');

    let drawing = false;

    function resizeCanvas() {
        const rect =
            canvas.getBoundingClientRect();

        if (
            rect.width <= 0 ||
            rect.height <= 0
        ) {
            return;
        }

        canvas.width =
            Math.floor(
                rect.width * devicePixelRatio
            );

        canvas.height =
            Math.floor(
                rect.height * devicePixelRatio
            );

        ctx.setTransform(
            devicePixelRatio,
            0,
            0,
            devicePixelRatio,
            0,
            0
        );
    }

    function position(event) {
        const rect =
            canvas.getBoundingClientRect();

        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    canvas.addEventListener(
        'pointerdown',
        event => {
            drawing = true;

            canvas.setPointerCapture(
                event.pointerId
            );

            const p =
                position(event);

            ctx.beginPath();

            ctx.moveTo(
                p.x,
                p.y
            );
        }
    );

    canvas.addEventListener(
        'pointermove',
        event => {
            if (!drawing) {
                return;
            }

            const p =
                position(event);

            ctx.strokeStyle =
                color.value;

            ctx.lineWidth =
                Number(size.value);

            ctx.lineCap =
                'round';

            ctx.lineJoin =
                'round';

            ctx.lineTo(
                p.x,
                p.y
            );

            ctx.stroke();
        }
    );

    canvas.addEventListener(
        'pointerup',
        () => {
            drawing = false;
        }
    );

    canvas.addEventListener(
        'pointercancel',
        () => {
            drawing = false;
        }
    );

    root.querySelector('.clear')
        .addEventListener(
            'click',
            () => {
                ctx.clearRect(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );
            }
        );

    createApp(
        'Paint',
        root,
        700,
        550
    );

    setTimeout(
        resizeCanvas,
        100
    );
}

function openCalculator() {
    const root =
        document.createElement('div');

    root.className =
        'miku-app-layout';

    root.innerHTML = `
        <input
            class="miku-app-input display"
            readonly
            style="font-size:24px;text-align:right"
            value="0"
        >

        <div
            style="
                display:grid;
                grid-template-columns:repeat(4,1fr);
                gap:8px;
                flex:1;
            "
        >
            ${[
                '7',
                '8',
                '9',
                '/',
                '4',
                '5',
                '6',
                '*',
                '1',
                '2',
                '3',
                '-',
                '0',
                '.',
                '=',
                '+',
                'C',
                '(',
                ')',
                '%'
            ].map(key => `
                <button
                    class="miku-app-button calc"
                    data-key="${key}"
                    style="font-size:17px"
                >
                    ${key}
                </button>
            `).join('')}
        </div>
    `;

    const display =
        root.querySelector('.display');

    let expression = '';

    root.querySelectorAll('.calc')
        .forEach(button => {
            button.addEventListener(
                'click',
                () => {
                    const key =
                        button.dataset.key;

                    if (key === 'C') {
                        expression = '';
                        display.value = '0';
                        return;
                    }

                    if (key === '=') {
                        if (
                            !/^[0-9+\-*/%().\s]+$/.test(
                                expression
                            )
                        ) {
                            display.value =
                                'Error';

                            expression = '';

                            return;
                        }

                        try {
                            const result =
                                Function(
                                    `"use strict";return (${expression})`
                                )();

                            expression =
                                String(result);

                            display.value =
                                expression;
                        } catch {
                            expression = '';
                            display.value =
                                'Error';
                        }

                        return;
                    }

                    expression += key;

                    display.value =
                        expression;
                }
            );
        });

    createApp(
        'Calculator',
        root,
        400,
        500
    );
}

function openColorPicker() {
    const root =
        document.createElement('div');

    root.className =
        'miku-app-layout';

    root.innerHTML = `
        <input
            type="color"
            class="picker"
            value="#00f3ff"
            style="
                width:100%;
                height:70px;
                border:none;
                background:none;
            "
        >

        <div class="miku-color-preview"></div>

        <input
            class="miku-app-input hex"
            readonly
        >

        <button class="miku-app-button copy">
            Copy Color
        </button>
    `;

    const picker =
        root.querySelector('.picker');

    const preview =
        root.querySelector(
            '.miku-color-preview'
        );

    const hex =
        root.querySelector('.hex');

    function update() {
        preview.style.background =
            picker.value;

        hex.value =
            picker.value.toUpperCase();
    }

    picker.addEventListener(
        'input',
        update
    );

    root.querySelector('.copy')
        .addEventListener(
            'click',
            async () => {
                try {
                    await navigator.clipboard.writeText(
                        picker.value
                    );

                    showToast(
                        'Color copied'
                    );
                } catch {
                    hex.select();
                    document.execCommand(
                        'copy'
                    );

                    showToast(
                        'Color copied'
                    );
                }
            }
        );

    update();

    createApp(
        'Color Picker',
        root,
        400,
        380
    );
}

function openCodePlayground() {
    const root =
        document.createElement('div');

    root.style.cssText =
        'display:flex;flex-direction:column;height:100%;gap:10px';

    root.innerHTML = `
        <div class="miku-app-row">
            <button class="miku-app-button run">
                Run
            </button>
        </div>

        <textarea class="miku-code-editor"><!DOCTYPE html>
<html>
<body>
<h1>Hello Miku-OS</h1>
<p>Edit this code and press Run.</p>
</body>
</html></textarea>

        <iframe
            class="miku-preview"
            sandbox="allow-scripts"
        ></iframe>
    `;

    const editor =
        root.querySelector(
            '.miku-code-editor'
        );

    const preview =
        root.querySelector(
            '.miku-preview'
        );

    function run() {
        preview.srcdoc =
            editor.value;
    }

    root.querySelector('.run')
        .addEventListener(
            'click',
            run
        );

    run();

    createApp(
        'Code Playground',
        root,
        800,
        620
    );
}

function openJSONTool() {
    const root =
        document.createElement('div');

    root.className =
        'miku-app-layout';

    root.innerHTML = `
        <textarea
            class="miku-app-textarea input"
            placeholder="Paste JSON here..."
        ></textarea>

        <div class="miku-app-row">
            <button class="miku-app-button format">
                Format
            </button>

            <button class="miku-app-button minify">
                Minify
            </button>
        </div>

        <textarea
            class="miku-app-textarea output"
            readonly
        ></textarea>
    `;

    const input =
        root.querySelector('.input');

    const output =
        root.querySelector('.output');

    root.querySelector('.format')
        .addEventListener(
            'click',
            () => {
                try {
                    output.value =
                        JSON.stringify(
                            JSON.parse(
                                input.value
                            ),
                            null,
                            4
                        );
                } catch {
                    output.value =
                        'Invalid JSON';
                }
            }
        );

    root.querySelector('.minify')
        .addEventListener(
            'click',
            () => {
                try {
                    output.value =
                        JSON.stringify(
                            JSON.parse(
                                input.value
                            )
                        );
                } catch {
                    output.value =
                        'Invalid JSON';
                }
            }
        );

    createApp(
        'JSON Tool',
        root,
        650,
        520
    );
}

function openMarkdown() {
    const root =
        document.createElement('div');

    root.style.cssText =
        'display:flex;gap:12px;height:100%';

    root.innerHTML = `
        <textarea
            class="miku-code-editor"
            placeholder="# Heading"
        ></textarea>

        <div
            class="miku-preview markdown-preview"
            style="
                color:#111;
                padding:20px;
                overflow:auto;
            "
        ></div>
    `;

    const editor =
        root.querySelector('textarea');

    const preview =
        root.querySelector(
            '.markdown-preview'
        );

    function render() {
        let text =
            editor.value
                .replace(
                    /&/g,
                    '&amp;'
                )
                .replace(
                    /</g,
                    '&lt;'
                )
                .replace(
                    />/g,
                    '&gt;'
                );

        text =
            text.replace(
                /^### (.*)$/gm,
                '<h3>$1</h3>'
            );

        text =
            text.replace(
                /^## (.*)$/gm,
                '<h2>$1</h2>'
            );

        text =
            text.replace(
                /^# (.*)$/gm,
                '<h1>$1</h1>'
            );

        text =
            text.replace(
                /\*\*(.*?)\*\*/g,
                '<strong>$1</strong>'
            );

        text =
            text.replace(
                /\*(.*?)\*/g,
                '<em>$1</em>'
            );

        text =
            text.replace(
                /\n/g,
                '<br>'
            );

        preview.innerHTML =
            text;
    }

    editor.addEventListener(
        'input',
        render
    );

    render();

    createApp(
        'Markdown',
        root,
        800,
        560
    );
}

function openImageViewer() {
    const root =
        document.createElement('div');

    root.className =
        'miku-app-layout';

    root.innerHTML = `
        <input
            type="file"
            accept="image/*"
            class="file"
        >

        <div
            style="
                flex:1;
                display:flex;
                align-items:center;
                justify-content:center;
                overflow:hidden;
            "
        >
            <img
                class="image"
                style="
                    max-width:100%;
                    max-height:100%;
                    object-fit:contain;
                    border-radius:8px;
                "
            >
        </div>
    `;

    const file =
        root.querySelector('.file');

    const image =
        root.querySelector('.image');

    file.addEventListener(
        'change',
        () => {
            const selected =
                file.files[0];

            if (!selected) {
                return;
            }

            image.src =
                URL.createObjectURL(
                    selected
                );
        }
    );

    createApp(
        'Image Viewer',
        root,
        700,
        550
    );
}

function openStopwatch() {
    const root =
        document.createElement('div');

    root.className =
        'miku-app-layout';

    root.innerHTML = `
        <div class="miku-big-number">
            00:00:00.000
        </div>

        <div class="miku-app-row">
            <button class="miku-app-button start">
                Start
            </button>

            <button class="miku-app-button reset">
                Reset
            </button>
        </div>
    `;

    const display =
        root.querySelector(
            '.miku-big-number'
        );

    let started = false;
    let startTime = 0;
    let elapsed = 0;
    let frame = null;

    function update() {
        const value =
            elapsed +
            (
                started
                    ? performance.now() - startTime
                    : 0
            );

        const ms =
            Math.floor(
                value % 1000
            );

        const seconds =
            Math.floor(
                value / 1000
            ) % 60;

        const minutes =
            Math.floor(
                value / 60000
            ) % 60;

        const hours =
            Math.floor(
                value / 3600000
            );

        display.textContent =
            `${String(hours).padStart(2,'0')}:` +
            `${String(minutes).padStart(2,'0')}:` +
            `${String(seconds).padStart(2,'0')}.` +
            `${String(ms).padStart(3,'0')}`;

        if (started) {
            frame =
                requestAnimationFrame(
                    update
                );
        }
    }

    root.querySelector('.start')
        .addEventListener(
            'click',
            () => {
                if (started) {
                    elapsed +=
                        performance.now() -
                        startTime;

                    started = false;

                    root.querySelector(
                        '.start'
                    ).textContent =
                        'Start';

                    cancelAnimationFrame(
                        frame
                    );

                    update();

                    return;
                }

                startTime =
                    performance.now();

                started = true;

                root.querySelector(
                    '.start'
                ).textContent =
                    'Pause';

                update();
            }
        );

    root.querySelector('.reset')
        .addEventListener(
            'click',
            () => {
                started = false;
                elapsed = 0;

                cancelAnimationFrame(
                    frame
                );

                root.querySelector(
                    '.start'
                ).textContent =
                    'Start';

                update();
            }
        );

    createApp(
        'Stopwatch',
        root,
        430,
        300
    );
}

function openTimer() {
    const root =
        document.createElement('div');

    root.className =
        'miku-app-layout';

    root.innerHTML = `
        <input
            type="number"
            class="miku-app-input seconds"
            min="1"
            value="60"
            placeholder="Seconds"
        >

        <div class="miku-big-number">
            01:00
        </div>

        <div class="miku-app-row">
            <button class="miku-app-button start">
                Start
            </button>

            <button class="miku-app-button reset">
                Reset
            </button>
        </div>
    `;

    const seconds =
        root.querySelector('.seconds');

    const display =
        root.querySelector(
            '.miku-big-number'
        );

    let remaining =
        Number(seconds.value);

    let interval = null;

    function render() {
        const minutes =
            Math.floor(
                remaining / 60
            );

        const secs =
            remaining % 60;

        display.textContent =
            `${String(minutes).padStart(2,'0')}:` +
            `${String(secs).padStart(2,'0')}`;
    }

    seconds.addEventListener(
        'input',
        () => {
            remaining =
                Number(seconds.value) || 0;

            render();
        }
    );

    root.querySelector('.start')
        .addEventListener(
            'click',
            () => {
                if (interval) {
                    clearInterval(
                        interval
                    );

                    interval = null;

                    return;
                }

                interval =
                    setInterval(
                        () => {
                            remaining--;

                            render();

                            if (
                                remaining <= 0
                            ) {
                                clearInterval(
                                    interval
                                );

                                interval = null;

                                showToast(
                                    'Timer finished'
                                );
                            }
                        },
                        1000
                    );
            }
        );

    root.querySelector('.reset')
        .addEventListener(
            'click',
            () => {
                clearInterval(
                    interval
                );

                interval = null;

                remaining =
                    Number(
                        seconds.value
                    ) || 0;

                render();
            }
        );

    render();

    createApp(
        'Timer',
        root,
        430,
        330
    );
}

function openUnitConverter() {
    const root =
        document.createElement('div');

    root.className =
        'miku-app-layout';

    root.innerHTML = `
        <select class="miku-app-select type">
            <option value="km-mi">Kilometres → Miles</option>
            <option value="mi-km">Miles → Kilometres</option>
            <option value="kg-lb">Kilograms → Pounds</option>
            <option value="lb-kg">Pounds → Kilograms</option>
            <option value="c-f">Celsius → Fahrenheit</option>
            <option value="f-c">Fahrenheit → Celsius</option>
            <option value="m-ft">Metres → Feet</option>
            <option value="ft-m">Feet → Metres</option>
        </select>

        <input
            class="miku-app-input input"
            type="number"
            value="1"
        >

        <div class="miku-big-number result">
            0
        </div>
    `;

    const type =
        root.querySelector('.type');

    const input =
        root.querySelector('.input');

    const result =
        root.querySelector('.result');

    function convert() {
        const value =
            Number(input.value);

        const formulas = {
            'km-mi': value * 0.621371,
            'mi-km': value * 1.609344,
            'kg-lb': value * 2.2046226218,
            'lb-kg': value * 0.45359237,
            'c-f': value * 9 / 5 + 32,
            'f-c': (value - 32) * 5 / 9,
            'm-ft': value * 3.280839895,
            'ft-m': value * 0.3048
        };

        result.textContent =
            Number(
                formulas[type.value]
            ).toFixed(4);
    }

    type.addEventListener(
        'change',
        convert
    );

    input.addEventListener(
        'input',
        convert
    );

    convert();

    createApp(
        'Unit Converter',
        root,
        450,
        350
    );
}

function openQRGenerator() {
    const root =
        document.createElement('div');

    root.className =
        'miku-app-layout';

    root.innerHTML = `
        <input
            class="miku-app-input text"
            placeholder="Enter text or URL"
        >

        <button class="miku-app-button generate">
            Generate QR
        </button>

        <div
            style="
                display:flex;
                justify-content:center;
                align-items:center;
                min-height:230px;
            "
        >
            <img class="miku-qr">
        </div>
    `;

    const input =
        root.querySelector('.text');

    const image =
        root.querySelector('.miku-qr');

    root.querySelector('.generate')
        .addEventListener(
            'click',
            () => {
                const value =
                    input.value.trim();

                if (!value) {
                    return;
                }

                image.src =
                    `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(value)}`;
            }
        );

    createApp(
        'QR Generator',
        root,
        430,
        430
    );
}

function openSystemInfo() {
    const root =
        document.createElement('div');

    root.className =
        'miku-app-layout';

    root.innerHTML = `
        <div class="miku-info-grid">
            <span class="miku-info-label">
                Operating System
            </span>

            <span>
                Miku-OS
            </span>

            <span class="miku-info-label">
                Browser
            </span>

            <span class="browser"></span>

            <span class="miku-info-label">
                Screen
            </span>

            <span class="screen"></span>

            <span class="miku-info-label">
                Language
            </span>

            <span class="language"></span>

            <span class="miku-info-label">
                Online
            </span>

            <span class="online"></span>

            <span class="miku-info-label">
                Platform
            </span>

            <span class="platform"></span>
        </div>
    `;

    root.querySelector('.browser')
        .textContent =
        navigator.userAgent;

    root.querySelector('.screen')
        .textContent =
        `${screen.width} × ${screen.height}`;

    root.querySelector('.language')
        .textContent =
        navigator.language;

    root.querySelector('.online')
        .textContent =
        navigator.onLine
            ? 'Yes'
            : 'No';

    root.querySelector('.platform')
        .textContent =
        navigator.platform;

    createApp(
        'System Info',
        root,
        620,
        400
    );
}

function openMusicPlayer() {
    const root =
        document.createElement('div');

    root.className =
        'miku-app-layout';

    root.innerHTML = `
        <input
            type="file"
            accept="audio/*"
            class="file"
        >

        <div
            style="
                text-align:center;
                padding:30px 10px;
                font-size:18px;
            "
        >
            <div class="name">
                Select an audio file
            </div>
        </div>

        <audio
            controls
            style="width:100%"
        ></audio>
    `;

    const file =
        root.querySelector('.file');

    const audio =
        root.querySelector('audio');

    const name =
        root.querySelector('.name');

    file.addEventListener(
        'change',
        () => {
            const selected =
                file.files[0];

            if (!selected) {
                return;
            }

            name.textContent =
                selected.name;

            audio.src =
                URL.createObjectURL(
                    selected
                );
        }
    );

    createApp(
        'Music Player',
        root,
        500,
        350
    );
}