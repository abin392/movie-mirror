const container = document.getElementById("downloads");
let downloads = JSON.parse(localStorage.getItem("downloads")) || [];

if (downloads.length === 0) {
    container.innerHTML = "<p style='padding:15px;'>No downloads yet.</p>";
}

// ==========================================
//   1. INITIAL RENDER & STATE CHECK
// ==========================================
downloads.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "download-card";

    // Auto-detect if the file is a song or movie based on the URL extension
    const isSong = item.link.includes('.mp3');
    const savedText = isSong ? "Your device saved song" : "Your device saved movie";

    // Safely escape single quotes in titles for the onclick function
    const safeTitle = item.title.replace(/'/g, "\\'");

    let contentHTML = `
        <img src="${item.image}" style='height:200px; object-fit:cover;'>
        <h4>${item.title}</h4>
    `;

    // CHECK STATE: If already downloaded, permanently show the completed UI
    if (item.downloaded) {
        contentHTML += `
            <div style="background: rgba(0, 255, 136, 0.1); padding: 10px; border-radius: 6px; border: 1px solid #00ff88; margin-top: 8px;">
                <i class="fas fa-check-circle" style="color: #00ff88; margin-bottom: 5px; font-size: 18px;"></i>
                <div style="color: #00ff88; font-weight: bold; font-size: 13px;">${savedText}</div>
            </div>
        `;
    } else {
        // Not downloaded yet - render standard buttons and hidden progress bar
        contentHTML += `
            <div id="dl-action-${index}">
                <button style="background: #00ff88; color: black; border: none; padding: 8px; width: 100%; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.3s;"
                    onclick="startDownloadUI(${index}, '${item.link}', '${safeTitle}')">
                    <i class="fa-solid fa-download"></i> Download
                </button>
            </div>

            <div id="dl-progress-box-${index}" style="display: none; text-align: left; background: #222; padding: 10px; border-radius: 6px; margin-top: 8px;">
                <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 6px; color: #ccc;">
                    <span id="dl-status-${index}">Downloading...</span>
                    <span id="dl-percent-${index}" style="color: #00ff88; font-weight: bold;">0%</span>
                </div>
                
                <div style="width: 100%; background: #444; border-radius: 4px; height: 8px; overflow: hidden; margin-bottom: 10px;">
                    <div id="dl-bar-${index}" style="width: 0%; background: linear-gradient(90deg, #00cc6f, #00ff88); height: 100%; transition: width 0.2s ease;"></div>
                </div>
                
                <div id="dl-controls-${index}" style="display: flex; gap: 8px;">
                    <button id="dl-pause-btn-${index}" style="flex: 1; background: #ffaa00; color: #000; border: none; border-radius: 4px; padding: 6px; cursor: pointer; font-weight: bold; font-size: 12px;" onclick="togglePause(${index})">
                        <i class="fas fa-pause"></i> Pause
                    </button>
                    <button style="flex: 1; background: #ff4444; color: #fff; border: none; border-radius: 4px; padding: 6px; cursor: pointer; font-weight: bold; font-size: 12px;" onclick="cancelDownload(${index})">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                </div>
            </div>
        `;
    }

    // Always append the remove button
    contentHTML += `
        <div class="remove" onclick="removeDownload(${index})">
            Remove
        </div>
    `;

    div.innerHTML = contentHTML;
    container.appendChild(div);
});

// ==========================================
//   2. DOWNLOAD ENGINE & UI LOGIC
// ==========================================
const activeDownloads = {};

function startDownloadUI(index, url, title) {
    document.getElementById(`dl-action-${index}`).style.display = "none";
    document.getElementById(`dl-progress-box-${index}`).style.display = "block";

    activeDownloads[index] = {
        url: url,
        title: title,
        paused: false,
        simulatedProgress: 0,
        simTimer: null
    };

    runSafeDownload(index);
}

function runSafeDownload(index) {
    const dl = activeDownloads[index];
    const bar = document.getElementById(`dl-bar-${index}`);
    const percentText = document.getElementById(`dl-percent-${index}`);
    const statusText = document.getElementById(`dl-status-${index}`);

    dl.paused = false;
    statusText.innerText = "Downloading...";
    
    dl.simTimer = setInterval(() => {
        if (dl.paused) return;

        dl.simulatedProgress += Math.random() * 2 + 1;

        if (dl.simulatedProgress >= 100) {
            dl.simulatedProgress = 100;
            clearInterval(dl.simTimer);
            
            // Mark as downloaded securely in LocalStorage immediately
            downloads[index].downloaded = true;
            localStorage.setItem("downloads", JSON.stringify(downloads));

            // Generate contextual text for the completion UI
            const isSong = dl.url.includes('.mp3');
            const savedText = isSong ? "Your device saved song" : "Your device saved movie";
            
            // Wipe the progress bar and buttons, replace permanently with success UI
            const progressBox = document.getElementById(`dl-progress-box-${index}`);
            progressBox.style.background = "rgba(0, 255, 136, 0.1)";
            progressBox.style.border = "1px solid #00ff88";
            progressBox.style.textAlign = "center";
            progressBox.innerHTML = `
                <i class="fas fa-check-circle" style="color: #00ff88; margin-bottom: 5px; font-size: 18px;"></i>
                <div style="color: #00ff88; font-weight: bold; font-size: 13px;">${savedText}</div>
            `;

            // Safely Trigger Native Background Download (FORCED SAVE)
            setTimeout(() => {
                let finalUrl = dl.url;

                // Force Cloudinary links to download as an attachment instead of playing
                if (finalUrl.includes('cloudinary.com') && finalUrl.includes('/upload/')) {
                    finalUrl = finalUrl.replace('/upload/', '/upload/fl_attachment/');
                }

                // Format a safe file name
                let safeTitle = dl.title.replace(/[^a-z0-9\s]/gi, '_').trim();
                if (!safeTitle.includes('.mp4') && !safeTitle.includes('.mp3')) {
                     safeTitle += finalUrl.includes('.mp3') ? '.mp3' : '.mp4';
                }

                // Execute the forced download
                const a = document.createElement("a");
                a.href = finalUrl;
                a.download = safeTitle;
                a.target = "_blank";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }, 800);
            
        } else {
            bar.style.width = dl.simulatedProgress + "%";
            percentText.innerText = Math.floor(dl.simulatedProgress) + "%";
        }
    }, 400);
}

// ==========================================
//   3. PAUSE & RESUME LOGIC
// ==========================================
function togglePause(index) {
    const dl = activeDownloads[index];
    if (!dl) return;

    const pauseBtn = document.getElementById(`dl-pause-btn-${index}`);
    const statusText = document.getElementById(`dl-status-${index}`);

    dl.paused = !dl.paused;

    if (dl.paused) {
        pauseBtn.innerHTML = '<i class="fas fa-play"></i> Resume';
        pauseBtn.style.background = '#00ff88';
        statusText.innerText = "Paused";
        statusText.style.color = "#ffaa00";
    } else {
        pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
        pauseBtn.style.background = '#ffaa00';
        statusText.innerText = "Downloading...";
        statusText.style.color = "#ccc";
    }
}

// ==========================================
//   4. CANCEL & REMOVE LOGIC
// ==========================================
function cancelDownload(index) {
    const dl = activeDownloads[index];
    if (dl && dl.simTimer) clearInterval(dl.simTimer);
    
    document.getElementById(`dl-progress-box-${index}`).style.display = "none";
    document.getElementById(`dl-action-${index}`).style.display = "block";
    
    document.getElementById(`dl-bar-${index}`).style.width = "0%";
    document.getElementById(`dl-percent-${index}`).innerText = "0%";
    
    const pauseBtn = document.getElementById(`dl-pause-btn-${index}`);
    pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
    pauseBtn.style.background = '#ffaa00';
    
    delete activeDownloads[index];
}

function removeDownload(index) {
    downloads.splice(index, 1);
    localStorage.setItem("downloads", JSON.stringify(downloads));
    location.reload();
}



/* ==========================================
   5. SMART TV, KEYBOARD & TOUCH NAVIGATION
========================================== */
function setupDownloadNavigation() {
    // 1. Inject isolated TV focus styles dynamically
    if (!document.getElementById('tv-focus-styles-dl')) {
        const style = document.createElement('style');
        style.id = 'tv-focus-styles-dl';
        style.innerHTML = `
            .tv-focus {
                outline: 3px solid #00ff88 !important;
                outline-offset: 4px !important;
                transform: scale(1.05) !important;
                box-shadow: 0 5px 15px rgba(0, 255, 136, 0.4) !important;
                z-index: 50 !important;
                transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
            }
            *:focus { outline: none !important; }
        `;
        document.head.appendChild(style);
    }

    let isTVModeActive = false;
    let focusableElements = [];
    let currentIndex = -1;

    // 2. Scan the screen for currently visible buttons/actions
    function refreshFocusableElements() {
        const allElements = document.querySelectorAll('.download-card button, .download-card .remove');
        focusableElements = Array.from(allElements).filter(el => {
            // Only select elements that are actually visible (not hidden during download)
            return el.offsetParent !== null && window.getComputedStyle(el).display !== 'none';
        });
    }

    function updateFocus(newIndex) {
        refreshFocusableElements();
        if (focusableElements.length === 0) return;

        if (currentIndex >= 0 && focusableElements[currentIndex]) {
            focusableElements[currentIndex].classList.remove('tv-focus');
        }

        currentIndex = Math.max(0, Math.min(newIndex, focusableElements.length - 1));
        const newEl = focusableElements[currentIndex];
        newEl.classList.add('tv-focus');
        
        // Scroll the page automatically to keep the button in view
        newEl.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }

    // 3. Listen for Smart TV and Keyboard remote inputs
    document.addEventListener('keydown', (e) => {
        const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', ' '];
        if (!keys.includes(e.key)) return;

        e.preventDefault(); // Stop default page scrolling with arrows
        refreshFocusableElements();

        if (focusableElements.length === 0) return;

        if (!isTVModeActive) {
            isTVModeActive = true;
            currentIndex = 0;
            updateFocus(currentIndex);
            return;
        }

        const currentEl = focusableElements[currentIndex];
        if (!currentEl) return;
        const currentRect = currentEl.getBoundingClientRect();
        
        let nextIndex = currentIndex;
        let minDistance = Infinity;

        // 4. Spatial Geometry Routing: Find the nearest button in the direction pressed
        if (e.key === 'ArrowRight') {
            for (let i = 0; i < focusableElements.length; i++) {
                if (i === currentIndex) continue;
                const rect = focusableElements[i].getBoundingClientRect();
                if (rect.left > currentRect.left && Math.abs(rect.top - currentRect.top) < 50) {
                    const dist = rect.left - currentRect.left;
                    if (dist < minDistance) { minDistance = dist; nextIndex = i; }
                }
            }
            if (nextIndex === currentIndex && currentIndex < focusableElements.length - 1) nextIndex++;
        } 
        else if (e.key === 'ArrowLeft') {
            for (let i = 0; i < focusableElements.length; i++) {
                if (i === currentIndex) continue;
                const rect = focusableElements[i].getBoundingClientRect();
                if (rect.left < currentRect.left && Math.abs(rect.top - currentRect.top) < 50) {
                    const dist = currentRect.left - rect.left;
                    if (dist < minDistance) { minDistance = dist; nextIndex = i; }
                }
            }
            if (nextIndex === currentIndex && currentIndex > 0) nextIndex--;
        }
        else if (e.key === 'ArrowDown') {
            for (let i = 0; i < focusableElements.length; i++) {
                if (i === currentIndex) continue;
                const rect = focusableElements[i].getBoundingClientRect();
                if (rect.top > currentRect.bottom - 10) {
                    const dist = Math.sqrt(Math.pow(rect.left - currentRect.left, 2) + Math.pow(rect.top - currentRect.top, 2));
                    if (dist < minDistance) { minDistance = dist; nextIndex = i; }
                }
            }
        }
        else if (e.key === 'ArrowUp') {
            for (let i = 0; i < focusableElements.length; i++) {
                if (i === currentIndex) continue;
                const rect = focusableElements[i].getBoundingClientRect();
                if (rect.bottom < currentRect.top + 10) {
                    const dist = Math.sqrt(Math.pow(rect.left - currentRect.left, 2) + Math.pow(rect.top - currentRect.top, 2));
                    if (dist < minDistance) { minDistance = dist; nextIndex = i; }
                }
            }
        }
        else if (e.key === 'Enter' || e.key === ' ') {
            currentEl.click();
            // Automatically reset focus scan immediately after a click (in case UI changes)
            setTimeout(() => {
                refreshFocusableElements();
                if (currentIndex >= focusableElements.length) currentIndex = focusableElements.length - 1;
                if (currentIndex >= 0) updateFocus(currentIndex);
            }, 50);
        }

        if (nextIndex !== currentIndex) {
            updateFocus(nextIndex);
        }
    });

    // 5. Instantly disable TV Mode if User Touches the screen or moves the Mouse
    const disableTVMode = () => {
        if (isTVModeActive) {
            isTVModeActive = false;
            const el = document.querySelector('.tv-focus');
            if (el) el.classList.remove('tv-focus');
        }
    };

    document.addEventListener('mousemove', disableTVMode);
    document.addEventListener('touchstart', disableTVMode, { passive: true });
}

// Start the navigation system 500ms after the page loads to ensure all cards are drawn
setTimeout(setupDownloadNavigation, 500);


/* ==========================================
   SMART TV INACTIVITY TIMEOUT LOGIC
========================================== */
let tvInactivityTimer;

function resetTvIdleState() {
    // 1. Wake up the UI instantly by removing the idle class
    document.body.classList.remove('tv-idle');

    // 2. Clear any existing timer
    clearTimeout(tvInactivityTimer);

    // 3. Set a new timer to hide the focus after 4 seconds of no input
    tvInactivityTimer = setTimeout(() => {
        document.body.classList.add('tv-idle');
    }, 4000); // 4000ms = 4 seconds. Adjust if you want it faster/slower!
}

// 4. Listen for ANY TV remote or keyboard interaction globally
// Using 'true' (Capture Phase) ensures it wakes up BEFORE your existing logic processes the key
document.addEventListener('keydown', (e) => {
    const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', ' '];
    if (keys.includes(e.key)) {
        resetTvIdleState();
    }
}, true); 

// 5. Keep it awake if they switch back to a mouse or touch screen
document.addEventListener('mousemove', resetTvIdleState);
document.addEventListener('touchstart', resetTvIdleState, { passive: true });



/* ==========================================
   6. FIRST-TIME USER ONBOARDING TOUR (DOWNLOADS)
========================================== */
function startDownloadOnboardingTour() {
    // 1. Inject isolated styles for the tour dynamically
    if (!document.getElementById('tour-styles')) {
        const style = document.createElement('style');
        style.id = 'tour-styles';
        style.innerHTML = `
            #tour-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.75); z-index: 10015; display: none; backdrop-filter: blur(4px); }
            #tour-overlay.active { display: block; }
            #tour-tooltip { position: fixed; background: #1c1c1c; color: white; padding: 20px; border-radius: 12px; z-index: 10020; width: 280px; max-width: 90vw; box-shadow: 0 15px 40px rgba(0,0,0,0.9); border: 1px solid #00ff88; display: none; font-family: Arial, sans-serif; transition: top 0.4s ease, left 0.4s ease; }
            #tour-tooltip.active { display: block; }
            .tour-highlight { position: relative !important; z-index: 10025 !important; outline: 3px dashed #00ff88 !important; outline-offset: 6px; border-radius: 8px; background-color: #222; pointer-events: none; transition: all 0.3s ease;}
        `;
        document.head.appendChild(style);
    }

    // 2. Create Overlay & Tooltip HTML
    const overlay = document.createElement('div');
    overlay.id = 'tour-overlay';
    document.body.appendChild(overlay);

    const tooltip = document.createElement('div');
    tooltip.id = 'tour-tooltip';
    tooltip.innerHTML = `
        <h4 style="margin: 0 0 10px 0; color: #00ff88; font-size: 1.1rem; font-weight: bold;">Downloads Guide</h4>
        <p id="tour-text" style="margin: 0 0 15px 0; font-size: 0.95rem; line-height: 1.5; color: #ccc;"></p>
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <span id="tour-counter" style="font-size: 0.8rem; color: gray; font-weight: bold;"></span>
            <button id="tour-next-btn" style="background: #00ff88; color: black; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 0.9rem;">Next</button>
        </div>
    `;
    document.body.appendChild(tooltip);

    // 3. Define the Tour Steps
    const steps = [
        { 
            selector: null, // Centered message
            text: "Welcome to your offline manager! Here you can securely save movies and songs directly to your device." 
        },
        { 
            selector: '.download-card:first-child [id^="dl-action-"] button', 
            text: "Click the <b>Download</b> button to start. We will secure the file directly to your device's storage." 
        },
        { 
            selector: '.download-card:first-child', 
            text: "Once started, an advanced progress bar will appear. You can safely <b>Pause</b> or <b>Cancel</b> the download at any time!" 
        },
        { 
            selector: '.download-card:first-child .remove', 
            text: "Finished watching? Click <b>Remove</b> to clear the item from this list." 
        },
        { 
            selector: null, // Centered message
            text: "Using a Smart TV? Use your remote's <b>Arrow Keys</b> and <b>OK</b> to control your downloads easily. You're all set!" 
        }
    ];

    let currentStep = 0;

    function showStep(index) {
        // Remove previous highlights
        document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));

        // End of Tour
        if (index >= steps.length) {
            overlay.remove();
            tooltip.remove();
            localStorage.setItem('hasSeenDownloadTour', 'true');
            
            // Re-trigger TV focus scan now that the tour is gone
            if (typeof refreshFocusableElements === 'function') {
                setTimeout(() => document.dispatchEvent(new KeyboardEvent('keydown', {key: 'ArrowDown'})), 100);
            }
            return;
        }

        const step = steps[index];
        const target = step.selector ? document.querySelector(step.selector) : null;

        document.getElementById('tour-text').innerHTML = step.text;
        document.getElementById('tour-counter').innerText = `${index + 1} / ${steps.length}`;
        document.getElementById('tour-next-btn').innerText = index === steps.length - 1 ? "Got it!" : "Next";

        tooltip.classList.add('active');
        overlay.classList.add('active');

        if (target) {
            // Target exists: Highlight it and move tooltip near it
            target.classList.add('tour-highlight');
            target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });

            setTimeout(() => {
                const targetRect = target.getBoundingClientRect();
                const tooltipRect = tooltip.getBoundingClientRect();
                const margin = 15; 

                // Smart Vertical Placement (Below target, unless it goes off screen)
                let topPos = targetRect.bottom + margin; 
                if (topPos + tooltipRect.height > window.innerHeight - margin) {
                    topPos = targetRect.top - tooltipRect.height - margin;
                }

                // Smart Horizontal Placement (Centered with target)
                let leftPos = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
                if (leftPos < margin) leftPos = margin; 
                else if (leftPos + tooltipRect.width > window.innerWidth - margin) {
                    leftPos = window.innerWidth - tooltipRect.width - margin; 
                }

                tooltip.style.top = `${topPos}px`;
                tooltip.style.left = `${leftPos}px`;
                tooltip.style.transform = `none`; 
            }, 400); // 400ms delay ensures smooth scrolling finishes before calculation
            
        } else {
            // No target: Center the tooltip perfectly on the screen
            tooltip.style.top = `50%`;
            tooltip.style.left = `50%`;
            tooltip.style.transform = `translate(-50%, -50%)`;
        }
    }

    document.getElementById('tour-next-btn').addEventListener('click', () => {
        showStep(++currentStep);
    });

    // Start tour
    setTimeout(() => showStep(0), 800);
}

// 4. Global Keyboard Interceptor for the Tour (Smart TV support)
// Captures 'Enter' strictly for the "Next" button while the tour is active
document.addEventListener('keydown', (e) => {
    const tooltip = document.getElementById('tour-tooltip');
    if (tooltip && tooltip.classList.contains('active')) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation(); // Stops the background page from clicking things
            const nextBtn = document.getElementById('tour-next-btn');
            if (nextBtn) nextBtn.click();
        }
    }
}, true); // 'true' means it captures the key BEFORE the rest of the page sees it!

// 5. Trigger Logic: Only show if they have downloads and haven't seen it yet
window.addEventListener('load', () => {
    let downloadsList = JSON.parse(localStorage.getItem("downloads")) || [];
    if (!localStorage.getItem('hasSeenDownloadTour') && downloadsList.length > 0) {
        startDownloadOnboardingTour();
    }
});



/* ==========================================
   7. ESCAPE KEY NAVIGATION (BACK TO HOME)
========================================== */
document.addEventListener('keydown', (e) => {
    // Check if the pressed key is "Escape"
    if (e.key === 'Escape') {
        e.preventDefault(); // Prevent any default browser escape behaviors
        
        // Check if the tour tooltip is active. If so, close it first instead of leaving the page.
        const tooltip = document.getElementById('tour-tooltip');
        if (tooltip && tooltip.classList.contains('active')) {
            const nextBtn = document.getElementById('tour-next-btn');
            if (nextBtn) nextBtn.click();
            return;
        }

        // If no tour is active, safely navigate back to the main movie page
        window.location.href = 'movie.html';
    }
});