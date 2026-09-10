import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { openWindow } from '../windowManager.js';

let termInstance = null;
let fitAddonInstance = null;

export function openTerminalApp() {
    const appId = 'terminal';
    const windowEl = document.getElementById(`window-${appId}`);
    if (windowEl) {
        openWindow('Terminal', '', appId);
        setTimeout(() => {
            if (fitAddonInstance) fitAddonInstance.fit();
        }, 50);
        return;
    }

    const windowContent = `<div id="terminal-container" style="width: 100%; height: 100%; background: #0c0d14; box-sizing: border-box; overflow: hidden;"></div>`;
    openWindow('Terminal', windowContent, appId);

    setTimeout(() => {
        const container = document.getElementById('terminal-container');
        if (!container) return;

        termInstance = new Terminal({
            cursorBlink: true,
            fontSize: 13,
            fontFamily: 'Courier New, Courier, monospace',
            lineHeight: 1.2,
            theme: {
                background: '#0c0d14',
                foreground: '#e2e8f0',
                cursor: '#38bdf8',
                selectionBackground: '#334155'
            }
        });

        fitAddonInstance = new FitAddon();
        termInstance.loadAddon(fitAddonInstance);
        termInstance.open(container);
        fitAddonInstance.fit();

        const resizeObserver = new ResizeObserver(() => {
            try { fitAddonInstance.fit(); } catch (e) {}
        });
        resizeObserver.observe(container);

        let vfs = {
            '~': {
                'type': 'dir',
                'children': {
                    'welcome.txt': { 'type': 'file', 'content': 'Welcome to Miku-OS Terminal!\r\nType \x1b[1;33mhelp\x1b[0m for commands.' },
                    'notes.txt': { 'type': 'file', 'content': 'System status: OK.' }
                }
            }
        };

        let currentPath = ['~'];
        let inputBuffer = '';

        const getPrompt = () => `\x1b[1;32mmiku@miku-os\x1b[0m:\x1b[1;34m${currentPath.join('/')}\x1b[0m$ `;
        const getCurrentDir = () => {
            let node = vfs['~'];
            for (let i = 1; i < currentPath.length; i++) {
                if (node.children?.[currentPath[i]]) node = node.children[currentPath[i]];
            }
            return node;
        };

        termInstance.writeln('\x1b[1;36mMiku-OS Virtual Kernel v1.0.0 (tty1)\x1b[0m');
        termInstance.writeln('Type \x1b[1;33mhelp\x1b[0m to see available commands.\r\n');
        termInstance.write(getPrompt());

        termInstance.onData((e) => {
            switch (e) {
                case '\r':
                    termInstance.writeln('');
                    handleCommand(inputBuffer.trim());
                    inputBuffer = '';
                    termInstance.write(getPrompt());
                    break;
                case '\u007F':
                    if (inputBuffer.length > 0) {
                        inputBuffer = inputBuffer.slice(0, -1);
                        termInstance.write('\b \b');
                    }
                    break;
                case '\u0003':
                    termInstance.writeln('^C');
                    inputBuffer = '';
                    termInstance.write(getPrompt());
                    break;
                default:
                    if (e >= ' ' && e <= '~') {
                        inputBuffer += e;
                        termInstance.write(e);
                    }
            }
        });

        function handleCommand(rawCmd) {
            if (!rawCmd) return;
            const parts = rawCmd.split(/\s+/);
            const cmd = parts[0].toLowerCase();
            const args = parts.slice(1);
            const currentDir = getCurrentDir();

            switch (cmd) {
                case 'help':
                    termInstance.writeln('\x1b[1;35m--- MIKU-OS COMMAND MANUAL ---\x1b[0m');
                    termInstance.writeln('  help         Show manual');
                    termInstance.writeln('  clear        Clear screen');
                    termInstance.writeln('  ls           List files');
                    termInstance.writeln('  cd <dir>     Change directory');
                    termInstance.writeln('  cat <file>   Read file');
                    termInstance.writeln('  touch <file> Create file');
                    termInstance.writeln('  mkdir <dir>  Create folder');
                    termInstance.writeln('  rm <file>    Remove file/folder');
                    termInstance.writeln('  whoami       Print user');
                    termInstance.writeln('\x1b[1;35m-------------------------------\x1b[0m');
                    break;
                case 'clear':
                    termInstance.clear();
                    break;
                case 'whoami':
                    termInstance.writeln('\x1b[1;32mmiku_user\x1b[0m');
                    break;
                case 'ls':
                    if (!currentDir.children) break;
                    const items = Object.keys(currentDir.children).map(name => 
                        currentDir.children[name].type === 'dir' ? `\x1b[1;34m${name}/\x1b[0m` : name
                    );
                    termInstance.writeln(items.join('  '));
                    break;
                case 'cd':
                    if (!args[0] || args[0] === '~') currentPath = ['~'];
                    else if (args[0] === '..' && currentPath.length > 1) currentPath.pop();
                    else if (currentDir.children?.[args[0]]?.type === 'dir') currentPath.push(args[0]);
                    else termInstance.writeln(`\x1b[1;31mcd: no such directory: ${args[0] || ''}\x1b[0m`);
                    break;
                case 'cat':
                    if (currentDir.children?.[args[0]]?.type === 'file') termInstance.writeln(currentDir.children[args[0]].content);
                    else termInstance.writeln(`\x1b[1;31mcat: ${args[0] || ''}: No such file\x1b[0m`);
                    break;
                case 'touch':
                    if (args[0]) {
                        currentDir.children[args[0]] = { type: 'file', content: '' };
                        termInstance.writeln(`\x1b[1;32mCreated file: ${args[0]}\x1b[0m`);
                    } else termInstance.writeln('\x1b[1;33mUsage: touch <filename>\x1b[0m');
                    break;
                case 'mkdir':
                    if (args[0]) {
                        currentDir.children[args[0]] = { type: 'dir', children: {} };
                        termInstance.writeln(`\x1b[1;32mCreated directory: ${args[0]}\x1b[0m`);
                    } else termInstance.writeln('\x1b[1;33mUsage: mkdir <dir_name>\x1b[0m');
                    break;
                case 'rm':
                    const isRec = args[0] === '-rf' || args[0] === '-r';
                    const target = isRec ? args[1] : args[0];
                    if (currentDir.children?.[target]) {
                        delete currentDir.children[target];
                        termInstance.writeln(`\x1b[1;31mRemoved: ${target}\x1b[0m`);
                    } else termInstance.writeln(`\x1b[1;31mrm: ${target || ''}: No such file or directory\x1b[0m`);
                    break;
                default:
                    termInstance.writeln(`\x1b[1;31mcommand not found: ${cmd}\x1b[0m`);
            }
        }
    }, 100);
}