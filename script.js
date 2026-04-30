const bootLog = document.getElementById('boot-log');
const biosScreen = document.getElementById('bios-screen');
const motherboard = document.getElementById('motherboard');

const bootSequence = [
    { text: "BIOS Date 04/26/26 18:35:00 Ver 08.00.15", delay: 10 },
    { text: "CPU: ABHILASH_S HARDWARE DIAGNOSTIC ENGINE @ 4.2GHz", delay: 10 },
    { text: "Speed : 4.20 GHz", delay: 10 },
    { text: "Press DEL to run Setup", delay: 10 },
    { text: "Press F8 for BBS POPUP", delay: 10 },
    { text: " ", delay: 10 },
    { text: "Memory Check: 32768MB OK", delay: 10 },
    { text: "Initializing USB Controllers .. Done.", delay: 10, type: "success" },
    { text: "Checking NVRAM..", delay: 10 },
    { text: "Update OK!", delay: 10, type: "success" },
    { text: " ", delay: 10 },
    { text: "Auto-Detecting Micro-Soldering Station.. Found.", delay: 10 },
    { text: "Auto-Detecting Thermal Camera.. Found.", delay: 10 },
    { text: " ", delay: 10 },
    { text: "Hardware Monitor Status:", delay: 10 },
    { text: "  -> CPU VCore: 1.25V  [OK]", delay: 10, type: "success" },
    { text: "  -> System Temp: 32C  [OK]", delay: 10, type: "success" },
    { text: " ", delay: 10 },
    { text: "SYSTEM CHECK: PASSED", delay: 20, type: "success" },
    { text: "BOOTING FROM PRIMARY HARDWARE COMPONENT...", delay: 50 }
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
    }, 100);
}

function typeWriter(element, text, i = 0) {
    return new Promise(resolve => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            setTimeout(() => typeWriter(element, text, i + 1).then(resolve), 2);
        } else {
            resolve();
        }
    });
}

// Start sequence
window.onload = runBootSequence;
