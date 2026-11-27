const STYLES = ["realism", "blackwork", "fineline", "japanese"];

const MOTIF_NAMES = [
    "Tieňovaná ruža", "Realistické oko", "Kompas a ružica vetrov", "Vreckové hodinky",
    "Portrét leva", "Vlčia hlava", "Portrét jeleňa", "Orol v letu",
    "Tiger v pohybe", "Čierny panter", "Maják na útese", "Plachetnica v búrke",
    "Presýpacie hodiny", "Antická socha", "Lebka s havranom", "Ružica a dýka",
    "Japonská vlna", "Koi kapor", "Japonský drak", "Hannya maska",
    "Kitsune líška", "Sakura vetvička", "Samuraj Kabuto", "Chobotnica",
    "Posvätná geometria", "Metatronova kocka", "Zatmenie slnka", "Had a dýka",
    "Fine Line Motýľ", "Fázy mesiaca", "Súhvezdie", "Vetvička eukalyptu"
];

// Automaticky pripraví 100 motívov: tattoos/1.png ... tattoos/100.png
const TATTOO_DESIGNS = Array.from({ length: 100 }, (_, i) => {
    const num = i + 1;
    const style = STYLES[i % STYLES.length];
    const baseName = MOTIF_NAMES[i % MOTIF_NAMES.length];
    const complexity = Number((1.05 + ((i % 6) * 0.08)).toFixed(2));

    return {
        id: num,
        name: `${baseName} #${num}`,
        style,
        complexity,
        url: `tattoos/${num}.png`
    };
});

let state = {
    x: 0,
    y: 0,
    sizeCm: 10,
    rotation: 0,
    opacity: 0.85,
    blur: 0.4,
    contrast: 115,
    blendMode: 'multiply',
    currentComplexity: 1.25
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

    if (filtered.length > 0) {
        selectTattoo(filtered[0]);
    }
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

    const ratio = Math.min(1, Math.max(0, (state.sizeCm - minCm) / (maxCm - minCm)));
    const rawPrice = baseMin + ratio * (baseMax - baseMin) * state.currentComplexity;
    const finalPrice = Math.min(300, Math.max(50, Math.round(rawPrice / 5) * 5));

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
