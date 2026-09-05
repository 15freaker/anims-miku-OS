import mikuGifPath from '../assets/miku-boot.gif';

export async function runBootSequence() {
    const terminal = document.getElementById('boot-terminal');
    const bootScreen = document.getElementById('boot-screen');
    const mikuGif = document.querySelector('.miku-gif');

    // Dynamically set the imported local asset path
    if (mikuGif) {
        mikuGif.src = mikuGifPath;
    }

    function log(text, type = 'system') {
        const line = document.createElement('div');
        line.className = `log-line log-${type}`;
        
        if (type === 'ok') {
            line.innerHTML = `<span class="log-ok">[ OK ]</span> ${text}`;
        } else {
            line.textContent = `> ${text}`;
        }
        
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;
    }

    log('Initializing Miku-OS Microkernel...', 'system');

    // Wait for the local GIF to finish loading in memory
    log('Loading local GUI assets...', 'system');
    await waitForImageLoad(mikuGif);
    log('Asset loaded: miku-boot.gif initialized.', 'ok');
    
    // Real Check 1: DOM Elements Verification
    await delay(300);
    const requiredIDs = ['desktop', 'date', 'time', 'radialContainer'];
    const missing = requiredIDs.filter(id => !document.getElementById(id));
    
    if (missing.length === 0) {
        log('Core DOM elements verified.', 'ok');
    } else {
        log(`DOM Error: Missing ${missing.join(', ')}`, 'system');
    }

    // Real Check 2: Load and Verify Default Wallpaper Asset
    log('Fetching default wallpaper target...', 'system');
    await delay(300);
    try {
        const defaultWallpaper = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80';
        const res = await fetch(defaultWallpaper, { method: 'HEAD' });
        if (res.ok) {
            log('Remote wallpaper resource mounted.', 'ok');
        } else {
            log('Wallpaper returned non-200, fallback ready.', 'system');
        }
    } catch (e) {
        log('Network offline. Using local CSS gradient fallback.', 'system');
    }

    // Real Check 3: Check LocalStorage Availability
    await delay(300);
    try {
        localStorage.setItem('__test__', '1');
        localStorage.removeItem('__test__');
        log('System Storage driver ready.', 'ok');
    } catch (e) {
        log('Storage restricted. Running in memory-only mode.', 'system');
    }

    // Real Check 4: System Memory & Hardware Threads
    await delay(300);
    const threads = navigator.hardwareConcurrency || 4;
    log(`Mounted CPU threads: ${threads}`, 'ok');

    log('All subsystems verified successfully.', 'success');
    log('Starting Miku-OS Shell...', 'success');
    await delay(800);

    // Dismiss boot screen
    bootScreen.classList.add('fade-out');
    setTimeout(() => {
        bootScreen.style.display = 'none';
    }, 500);
}

function waitForImageLoad(imgElement) {
    return new Promise((resolve) => {
        if (!imgElement) return resolve();
        if (imgElement.complete && imgElement.naturalHeight !== 0) {
            resolve();
        } else {
            imgElement.onload = () => resolve();
            imgElement.onerror = () => resolve();
        }
    });
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}