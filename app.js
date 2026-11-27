function svgToDataUrl(svgString) {
    return "data:image/svg+xml;utf8," + encodeURIComponent(svgString.trim());
}

const TATTOO_DESIGNS = [
    {
        id: 1,
        name: "Tieňovaná ruža",
        style: "realism",
        complexity: 1.3,
        url: svgToDataUrl(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260"><defs><radialGradient id="sh1" cx="40%" cy="35%" r="65%"><stop offset="0%" stop-color="#111113" stop-opacity="0.95"/><stop offset="60%" stop-color="#26262b" stop-opacity="0.72"/><stop offset="100%" stop-color="#3c3c44" stop-opacity="0.25"/></radialGradient></defs><g fill="none" stroke="#121214" stroke-linecap="round" stroke-linejoin="round"><path fill="url(#sh1)" stroke-width="2.2" d="M130 42c-25 0-45 18-45 40 0 20 15 34 35 34 15 0 27-11 27-25 0-12-10-21-22-21-10 0-18 8-18 17"/><path fill="none" stroke-width="3" d="M130 116c-34 0-60-22-60-50 0-30 26-52 60-52 37 0 65 26 65 60 0 39-31 69-71 69-42 0-76-31-76-72"/><path stroke-width="3.2" d="M130 143v94"/><path fill="url(#sh1)" stroke-width="2.2" d="M130 186c-28-4-48-20-55-40 20-2 41 9 55 27"/><path fill="url(#sh1)" stroke-width="2.2" d="M130 200c28-4 48-20 55-40-20-2-41 9-55 27"/><path stroke-width="2" d="M84 82c12 16 32 23 55 18M162 62c8 18 3 40-12 54M72 118c18 22 48 30 82 22"/></g></svg>`)
    },
    {
        id: 2,
        name: "Realistické oko v tieni",
        style: "realism",
        complexity: 1.35,
        url: svgToDataUrl(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260"><defs><radialGradient id="eyeGrad" cx="50%" cy="50%" r="55%"><stop offset="0%" stop-color="#0d0d0f"/><stop offset="55%" stop-color="#222227"/><stop offset="100%" stop-color="#45454f" stop-opacity="0.35"/></radialGradient></defs><path fill="url(#eyeGrad)" stroke="#121214" stroke-width="3" d="M24 130c28-46 66-68 106-68s78 22 106 68c-28 46-66 68-106 68s-78-22-106-68z"/><circle cx="130" cy="130" r="34" fill="#17171b" stroke="#2c2c34" stroke-width="2.5"/><circle cx="130" cy="130" r="15" fill="#09090b"/><circle cx="118" cy="118" r="6" fill="#ffffff" opacity="0.7"/><g stroke="#141417" stroke-width="2" stroke-linecap="round"><path d="M52 102l-10-16M78 82l-8-18M110 68l-4-20M150 68l4-20M182 82l8-18M208 102l10-16M64 162l-10 14M100 186l-5 16M160 186l5 16M196 162l10 14"/></g></svg>`)
    },
    {
        id: 3,
        name: "Kompas a ružica vetrov",
        style: "realism",
        complexity: 1.25,
        url: svgToDataUrl(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260"><defs><radialGradient id="compGrad" cx="35%" cy="35%" r="70%"><stop offset="0%" stop-color="#18181c"/><stop offset="100%" stop-color="#3a3a42" stop-opacity="0.45"/></radialGradient></defs><circle cx="130" cy="130" r="88" fill="none" stroke="#131316" stroke-width="3.2"/><circle cx="130" cy="130" r="74" fill="none" stroke="#131316" stroke-width="1.8" stroke-dasharray="4 5"/><circle cx="130" cy="130" r="56" fill="none" stroke="#131316" stroke-width="1.4"/><polygon points="130,22 146,114 238,130 146,146 130,238 114,146 22,130 114,114" fill="url(#compGrad)" stroke="#121215" stroke-width="2.2"/><polygon points="130,56 138,122 204,130 138,138 130,204 122,138 56,130 122,122" fill="none" stroke="#121215" stroke-width="1.6"/><circle cx="130" cy="130" r="10" fill="#121215"/></svg>`)
    },
    {
        id: 4,
        name: "Lebka Blackwork",
        style: "blackwork",
        complexity: 1.4,
        url: svgToDataUrl(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260"><g fill="#121215" stroke="#121215" stroke-linejoin="round"><path fill="none" stroke-width="4.2" d="M130 32c-44 0-72 28-72 68 0 25 11 43 27 53v34h8v-20h11v20h9v-20h10v20h9v-20h11v20h8v-34c16-10 27-28 27-53 0-40-28-68-72-68z"/><ellipse cx="101" cy="102" rx="16" ry="18"/><ellipse cx="159" cy="102" rx="16" ry="18"/><path d="M130 118l-11 22h22z"/><path stroke-width="5" stroke-linecap="round" d="M44 196l172 32M216 196L44 228"/><circle cx="44" cy="196" r="6"/><circle cx="216" cy="196" r="6"/><circle cx="44" cy="228" r="6"/><circle cx="216" cy="228" r="6"/></g></svg>`)
    },
    {
        id: 5,
        name: "Posvätná geometria",
        style: "blackwork",
        complexity: 1.3,
        url: svgToDataUrl(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260" fill="none" stroke="#121215"><circle cx="130" cy="130" r="92" stroke-width="2.6"/><circle cx="130" cy="104" r="34" stroke-width="2"/><circle cx="152" cy="143" r="34" stroke-width="2"/><circle cx="108" cy="143" r="34" stroke-width="2"/><polygon points="130,38 210,176 50,176" stroke-width="2.4"/><polygon points="130,222 210,84 50,84" stroke-width="2.4"/><circle cx="130" cy="130" r="8" fill="#121215"/></svg>`)
    },
    {
        id: 6,
        name: "Tieňovaný dýka motív",
        style: "blackwork",
        complexity: 1.25,
        url: svgToDataUrl(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260"><path fill="#141418" d="M130 20l14 132h-28z"/><rect x="92" y="152" width="76" height="10" rx="4" fill="#141418"/><rect x="122" y="162" width="16" height="58" rx="3" fill="#141418"/><circle cx="130" cy="228" r="9" fill="#141418"/><path fill="none" stroke="#141418" stroke-width="2.2" d="M130 34v118M98 157c-22 14-26 42-12 62M162 157c22 14 26 42 12 62"/></svg>`)
    },
    {
        id: 7,
        name: "Fine Line Vlk",
        style: "fineline",
        complexity: 1.15,
        url: svgToDataUrl(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260" fill="none" stroke="#16161a" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"><polygon points="130,26 58,92 80,174 130,230 180,174 202,92"/><polyline points="58,92 98,110 130,78 162,110 202,92"/><polyline points="80,174 102,134 130,158 158,134 180,174"/><line x1="130" y1="26" x2="130" y2="230"/><line x1="98" y1="110" x2="102" y2="134"/><line x1="162" y1="110" x2="158" y2="134"/><circle cx="100" cy="114" r="2.8" fill="#16161a"/><circle cx="160" cy="114" r="2.8" fill="#16161a"/></svg>`)
    },
    {
        id: 8,
        name: "Fine Line Motýľ",
        style: "fineline",
        complexity: 1.0,
        url: svgToDataUrl(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260" fill="none" stroke="#16161a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="130" y1="56" x2="130" y2="202"/><path d="M130 64c-9-20-24-28-38-28"/><path d="M130 64c9-20 24-28 38-28"/><path d="M130 100c-38-40-92-36-94 8-2 26 24 40 52 33-22 16-26 46-4 59 20 12 40-6 46-31"/><path d="M130 100c38-40 92-36 94 8 2 26-24 40-52 33 22 16 26 46 4 59-20 12-40-6-46-31"/><circle cx="74" cy="96" r="6"/><circle cx="186" cy="96" r="6"/></svg>`)
    },
    {
        id: 9,
        name: "Jemná vetvička a mesiac",
        style: "fineline",
        complexity: 1.05,
        url: svgToDataUrl(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260" fill="none" stroke="#16161a" stroke-width="2.2" stroke-linecap="round"><path d="M174 52a44 44 0 1 0 38 66 36 36 0 1 1-38-66z"/><path d="M62 214c22-48 56-92 104-126"/><path d="M92 162c-16-2-28-12-34-26 14-2 26 6 34 26z"/><path d="M118 124c-14-6-22-18-24-34 14 2 22 12 24 34z"/><path d="M104 144c14 2 26 10 34 22-14 2-26-6-34-22z"/></svg>`)
    },
    {
        id: 10,
        name: "Japonská vlna a slnko",
        style: "japanese",
        complexity: 1.4,
        url: svgToDataUrl(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260"><defs><linearGradient id="waveGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#141418" stop-opacity="0.88"/><stop offset="100%" stop-color="#282830" stop-opacity="0.35"/></linearGradient></defs><circle cx="188" cy="58" r="24" fill="none" stroke="#131317" stroke-width="2.6"/><path fill="url(#waveGrad)" stroke="#131317" stroke-width="2.8" stroke-linecap="round" d="M22 178c32-64 84-96 146-92 32 2 56 16 70 38-24-4-46 6-60 26-14 20-36 30-62 28-24-2-42-18-50-40-18 12-32 20-44 30z"/><path fill="none" stroke="#131317" stroke-width="2.2" stroke-linecap="round" d="M36 198c38-46 86-68 140-60M52 216c40-32 84-42 134-32"/></svg>`)
    },
    {
        id: 11,
        name: "Japonský drak silueta",
        style: "japanese",
        complexity: 1.45,
        url: svgToDataUrl(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260" fill="none" stroke="#131317" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M54 206c-12-28 8-54 44-56 38-2 54-24 44-52-8-22 10-44 38-46 22-2 38 10 42 26"/><path d="M182 48l16-18M196 54l22-8"/><path d="M174 66c-12 6-18 16-16 28"/><path d="M108 150c-10-18-28-24-46-18M124 146c-4-22-18-36-36-40M76 188c22 14 54 14 82-2"/><circle cx="192" cy="64" r="3" fill="#131317"/></svg>`)
    },
    {
        id: 12,
        name: "Koi kapor v prúde",
        style: "japanese",
        complexity: 1.35,
        url: svgToDataUrl(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260"><defs><linearGradient id="koiGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#141418" stop-opacity="0.85"/><stop offset="100%" stop-color="#34343e" stop-opacity="0.35"/></linearGradient></defs><path fill="url(#koiGrad)" stroke="#131317" stroke-width="2.6" stroke-linejoin="round" d="M64 198c24-12 44-34 58-64 16-34 42-56 76-64-8 24-22 44-42 60 18 4 32 14 40 30-22-2-40 4-54 18-16 16-34 44-76 64z"/><path fill="none" stroke="#131317" stroke-width="2" stroke-linecap="round" d="M174 68l16-14M182 76l18-6M36 164c26-8 46-2 62 12M48 218c28-6 48 2 64 16"/><circle cx="176" cy="76" r="2.8" fill="#131317"/></svg>`)
    }
];

let state = {
    x: 0,
    y: 0,
    sizeCm: 10,
    rotation: 0,
    opacity: 0.85,
    blur: 0.4,
    contrast: 115,
    blendMode: 'multiply',
    currentComplexity: 1.3
};

const tattooLayer = document.getElementById('tattooLayer');
const tattooImg = document.getElementById('tattooImg');
const bodyImage = document.getElementById('bodyImage');
const cameraStream = document.getElementById('cameraStream');
const gallery = document.getElementById('tattooGallery');
const priceDisplay = document.getElementById('priceDisplay');

function renderGallery(filterStyle = 'all') {
    gallery.innerHTML = '';
    const filtered = filterStyle === 'all'
        ? TATTOO_DESIGNS
        : TATTOO_DESIGNS.filter(t => t.style === filterStyle);

    filtered.forEach((tattoo, index) => {
        const div = document.createElement('div');
        div.className = 'tattoo-thumb' + (index === 0 ? ' selected' : '');
        div.title = tattoo.name;
        div.innerHTML = `<img src="${tattoo.url}" alt="${tattoo.name}">`;
        div.onclick = () => {
            document.querySelectorAll('.tattoo-thumb').forEach(el => el.classList.remove('selected'));
            div.classList.add('selected');
            selectTattoo(tattoo);
        };
        gallery.appendChild(div);
    });

    if (filtered.length > 0) selectTattoo(filtered[0]);
}

function selectTattoo(tattoo) {
    tattooImg.src = tattoo.url;
    state.currentComplexity = tattoo.complexity;
    calculatePrice();
}

function calculatePrice() {
    const minCm = 3;
    const maxCm = 30;
    const baseMin = 50;
    const baseMax = 240;

    const ratio = (state.sizeCm - minCm) / (maxCm - minCm);
    let rawPrice = baseMin + ratio * (baseMax - baseMin) * state.currentComplexity;

    let finalPrice = Math.min(300, Math.max(50, Math.round(rawPrice / 5) * 5));
    priceDisplay.textContent = `${finalPrice} €`;
}

function updateTattooTransform() {
    const pixelWidth = state.sizeCm * 14;
    tattooImg.style.width = `${pixelWidth}px`;
    tattooImg.style.opacity = state.opacity;
    tattooImg.style.mixBlendMode = state.blendMode;
    tattooImg.style.filter = `blur(${state.blur}px) contrast(${state.contrast}%) grayscale(20%)`;
    tattooLayer.style.transform = `translate(${state.x}px, ${state.y}px) rotate(${state.rotation}deg)`;
}

document.getElementById('sizeSlider').addEventListener('input', (e) => {
    state.sizeCm = parseInt(e.target.value, 10);
    document.getElementById('sizeVal').textContent = state.sizeCm;
    updateTattooTransform();
    calculatePrice();
});

document.getElementById('rotateSlider').addEventListener('input', (e) => {
    state.rotation = parseInt(e.target.value, 10);
    document.getElementById('rotateVal').textContent = state.rotation;
    updateTattooTransform();
});

document.getElementById('opacitySlider').addEventListener('input', (e) => {
    state.opacity = e.target.value / 100;
    document.getElementById('opacityVal').textContent = e.target.value;
    updateTattooTransform();
});

document.getElementById('blurSlider').addEventListener('input', (e) => {
    state.blur = parseFloat(e.target.value);
    document.getElementById('blurVal').textContent = state.blur;
    updateTattooTransform();
});

document.getElementById('contrastSlider').addEventListener('input', (e) => {
    state.contrast = parseInt(e.target.value, 10);
    document.getElementById('contrastVal').textContent = state.contrast;
    updateTattooTransform();
});

document.getElementById('blendModeSelect').addEventListener('change', (e) => {
    state.blendMode = e.target.value;
    updateTattooTransform();
});

document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderGallery(tab.dataset.style);
    });
});

let isDragging = false;
let startX = 0;
let startY = 0;

tattooLayer.addEventListener('pointerdown', (e) => {
    isDragging = true;
    startX = e.clientX - state.x;
    startY = e.clientY - state.y;
    tattooLayer.setPointerCapture(e.pointerId);
});

tattooLayer.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    state.x = e.clientX - startX;
    state.y = e.clientY - startY;
    updateTattooTransform();
});

tattooLayer.addEventListener('pointerup', () => {
    isDragging = false;
});

const startCameraBtn = document.getElementById('startCameraBtn');
const captureBtn = document.getElementById('captureBtn');
let mediaStream = null;

startCameraBtn.addEventListener('click', async () => {
    try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }
        });
        cameraStream.srcObject = mediaStream;
        cameraStream.hidden = false;
        bodyImage.hidden = true;
        captureBtn.hidden = false;
        startCameraBtn.hidden = true;
    } catch (err) {
        alert("Nepodarilo sa spustiť kameru. Povoľte prístup ku kamere v prehliadači alebo nahrajte fotku.");
    }
});

captureBtn.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    canvas.width = cameraStream.videoWidth;
    canvas.height = cameraStream.videoHeight;
    canvas.getContext('2d').drawImage(cameraStream, 0, 0);

    bodyImage.src = canvas.toDataURL('image/jpeg');
    bodyImage.hidden = false;
    cameraStream.hidden = true;
    captureBtn.hidden = true;
    startCameraBtn.hidden = false;

    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
    }
});

document.getElementById('uploadBodyInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        bodyImage.src = URL.createObjectURL(file);
        bodyImage.hidden = false;
        cameraStream.hidden = true;
    }
});

document.getElementById('uploadTattooInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        tattooImg.src = URL.createObjectURL(file);
        state.currentComplexity = 1.25;
        calculatePrice();
    }
});

document.getElementById('saveResultBtn').addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const wrapper = document.getElementById('canvasWrapper');

    canvas.width = wrapper.clientWidth * 2;
    canvas.height = wrapper.clientHeight * 2;
    ctx.scale(2, 2);

    ctx.drawImage(bodyImage, 0, 0, wrapper.clientWidth, wrapper.clientHeight);

    ctx.save();
    ctx.globalAlpha = state.opacity;
    ctx.globalCompositeOperation = state.blendMode;
    ctx.filter = `blur(${state.blur}px) contrast(${state.contrast}%) grayscale(20%)`;

    const centerX = wrapper.clientWidth / 2 + state.x;
    const centerY = wrapper.clientHeight / 2 + state.y;
    const w = tattooImg.clientWidth;
    const h = tattooImg.clientHeight;

    ctx.translate(centerX, centerY);
    ctx.rotate((state.rotation * Math.PI) / 180);
    ctx.drawImage(tattooImg, -w / 2, -h / 2, w, h);
    ctx.restore();

    const link = document.createElement('a');
    link.download = `tetovanie-navrh-${priceDisplay.textContent}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
});

renderGallery();
updateTattooTransform();
