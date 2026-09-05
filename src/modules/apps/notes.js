import { openWindow } from '../windowManager.js';

let notes = JSON.parse(localStorage.getItem('miku_notes')) || [
    { id: 1, title: 'Miku-OS Tasks', body: 'Build custom apps and themes.', color: '#2b394a', pinned: true },
    { id: 2, title: 'Quick Idea', body: 'Add voice commands with local AI.', color: '#322e47', pinned: false }
];

export function openNotesApp() {
    const notesHTML = `
        <div class="notes-app">
            <div class="notes-composer">
                <input type="text" id="noteTitleInput" placeholder="Title..." />
                <textarea id="noteBodyInput" placeholder="Take a note..."></textarea>
                <div class="notes-composer-footer">
                    <div class="color-picker-row">
                        <span class="color-dot" data-color="#2b394a" style="background:#2b394a;"></span>
                        <span class="color-dot" data-color="#322e47" style="background:#322e47;"></span>
                        <span class="color-dot" data-color="#1e3a34" style="background:#1e3a34;"></span>
                        <span class="color-dot" data-color="#422929" style="background:#422929;"></span>
                    </div>
                    <button id="addNoteBtn" class="add-note-btn">+ Add Note</button>
                </div>
            </div>

            <div class="notes-container" id="notesContainer"></div>
        </div>
    `;

    openWindow('Notes', notesHTML, { width: 620, height: 480 });

    setTimeout(() => {
        let selectedColor = '#2b394a';
        renderNotes();

        // Color selection handling
        document.querySelectorAll('.color-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('selected'));
                dot.classList.add('selected');
                selectedColor = dot.getAttribute('data-color');
            });
        });

        // Add Note button
        document.getElementById('addNoteBtn')?.addEventListener('click', () => {
            const titleInput = document.getElementById('noteTitleInput');
            const bodyInput = document.getElementById('noteBodyInput');

            if (!titleInput.value.trim() && !bodyInput.value.trim()) return;

            const newNote = {
                id: Date.now(),
                title: titleInput.value.trim() || 'Untitled',
                body: bodyInput.value.trim(),
                color: selectedColor,
                pinned: false
            };

            notes.unshift(newNote);
            saveNotes();
            renderNotes();

            titleInput.value = '';
            bodyInput.value = '';
        });
    }, 50);
}

function renderNotes() {
    const container = document.getElementById('notesContainer');
    if (!container) return;

    container.innerHTML = '';

    const sortedNotes = [...notes].sort((a, b) => b.pinned - a.pinned);

    sortedNotes.forEach(note => {
        const card = document.createElement('div');
        card.className = `note-card ${note.pinned ? 'pinned' : ''}`;
        card.style.backgroundColor = note.color;

        card.innerHTML = `
            <div class="note-card-header">
                <input class="note-card-title" value="${note.title}" data-id="${note.id}" />
                <button class="note-pin-btn" data-id="${note.id}">${note.pinned ? '📌' : '📍'}</button>
            </div>
            <textarea class="note-card-body" data-id="${note.id}">${note.body}</textarea>
            <div class="note-card-footer">
                <button class="note-delete-btn" data-id="${note.id}">🗑️ Delete</button>
            </div>
        `;

        // Update title and body on input
        card.querySelector('.note-card-title').addEventListener('input', (e) => {
            note.title = e.target.value;
            saveNotes();
        });

        card.querySelector('.note-card-body').addEventListener('input', (e) => {
            note.body = e.target.value;
            saveNotes();
        });

        // Pin/Unpin handler
        card.querySelector('.note-pin-btn').addEventListener('click', () => {
            note.pinned = !note.pinned;
            saveNotes();
            renderNotes();
        });

        // Delete handler
        card.querySelector('.note-delete-btn').addEventListener('click', () => {
            notes = notes.filter(n => n.id !== note.id);
            saveNotes();
            renderNotes();
        });

        container.appendChild(card);
    });
}

function saveNotes() {
    localStorage.setItem('miku_notes', JSON.stringify(notes));
}