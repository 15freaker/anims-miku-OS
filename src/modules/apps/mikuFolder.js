import { openWindow } from '../windowManager.js';

const DB_NAME = 'MikuOS_FS';
const DB_VERSION = 1;

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains('files')) {
                db.createObjectStore('files', { keyPath: 'id' });
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function saveFileToDB(fileObj) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('files', 'readwrite');
        const store = tx.objectStore('files');
        store.put(fileObj);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

async function getFileFromDB(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('files', 'readonly');
        const store = tx.objectStore('files');
        const req = store.get(id);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

function getStoredVFS() {
    const saved = localStorage.getItem('miku_vfs');
    if (saved) return JSON.parse(saved);
    return {
        '~': {
            type: 'dir',
            children: {
                'Notes': { type: 'dir', children: {} },
                'Videos': { type: 'dir', children: {} }
            }
        }
    };
}

function saveVFS(vfs) {
    localStorage.setItem('miku_vfs', JSON.stringify(vfs));
}

export function openMikuFolderApp() {
    const appId = 'miku-folder';
    let fileSystem = getStoredVFS();

    const windowContent = `
        <div class="finder-container" style="display: flex; height: 100%; background: #12131c; color: #e2e8f0; font-family: system-ui, -apple-system, sans-serif; user-select: none;">
            <div class="finder-sidebar" style="width: 140px; background: #0c0d14; border-right: 1px solid #1e2030; padding: 10px 0; display: flex; flex-direction: column; gap: 4px;">
                <div style="padding: 4px 12px; font-size: 11px; color: #64748b; font-weight: bold; text-transform: uppercase;">Favorites</div>
                <div class="sidebar-item active" data-path="~" style="padding: 6px 12px; font-size: 13px; cursor: pointer; color: #38bdf8; background: #1e293b; border-radius: 4px; margin: 0 6px;">Home</div>
                <div class="sidebar-item" data-path="~/Notes" style="padding: 6px 12px; font-size: 13px; cursor: pointer; color: #94a3b8; margin: 0 6px;">Notes</div>
                <div class="sidebar-item" data-path="~/Videos" style="padding: 6px 12px; font-size: 13px; cursor: pointer; color: #94a3b8; margin: 0 6px;">Videos</div>
            </div>
            <div class="finder-main" style="flex: 1; display: flex; flex-direction: column;">
                <div class="finder-nav" style="height: 36px; background: #181a26; border-bottom: 1px solid #1e2030; display: flex; align-items: center; padding: 0 10px; gap: 8px;">
                    <button id="finder-back" style="background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 14px;">&#x2190;</button>
                    <div id="finder-path" style="font-size: 12px; color: #38bdf8; font-family: monospace; flex: 1; background: #0c0d14; padding: 4px 8px; border-radius: 4px; border: 1px solid #1e2030;">~</div>
                    <button id="finder-new-note" style="background: #0284c7; border: none; color: white; padding: 4px 8px; border-radius: 4px; font-size: 11px; cursor: pointer;">+ Note</button>
                    <label style="background: #10b981; color: white; padding: 4px 8px; border-radius: 4px; font-size: 11px; cursor: pointer;">
                        + Upload
                        <input type="file" id="finder-upload" style="display: none;" accept="video/*,image/*,text/*">
                    </label>
                </div>
                <div id="finder-grid" style="flex: 1; padding: 12px; display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 12px; align-content: start; overflow-y: auto;">
                </div>
            </div>
        </div>
    `;

    const win = openWindow('Miku Finder', windowContent, { appId: appId, width: 620, height: 400 });

    setTimeout(() => {
        let currentPath = ['~'];

        const resolveNode = (pathArr) => {
            let node = fileSystem['~'];
            for (let i = 1; i < pathArr.length; i++) {
                if (node.children && node.children[pathArr[i]]) {
                    node = node.children[pathArr[i]];
                } else return null;
            }
            return node;
        };

        const renderGrid = () => {
            const grid = win.querySelector('#finder-grid');
            const pathDisplay = win.querySelector('#finder-path');
            if (!grid || !pathDisplay) return;

            pathDisplay.textContent = currentPath.join('/');
            grid.innerHTML = '';

            const currentDir = resolveNode(currentPath);
            if (!currentDir || !currentDir.children) return;

            Object.keys(currentDir.children).forEach(name => {
                const item = currentDir.children[name];
                const card = document.createElement('div');
                card.style.cssText = 'display: flex; flex-direction: column; align-items: center; padding: 8px; border-radius: 6px; cursor: pointer; transition: background 0.2s;';

                let icon = '&#128196;';
                if (item.type === 'dir') icon = '&#128193;';
                else if (item.mediaType === 'video') icon = '&#127916;';

                card.innerHTML = `
                    <div style="font-size: 32px; line-height: 1;">${icon}</div>
                    <div style="font-size: 11px; margin-top: 4px; text-align: center; word-break: break-word; color: #e2e8f0;">${name}</div>
                `;

                card.addEventListener('mouseenter', () => card.style.background = '#1e293b');
                card.addEventListener('mouseleave', () => card.style.background = 'transparent');

                card.addEventListener('dblclick', async () => {
                    if (item.type === 'dir') {
                        currentPath.push(name);
                        renderGrid();
                    } else if (item.mediaType === 'video') {
                        const stored = await getFileFromDB(item.dbId);
                        if (stored) {
                            const url = URL.createObjectURL(stored.blob);
                            openWindow(name, `<video src="${url}" controls style="width:100%; height:100%; background:#000;"></video>`, { width: 480, height: 320 });
                        }
                    } else {
                        openWindow(name, `<textarea style="width:100%; height:100%; background:#0c0d14; color:#00ff66; border:none; padding:10px; box-sizing:border-box; font-family:monospace;">${item.content || ''}</textarea>`, { width: 400, height: 260 });
                    }
                });

                grid.appendChild(card);
            });
        };

        win.querySelector('#finder-back').addEventListener('click', () => {
            if (currentPath.length > 1) {
                currentPath.pop();
                renderGrid();
            }
        });

        win.querySelector('#finder-new-note').addEventListener('click', () => {
            const fileName = prompt('Enter note filename (e.g. note.txt):');
            if (fileName) {
                const content = prompt('Enter note content:') || '';
                const currentDir = resolveNode(currentPath);
                if (currentDir && currentDir.children) {
                    currentDir.children[fileName] = { type: 'file', mediaType: 'text', content: content };
                    saveVFS(fileSystem);
                    renderGrid();
                }
            }
        });

        win.querySelector('#finder-upload').addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const dbId = `file_${Date.now()}`;
            await saveFileToDB({ id: dbId, blob: file, name: file.name, type: file.type });

            const isVideo = file.type.startsWith('video/');
            const currentDir = resolveNode(currentPath);
            if (currentDir && currentDir.children) {
                currentDir.children[file.name] = {
                    type: 'file',
                    mediaType: isVideo ? 'video' : 'other',
                    dbId: dbId
                };
                saveVFS(fileSystem);
                renderGrid();
            }
        });

        win.querySelectorAll('.sidebar-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const targetPath = e.target.getAttribute('data-path');
                currentPath = targetPath.split('/');
                renderGrid();
            });
        });

        renderGrid();
    }, 50);
}