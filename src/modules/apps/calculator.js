import { openWindow } from '../windowManager.js';

export function openCalculator() {
    const calcHTML = `
        <div class="calc-container">
            <input type="text" class="calc-display" id="calcDisplay" readonly value="0" />
            <div class="calc-grid">
                <button class="calc-btn calc-action" data-act="clear">C</button>
                <button class="calc-btn calc-action" data-act="back">⌫</button>
                <button class="calc-btn calc-op" data-op="%">%</button>
                <button class="calc-btn calc-op" data-op="/">÷</button>
                
                <button class="calc-btn calc-num">7</button>
                <button class="calc-btn calc-num">8</button>
                <button class="calc-btn calc-num">9</button>
                <button class="calc-btn calc-op" data-op="*">×</button>
                
                <button class="calc-btn calc-num">4</button>
                <button class="calc-btn calc-num">5</button>
                <button class="calc-btn calc-num">6</button>
                <button class="calc-btn calc-op" data-op="-">-</button>
                
                <button class="calc-btn calc-num">1</button>
                <button class="calc-btn calc-num">2</button>
                <button class="calc-btn calc-num">3</button>
                <button class="calc-btn calc-op" data-op="+">+</button>
                
                <button class="calc-btn calc-num calc-zero">0</button>
                <button class="calc-btn calc-num">.</button>
                <button class="calc-btn calc-equals" data-act="equals">=</button>
            </div>
        </div>
    `;

    openWindow('Calculator', calcHTML, { width: 320, height: 420 });

    setTimeout(() => {
        const display = document.getElementById('calcDisplay');
        let currentExpr = '0';

        document.querySelectorAll('.calc-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const num = btn.innerText;
                const op = btn.getAttribute('data-op');
                const act = btn.getAttribute('data-act');

                if (act === 'clear') {
                    currentExpr = '0';
                } else if (act === 'back') {
                    currentExpr = currentExpr.length > 1 ? currentExpr.slice(0, -1) : '0';
                } else if (act === 'equals') {
                    try {
                        const sanitized = currentExpr.replace(/×/g, '*').replace(/÷/g, '/');
                        currentExpr = String(Function(`'use strict'; return (${sanitized})`)());
                    } catch (e) {
                        currentExpr = 'Error';
                    }
                } else if (op) {
                    currentExpr += op;
                } else {
                    if (currentExpr === '0' || currentExpr === 'Error') {
                        currentExpr = num;
                    } else {
                        currentExpr += num;
                    }
                }
                display.value = currentExpr;
            });
        });
    }, 50);
}