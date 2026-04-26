const bootLog = document.getElementById('boot-log');
const biosScreen = document.getElementById('bios-screen');
const motherboard = document.getElementById('motherboard');

const bootSequence = [
    { text: "BIOS Date 04/26/26 18:35:00 Ver 08.00.15", delay: 100 },
    { text: "CPU: ABHILASH_S HARDWARE DIAGNOSTIC ENGINE @ 4.2GHz", delay: 150 },
    { text: "Speed : 4.20 GHz", delay: 100 },
    { text: "Press DEL to run Setup", delay: 100 },
    { text: "Press F8 for BBS POPUP", delay: 100 },
    { text: " ", delay: 100 },
    { text: "Memory Check: 32768MB OK", delay: 200 },
    { text: "Initializing USB Controllers .. Done.", delay: 300, type: "success" },
    { text: "Checking NVRAM..", delay: 200 },
    { text: "Update OK!", delay: 200, type: "success" },
    { text: " ", delay: 100 },
    { text: "Auto-Detecting Micro-Soldering Station.. Found.", delay: 300 },
    { text: "Auto-Detecting Thermal Camera.. Found.", delay: 200 },
    { text: " ", delay: 100 },
    { text: "Hardware Monitor Status:", delay: 200 },
    { text: "  -> CPU VCore: 1.25V  [OK]", delay: 100, type: "success" },
    { text: "  -> System Temp: 32C  [OK]", delay: 100, type: "success" },
    { text: " ", delay: 100 },
    { text: "SYSTEM CHECK: PASSED", delay: 400, type: "success" },
    { text: "BOOTING FROM PRIMARY HARDWARE COMPONENT...", delay: 500 }
];

async function runBootSequence() {
    for (const line of bootSequence) {
        const div = document.createElement('div');
        div.className = `log-line ${line.type || ''}`;
        bootLog.appendChild(div);
        
        await typeWriter(div, line.text);
        await new Promise(resolve => setTimeout(resolve, line.delay));
    }

    // Transition to Motherboard Layout
    setTimeout(() => {
        biosScreen.classList.add('hidden');
        motherboard.classList.remove('hidden');
    }, 800);
}

function typeWriter(element, text, i = 0) {
    return new Promise(resolve => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            setTimeout(() => typeWriter(element, text, i + 1).then(resolve), 15);
        } else {
            resolve();
        }
    });
}

// Start sequence
window.onload = runBootSequence;
