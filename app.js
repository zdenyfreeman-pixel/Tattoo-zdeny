const TATTOO_DESIGNS = [
    {
        id: 1,
        name: "Realistická ruža",
        style: "realism",
        complexity: 1.25,
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Rose_tattoo_design.svg/512px-Rose_tattoo_design.svg.png"
    },
    {
        id: 2,
        name: "Lebka a had",
        style: "blackwork",
        complexity: 1.3,
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Skull_and_roses_tattoo.svg/512px-Skull_and_roses_tattoo.svg.png"
    },
    {
        id: 3,
        name: "Geometrický vlk",
        style: "fineline",
        complexity: 1.15,
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Wolf_head_geometric.svg/512px-Wolf_head_geometric.svg.png"
    },
    {
        id: 4,
        name: "Japonský drak",
        style: "japanese",
        complexity: 1.4,
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Dragon_tattoo_lineart.svg/512px-Dragon_tattoo_lineart.svg.png"
    },
    {
        id: 5,
        name: "Kompas a kotva",
        style: "realism",
        complexity: 1.2,
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Nautical_star_compass.svg/512px-Nautical_star_compass.svg.png"
    },
    {
        id: 6,
        name: "Fine Line Motýľ",
        style: "fineline",
        complexity: 1.0,
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Butterfly_line_art.svg/512px-Butterfly_line_art.svg.png"
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
        div.innerHTML = `<img src="${tattoo.url}" alt="${tattoo.name}" crossorigin="anonymous">`;
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
    tattooImg.style.filter = `blur(${state.blur}px) contrast(${state.contrast}%) grayscale(15%)`;
    tattooLayer.style.transform = `translate(${state.x}px, ${state.y}px) rotate(${state.rotation}deg)`;
}

document.getElementById('sizeSlider').addEventListener('input', (e) => {
    state.sizeCm = parseInt(e.target.value);
    document.getElementById('sizeVal').textContent = state.sizeCm;
    updateTattooTransform();
    calculatePrice();
});

document.getElementById('rotateSlider').addEventListener('input', (e) => {
    state.rotation = parseInt(e.target.value);
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
    state.contrast = parseInt(e.target.value);
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
let startX, startY;

tattooLayer.addEventListener('pointerdown', (e) =>
