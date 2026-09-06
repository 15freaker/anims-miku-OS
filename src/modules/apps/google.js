import { openWindow } from '../windowManager.js';

export function openGoogleApp() {
    const googleHTML = `
        <div class="google-app">
            <div class="browser-nav">
                <button class="browser-btn" id="googleBack">◀</button>
                <button class="browser-btn" id="googleForward">▶</button>
                <input type="text" id="googleAddressBar" value="https://www.google.com/search?q=" placeholder="Search Google or enter URL..." />
                <button class="browser-btn go-btn" id="googleGo">Go</button>
            </div>
            <iframe id="googleFrame" src="https://www.google.com/search?guce_referrer=1&gws_rd=ssl&igu=1" frameborder="0"></iframe>
        </div>
    `;

    openWindow('Google Search', googleHTML, { width: 750, height: 500 });

    setTimeout(() => {
        const addressBar = document.getElementById('googleAddressBar');
        const frame = document.getElementById('googleFrame');
        const goBtn = document.getElementById('googleGo');

        const navigate = () => {
            let val = addressBar.value.trim();
            if (!val) return;

            if (val.startsWith('http://') || val.startsWith('https://')) {
                frame.src = val;
            } else if (val.includes('.') && !val.includes(' ')) {
                frame.src = `https://${val}`;
            } else {
                frame.src = `https://www.google.com/search?q=${encodeURIComponent(val)}&igu=1`;
            }
        };

        goBtn.addEventListener('click', navigate);
        addressBar.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') navigate();
        });

        document.getElementById('googleBack').addEventListener('click', () => {
            try { frame.contentWindow.history.back(); } catch (e) {}
        });

        document.getElementById('googleForward').addEventListener('click', () => {
            try { frame.contentWindow.history.forward(); } catch (e) {}
        });
    }, 50);
}
