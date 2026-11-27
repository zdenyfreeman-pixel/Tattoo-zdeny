function createDefaultBodyDataUrl() {
    const c = document.createElement("canvas");
    c.width = 600;
    c.height = 750;
    const ctx = c.getContext("2d");

    const grad = ctx.createLinearGradient(0, 0, 600, 750);
    grad.addColorStop(0, "#e5b89b");
    grad.addColorStop(0.6, "#d29c7c");
    grad.addColorStop(1, "#b47b5c");
    ctx.fillStyle = "#1b1b20";
    ctx.fillRect(0, 0, 600, 750);

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(215, 750);
    ctx.lineTo(238, 330);
    ctx.quadraticCurveTo(220, 230, 240, 140);
    ctx.quadraticCurveTo(255, 95, 275, 100);
    ctx.lineTo(290, 165);
    ctx.lineTo(304, 88);
    ctx.quadraticCurveTo(322, 82, 330, 102);
    ctx.lineTo(328, 170);
    ctx.lineTo(348, 104);
    ctx.quadraticCurveTo(366, 100, 368, 122);
    ctx.lineTo(352, 185);
    ctx.lineTo(374, 132);
    ctx.quadraticCurveTo(392, 130, 388, 152);
    ctx.lineTo(362, 235);
    ctx.quadraticCurveTo(355, 290, 370, 360);
    ctx.lineTo(395, 750);
    ctx.closePath();
    ctx.fill();

    return c.toDataURL("image/png");
}

function removeWhiteEdgesDataUrl(dataUrl) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const c = document.createElement("canvas");
            c.width = img.naturalWidth || 320;
            c.height = img.naturalHeight || 320;
            const ctx = c.getContext("2d");
            ctx.drawImage(img, 0, 0, c.width, c.height);

            try {
                const frame = ctx.getImageData(0, 0, c.width, c.height);
                const d = frame.data;
                for (let i = 0; i < d.length; i += 4) {
                    const brightness = (d[i] + d[i + 1] + d[i + 2]) / 3;
                    if (brightness > 230) {
                        d[i] = 255;
                        d[i + 1] = 255;
                        d[i + 2] = 255;
                    }
                }
                ctx.putImageData(frame, 0, 0);
                resolve(c.toDataURL("image/png"));
            } catch (_) {
                resolve(dataUrl);
            }
        };
        img.onerror = () => resolve(dataUrl);
        img.src = dataUrl;
    });
}

function createMotifDataUrl(type) {
    const c = document.createElement("canvas");
    c.width = 320;
    c.height = 320;
    const ctx = c.getContext("2d");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 320, 320);

    ctx.save();
    ctx.translate(160, 160);

    if (type === "rose") {
        const rad = ctx.createRadialGradient(0, 0, 15, 0, 0, 125);
        rad.addColorStop(0, "rgba(25,25,25,0.45)");
        rad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = rad;
        ctx.beginPath();
        ctx.arc(0, 0, 125, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "#161616";
        ctx.lineWidth = 4;
        for (let i = 0; i < 6; i++) {
            ctx.save();
            ctx.rotate((i * Math.PI) / 3);
            ctx.fillStyle = i % 2 === 0 ? "#2e2e2e" : "#4a4a4a";
            ctx.beginPath();
            ctx.ellipse(0, -40, 32, 48, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }
        ctx.fillStyle = "#141414";
        ctx.beginPath();
        ctx.arc(0, 0, 20, 0, Math.PI * 2);
        ctx.fill();
    } else if (type === "blackwork") {
        ctx.strokeStyle = "#121212";
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.arc(0, 0, 102, 0, Math.PI * 2);
        ctx.stroke();

        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, -96);
        ctx.lineTo(84, 52);
        ctx.lineTo(-84, 52);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 96);
        ctx.lineTo(84, -52);
        ctx.lineTo(-84, -52);
        ctx.closePath();
        ctx.stroke();

        ctx.fillStyle = "#121212";
        ctx.beginPath();
        ctx.arc(0, 0, 22, 0, Math.PI * 2);
        ctx.fill();
    } else if (type === "fineline") {
        ctx.strokeStyle = "#222222";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(0, 0, 92, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, -110);
        ctx.lineTo(18, -18);
        ctx.lineTo(110, 0);
        ctx.lineTo(18, 18);
        ctx.lineTo(0, 110);
        ctx.lineTo(-18, 18);
        ctx.lineTo(-110, 0);
        ctx.lineTo(-18, -18);
        ctx.closePath();
        ctx.stroke();
    } else {
        ctx.strokeStyle = "#181818";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(0, 0, 102, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = "#262626";
        ctx.beginPath();
        ctx.moveTo(-90, 22);
        ctx.quadraticCurveTo(-38, -60, 18, -10);
        ctx.quadraticCurveTo(52, -60, 90, -15);
        ctx.quadraticCurveTo(48, 18, 24, 50);
        ctx.quadraticCurveTo(-28, 14, -90, 22);
        ctx.closePath();
        ctx.fill();
    }

    ctx.restore();
    return c.toDataURL("image/png");
}

const MOTIFS = [
    { id: 1, name: "Tieňová ruža", style: "realism", complexity: 1.35, src: createMotifDataUrl("rose") },
    { id: 2, name: "Blackwork", style: "blackwork", complexity: 1.4, src: createMotifDataUrl("blackwork") },
    { id: 3, name: "Fine Line", style: "fineline", complexity: 1.1, src: createMotifDataUrl("fineline") },
    { id: 4, name: "Japonská vlna", style: "japanese", complexity: 1.45, src: createMotifDataUrl("wave") }
];

const PRESETS = {
    noWhite:  { blend: "multiply",   opacity: 0.90, blur: 0.5, contrast: 220, brightness: 95,  saturation: 100, hue: 0 },
    fresh:    { blend: "multiply",   opacity: 0.88, blur: 0.6, contrast: 175, brightness: 98,  saturation: 105, hue: 0 },
    healed:   { blend: "multiply",   opacity: 0.70, blur: 1.2, contrast: 145, brightness: 102, saturation: 75,  hue: 0 },
    vintage:  { blend: "multiply",   opacity: 0.62, blur: 1.0, contrast: 130, brightness: 104, saturation: 45,  hue: 12 },
    soft:     { blend: "multiply",   opacity: 0.58, blur: 1.8, contrast: 130, brightness: 104, saturation: 80,  hue: 0 },
    bold:     { blend: "color-burn", opacity: 0.94, blur: 0.4, contrast: 230, brightness: 92,  saturation: 115, hue: 0 },
    faded:    { blend: "multiply",   opacity: 0.45, blur: 1.5, contrast: 110, brightness: 108, saturation: 35,  hue: 0 },
    matte:    { blend: "darken",     opacity: 0.78, blur: 0.9, contrast: 150, brightness: 100, saturation: 65,  hue: 0 },
    sharp:    { blend: "multiply",   opacity: 0.92, blur: 0.0, contrast: 210, brightness: 96,  saturation: 100, hue: 0 },
    warmInk:  { blend: "multiply",   opacity: 0.86, blur: 0.6, contrast: 170, brightness: 98,  saturation: 120, hue: 18 },
    coolInk:  { blend: "multiply",   opacity: 0.86, blur: 0.6, contrast: 175, brightness: 98,  saturation: 115, hue: -22 },
    redAccent:{ blend: "multiply",   opacity: 0.88, blur: 0.5, contrast: 185, brightness: 96,  saturation: 165, hue: -35 }
};

const state = {
    style: "all",
    selectedMotif: MOTIFS[0],
    x: 0,
    y: 0,
    sizeCm: 15,
    rotation: 0,
    opacity: 0.9,
    blur: 0.5,
    contrast: 220,
    brightness: 95,
    saturation: 100,
    hue: 0,
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
    hueRange: document.getElementById("hueRange"),
    sizeVal: document.getElementById("sizeVal"),
    rotVal: document.getElementById("rotVal"),
    opVal: document.getElementById("opVal"),
    blurVal: document.getElementById("blurVal"),
    conVal: document.getElementById("conVal"),
    briVal: document.getElementById("briVal"),
    satVal: document.getElementById("satVal"),
    hueVal: document.getElementById("hueVal")
};

el.bodyImg.src = createDefaultBodyDataUrl();

function getTattooFilterCss() {
    return `blur(${state.blur}px) contrast(${state.contrast}%) brightness(${state.brightness}%) saturate(${state.saturation}%) hue-rotate(${state.hue}deg)`;
}

function updatePrice() {
    const ratio = (state.sizeCm - 5) / 30;
    const raw = 50 + ratio * 185 * (state.selectedMotif.complexity || 1.2);
    const euros = Math.max(50, Math.min(300, Math.round(raw / 5) * 5));
    el.priceDisplay.textContent = `Odhad ceny: ${euros} €`;
}

function applyStyles() {
    const widthPx = Math.round(70 + ((state.sizeCm - 5) / 30) * 230);
    el.tattooImg.style.width = `${widthPx}px`;
    el.tattooLayer.style.transform = `translate(calc(-50% + ${state.x}px), calc(-50% + ${state.y}px)) rotate(${state.rotation}deg)`;

    el.tattooImg.style.mixBlendMode = state.blend;
    el.tattooImg.style.opacity = String(state.opacity);
    el.tattooImg.style.filter = getTattooFilterCss();
    el.bodyImg.style.filter = state.skinFilter;
    el.cameraVideo.style.filter = state.skinFilter;

    el.sizeVal.textContent = `${state.sizeCm} cm`;
    el.rotVal.textContent = `${state.rotation}°`;
    el.opVal.textContent = `${Math.round(state.opacity * 100)}%`;
    el.blurVal.textContent = `${state.blur}px`;
    el.conVal.textContent = `${state.contrast}%`;
    el.briVal.textContent = `${state.brightness}%`;
    el.satVal.textContent = `${state.saturation}%`;
    el.hueVal.textContent = `${state.hue}°`;

    updatePrice();
}

function syncInputsFromState() {
    el.blendSelect.value = state.blend;
    el.opRange.value = Math.round(state.opacity * 100);
    el.blurRange.value = state.blur;
    el.conRange.value = state.contrast;
    el.briRange.value = state.brightness;
    el.satRange.value = state.saturation;
    el.hueRange.value = state.hue;
}

function selectMotif(motif) {
    state.selectedMotif = motif;
    el.tattooImg.src = motif.src;
    renderGallery();
    updatePrice();
}

function renderGallery() {
    el.gallery.innerHTML = "";
    const items = state.style === "all" ? MOTIFS : MOTIFS.filter(m => m.style === state.style);
    items.forEach(m => {
        const card = document.createElement("div");
        card.className = "thumb" + (state.selectedMotif.id === m.id ? " active" : "");
        const img = document.createElement("img");
        img.src = m.src;
        img.alt = m.name;
        card.appendChild(img);
        card.addEventListener("click", () => selectMotif(m));
        el.gallery.appendChild(card);
    });
}

el.styleTabs.addEventListener("click", e => {
    const btn = e.target.closest(".tab");
    if (!btn) return;
    el.styleTabs.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    btn.classList.add("active");
    state.style = btn.dataset.style;
    renderGallery();
});

el.presetChips.addEventListener("click", e => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    el.presetChips.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");

    const p = PRESETS[chip.dataset.preset];
    if (!p) return;
    Object.assign(state, p);
    syncInputsFromState();
    applyStyles();
});

el.blendSelect.addEventListener("change", () => { state.blend = el.blendSelect.value; applyStyles(); });
el.skinFilterSelect.addEventListener("change", () => { state.skinFilter = el.skinFilterSelect.value; applyStyles(); });
el.sizeRange.addEventListener("input", () => { state.sizeCm = Number(el.sizeRange.value); applyStyles(); });
el.rotRange.addEventListener("input", () => { state.rotation = Number(el.rotRange.value); applyStyles(); });
el.opRange.addEventListener("input", () => { state.opacity = Number(el.opRange.value) / 100; applyStyles(); });
el.blurRange.addEventListener("input", () => { state.blur = Number(el.blurRange.value); applyStyles(); });
el.conRange.addEventListener("input", () => { state.contrast = Number(el.conRange.value); applyStyles(); });
el.briRange.addEventListener("input", () => { state.brightness = Number(el.briRange.value); applyStyles(); });
el.satRange.addEventListener("input", () => { state.saturation = Number(el.satRange.value); applyStyles(); });
el.hueRange.addEventListener("input", () => { state.hue = Number(el.hueRange.value); applyStyles(); });

let drag = null;
el.tattooLayer.addEventListener("pointerdown", e => {
    e.preventDefault();
    el.tattooLayer.setPointerCapture(e.pointerId);
    drag = { x: e.clientX - state.x, y: e.clientY - state.y };
});
el.tattooLayer.addEventListener("pointermove", e => {
    if (!drag) return;
    state.x = Math.round(e.clientX - drag.x);
    state.y = Math.round(e.clientY - drag.y);
    applyStyles();
});
el.tattooLayer.addEventListener("pointerup", () => { drag = null; });
el.tattooLayer.addEventListener("pointercancel", () => { drag = null; });

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
        alert("Nepodarilo sa zapnúť kameru. Skontroluj povolenie kamery v prehliadači alebo použi „Nahrať fotku“.");
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

el.bodyFileInput.addEventListener("change", e => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    stopCamera();
    const reader = new FileReader();
    reader.onload = () => {
        el.bodyImg.src = reader.result;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
});

el.tattooFileInput.addEventListener("change", e => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
        const cleaned = await removeWhiteEdgesDataUrl(reader.result);
        const custom = { id: Date.now(), name: file.name, style: "all", complexity: 1.25, src: cleaned };
        MOTIFS.unshift(custom);
        selectMotif(custom);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
});

el.saveBtn.addEventListener("click", () => {
    const rect = el.stage.getBoundingClientRect();
    const out = document.createElement("canvas");
    out.width = Math.round(rect.width * 2);
    out.height = Math.round(rect.height * 2);
    const ctx = out.getContext("2d");
    ctx.scale(2, 2);

    ctx.filter = state.skinFilter || "none";
    if (el.bodyImg.complete && el.bodyImg.naturalWidth) {
        ctx.drawImage(el.bodyImg, 0, 0, rect.width, rect.height);
    }

    ctx.save();
    const cx = rect.width / 2 + state.x;
    const cy = rect.height / 2 + state.y;
    const w = el.tattooImg.getBoundingClientRect().width;
    const ratio = el.tattooImg.naturalWidth ? el.tattooImg.naturalHeight / el.tattooImg.naturalWidth : 1;
    const h = w * ratio;

    ctx.translate(cx, cy);
    ctx.rotate((state.rotation * Math.PI) / 180);
    ctx.globalCompositeOperation = state.blend === "normal" ? "source-over" : state.blend;
    ctx.globalAlpha = state.opacity;
    ctx.filter = getTattooFilterCss();

    if (el.tattooImg.complete && el.tattooImg.naturalWidth) {
        ctx.drawImage(el.tattooImg, -w / 2, -h / 2, w, h);
    }
    ctx.restore();

    const a = document.createElement("a");
    a.download = "inkpreview.png";
    a.href = out.toDataURL("image/png");
    a.click();
});

selectMotif(MOTIFS[0]);
syncInputsFromState();
applyStyles();
