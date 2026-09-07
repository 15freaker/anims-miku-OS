(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))e(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&e(l)}).observe(document,{childList:!0,subtree:!0});function t(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function e(a){if(a.ep)return;a.ep=!0;const i=t(a);fetch(a.href,i)}})();const v="/anims-miku-OS/assets/miku-boot-BQQoPXVT.gif";async function w(){const n=document.getElementById("boot-terminal"),o=document.getElementById("boot-screen"),t=document.querySelector(".miku-gif");t&&(t.src=v);function e(s,c="system"){const d=document.createElement("div");d.className=`log-line log-${c}`,c==="ok"?d.innerHTML=`<span class="log-ok">[ OK ]</span> ${s}`:d.textContent=`> ${s}`,n.appendChild(d),n.scrollTop=n.scrollHeight}e("Initializing Miku-OS Microkernel...","system"),e("Loading local GUI assets...","system"),await k(t),e("Asset loaded: miku-boot.gif initialized.","ok"),await m(300);const i=["desktop","date","time","radialContainer"].filter(s=>!document.getElementById(s));i.length===0?e("Core DOM elements verified.","ok"):e(`DOM Error: Missing ${i.join(", ")}`,"system"),e("Fetching default wallpaper target...","system"),await m(300);try{(await fetch("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80",{method:"HEAD"})).ok?e("Remote wallpaper resource mounted.","ok"):e("Wallpaper returned non-200, fallback ready.","system")}catch{e("Network offline. Using local CSS gradient fallback.","system")}await m(300);try{localStorage.setItem("__test__","1"),localStorage.removeItem("__test__"),e("System Storage driver ready.","ok")}catch{e("Storage restricted. Running in memory-only mode.","system")}await m(300);const l=navigator.hardwareConcurrency||4;e(`Mounted CPU threads: ${l}`,"ok"),e("All subsystems verified successfully.","success"),e("Starting Miku-OS Shell...","success"),await m(800),o.classList.add("fade-out"),setTimeout(()=>{o.style.display="none"},500)}function k(n){return new Promise(o=>{if(!n)return o();n.complete&&n.naturalHeight!==0?o():(n.onload=()=>o(),n.onerror=()=>o())})}function m(n){return new Promise(o=>setTimeout(o,n))}function E(){function n(){const o=new Date,t={weekday:"short",month:"short",day:"numeric"},e={hour:"numeric",minute:"2-digit",hour12:!0};document.getElementById("date").textContent=o.toLocaleDateString("en-US",t),document.getElementById("time").textContent=o.toLocaleTimeString("en-US",e)}n(),setInterval(n,1e3)}const L="/anims-miku-OS/assets/walpaper-1-DspHJzJb.jpg",S="/anims-miku-OS/assets/walpaper-2-CkdZsSEY.jpg",_="/anims-miku-OS/assets/walpaper-3-BayFw82x.jpg",I="/anims-miku-OS/assets/walpaper-4-Cv-RS2G4.jpg",T="/anims-miku-OS/assets/walpaper-5-D2TwlrbS.jpg",$="/anims-miku-OS/assets/walpaper-6-DVY0MRJb.jpg",B="/anims-miku-OS/assets/walpaper-7-BDXs7Kw8.jpg",C="/anims-miku-OS/assets/walpaper-8-DkjJEzvP.jpg",x="/anims-miku-OS/assets/walpaper-9-dD-dWEUv.jpg";let b=100,M=0;function p(n,o,t={}){const e=document.getElementById("desktop"),a=`win-${Date.now()}-${++M}`,i=t.width?`${t.width}px`:"520px",l=t.height?`${t.height}px`:"360px",s=document.createElement("div");s.className="os-window",s.id=a,s.style.width=i,s.style.height=l,s.style.top=`${60+Math.random()*30}px`,s.style.left=`${100+Math.random()*50}px`,s.style.zIndex=++b,s.innerHTML=`
        <div class="window-header">
            <div class="window-controls">
                <button class="control-btn btn-close" title="Close"></button>
                <button class="control-btn btn-minimize" title="Minimize"></button>
                <button class="control-btn btn-maximize" title="Maximize"></button>
            </div>
            <div class="window-title">${n}</div>
        </div>
        <div class="window-body">${o}</div>
    `,s.addEventListener("mousedown",()=>{s.style.zIndex=++b}),s.querySelector(".btn-close").addEventListener("click",c=>{c.stopPropagation(),H(a),s.remove()}),s.querySelector(".btn-minimize").addEventListener("click",c=>{c.stopPropagation(),D(s,n,a)}),s.querySelector(".btn-maximize").addEventListener("click",c=>{c.stopPropagation(),s.classList.toggle("maximized")}),O(s),e.appendChild(s)}function D(n,o,t){n.classList.add("minimized");const e=document.getElementById("leftTray"),a=document.getElementById("rightTray"),i=e.children.length<=a.children.length?e:a;if(!document.getElementById(`pill-${t}`)){const l=document.createElement("button");l.className="dock-item tray-pill",l.id=`pill-${t}`,l.textContent=o,l.addEventListener("click",()=>{n.classList.remove("minimized"),n.style.zIndex=++b,l.remove()}),i.appendChild(l)}}function H(n){const o=document.getElementById(`pill-${n}`);o&&o.remove()}function O(n){const o=n.querySelector(".window-header");let t=!1,e=0,a=0,i=0,l=0,s=null;o.addEventListener("mousedown",c=>{n.classList.contains("maximized")||(t=!0,e=c.clientX,a=c.clientY,i=n.offsetLeft,l=n.offsetTop,document.body.style.cursor="grabbing")}),document.addEventListener("mousemove",c=>{t&&(s&&cancelAnimationFrame(s),s=requestAnimationFrame(()=>{const d=c.clientX-e,r=c.clientY-a;n.style.left=`${i+d}px`,n.style.top=`${l+r}px`}))}),document.addEventListener("mouseup",()=>{t&&(t=!1,document.body.style.cursor="default")})}const W=Object.assign({"../assets/walpaper-1.jpg":L,"../assets/walpaper-2.jpg":S,"../assets/walpaper-3.jpg":_,"../assets/walpaper-4.jpg":I,"../assets/walpaper-5.jpg":T,"../assets/walpaper-6.jpg":$,"../assets/walpaper-7.jpg":B,"../assets/walpaper-8.jpg":C,"../assets/walpaper-9.jpg":x}),h=Object.values(W);function j(){const n=document.getElementById("change-bg-btn"),o=document.getElementById("bg-upload");h.length>0&&(document.body.style.backgroundImage=`url('${h[0]}')`),n==null||n.addEventListener("click",t=>{t.stopPropagation(),q()}),n==null||n.addEventListener("contextmenu",t=>{t.preventDefault(),t.stopPropagation(),o==null||o.click()}),o==null||o.addEventListener("change",t=>{const e=t.target.files[0];if(e){const a=URL.createObjectURL(e);document.body.style.backgroundImage=`url('${a}')`}})}function q(){let n='<div class="wallpaper-grid">';h.forEach((o,t)=>{n+=`
            <div class="wallpaper-card" data-url="${o}">
                <img src="${o}" alt="Wallpaper ${t+1}" />
                <span>Wallpaper ${t+1}</span>
            </div>
        `}),n+="</div>",p("Wallpaper Gallery",n,{width:520,height:380}),setTimeout(()=>{const o=document.querySelectorAll(".wallpaper-card");o.forEach(t=>{t.addEventListener("click",()=>{const e=t.getAttribute("data-url");document.body.style.backgroundImage=`url('${e}')`,o.forEach(a=>a.classList.remove("active")),t.classList.add("active")})})},50)}function A(){p("Calculator",`
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
    `,{width:320,height:420}),setTimeout(()=>{const o=document.getElementById("calcDisplay");let t="0";document.querySelectorAll(".calc-btn").forEach(e=>{e.addEventListener("click",()=>{const a=e.innerText,i=e.getAttribute("data-op"),l=e.getAttribute("data-act");if(l==="clear")t="0";else if(l==="back")t=t.length>1?t.slice(0,-1):"0";else if(l==="equals")try{const s=t.replace(/×/g,"*").replace(/÷/g,"/");t=String(Function(`'use strict'; return (${s})`)())}catch{t="Error"}else i?t+=i:t==="0"||t==="Error"?t=a:t+=a;o.value=t})})},50)}let y=JSON.parse(localStorage.getItem("miku_notes"))||[{id:1,title:"Miku-OS Tasks",body:"Build custom apps and themes.",color:"#2b394a",pinned:!0},{id:2,title:"Quick Idea",body:"Add voice commands with local AI.",color:"#322e47",pinned:!1}];function N(){p("Notes",`
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
    `,{width:620,height:480}),setTimeout(()=>{var t;let o="#2b394a";f(),document.querySelectorAll(".color-dot").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll(".color-dot").forEach(a=>a.classList.remove("selected")),e.classList.add("selected"),o=e.getAttribute("data-color")})}),(t=document.getElementById("addNoteBtn"))==null||t.addEventListener("click",()=>{const e=document.getElementById("noteTitleInput"),a=document.getElementById("noteBodyInput");if(!e.value.trim()&&!a.value.trim())return;const i={id:Date.now(),title:e.value.trim()||"Untitled",body:a.value.trim(),color:o,pinned:!1};y.unshift(i),g(),f(),e.value="",a.value=""})},50)}function f(){const n=document.getElementById("notesContainer");if(!n)return;n.innerHTML="",[...y].sort((t,e)=>e.pinned-t.pinned).forEach(t=>{const e=document.createElement("div");e.className=`note-card ${t.pinned?"pinned":""}`,e.style.backgroundColor=t.color,e.innerHTML=`
            <div class="note-card-header">
                <input class="note-card-title" value="${t.title}" data-id="${t.id}" />
                <button class="note-pin-btn" data-id="${t.id}">${t.pinned?"📌":"📍"}</button>
            </div>
            <textarea class="note-card-body" data-id="${t.id}">${t.body}</textarea>
            <div class="note-card-footer">
                <button class="note-delete-btn" data-id="${t.id}">🗑️ Delete</button>
            </div>
        `,e.querySelector(".note-card-title").addEventListener("input",a=>{t.title=a.target.value,g()}),e.querySelector(".note-card-body").addEventListener("input",a=>{t.body=a.target.value,g()}),e.querySelector(".note-pin-btn").addEventListener("click",()=>{t.pinned=!t.pinned,g(),f()}),e.querySelector(".note-delete-btn").addEventListener("click",()=>{y=y.filter(a=>a.id!==t.id),g(),f()}),n.appendChild(e)})}function g(){localStorage.setItem("miku_notes",JSON.stringify(y))}function z(){p("Wikipedia",`
        <div class="wiki-app">
            <div class="wiki-header">
                <input type="text" id="wikiSearchInput" placeholder="Search Wikipedia..." />
                <button id="wikiSearchBtn">Search</button>
            </div>
            <div class="wiki-body" id="wikiBody">
                <div class="wiki-placeholder">Type a topic above to search live Wikipedia articles.</div>
            </div>
        </div>
    `,{width:650,height:480}),setTimeout(()=>{const o=document.getElementById("wikiSearchInput"),t=document.getElementById("wikiSearchBtn"),e=document.getElementById("wikiBody"),a=async()=>{const l=o.value.trim();if(l){e.innerHTML='<div class="wiki-placeholder">Searching Wikipedia...</div>';try{const c=await(await fetch(`https://en.wikipedia.org/w/rest.php/v1/search/page?q=${encodeURIComponent(l)}&limit=8`)).json();if(!c.pages||c.pages.length===0){e.innerHTML='<div class="wiki-placeholder">No articles found.</div>';return}e.innerHTML='<div class="wiki-results"></div>';const d=e.querySelector(".wiki-results");c.pages.forEach(r=>{const u=document.createElement("div");u.className="wiki-card",u.innerHTML=`
                        <h3>${r.title}</h3>
                        <p>${r.excerpt||r.description||"No summary available."}</p>
                    `,u.addEventListener("click",()=>i(r.title)),d.appendChild(u)})}catch{e.innerHTML='<div class="wiki-placeholder" style="color: #ff5f56;">Failed to load Wikipedia data. Check connection.</div>'}}},i=async l=>{e.innerHTML='<div class="wiki-placeholder">Loading article...</div>';try{const c=await(await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(l)}`)).json();e.innerHTML=`
                    <div class="wiki-article">
                        <button class="wiki-back-btn" id="wikiBackBtn">← Back to Search</button>
                        <h2>${c.title}</h2>
                        ${c.thumbnail?`<img src="${c.thumbnail.source}" class="wiki-thumb" />`:""}
                        <p class="wiki-extract">${c.extract}</p>
                        <a href="${c.content_urls.desktop.page}" target="_blank" class="wiki-link">Open Full Article on Wikipedia.org ↗</a>
                    </div>
                `,document.getElementById("wikiBackBtn").addEventListener("click",a)}catch{e.innerHTML='<div class="wiki-placeholder" style="color: #ff5f56;">Error loading article details.</div>'}};t.addEventListener("click",a),o.addEventListener("keypress",l=>{l.key==="Enter"&&a()})},50)}function F(){p("Google Search",`
        <div class="google-app">
            <div class="browser-nav">
                <button class="browser-btn" id="googleBack">◀</button>
                <button class="browser-btn" id="googleForward">▶</button>
                <input type="text" id="googleAddressBar" value="https://www.google.com/search?q=" placeholder="Search Google or enter URL..." />
                <button class="browser-btn go-btn" id="googleGo">Go</button>
            </div>
            <iframe id="googleFrame" src="https://www.google.com/search?guce_referrer=1&gws_rd=ssl&igu=1" frameborder="0"></iframe>
        </div>
    `,{width:750,height:500}),setTimeout(()=>{const o=document.getElementById("googleAddressBar"),t=document.getElementById("googleFrame"),e=document.getElementById("googleGo"),a=()=>{let i=o.value.trim();i&&(i.startsWith("http://")||i.startsWith("https://")?t.src=i:i.includes(".")&&!i.includes(" ")?t.src=`https://${i}`:t.src=`https://www.google.com/search?q=${encodeURIComponent(i)}&igu=1`)};e.addEventListener("click",a),o.addEventListener("keypress",i=>{i.key==="Enter"&&a()}),document.getElementById("googleBack").addEventListener("click",()=>{try{t.contentWindow.history.back()}catch{}}),document.getElementById("googleForward").addEventListener("click",()=>{try{t.contentWindow.history.forward()}catch{}})},50)}const P="/anims-miku-OS/assets/apps-miku-button-mx5HFzym.jpg";function R(){const n=document.getElementById("apps-logo");n&&(n.src=P),document.querySelectorAll(".radial-item[data-app]").forEach(t=>{t.addEventListener("click",()=>{const e=t.getAttribute("data-app");e==="wikipedia"?z():e==="google"?F():e==="calculator"?A():e==="notes"?N():e==="finder"?p("Finder","<p>Welcome to Finder. File system active.</p>"):e==="terminal"?p("Terminal",'<p style="font-family: monospace; color: #00ff66;">miku-os:~ user$ echo "Hello World"</p>'):e==="settings"&&p("Settings","<p>System Settings & Configuration.</p>")})})}function U(){G(),J()}function G(){const n=document.getElementById("calendar-grid"),o=document.getElementById("cal-month-year"),t=document.getElementById("calendarBadge");if(!n||!o)return;const e=new Date,a=e.getFullYear(),i=e.getMonth(),l=["January","February","March","April","May","June","July","August","September","October","November","December"];o.textContent=`${l[i]} ${a}`,t&&(t.textContent=`📅 ${l[i].slice(0,3)} ${e.getDate()}`);const s=["Su","Mo","Tu","We","Th","Fr","Sa"];n.innerHTML=s.map(r=>`<div class="cal-day-header">${r}</div>`).join("");const c=new Date(a,i,1).getDay(),d=new Date(a,i+1,0).getDate();for(let r=0;r<c;r++)n.innerHTML+='<div class="cal-date empty"></div>';for(let r=1;r<=d;r++){const u=r===e.getDate()?"active":"";n.innerHTML+=`<div class="cal-date ${u}">${r}</div>`}}async function J(){const n=document.getElementById("weatherTemp"),o=document.getElementById("weatherBadge"),t=document.getElementById("weatherCondition"),e=document.getElementById("weatherHumidity"),a=document.getElementById("weatherWind"),i=25.5941,l=85.1376;try{const s=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${i}&longitude=${l}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`);if(!s.ok)return;const c=await s.json();if(c&&c.current){const d=Math.round(c.current.temperature_2m),r=c.current.relative_humidity_2m,u=Math.round(c.current.wind_speed_10m);n&&(n.textContent=`${d}°C`),o&&(o.textContent=`🌤️ ${d}°C`),t&&(t.textContent=Y(c.current.weather_code)),e&&(e.textContent=`Humidity: ${r}%`),a&&(a.textContent=`Wind: ${u} km/h`)}}catch{o&&(o.textContent="🌤️ 28°C"),n&&(n.textContent="28°C"),t&&(t.textContent="Partly Cloudy"),e&&(e.textContent="Humidity: 70%"),a&&(a.textContent="Wind: 12 km/h")}}function Y(n){return n===0?"Clear Sky":n>=1&&n<=3?"Partly Cloudy":n>=45&&n<=48?"Foggy":n>=51&&n<=67?"Rain / Drizzle":n>=71&&n<=77?"Snow":n>=80&&n<=82?"Rain Showers":n>=95?"Thunderstorm":"Cloudy"}document.addEventListener("DOMContentLoaded",async()=>{await w(),E(),j(),R(),U()});
