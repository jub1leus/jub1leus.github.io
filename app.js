        // =========================================
        // SYSTEM AUDIO SETUP
        // =========================================
        const sysBootAudio = new Audio();
        const sysDingAudio = new Audio();

        function playBootSound(themeName) {
            if (themeData[themeName] && themeData[themeName].startupSnd) {
                sysBootAudio.src = themeData[themeName].startupSnd;
                sysBootAudio.play().catch(err => console.log('Audio playback prevented:', err));
            }
        }

        function playNotificationSound() {
            const theme = localStorage.getItem('retroOsTheme') || 'win95';
            if (themeData[theme] && themeData[theme].dingSnd) {
                sysDingAudio.src = themeData[theme].dingSnd;
                sysDingAudio.play().catch(err => console.log('Audio playback prevented:', err));
            }
        }

        // =========================================
        // LOGIN & INITIALIZATION
        // =========================================
        function login() {
            const userInput = document.getElementById('username').value;
            
            if (userInput) {
                // Hide login screen
                document.getElementById('login-screen').style.display = 'none';
                
                // Show a brief welcome toast message
                const welcomeMsg = document.createElement('div');
                welcomeMsg.style.position = 'fixed';
                welcomeMsg.style.top = '20px';
                welcomeMsg.style.right = '20px';
                welcomeMsg.style.background = '#c0c0c0';
                welcomeMsg.style.padding = '10px';
                welcomeMsg.style.border = '2px outset #fff';
                welcomeMsg.style.zIndex = '9998';
                welcomeMsg.innerText = "Welcome, " + userInput + ".";
                document.body.appendChild(welcomeMsg);
                
                // Remove message after 5 seconds
                setTimeout(() => welcomeMsg.remove(), 5000);
                
                // Load previously saved theme or default to 95
                const savedTheme = localStorage.getItem('retroOsTheme') || 'win95';
                setTheme(savedTheme);
                
                // Open pomodoro by default
                openWindow('win-pomodoro');
            } else {
                alert("Please enter a username.");
            }
        }

        // =========================================
        // THEME CONFIGURATIONS
        // =========================================
        const themeData = {
            win95: { 
                css: 'win95', 
                yt: 'https://youtu.be/nli9sZhWgtM', 
                startText: 'Start', 
                icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Crect x="2" y="2" width="9" height="9" fill="%23FF0000"/%3E%3Crect x="13" y="2" width="9" height="9" fill="%2300AA00"/%3E%3Crect x="2" y="13" width="9" height="9" fill="%230000FF"/%3E%3Crect x="13" y="13" width="9" height="9" fill="%23FFD700"/%3E%3C/svg%3E', 
                liveClass: null,
                startupSnd: 'https://dn711100.ca.archive.org/0/items/Boot_Sounds_Compilation/Windows%2095%20-%20Boot.mp3', 
                dingSnd: 'https://archive.org/download/rm95_sounds/DOORSHUT.mp3' 
            },
            win98: { 
                css: 'win98', 
                yt: 'https://youtu.be/FZUfiW3W1KY?si=ozRaZ480T4JZ0bX3', 
                startText: 'Start', 
                icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Crect x="2" y="2" width="9" height="9" fill="%236c7bb0"/%3E%3Crect x="13" y="2" width="9" height="9" fill="%23b58da3"/%3E%3Crect x="2" y="13" width="9" height="9" fill="%23bcafc6"/%3E%3Crect x="13" y="13" width="9" height="9" fill="%23e2dbec"/%3E%3C/svg%3E', 
                liveClass: null,
                startupSnd: 'https://dn711100.ca.archive.org/0/items/Boot_Sounds_Compilation/Windows%2098%20-%20Boot.mp3', 
                dingSnd: 'https://archive.org/download/rm95_sounds/Flamer.mp3' 
            },
            winxp: { 
                css: 'winxp', 
                yt: 'https://www.youtube.com/watch?v=Cz2YCRmDOFk', 
                startText: 'start', 
                icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M1.5,4.3 C4.7,3.1 7.3,4.9 10.8,3.9 L10.8,13.8 C7.3,14.8 4.7,13 1.5,14.2 Z' fill='%23F25022'/%3E%3Cpath d='M12.2,3.6 C15.7,2.6 18.8,4.3 22,3.2 L22,13.1 C18.8,14.2 15.7,12.5 12.2,13.5 Z' fill='%237FBA00'/%3E%3Cpath d='M1.5,15.5 C4.7,14.3 7.3,16.1 10.8,15.1 L10.8,21.5 C7.3,22.5 4.7,20.7 1.5,21.9 Z' fill='%2300A4EF'/%3E%3Cpath d='M12.2,14.8 C15.7,13.8 18.8,15.5 22,14.4 L22,20.8 C18.8,21.9 15.7,20.2 12.2,21.2 Z' fill='%23FFB900'/%3E%3C/svg%3E", 
                liveClass: null,
                startupSnd: 'https://archive.org/download/windowsxpstartup_201910/Windows%20XP%20Startup.mp3', 
                dingSnd: 'https://archive.org/download/windowsxpstartup_201910/Windows%20XP%20Ding.mp3' 
            },
            winvista: { 
                css: 'winvista', 
                yt: 'https://youtu.be/9NuZMEAtIVo', 
                startText: '', 
                icon: '', 
                liveClass: 'live-vista',
                startupSnd: 'https://dn711100.ca.archive.org/0/items/Boot_Sounds_Compilation/Windows%20Vista%20-%20Boot.mp3', 
                dingSnd: 'https://dn710307.ca.archive.org/0/items/wii-original-system-soundtrack-mp3-flac/Wii%20%28Original%20System%20Soundtrack%29/Disc%2001%20-%20Wii%20System/1.03%20Mii%20Channel%20Banner.mp3' 
            },
            win7: { 
                css: 'win7', 
                yt: 'https://www.youtube.com/watch?v=0yiwxIuXmdk', 
                startText: '', 
                icon: '', 
                liveClass: 'live-win7',
                startupSnd: 'https://dn711100.ca.archive.org/0/items/Boot_Sounds_Compilation/Sega%20Dreamcast%20-%20Boot.mp3', 
                dingSnd: 'https://dn710307.ca.archive.org/0/items/wii-original-system-soundtrack-mp3-flac/Wii%20%28Original%20System%20Soundtrack%29/Disc%2001%20-%20Wii%20System/1.02%20No%20Disc%20Inserted%20Banner.mp3' 
            }
        };

        function setTheme(themeKey) {
            const config = themeData[themeKey];
            
            // Clean up existing live wallpapers and theme classes
            document.body.classList.remove('live-vista', 'live-win7');
            document.body.className = ''; 
            
            // Apply new theme class
            document.body.classList.add(`theme-${config.css}`);
            if (config.liveClass) { 
                document.body.classList.add(config.liveClass); 
            }
            
            // Update Start Button aesthetics
            document.getElementById('start-text').innerText = config.startText;
            if (config.icon) {
                document.getElementById('start-icon').src = config.icon;
            }
            
            // Pre-fill media player with era-appropriate music
            document.getElementById('media-url').value = config.yt;
            
            // Save preference
            localStorage.setItem('retroOsTheme', themeKey);
            
            playBootSound(themeKey);
            closeStartMenu();
        }

        // =========================================
        // WINDOW & DESKTOP ENGINE (DRAG & RESIZE)
        // =========================================
        let activeWinRef = null;
        let movingMode = null; // Can be 'drag' or 'resize'
        let mouseX = 0, mouseY = 0;
        let winX = 0, winY = 0;
        let winW = 0, winH = 0;
        let globalZIndex = 100;
        
        function initializeDesktopEngine() {
            // Global mouse move handles dragging and resizing smoothly
            document.addEventListener('mousemove', (e) => { 
                if (!activeWinRef || !movingMode) return; 
                
                const deltaX = e.clientX - mouseX;
                const deltaY = e.clientY - mouseY; 
                
                if (movingMode === 'drag') { 
                    activeWinRef.style.left = `${winX + deltaX}px`; 
                    activeWinRef.style.top = `${winY + deltaY}px`; 
                } else if (movingMode === 'resize') { 
                    // Prevent window from getting smaller than its minimum limits
                    activeWinRef.style.width = `${Math.max(260, winW + deltaX)}px`; 
                    activeWinRef.style.height = `${Math.max(180, winH + deltaY)}px`; 
                } 
            });

            // Stop moving when mouse is released
            document.addEventListener('mouseup', () => { 
                if (movingMode) { 
                    movingMode = null; 
                    activeWinRef = null; 
                    document.body.classList.remove('dragging', 'resizing'); 
                } 
            });
            
            // Attach specific event listeners to each window
            document.querySelectorAll('.window').forEach(win => {
                // Focus window when clicked
                win.addEventListener('mousedown', () => focusWindowElement(win));
                
                // Title bar drag handler
                const titleBar = win.querySelector('.title-bar'); 
                titleBar.addEventListener('mousedown', (e) => { 
                    // Don't drag if clicking the minimize/close buttons
                    if (e.target.tagName === 'BUTTON') return; 
                    
                    activeWinRef = win; 
                    movingMode = 'drag'; 
                    mouseX = e.clientX; 
                    mouseY = e.clientY; 
                    
                    // Store starting position
                    winX = parseInt(win.style.left) || 0; 
                    winY = parseInt(win.style.top) || 0; 
                    
                    document.body.classList.add('dragging'); 
                    e.preventDefault(); 
                });
                
                // Bottom-right resize handler
                const resizer = win.querySelector('.window-resizer'); 
                resizer.addEventListener('mousedown', (e) => { 
                    activeWinRef = win; 
                    movingMode = 'resize'; 
                    mouseX = e.clientX; 
                    mouseY = e.clientY; 
                    
                    // Store starting dimensions
                    winW = win.offsetWidth; 
                    winH = win.offsetHeight; 
                    
                    document.body.classList.add('resizing'); 
                    e.preventDefault(); 
                    e.stopPropagation(); 
                });
            });
        }

        // =========================================
        // WINDOW STATE MANAGEMENT
        // =========================================
        function focusWindowElement(windowElement) { 
            globalZIndex++; 
            windowElement.style.zIndex = globalZIndex; 
            buildTaskbarTabs(); 
        }

        function openWindow(windowId) { 
            const win = document.getElementById(windowId); 
            win.classList.add('active-window'); 
            focusWindowElement(win); 
            buildTaskbarTabs(); 
            closeStartMenu(); 
        }

        function closeWindow(windowId) { 
            const win = document.getElementById(windowId);
            win.classList.remove('active-window'); 
            buildTaskbarTabs(); 
        }

        function minimizeWindow(windowId) { 
            const win = document.getElementById(windowId);
            win.classList.remove('active-window'); 
            buildTaskbarTabs(); 
        }
        
        function buildTaskbarTabs() { 
            const container = document.getElementById('task-list'); 
            container.innerHTML = ''; 
            
            // Rebuild the taskbar buttons for all currently open windows
            document.querySelectorAll('.window.active-window').forEach(win => { 
                const title = win.querySelector('.title-bar-text').innerText; 
                
                const item = document.createElement('div'); 
                item.className = 'task-item'; 
                item.innerText = title; 
                item.onclick = () => focusWindowElement(win); 
                
                container.appendChild(item); 
            }); 
        }

        // =========================================
        // START MENU LOGIC
        // =========================================
        function toggleStartMenu() { 
            const startMenu = document.getElementById('start-menu'); 
            startMenu.classList.toggle('active'); 
            
            if (startMenu.classList.contains('active')) {
                // If opening, ensure submenu is hidden by default
                const subMenu = document.getElementById('os-submenu');
                if (subMenu) subMenu.classList.remove('active'); 
            } else {
                closeStartMenu(); 
            }
        }

        function closeStartMenu() { 
            document.getElementById('start-menu').classList.remove('active'); 
            document.getElementById('os-submenu').classList.remove('active'); 
        }

        function toggleSubmenu() { 
            document.getElementById('os-submenu').classList.toggle('active'); 
        }

        // =========================================
        // APP LOGIC: MEDIA PLAYER
        // =========================================
        function streamCustomTrack() { 
            const urlInput = document.getElementById('media-url').value.trim(); 
            if (!urlInput) return; 
            
            let embedUrl = ''; 
            
            // Check if it's a playlist
            if (urlInput.includes('list=')) { 
                try { 
                    const listId = new URL(urlInput).searchParams.get('list'); 
                    if (listId) {
                        embedUrl = `https://www.youtube.com/embed/videoseries?list=${listId}`; 
                    }
                } catch(err) {
                    console.log("Failed to parse playlist URL");
                } 
            } 
            
            // If not a playlist, extract standard video ID
            if (!embedUrl) { 
                const match = urlInput.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/); 
                if (match) {
                    embedUrl = `https://www.youtube.com/embed/${match[1]}`; 
                } else {
                    embedUrl = urlInput; // Fallback to raw string
                }
            } 
            
            document.getElementById('yt-iframe').src = embedUrl; 
        }

        // =========================================
        // APP LOGIC: POMODORO TIMER
        // =========================================
        let pomoInterval = null;
        let isWorkSession = true;
        let timeRemaining = 1500; // Default: 25 minutes (in seconds)

        function startPomodoro() { 
            if (pomoInterval) return; // Prevent multiple intervals running
            
            playNotificationSound(); 
            
            pomoInterval = setInterval(() => { 
                if (timeRemaining > 0) { 
                    timeRemaining--; 
                    updatePomoDisplay(); 
                } else { 
                    // Timer hit 0
                    playNotificationSound(); 
                    
                    if (isWorkSession) { 
                        // Work ended, start break
                        const countEl = document.getElementById('pomo-count');
                        countEl.innerText = parseInt(countEl.innerText) + 1; 
                        
                        isWorkSession = false; 
                        timeRemaining = parseInt(document.getElementById('pomo-break-in').value) * 60; 
                    } else { 
                        // Break ended, start work
                        isWorkSession = true; 
                        timeRemaining = parseInt(document.getElementById('pomo-work-in').value) * 60; 
                    } 
                    
                    document.getElementById('pomo-status').innerText = isWorkSession ? "Working" : "Break Mode"; 
                    updatePomoDisplay(); 
                } 
            }, 1000); 
        }

        function pausePomodoro() { 
            clearInterval(pomoInterval); 
            pomoInterval = null; 
            document.getElementById('pomo-status').innerText = "Paused"; 
        }

        function resetPomodoro() { 
            pausePomodoro(); 
            isWorkSession = true; 
            
            // Pull the minutes from the settings input and convert to seconds
            const workMins = parseInt(document.getElementById('pomo-work-in').value);
            timeRemaining = workMins * 60; 
            
            document.getElementById('pomo-status').innerText = "Ready"; 
            updatePomoDisplay(); 
        }

        function updatePomoDisplay() { 
            let minutes = Math.floor(timeRemaining / 60).toString().padStart(2, '0'); 
            let seconds = (timeRemaining % 60).toString().padStart(2, '0'); 
            document.getElementById('pomo-time').innerText = `${minutes}:${seconds}`; 
        }

        // =========================================
        // APP LOGIC: NOTES
        // =========================================
        const notesArea = document.getElementById('notes-area'); 
        notesArea.value = localStorage.getItem('retroOsNotes') || ''; 
        
        // Auto-save notes on every keystroke
        notesArea.addEventListener('input', () => {
            localStorage.setItem('retroOsNotes', notesArea.value)
        });
        
        // =========================================
        // APP LOGIC: CALCULATOR
        // =========================================
        let currentExpression = '0'; 

        function processCalcInput(key) {
            const display = document.getElementById('calc-display'); 
            
            if (key === 'C') {
                currentExpression = '0'; 
            } else if (key === '=') { 
                try { 
                    // eval() automatically handles decimal math
                    currentExpression = eval(currentExpression).toString(); 
                } catch { 
                    currentExpression = 'Error'; 
                } 
            } else { 
                // Handle the initial '0' or 'Error' states smoothly
                if (currentExpression === 'Error') {
                    currentExpression = (key === '.') ? '0.' : key;
                } else if (currentExpression === '0') {
                    if (key === '.') {
                        currentExpression = '0.'; // Keep the 0 if starting with a decimal
                    } else if (['+', '-', '*', '/'].includes(key)) {
                        currentExpression += key; // Keep the 0 if starting with math (e.g., "0 + 5")
                    } else {
                        currentExpression = key;  // Replace the 0 if typing a standard number
                    }
                } else {
                    // Otherwise, just keep appending characters
                    currentExpression += key;
                }
            } 
            display.value = currentExpression; 
        }

        function calcClick(event) { 
            // Ignore clicks on the empty grid space
            if (event.target.tagName !== 'BUTTON') return; 
            processCalcInput(event.target.innerText);
        }
        
        // --- Added Keyboard Support ---
        document.addEventListener('keydown', (event) => {
            // Prevent calculator input if user is actively typing inside an input/textarea 
            // (e.g. typing numbers in their Notes or Task Manager shouldn't trigger the calculator)
            const activeTag = document.activeElement.tagName.toLowerCase();
            if (activeTag === 'input' || activeTag === 'textarea') {
                // Allow exception if the calculator display itself was specifically clicked
                if (document.activeElement.id !== 'calc-display') return;
            }

            const calcWin = document.getElementById('win-calc');
            if (calcWin && calcWin.classList.contains('active-window')) {
                const key = event.key;
                const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.', '(', ')'];
                
                if (validKeys.includes(key)) {
                    processCalcInput(key);
                } else if (key === 'Enter') {
                    event.preventDefault(); // Prevent form submission or accidental button clicks
                    processCalcInput('=');
                } else if (key === 'Escape' || key.toLowerCase() === 'c') {
                    processCalcInput('C');
                }
            }
        });

        // =========================================
        // APP LOGIC: WORLD CLOCKS
        // =========================================
        function refreshClocks() { 
            const now = new Date(); 
            const cities = [
                { name: 'Local Time', tz: undefined },
                { name: 'New York (EST)', tz: 'America/New_York' },
                { name: 'London (GMT)', tz: 'Europe/London' },
                { name: 'Tokyo (JST)', tz: 'Asia/Tokyo' }
            ]; 
            
            let clocksHtml = ''; 
            
            cities.forEach(city => { 
                let formatter = new Intl.DateTimeFormat('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    second: '2-digit', 
                    hour12: true, 
                    timeZone: city.tz 
                }); 
                
                clocksHtml += `
                    <div class="clock-city">
                        <span>${city.name}</span>
                        <span>${formatter.format(now)}</span>
                    </div>
                `; 
            }); 
            
            document.getElementById('clocks-container').innerHTML = clocksHtml; 
            
            // Update the bottom-right tray clock as well
            const trayFormatter = new Intl.DateTimeFormat('en-US', { 
                hour: '2-digit', 
                minute: '2-digit', 
                hour12: true 
            });
            document.getElementById('tray').innerText = trayFormatter.format(now); 
        }

        // =========================================
        // APP LOGIC: TODO LIST
        // =========================================
        let todoItems = JSON.parse(localStorage.getItem('retroOsTodos')) || [];

        function saveTodos() {
            localStorage.setItem('retroOsTodos', JSON.stringify(todoItems));
            renderTodos();
        }

        function addTodoItem() {
            const inputField = document.getElementById('todo-input');
            const textContent = inputField.value.trim();
            
            if (!textContent) return;

            todoItems.push({ id: Date.now(), text: textContent, completed: false });
            
            inputField.value = ''; // clear input
            saveTodos();
        }

        function toggleTodoStatus(itemId) {
            todoItems = todoItems.map(item => {
                if (item.id === itemId) {
                    item.completed = !item.completed;
                }
                return item;
            });
            saveTodos();
        }

        function clearCompletedTodos() {
            todoItems = todoItems.filter(item => !item.completed);
            saveTodos();
        }

        function renderTodos() {
            const container = document.getElementById('todo-list-container');
            container.innerHTML = '';

            if (todoItems.length === 0) {
                container.innerHTML = `<div style="color: #888; font-style: italic; font-size: 11px; padding: 4px;">No active tasks.</div>`;
                return;
            }

            todoItems.forEach(item => {
                const row = document.createElement('div');
                row.style.display = 'flex';
                row.style.alignItems = 'center';
                row.style.gap = '8px';
                row.style.padding = '3px 0';
                row.style.borderBottom = '1px dashed #eee';

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = item.completed;
                checkbox.onchange = () => toggleTodoStatus(item.id);

                const label = document.createElement('span');
                label.innerText = item.text;
                label.style.fontFamily = 'var(--font-family)';
                
                // Add strikethrough styling if checked
                if (item.completed) {
                    label.style.textDecoration = 'line-through';
                    label.style.color = '#777';
                }

                row.appendChild(checkbox);
                row.appendChild(label);
                container.appendChild(row);
            });
        }

        // =========================================
        // SYSTEM BOOT (ON LOAD)
        // =========================================
        window.onload = () => { 
            initializeDesktopEngine(); 
            
            // Start clock cycle
            setInterval(refreshClocks, 1000); 
            refreshClocks(); 
            
            // Load saved to-do state
            renderTodos();
        };