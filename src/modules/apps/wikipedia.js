import { openWindow } from '../windowManager.js';

export function openWikipediaApp() {
    const wikiHTML = `
        <div class="wiki-app">
            <div class="wiki-header">
                <input type="text" id="wikiSearchInput" placeholder="Search Wikipedia..." />
                <button id="wikiSearchBtn">Search</button>
            </div>
            <div class="wiki-body" id="wikiBody">
                <div class="wiki-placeholder">Type a topic above to search live Wikipedia articles.</div>
            </div>
        </div>
    `;

    openWindow('Wikipedia', wikiHTML, { width: 650, height: 480 });

    setTimeout(() => {
        const input = document.getElementById('wikiSearchInput');
        const btn = document.getElementById('wikiSearchBtn');
        const body = document.getElementById('wikiBody');

        const fetchResults = async () => {
            const query = input.value.trim();
            if (!query) return;

            body.innerHTML = '<div class="wiki-placeholder">Searching Wikipedia...</div>';

            try {
                const res = await fetch(`https://en.wikipedia.org/w/rest.php/v1/search/page?q=${encodeURIComponent(query)}&limit=8`);
                const data = await res.json();

                if (!data.pages || data.pages.length === 0) {
                    body.innerHTML = '<div class="wiki-placeholder">No articles found.</div>';
                    return;
                }

                body.innerHTML = '<div class="wiki-results"></div>';
                const resultsContainer = body.querySelector('.wiki-results');

                data.pages.forEach(page => {
                    const card = document.createElement('div');
                    card.className = 'wiki-card';
                    card.innerHTML = `
                        <h3>${page.title}</h3>
                        <p>${page.excerpt || page.description || 'No summary available.'}</p>
                    `;

                    card.addEventListener('click', () => fetchArticle(page.title));
                    resultsContainer.appendChild(card);
                });
            } catch (err) {
                body.innerHTML = '<div class="wiki-placeholder" style="color: #ff5f56;">Failed to load Wikipedia data. Check connection.</div>';
            }
        };

        const fetchArticle = async (title) => {
            body.innerHTML = '<div class="wiki-placeholder">Loading article...</div>';
            try {
                const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`);
                const data = await res.json();

                body.innerHTML = `
                    <div class="wiki-article">
                        <button class="wiki-back-btn" id="wikiBackBtn">← Back to Search</button>
                        <h2>${data.title}</h2>
                        ${data.thumbnail ? `<img src="${data.thumbnail.source}" class="wiki-thumb" />` : ''}
                        <p class="wiki-extract">${data.extract}</p>
                        <a href="${data.content_urls.desktop.page}" target="_blank" class="wiki-link">Open Full Article on Wikipedia.org ↗</a>
                    </div>
                `;

                document.getElementById('wikiBackBtn').addEventListener('click', fetchResults);
            } catch (err) {
                body.innerHTML = '<div class="wiki-placeholder" style="color: #ff5f56;">Error loading article details.</div>';
            }
        };

        btn.addEventListener('click', fetchResults);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') fetchResults();
        });
    }, 50);
}