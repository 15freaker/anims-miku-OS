export function initClock() {
    function updateDateTime() {
        const now = new Date();
        const dateOptions = { weekday: 'short', month: 'short', day: 'numeric' };
        const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };

        document.getElementById('date').textContent = now.toLocaleDateString('en-US', dateOptions);
        document.getElementById('time').textContent = now.toLocaleTimeString('en-US', timeOptions);
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);
}