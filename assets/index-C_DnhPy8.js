(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))t(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function e(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(o){if(o.ep)return;o.ep=!0;const i=e(o);fetch(o.href,i)}})();const _="/anims-miku-OS/assets/miku-boot-BQQoPXVT.gif";async function I(){const n=document.getElementById("boot-terminal"),a=document.getElementById("boot-screen"),e=document.querySelector(".miku-gif");e&&(e.src=_);function t(s,c="system"){const d=document.createElement("div");d.className=`log-line log-${c}`,c==="ok"?d.innerHTML=`<span class="log-ok">[ OK ]</span> ${s}`:d.textContent=`> ${s}`,n.appendChild(d),n.scrollTop=n.scrollHeight}t("Initializing Miku-OS Microkernel...","system"),t("Loading local GUI assets...","system"),await $(e),t("Asset loaded: miku-boot.gif initialized.","ok"),await g(300);const i=["desktop","date","time","radialContainer"].filter(s=>!document.getElementById(s));i.length===0?t("Core DOM elements verified.","ok"):t(`DOM Error: Missing ${i.join(", ")}`,"system"),t("Fetching default wallpaper target...","system"),await g(300);try{(await fetch("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80",{method:"HEAD"})).ok?t("Remote wallpaper resource mounted.","ok"):t("Wallpaper returned non-200, fallback ready.","system")}catch{t("Network offline. Using local CSS gradient fallback.","system")}await g(300);try{localStorage.setItem("__test__","1"),localStorage.removeItem("__test__"),t("System Storage driver ready.","ok")}catch{t("Storage restricted. Running in memory-only mode.","system")}await g(300);const l=navigator.hardwareConcurrency||4;t(`Mounted CPU threads: ${l}`,"ok"),t("All subsystems verified successfully.","success"),t("Starting Miku-OS Shell...","success"),await g(800),a.classList.add("fade-out"),setTimeout(()=>{a.style.display="none"},500)}function $(n){return new Promise(a=>{if(!n)return a();n.complete&&n.naturalHeight!==0?a():(n.onload=()=>a(),n.onerror=()=>a())})}function g(n){return new Promise(a=>setTimeout(a,n))}function B(){function n(){const a=new Date,e={weekday:"short",month:"short",day:"numeric"},t={hour:"numeric",minute:"2-digit",hour12:!0};document.getElementById("date").textContent=a.toLocaleDateString("en-US",e),document.getElementById("time").textContent=a.toLocaleTimeString("en-US",t)}n(),setInterval(n,1e3)}const T="/anims-miku-OS/assets/walpaper-1-DspHJzJb.jpg",C="/anims-miku-OS/assets/walpaper-2-CkdZsSEY.jpg",x="/anims-miku-OS/assets/walpaper-3-BayFw82x.jpg",M="/anims-miku-OS/assets/walpaper-4-Cv-RS2G4.jpg",D="/anims-miku-OS/assets/walpaper-5-D2TwlrbS.jpg",O="/anims-miku-OS/assets/walpaper-6-DVY0MRJb.jpg",A="/anims-miku-OS/assets/walpaper-7-BDXs7Kw8.jpg",H="/anims-miku-OS/assets/walpaper-8-DkjJEzvP.jpg",q="/anims-miku-OS/assets/walpaper-9-dD-dWEUv.jpg";let k=100,W=0;function m(n,a,e={}){const t=document.getElementById("desktop"),o=`win-${Date.now()}-${++W}`,i=e.width?`${e.width}px`:"520px",l=e.height?`${e.height}px`:"360px",s=document.createElement("div");s.className="os-window",s.id=o,s.style.width=i,s.style.height=l,s.style.top=`${60+Math.random()*30}px`,s.style.left=`${100+Math.random()*50}px`,s.style.zIndex=++k,s.innerHTML=`
        <div class="window-header">
            <div class="window-controls">
                <button class="control-btn btn-close" title="Close"></button>
                <button class="control-btn btn-minimize" title="Minimize"></button>
                <button class="control-btn btn-maximize" title="Maximize"></button>
            </div>
            <div class="window-title">${n}</div>
        </div>
        <div class="window-body">${a}</div>
    `,s.addEventListener("mousedown",()=>{s.style.zIndex=++k}),s.querySelector(".btn-close").addEventListener("click",c=>{c.stopPropagation(),N(o),s.remove()}),s.querySelector(".btn-minimize").addEventListener("click",c=>{c.stopPropagation(),j(s,n,o)}),s.querySelector(".btn-maximize").addEventListener("click",c=>{c.stopPropagation(),s.classList.toggle("maximized")}),z(s),t.appendChild(s)}function j(n,a,e){n.classList.add("minimized");const t=document.getElementById("leftTray"),o=document.getElementById("rightTray"),i=t.children.length<=o.children.length?t:o;if(!document.getElementById(`pill-${e}`)){const l=document.createElement("button");l.className="dock-item tray-pill",l.id=`pill-${e}`,l.textContent=a,l.addEventListener("click",()=>{n.classList.remove("minimized"),n.style.zIndex=++k,l.remove()}),i.appendChild(l)}}function N(n){const a=document.getElementById(`pill-${n}`);a&&a.remove()}function z(n){const a=n.querySelector(".window-header");let e=!1,t=0,o=0,i=0,l=0,s=null;a.addEventListener("mousedown",c=>{n.classList.contains("maximized")||(e=!0,t=c.clientX,o=c.clientY,i=n.offsetLeft,l=n.offsetTop,document.body.style.cursor="grabbing")}),document.addEventListener("mousemove",c=>{e&&(s&&cancelAnimationFrame(s),s=requestAnimationFrame(()=>{const d=c.clientX-t,u=c.clientY-o;n.style.left=`${i+d}px`,n.style.top=`${l+u}px`}))}),document.addEventListener("mouseup",()=>{e&&(e=!1,document.body.style.cursor="default")})}const P=Object.assign({"../assets/walpaper-1.jpg":T,"../assets/walpaper-2.jpg":C,"../assets/walpaper-3.jpg":x,"../assets/walpaper-4.jpg":M,"../assets/walpaper-5.jpg":D,"../assets/walpaper-6.jpg":O,"../assets/walpaper-7.jpg":A,"../assets/walpaper-8.jpg":H,"../assets/walpaper-9.jpg":q}),E=Object.values(P);function F(){const n=document.getElementById("change-bg-btn"),a=document.getElementById("bg-upload");E.length>0&&(document.body.style.backgroundImage=`url('${E[0]}')`),n==null||n.addEventListener("click",e=>{e.stopPropagation(),R()}),n==null||n.addEventListener("contextmenu",e=>{e.preventDefault(),e.stopPropagation(),a==null||a.click()}),a==null||a.addEventListener("change",e=>{const t=e.target.files[0];if(t){const o=URL.createObjectURL(t);document.body.style.backgroundImage=`url('${o}')`}})}function R(){let n='<div class="wallpaper-grid">';E.forEach((a,e)=>{n+=`
            <div class="wallpaper-card" data-url="${a}">
                <img src="${a}" alt="Wallpaper ${e+1}" />
                <span>Wallpaper ${e+1}</span>
            </div>
        `}),n+="</div>",m("Wallpaper Gallery",n,{width:520,height:380}),setTimeout(()=>{const a=document.querySelectorAll(".wallpaper-card");a.forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-url");document.body.style.backgroundImage=`url('${t}')`,a.forEach(o=>o.classList.remove("active")),e.classList.add("active")})})},50)}function U(){m("Calculator",`
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
    `,{width:320,height:420}),setTimeout(()=>{const a=document.getElementById("calcDisplay");let e="0";document.querySelectorAll(".calc-btn").forEach(t=>{t.addEventListener("click",()=>{const o=t.innerText,i=t.getAttribute("data-op"),l=t.getAttribute("data-act");if(l==="clear")e="0";else if(l==="back")e=e.length>1?e.slice(0,-1):"0";else if(l==="equals")try{const s=e.replace(/×/g,"*").replace(/÷/g,"/");e=String(Function(`'use strict'; return (${s})`)())}catch{e="Error"}else i?e+=i:e==="0"||e==="Error"?e=o:e+=o;a.value=e})})},50)}let f=JSON.parse(localStorage.getItem("miku_notes"))||[{id:1,title:"Miku-OS Tasks",body:"Build custom apps and themes.",color:"#2b394a",pinned:!0},{id:2,title:"Quick Idea",body:"Add voice commands with local AI.",color:"#322e47",pinned:!1}];function G(){m("Notes",`
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
    `,{width:620,height:480}),setTimeout(()=>{var e;let a="#2b394a";b(),document.querySelectorAll(".color-dot").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".color-dot").forEach(o=>o.classList.remove("selected")),t.classList.add("selected"),a=t.getAttribute("data-color")})}),(e=document.getElementById("addNoteBtn"))==null||e.addEventListener("click",()=>{const t=document.getElementById("noteTitleInput"),o=document.getElementById("noteBodyInput");if(!t.value.trim()&&!o.value.trim())return;const i={id:Date.now(),title:t.value.trim()||"Untitled",body:o.value.trim(),color:a,pinned:!1};f.unshift(i),y(),b(),t.value="",o.value=""})},50)}function b(){const n=document.getElementById("notesContainer");if(!n)return;n.innerHTML="",[...f].sort((e,t)=>t.pinned-e.pinned).forEach(e=>{const t=document.createElement("div");t.className=`note-card ${e.pinned?"pinned":""}`,t.style.backgroundColor=e.color,t.innerHTML=`
            <div class="note-card-header">
                <input class="note-card-title" value="${e.title}" data-id="${e.id}" />
                <button class="note-pin-btn" data-id="${e.id}">${e.pinned?"📌":"📍"}</button>
            </div>
            <textarea class="note-card-body" data-id="${e.id}">${e.body}</textarea>
            <div class="note-card-footer">
                <button class="note-delete-btn" data-id="${e.id}">🗑️ Delete</button>
            </div>
        `,t.querySelector(".note-card-title").addEventListener("input",o=>{e.title=o.target.value,y()}),t.querySelector(".note-card-body").addEventListener("input",o=>{e.body=o.target.value,y()}),t.querySelector(".note-pin-btn").addEventListener("click",()=>{e.pinned=!e.pinned,y(),b()}),t.querySelector(".note-delete-btn").addEventListener("click",()=>{f=f.filter(o=>o.id!==e.id),y(),b()}),n.appendChild(t)})}function y(){localStorage.setItem("miku_notes",JSON.stringify(f))}function Y(){m("Wikipedia",`
        <div class="wiki-app">
            <div class="wiki-header">
                <input type="text" id="wikiSearchInput" placeholder="Search Wikipedia..." />
                <button id="wikiSearchBtn">Search</button>
            </div>
            <div class="wiki-body" id="wikiBody">
                <div class="wiki-placeholder">Type a topic above to search live Wikipedia articles.</div>
            </div>
        </div>
    `,{width:650,height:480}),setTimeout(()=>{const a=document.getElementById("wikiSearchInput"),e=document.getElementById("wikiSearchBtn"),t=document.getElementById("wikiBody"),o=async()=>{const l=a.value.trim();if(l){t.innerHTML='<div class="wiki-placeholder">Searching Wikipedia...</div>';try{const c=await(await fetch(`https://en.wikipedia.org/w/rest.php/v1/search/page?q=${encodeURIComponent(l)}&limit=8`)).json();if(!c.pages||c.pages.length===0){t.innerHTML='<div class="wiki-placeholder">No articles found.</div>';return}t.innerHTML='<div class="wiki-results"></div>';const d=t.querySelector(".wiki-results");c.pages.forEach(u=>{const r=document.createElement("div");r.className="wiki-card",r.innerHTML=`
                        <h3>${u.title}</h3>
                        <p>${u.excerpt||u.description||"No summary available."}</p>
                    `,r.addEventListener("click",()=>i(u.title)),d.appendChild(r)})}catch{t.innerHTML='<div class="wiki-placeholder" style="color: #ff5f56;">Failed to load Wikipedia data. Check connection.</div>'}}},i=async l=>{t.innerHTML='<div class="wiki-placeholder">Loading article...</div>';try{const c=await(await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(l)}`)).json();t.innerHTML=`
                    <div class="wiki-article">
                        <button class="wiki-back-btn" id="wikiBackBtn">← Back to Search</button>
                        <h2>${c.title}</h2>
                        ${c.thumbnail?`<img src="${c.thumbnail.source}" class="wiki-thumb" />`:""}
                        <p class="wiki-extract">${c.extract}</p>
                        <a href="${c.content_urls.desktop.page}" target="_blank" class="wiki-link">Open Full Article on Wikipedia.org ↗</a>
                    </div>
                `,document.getElementById("wikiBackBtn").addEventListener("click",o)}catch{t.innerHTML='<div class="wiki-placeholder" style="color: #ff5f56;">Error loading article details.</div>'}};e.addEventListener("click",o),a.addEventListener("keypress",l=>{l.key==="Enter"&&o()})},50)}function J(){m("Google Search",`
        <div class="google-app">
            <div class="browser-nav">
                <button class="browser-btn" id="googleBack">◀</button>
                <button class="browser-btn" id="googleForward">▶</button>
                <input type="text" id="googleAddressBar" value="https://www.google.com/search?q=" placeholder="Search Google or enter URL..." />
                <button class="browser-btn go-btn" id="googleGo">Go</button>
            </div>
            <iframe id="googleFrame" src="https://www.google.com/search?guce_referrer=1&gws_rd=ssl&igu=1" frameborder="0"></iframe>
        </div>
    `,{width:750,height:500}),setTimeout(()=>{const a=document.getElementById("googleAddressBar"),e=document.getElementById("googleFrame"),t=document.getElementById("googleGo"),o=()=>{let i=a.value.trim();i&&(i.startsWith("http://")||i.startsWith("https://")?e.src=i:i.includes(".")&&!i.includes(" ")?e.src=`https://${i}`:e.src=`https://www.google.com/search?q=${encodeURIComponent(i)}&igu=1`)};t.addEventListener("click",o),a.addEventListener("keypress",i=>{i.key==="Enter"&&o()}),document.getElementById("googleBack").addEventListener("click",()=>{try{e.contentWindow.history.back()}catch{}}),document.getElementById("googleForward").addEventListener("click",()=>{try{e.contentWindow.history.forward()}catch{}})},50)}function X(){const n=document.getElementById("macDock");if(!n)return;const a=n.querySelectorAll(".dock-app");n.addEventListener("mousemove",e=>{const t=e.clientX;a.forEach(o=>{const i=o.getBoundingClientRect(),l=i.left+i.width/2,s=Math.abs(t-l),c=140,d=1.5,u=1;if(s<c){const r=d-s/c*(d-u);o.style.transform=`scale(${r}) translateY(-${(r-1)*18}px)`}else o.style.transform="scale(1) translateY(0px)"})}),n.addEventListener("mouseleave",()=>{a.forEach(e=>{e.style.transform="scale(1) translateY(0px)"})}),a.forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-app");t==="google"?J():t==="wikipedia"?Y():t==="calculator"?U():t==="notes"?G():t==="miku-folder"?m("miku-folder","<p>Welcome to miku-folder.</p>"):t==="terminal"&&m("Terminal",'<p style="color:#00ff66;">miku-os:~ user$</p>')})})}let p=new Date,w=localStorage.getItem("miku_selected_date")||null;function K(){Q(),L(),V()}function Q(){const n=document.getElementById("cal-prev"),a=document.getElementById("cal-next");n&&n.addEventListener("click",e=>{e.stopPropagation(),p.setMonth(p.getMonth()-1),L()}),a&&a.addEventListener("click",e=>{e.stopPropagation(),p.setMonth(p.getMonth()+1),L()})}function L(){const n=document.getElementById("calendar-grid"),a=document.getElementById("cal-month-year"),e=document.getElementById("calendarBadge");if(!n||!a)return;const t=p.getFullYear(),o=p.getMonth(),i=new Date,l=["January","February","March","April","May","June","July","August","September","October","November","December"];a.textContent=`${l[o]} ${t}`,e&&(e.textContent=`📅 ${l[i.getMonth()].slice(0,3)} ${i.getDate()}`);const s=["Su","Mo","Tu","We","Th","Fr","Sa"];n.innerHTML=s.map(r=>`<div class="cal-day-header">${r}</div>`).join("");const c=new Date(t,o,1).getDay(),d=new Date(t,o+1,0).getDate();for(let r=0;r<c;r++)n.innerHTML+='<div class="cal-date empty"></div>';for(let r=1;r<=d;r++){const h=`${t}-${o+1}-${r}`,v=r===i.getDate()&&o===i.getMonth()&&t===i.getFullYear()?"today":"",S=w===h?"selected":"";n.innerHTML+=`<div class="cal-date ${v} ${S}" data-date="${h}">${r}</div>`}const u=n.querySelectorAll(".cal-date:not(.empty)");u.forEach(r=>{r.addEventListener("click",h=>{h.stopPropagation(),u.forEach(v=>v.classList.remove("selected")),r.classList.add("selected"),w=r.getAttribute("data-date"),localStorage.setItem("miku_selected_date",w)})})}async function V(){const n=document.getElementById("weatherTemp"),a=document.getElementById("weatherBadge"),e=document.getElementById("weatherCondition"),t=document.getElementById("weatherHumidity"),o=document.getElementById("weatherWind"),i=25.5941,l=85.1376;try{const s=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${i}&longitude=${l}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`);if(!s.ok)return;const c=await s.json();if(c&&c.current){const d=Math.round(c.current.temperature_2m),u=c.current.relative_humidity_2m,r=Math.round(c.current.wind_speed_10m);n&&(n.textContent=`${d}°C`),a&&(a.textContent=`🌤️ ${d}°C`),e&&(e.textContent=Z(c.current.weather_code)),t&&(t.textContent=`Humidity: ${u}%`),o&&(o.textContent=`Wind: ${r} km/h`)}}catch{a&&(a.textContent="🌤️ 28°C"),n&&(n.textContent="28°C"),e&&(e.textContent="Partly Cloudy"),t&&(t.textContent="Humidity: 70%"),o&&(o.textContent="Wind: 12 km/h")}}function Z(n){return n===0?"Clear Sky":n>=1&&n<=3?"Partly Cloudy":n>=45&&n<=48?"Foggy":n>=51&&n<=67?"Rain / Drizzle":n>=71&&n<=77?"Snow":n>=80&&n<=82?"Rain Showers":n>=95?"Thunderstorm":"Cloudy"}document.addEventListener("DOMContentLoaded",async()=>{const n=document.querySelectorAll(".top-bar, .desktop, .bottom-bar");n.forEach(a=>{a.style.display="none"}),await I(),n.forEach(a=>{a.style.display=""}),B(),F(),X(),K()});
