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
        const rad = ctx.createRadialGradient(0, 0, 15, 0, 0, 135);
        rad.addColorStop(0, "rgba(25,25,25,0.45)");
        rad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = rad;
        ctx.beginPath();
        ctx.arc(0, 0, 135, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "#161616";
        ctx.lineWidth = 4;
        for (let i = 0; i < 6; i++) {
            ctx.save();
            ctx.rotate((i * Math.PI) / 3);
            ctx.fillStyle = i % 2 === 0 ? "#2e2e2e" : "#4a4a4a";
            ctx.beginPath();
            ctx.ellipse(0, -42, 34, 52, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }
        ctx.fillStyle = "#141414";
        ctx.beginPath();
        ctx.arc(0, 0, 22, 0, Math.PI * 2);
        ctx.fill();
    } else if (type === "blackwork") {
        ctx.strokeStyle = "#121212";
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.arc(0, 0, 108, 0, Math.PI * 2);
        ctx.stroke();

        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, -102);
        ctx.lineTo(90, 56);
        ctx.lineTo(-90, 56);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 102);
        ctx.lineTo(90, -56);
        ctx.lineTo(-90, -56);
        ctx.closePath();
        ctx.stroke();

        ctx.fillStyle = "#121212";
        ctx.beginPath();
        ctx.arc(0, 0, 24, 0, Math.PI * 2);
        ctx.fill();
    } else if (type === "fineline") {
        ctx.strokeStyle = "#222222";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(0, 0, 96, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, -118);
        ctx.lineTo(20, -20);
        ctx.lineTo(118, 0);
        ctx.lineTo(20, 20);
        ctx.lineTo(0, 118);
        ctx.lineTo(-20, 20);
        ctx.lineTo(-118, 0);
        ctx.lineTo(-20, -20);
        ctx.closePath();
        ctx.stroke();
    } else {
        ctx.strokeStyle = "#181818";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(0, 0, 108, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = "#262626";
        ctx.beginPath();
        ctx.moveTo(-95, 25);
        ctx.quadraticCurveTo(-40, -65, 20, -10);
        ctx.quadraticCurveTo(55, -65, 95, -15);
        ctx.quadraticCurveTo(50, 20, 25, 55);
        ctx.quadraticCurveTo(-30, 15, -95, 25);
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

const state = {
    style: "all",
    selectedMotif: MOTIFS[0],
    x: 0,
    y: 0,
    sizeCm: 15,
    rotation: 0,
    opacity: 0.85,
    blur: 0.6,
    contrast: 140,
    brightness: 100,
    blend: "multiply",
    skinFilter: "none"
};

const el = {
    bodyImg: document.getElementById("bodyImg"),
    tattooLayer: document.getElementById("tattooLayer"),
    tattooImg: document.getElementById("tattooImg"),
    gallery: document.getElementById("gallery"),
    styleTabs: document.getElementById("styleTabs"),
    presetChips: document.getElementById("presetChips"),
    blendSelect: document.getElementById("blendSelect"),
    skinFilterSelect: document.getElementById("skinFilterSelect"),
    priceDisplay: document.getElementById("priceDisplay"),
    cameraInput: document.getElementById("cameraInput"),
    bodyFileInput: document.getElementById("bodyFileInput"),
    tattooFileInput: document.getElementById("tattooFileInput"),
    saveBtn: document.getElementById("saveBtn"),
    sizeRange: document.getElementById("sizeRange"),
    rotRange: document.getElementById("rotRange"),
    opRange: document.getElementById("opRange"),
    blurRange: document.getElementById("blurRange"),
    conRange: document.getElementById("conRange"),
    briRange: document.getElementById("briRange"),
    sizeVal: document.getElementById("sizeVal"),
    rotVal: document.getElementById("rotVal"),
    opVal: document.getElementById("opVal"),
    blurVal: document.getElementById("blurVal"),
    conVal: document.getElementById("conVal"),
    briVal: document.getElementById("briVal")
};

el.bodyImg.src = createDefaultBodyDataUrl();

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
    el.tattooImg.style.filter = `blur(${state.blur}px) contrast(${state.contrast}%) brightness(${state.brightness}%)`;
    el.bodyImg.style.filter = state.skinFilter;

    el.sizeVal.textContent = `${state.sizeCm} cm`;
    el.rotVal.textContent = `${state.rotation}°`;
    el.opVal.textContent = `${Math.round(state.opacity * 100)}%`;
    el.blurVal.textContent = `${state.blur}px`;
    el.conVal.textContent = `${state.contrast}%`;
    el.briVal.textContent = `${state.brightness}%`;

    updatePrice();
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

    const p = chip.dataset.preset;
    if (p === "fresh") {
        state.blend = "multiply"; state.opacity = 0.85; state.blur = 0.6; state.contrast = 140; state.brightness = 100;
    } else if (p === "noWhite") {
        state.blend = "multiply"; state.opacity = 0.92; state.blur = 0.6; state.contrast = 210; state.brightness = 96;
    } else if (p === "healed") {
        state.blend = "multiply"; state.opacity = 0.68; state.blur = 1.2; state.contrast = 115; state.brightness = 105;
    } else if (p === "vintage") {
        state.blend = "multiply"; state.opacity = 0.62; state.blur = 1.0; state.contrast = 105; state.brightness = 104;
    } else if (p === "soft") {
        state.blend = "multiply"; state.opacity = 0.55; state.blur = 2.0; state.contrast = 100; state.brightness = 106;
    } else if (p === "bold") {
        state.blend = "color-burn"; state.opacity = 0.92; state.blur = 0.4; state.contrast = 175; state.brightness = 94;
    }

    el.blendSelect.value = state.blend;
    el.opRange.value = Math.round(state.opacity * 100);
    el.blurRange.value = state.blur;
    el.conRange.value = state.contrast;
    el.briRange.value = state.brightness;
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

function loadBodyFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        el.bodyImg.src = reader.result;
    };
    reader.readAsDataURL(file);
}

el.cameraInput.addEventListener("change", e => {
    loadBodyFile(e.target.files && e.target.files[0]);
    e.target.value = "";
});

el.bodyFileInput.addEventListener("change", e => {
    loadBodyFile(e.target.files && e.target.files[0]);
    e.target.value = "";
});

el.tattooFileInput.addEventListener("change", e => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        const custom = { id: Date.now(), name: file.name, style: "all", complexity: 1.25, src: reader.result };
        MOTIFS.unshift(custom);
        selectMotif(custom);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
});

el.saveBtn.addEventListener("click", () => {
    const stage = document.getElementById("stage");
    const rect = stage.getBoundingClientRect();
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
    ctx.filter = `blur(${state.blur}px) contrast(${state.contrast}%) brightness(${state.brightness}%)`;

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
applyStyles();
