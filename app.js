function makeSvgDataUrl(svg) {
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg.trim());
}

const MOTIFS = [
    {
        id: 1,
        name: "Tieňová ruža",
        style: "realism",
        complexity: 1.35,
        src: makeSvgDataUrl(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
            <rect width="300" height="300" fill="#ffffff"/>
            <defs>
                <radialGradient id="g1" cx="50%" cy="50%" r="55%">
                    <stop offset="0%" stop-color="#111"/>
                    <stop offset="65%" stop-color="#444"/>
                    <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
                </radialGradient>
            </defs>
            <ellipse cx="150" cy="155" rx="115" ry="110" fill="url(#g1)" opacity="0.35"/>
            <path d="M150 65 C115 65 92 98 98 132 C72 135 58 165 75 190 C92 215 125 222 150 222 C175 222 208 215 225 190 C242 165 228 135 202 132 C208 98 185 65 150 65 Z" fill="#2b2b2b" stroke="#111" stroke-width="4"/>
            <path d="M150 92 C128 92 115 112 120 132 C104 136 98 156 112 172 C125 186 142 188 150 188 C158 188 175 186 188 172 C202 156 196 136 180 132 C185 112 172 92 150 92 Z" fill="#555" stroke="#181818" stroke-width="3"/>
            <path d="M150 118 C138 118 132 130 136 142 C128 148 132 162 145 165 C155 167 168 158 164 143 C162 130 156 118 150 118 Z" fill="#181818"/>
            <path d="M75 195 C45 205 35 230 58 242 C82 254 112 235 122 215 Z" fill="#3a3a3a" stroke="#151515" stroke-width="3"/>
            <path d="M225 195 C255 205 265 230 242 242 C218 254 188 235 178 215 Z" fill="#3a3a3a" stroke="#151515" stroke-width="3"/>
        </svg>`)
    },
    {
        id: 2,
        name: "Blackwork geometria",
        style: "blackwork",
        complexity: 1.4,
        src: makeSvgDataUrl(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
            <rect width="300" height="300" fill="#ffffff"/>
            <circle cx="150" cy="150" r="102" fill="none" stroke="#121212" stroke-width="7"/>
            <circle cx="150" cy="150" r="76" fill="none" stroke="#121212" stroke-width="3"/>
            <polygon points="150,48 238,200 62,200" fill="none" stroke="#121212" stroke-width="6"/>
            <polygon points="150,252 238,100 62,100" fill="none" stroke="#121212" stroke-width="4"/>
            <circle cx="150" cy="150" r="24" fill="#121212"/>
        </svg>`)
    },
    {
        id: 3,
        name: "Fine Line kompas",
        style: "fineline",
        complexity: 1.1,
        src: makeSvgDataUrl(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
            <rect width="300" height="300" fill="#ffffff"/>
            <circle cx="150" cy="150" r="92" fill="none" stroke="#222" stroke-width="2"/>
            <circle cx="150" cy="150" r="78" fill="none" stroke="#222" stroke-width="1.2" stroke-dasharray="5 5"/>
            <polygon points="150,42 166,134 258,150 166,166 150,258 134,166 42,150 134,134" fill="none" stroke="#222" stroke-width="2"/>
            <polygon points="150,62 159,141 238,150 159,159 150,238 141,159 62,150 141,141" fill="#222" opacity="0.75"/>
            <circle cx="150" cy="150" r="6" fill="#fff" stroke="#222" stroke-width="2"/>
        </svg>`)
    },
    {
        id: 4,
        name: "Japonská vlna",
        style: "japanese",
        complexity: 1.45,
        src: makeSvgDataUrl(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
            <rect width="300" height="300" fill="#ffffff"/>
            <circle cx="150" cy="150" r="105" fill="none" stroke="#181818" stroke-width="5"/>
            <path d="M48 185 C85 115 145 105 182 155 C198 115 235 105 252 145 C225 142 208 160 202 185 C175 155 135 160 112 195 C88 175 68 178 48 185 Z" fill="#262626" stroke="#141414" stroke-width="3"/>
            <path d="M55 208 C95 185 135 190 175 215 C205 195 232 195 246 208 L246 245 L55 245 Z" fill="#444" stroke="#141414" stroke-width="2.5"/>
        </svg>`)
    },
    {
        id: 5,
        name: "Fine Line had",
        style: "fineline",
        complexity: 1.15,
        src: makeSvgDataUrl(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
            <rect width="300" height="300" fill="#ffffff"/>
            <path d="M85 245 C65 200 185 185 175 135 C165 95 95 105 115 68 C125 50 155 46 168 58 L182 52 L176 66 C185 75 182 88 170 90 C155 92 142 82 148 70" fill="none" stroke="#222" stroke-width="3" stroke-linecap="round"/>
            <path d="M95 235 C80 198 172 182 164 138 C156 104 108 110 124 78" fill="none" stroke="#555" stroke-width="1.5" stroke-linecap="round"/>
        </svg>`)
    },
    {
        id: 6,
        name: "Realizmus oko",
        style: "realism",
        complexity: 1.3,
        src: makeSvgDataUrl(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
            <rect width="300" height="300" fill="#ffffff"/>
            <path d="M35 150 Q150 65 265 150 Q150 235 35 150 Z" fill="#e8e8e8" stroke="#181818" stroke-width="4"/>
            <circle cx="150" cy="150" r="46" fill="#3a3a3a" stroke="#141414" stroke-width="3"/>
            <circle cx="150" cy="150" r="20" fill="#111"/>
            <circle cx="136" cy="136" r="8" fill="#ffffff"/>
        </svg>`)
    }
];

const state = {
    style: "all",
    selectedMotif: MOTIFS[0],
    x: 0,
    y: 0,
    sizeCm: 15,
    rotation: 0,
    opacity: 0.85,
    blur: 0.6,
    contrast: 125,
    brightness: 100,
    saturation: 100,
    radius: 12,
    blend: "multiply",
    skinFilter: "none",
    cameraStream: null
};

const el = {
    stage: document.getElementById("stage"),
    bodyImg: document.getElementById("bodyImg"),
    cameraVideo: document.getElementById("cameraVideo"),
    tattooLayer: document.getElementById("tattooLayer"),
    tattooImg: document.getElementById("tattooImg"),
    gallery: document.getElementById("gallery"),
    styleTabs: document.getElementById("styleTabs"),
    presetChips: document.getElementById("presetChips"),
    blendSelect: document.getElementById("blendSelect"),
    skinFilterSelect: document.getElementById("skinFilterSelect"),
    priceDisplay: document.getElementById("priceDisplay"),
    cameraBtn: document.getElementById("cameraBtn"),
    snapBtn: document.getElementById("snapBtn"),
    closeCamBtn: document.getElementById("closeCamBtn"),
    bodyFileInput: document.getElementById("bodyFileInput"),
    tattooFileInput: document.getElementById("tattooFileInput"),
    saveBtn: document.getElementById("saveBtn"),
    sizeRange: document.getElementById("sizeRange"),
    rotRange: document.getElementById("rotRange"),
    opRange: document.getElementById("opRange"),
    blurRange: document.getElementById("blurRange"),
    conRange: document.getElementById("conRange"),
    briRange: document.getElementById("briRange"),
    satRange: document.getElementById("satRange"),
    radRange: document.getElementById("radRange"),
    sizeVal: document.getElementById("sizeVal"),
    rotVal: document.getElementById("rotVal"),
    opVal: document.getElementById("opVal"),
    blurVal: document.getElementById("blurVal"),
    conVal: document.getElementById("conVal"),
    briVal: document.getElementById("briVal"),
    satVal: document.getElementById("satVal"),
    radVal: document.getElementById("radVal")
};

// Predvolená fotka ruky (čistý SVG náhľad, aby stránka nebola prázdna)
el.bodyImg.src = makeSvgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750">
    <defs>
        <linearGradient id="skin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#e5b89b"/>
            <stop offset="60%" stop-color="#d49e7e"/>
            <stop offset="100%" stop-color="#b87e5e"/>
        </linearGradient>
    </defs>
    <rect width="600" height="750" fill="#1c1c21"/>
    <path d="M210 750 L235 340 C238 280 215 225 225 160 C232 115 255 95 270 95 C282 95 288 125 290 155 L302 90 C306 72 325 72 330 92 L328 160 L345 98 C350 80 370 84 368 104 L352 175 L372 122 C378 106 396 112 390 132 L365 215 C355 255 365 300 370 360 L395 750 Z" fill="url(#skin)"/>
</svg>`);

function calculatePrice() {
    const ratio = (state.sizeCm - 5) / 30;
    const raw = 50 + ratio * 185 * (state.selectedMotif.complexity || 1.2);
    const clamped = Math.max(50, Math.min(300, Math.round(raw / 5) * 5));
    el.priceDisplay.textContent = `Odhad ceny: ${clamped} €`;
}

function applyStyles() {
    const pxWidth = Math.round(70 + ((state.sizeCm - 5) / 30) * 230);
    el.tattooImg.style.width = `${pxWidth}px`;
    el.tattooLayer.style.transform = `translate(calc(-50% + ${state.x}px), calc(-50% + ${state.y}px)) rotate(${state.rotation}deg)`;

    el.tattooImg.style.mixBlendMode = state.blend;
    el.tattooImg.style.opacity = String(state.opacity);
    el.tattooImg.style.borderRadius = `${state.radius}px`;
    el.tattooImg.style.filter = `blur(${state.blur}px) contrast(${state.contrast}%) brightness(${state.brightness}%) saturate(${state.saturation}%)`;

    el.bodyImg.style.filter = state.skinFilter;
    el.cameraVideo.style.filter = state.skinFilter;

    el.sizeVal.textContent = `${state.sizeCm} cm`;
    el.rotVal.textContent = `${state.rotation}°`;
    el.opVal.textContent = `${Math.round(state.opacity * 100)}%`;
    el.blurVal.textContent = `${state.blur}px`;
    el.conVal.textContent = `${state.contrast}%`;
    el.briVal.textContent = `${state.brightness}%`;
    el.satVal.textContent = `${state.saturation}%`;
    el.radVal.textContent = `${state.radius}px`;

    calculatePrice();
}

function setMotif(motif) {
    state.selectedMotif = motif;
    el.tattooImg.src = motif.src;
    renderGallery();
    calculatePrice();
}

function renderGallery() {
    el.gallery.innerHTML = "";
    const list = state.style === "all" ? MOTIFS : MOTIFS.filter(m => m.style === state.style);
    list.forEach(motif => {
        const div = document.createElement("div");
        div.className = "thumb" + (state.selectedMotif && state.selectedMotif.id === motif.id ? " active" : "");
        const img = document.createElement("img");
        img.src = motif.src;
        img.alt = motif.name;
        div.appendChild(img);
        div.addEventListener("click", () => setMotif(motif));
        el.gallery.appendChild(div);
    });
}

// Štýlové záložky
el.styleTabs.addEventListener("click", e => {
    const btn = e.target.closest(".tab");
    if (!btn) return;
    el.styleTabs.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    btn.classList.add("active");
    state.style = btn.dataset.style;
    renderGallery();
});

// Rýchle filtre
el.presetChips.addEventListener("click", e => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    el.presetChips.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");

    const p = chip.dataset.preset;
    if (p === "fresh") {
        state.blend = "multiply"; state.opacity = 0.88; state.blur = 0.4; state.contrast = 135; state.brightness = 100; state.saturation = 100;
    } else if (p === "healed") {
        state.blend = "multiply"; state.opacity = 0.68; state.blur = 1.2; state.contrast = 110; state.brightness = 105; state.saturation = 75;
    } else if (p === "vintage") {
        state.blend = "multiply"; state.opacity = 0.62; state.blur = 1.0; state.contrast = 105; state.brightness = 104; state.saturation = 45;
    } else if (p === "noWhite") {
        state.blend = "multiply"; state.opacity = 0.92; state.blur = 0.6; state.contrast = 185; state.brightness = 96; state.saturation = 0;
    } else if (p === "softShadow") {
        state.blend = "multiply"; state.opacity = 0.55; state.blur = 2.0; state.contrast = 95; state.brightness = 106; state.saturation = 80;
    } else if (p === "highInk") {
        state.blend = "color-burn"; state.opacity = 0.9; state.blur = 0.4; state.contrast = 160; state.brightness = 95; state.saturation = 115;
    }

    el.blendSelect.value = state.blend;
    el.opRange.value = Math.round(state.opacity * 100);
    el.blurRange.value = state.blur;
    el.conRange.value = state.contrast;
    el.briRange.value = state.brightness;
    el.satRange.value = state.saturation;
    applyStyles();
});

// Posuvníky a výbery
el.blendSelect.addEventListener("change", () => { state.blend = el.blendSelect.value; applyStyles(); });
el.skinFilterSelect.addEventListener("change", () => { state.skinFilter = el.skinFilterSelect.value; applyStyles(); });
el.sizeRange.addEventListener("input", () => { state.sizeCm = Number(el.sizeRange.value); applyStyles(); });
el.rotRange.addEventListener("input", () => { state.rotation = Number(el.rotRange.value); applyStyles(); });
el.opRange.addEventListener("input", () => { state.opacity = Number(el.opRange.value) / 100; applyStyles(); });
el.blurRange.addEventListener("input", () => { state.blur = Number(el.blurRange.value); applyStyles(); });
el.conRange.addEventListener("input", () => { state.contrast = Number(el.conRange.value); applyStyles(); });
el.briRange.addEventListener("input", () => { state.brightness = Number(el.briRange.value); applyStyles(); });
el.satRange.addEventListener("input", () => { state.saturation = Number(el.satRange.value); applyStyles(); });
el.radRange.addEventListener("input", () => { state.radius = Number(el.radRange.value); applyStyles(); });

// Ťahanie motívu prstom / myšou
let dragStart = null;
el.tattooLayer.addEventListener("pointerdown", e => {
    e.preventDefault();
    el.tattooLayer.setPointerCapture(e.pointerId);
    dragStart = { x: e.clientX - state.x, y: e.clientY - state.y };
});
el.tattooLayer.addEventListener("pointermove", e => {
    if (!dragStart) return;
    state.x = Math.round(e.clientX - dragStart.x);
    state.y = Math.round(e.clientY - dragStart.y);
    applyStyles();
});
el.tattooLayer.addEventListener("pointerup", () => { dragStart = null; });
el.tattooLayer.addEventListener("pointercancel", () => { dragStart = null; });

// Nahratie fotky tela
el.bodyFileInput.addEventListener("change", e => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    stopCamera();
    el.bodyImg.src = URL.createObjectURL(file);
});

// Nahratie vlastného motívu
el.tattooFileInput.addEventListener("change", e => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const custom = { id: Date.now(), name: file.name, style: "all", complexity: 1.25, src: url };
    MOTIFS.unshift(custom);
    setMotif(custom);
});

// Kamera (odfotiť telo)
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { ideal: "environment" } },
            audio: false
        });
        state.cameraStream = stream;
        el.cameraVideo.srcObject = stream;
        await el.cameraVideo.play();
        el.stage.classList.add("camera-on");
    } catch (err) {
        alert("Nepodarilo sa spustiť kameru. Použi tlačidlo „Nahrať fotku“.");
    }
}

function stopCamera() {
    if (state.cameraStream) {
        state.cameraStream.getTracks().forEach(t => t.stop());
        state.cameraStream = null;
    }
    el.stage.classList.remove("camera-on");
}

el.cameraBtn.addEventListener("click", startCamera);
el.closeCamBtn.addEventListener("click", stopCamera);

el.snapBtn.addEventListener("click", () => {
    const w = el.cameraVideo.videoWidth || 600;
    const h = el.cameraVideo.videoHeight || 750;
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    c.getContext("2d").drawImage(el.cameraVideo, 0, 0, w, h);
    el.bodyImg.src = c.toDataURL("image/jpeg", 0.92);
    stopCamera();
});

// Uloženie výsledného náhľadu
el.saveBtn.addEventListener("click", () => {
    const rect = el.stage.getBoundingClientRect();
    const canvas = document.createElement("canvas");
    const scale = 2;
    canvas.width = Math.round(rect.width * scale);
    canvas.height = Math.round(rect.height * scale);
    const ctx = canvas.getContext("2d");

    ctx.scale(scale, scale);
    ctx.filter = state.skinFilter || "none";
    if (el.bodyImg.complete && el.bodyImg.naturalWidth) {
        ctx.drawImage(el.bodyImg, 0, 0, rect.width, rect.height);
    }

    ctx.save();
    const cx = rect.width / 2 + state.x;
    const cy = rect.height / 2 + state.y;
    const tWidth = el.tattooImg.getBoundingClientRect().width;
    const ratio = el.tattooImg.naturalHeight && el.tattooImg.naturalWidth
        ? el.tattooImg.naturalHeight / el.tattooImg.naturalWidth
        : 1;
    const tHeight = tWidth * ratio;

    ctx.translate(cx, cy);
    ctx.rotate((state.rotation * Math.PI) / 180);
    ctx.globalCompositeOperation = state.blend === "normal" ? "source-over" : state.blend;
    ctx.globalAlpha = state.opacity;
    ctx.filter = `blur(${state.blur}px) contrast(${state.contrast}%) brightness(${state.brightness}%) saturate(${state.saturation}%)`;

    if (el.tattooImg.complete && el.tattooImg.naturalWidth) {
        ctx.drawImage(el.tattooImg, -tWidth / 2, -tHeight / 2, tWidth, tHeight);
    }
    ctx.restore();

    const link = document.createElement("a");
    link.download = "inkpreview-nahľad.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});

// Štart
setMotif(MOTIFS[0]);
applyStyles();
