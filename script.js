const bootLog = document.getElementById('boot-log');
const bootContainer = document.getElementById('boot-container');
const terminal = document.getElementById('terminal');
const systemTime = document.getElementById('system-time');

const bootSequence = [
    { text: "BIOS V4.0.1 (C) 2026 ABHILASH TECH SYSTEMS", delay: 100 },
    { text: "CPU: OCTA-CORE HARDWARE DIAGNOSTIC ENGINE @ 4.2GHz", delay: 150 },
    { text: "MEMORY: 32768MB OK", delay: 200 },
    { text: "CHECKING PERIPHERALS...", delay: 400 },
    { text: "  -> USB CONTROLLER [READY]", delay: 100, type: "success" },
    { text: "  -> GPU ACCELERATOR [READY]", delay: 100, type: "success" },
    { text: "  -> MICRO-SOLDERING STATION [LINKED]", delay: 300, type: "success" },
    { text: "  -> THERMAL CAMERA INTERFACE [CONNECTED]", delay: 200, type: "success" },
    { text: "INITIALIZING CHIP-LEVEL OS...", delay: 500 },
    { text: "MOUNTING /DEV/EXPERIENCE...", delay: 300 },
    { text: "MOUNTING /DEV/SKILLS...", delay: 200 },
    { text: "SYSTEM CHECK: PASSED", delay: 400, type: "success" },
    { text: "LOADING USER PROFILE: ABHILASH_S", delay: 200 },
    { text: "READY.", delay: 500, type: "success" }
];

async function runBootSequence() {
    for (const line of bootSequence) {
        const div = document.createElement('div');
        div.className = `log-line ${line.type || ''}`;
        bootLog.appendChild(div);
        
        // Typing effect for each line
        await typeWriter(div, line.text);
        await new Promise(resolve => setTimeout(resolve, line.delay));
    }

    // Transition to terminal
    setTimeout(() => {
        bootContainer.classList.add('hidden');
        terminal.classList.remove('hidden');
        updateTime();
        setInterval(updateTime, 1000);
    }, 1000);
}

function typeWriter(element, text, i = 0) {
    return new Promise(resolve => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            setTimeout(() => typeWriter(element, text, i + 1).then(resolve), 20);
        } else {
            resolve();
        }
    });
}

function updateTime() {
    const now = new Date();
    systemTime.textContent = now.toLocaleTimeString('en-US', { hour12: false });
}

// Start sequence
window.onload = runBootSequence;
