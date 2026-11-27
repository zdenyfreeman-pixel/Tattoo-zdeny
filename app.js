function makePngMotif(kind) {
    const c = document.createElement("canvas");
    c.width = 300;
    c.height = 300;
    const ctx = c.getContext("2d");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 300, 300);

    ctx.save();
    ctx.translate(150, 150);
    ctx.strokeStyle = "#141414";
    ctx.fillStyle = "#2b2b2b";
    ctx.lineWidth = 4;

    if (kind === "rose") {
        for (let i = 0; i < 6; i++) {
            ctx.save();
            ctx.rotate((i * Math.PI) / 3);
            ctx.beginPath();
            ctx.ellipse(0, -38, 30, 46, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }
        ctx.fillStyle = "#111111";
        ctx.beginPath();
        ctx.arc(0, 0, 20, 0, Math.PI * 2);
        ctx.fill();
    } else if (kind === "geo") {
        ctx.beginPath();
        ctx.arc(0, 0, 95, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, -90);
        ctx.lineTo(78, 48);
        ctx.lineTo(-78, 48);
        ctx.closePath();
        ctx.stroke();
    } else if (kind === "line") {
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(0, -105);
        ctx.lineTo(18, -18);
        ctx.lineTo(105, 0);
        ctx.lineTo(18, 18);
        ctx.lineTo(0, 105);
        ctx.lineTo(-18, 18);
        ctx.lineTo(-105, 0);
        ctx.lineTo(-18, -18);
        ctx.closePath();
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.moveTo(-85, 20);
        ctx.quadraticCurveTo(-30, -55, 15, -10);
        ctx.quadraticCurveTo(50, -55, 85, -10);
        ctx.quadraticCurveTo(40, 25, 20, 50);
        ctx.closePath();
        ctx.fill();
    }

    ctx.restore();
    return c.toDataURL("image/png");
}

function makeDefaultHand() {
    const c = document.createElement("canvas");
    c.width = 500;
    c.height = 625;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#19191e";
    ctx.fillRect(0, 0, 500, 625);
    ctx.fillStyle = "#d9a282";
    ctx.beginPath();
    ctx.moveTo(180, 625);
    ctx.lineTo(200, 270);
    ctx.lineTo(220, 110);
    ctx.lineTo(245, 110);
    ctx.lineTo(255, 190);
    ctx.lineTo(270, 95);
    ctx.lineTo(295, 95);
    ctx.lineTo(295, 200);
    ctx.lineTo(315, 115);
    ctx.lineTo(340, 120);
    ctx.lineTo(315, 280);
    ctx.lineTo(330, 625);
    ctx.closePath();
    ctx.fill();
    return c.toDataURL("image/png");
}

const MOTIFS = [
    { id: 1, name: "Ruza", style: "realism", complexity: 1.35, src: makePngMotif("rose") },
    { id: 2, name: "Geo", style: "blackwork", complexity: 1.4, src: makePngMotif("geo") },
    { id: 3, name: "Line", style: "fineline", complexity: 1.1, src: makePngMotif("line") },
    { id: 4, name: "Vlna", style: "japanese", complexity: 1.45, src: makePngMotif("wave") }
];

const state = {
    style: "all",
    motif: MOTIFS[0],
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

const bodyImg = document.getElementById("bodyImg") || document.getElementById("bodyImage");
const tattooLayer = document.getElementById("tattooLayer");
const tattooImg = document.getElementById("tattooImg");
const gallery = document.getElementById("gallery") || document.getElementById("tattooGallery");
const priceDisplay = document.getElementById("priceDisplay");

// Priame tlačidlá / vstupy pre fotenie, fotku a vlastný motív
const camBtn = document.getElementById("cameraBtn");
const camInput = document.getElementById("cameraInput") || (() => {
    const inp = document.createElement("input");
    inp.type = "file";
    inp.accept = "image/*";
    inp.capture = "environment";
    inp.style.display = "none";
    document.body.appendChild(inp);
    return inp;
})();

const bodyFileInput = document.getElementById("bodyFileInput");
const tattooFileInput = document.getElementById("tattooFileInput");

if (camBtn) {
    camBtn.addEventListener("click", (e) => {
        e.preventDefault();
        camInput.value = "";
        camInput.click();
    });
}

function setImageFromFile(file, targetImg, onLoaded) {
    if (!file || !targetImg) return;
    const reader = new FileReader();
    reader.onload = () => {
        targetImg.src = reader.result;
        if (onLoaded) onLoaded(reader.result);
    };
    reader.readAsDataURL(file);
}

camInput.addEventListener("change", (e) => {
    setImageFromFile(e.target.files && e.target.files[0], bodyImg);
});

if (bodyFileInput) {
    bodyFileInput.addEventListener("change", (e) => {
        setImageFromFile(e.target.files && e.target.files[0], bodyImg);
    });
}

if (tattooFileInput) {
    tattooFileInput.addEventListener("change", (e) => {
        const f = e.target.files && e.target.files[0];
        if (!f) return;
        setImageFromFile(f, tattooImg, (dataUrl) => {
            const custom = { id: Date.now(), name: f.name, style: "all", complexity: 1.25, src: dataUrl };
            MOTIFS.unshift(custom);
            state.motif = custom;
            renderGallery();
            updatePrice();
        });
    });
}

function updatePrice() {
    if (!priceDisplay) return;
    const ratio = (state.sizeCm - 5) / 30;
    const euros = Math.max(50, Math.min(300, Math.round((50 + ratio * 185 * (state.motif.complexity || 1.2)) / 5) * 5));
    priceDisplay.textContent = `Odhad ceny: ${euros} €`;
}

function applyView() {
    if (tattooImg) {
        const w = Math.round(70 + ((state.sizeCm - 5) / 30) * 230);
        tattooImg.style.width = `${w}px`;
        tattooImg.style.mixBlendMode = state.blend;
        tattooImg.style.opacity = String(state.opacity);
        tattooImg.style.filter = `blur(${state.blur}px) contrast(${state.contrast}%) brightness(${state.brightness}%)`;
    }
    if (tattooLayer) {
        tattooLayer.style.transform = `translate(calc(-50% + ${state.x}px), calc(-50% + ${state.y}px)) rotate(${state.rotation}deg)`;
    }
    if (bodyImg) {
        bodyImg.style.filter = state.skinFilter;
    }

    const mapTxt = [
        ["sizeVal", `${state.sizeCm} cm`],
        ["rotVal", `${state.rotation}°`],
        ["opVal", `${Math.round(state.opacity * 100)}%`],
        ["blurVal", `${state.blur}px`],
        ["conVal", `${state.contrast}%`],
        ["briVal", `${state.brightness}%`]
    ];
    mapTxt.forEach(([id, txt]) => {
        const node = document.getElementById(id);
        if (node) node.textContent = txt;
    });
    updatePrice();
}

function renderGallery() {
    if (!gallery) return;
    gallery.innerHTML = "";
    const items = state.style === "all" ? MOTIFS : MOTIFS.filter(m => m.style === state.style);
    items.forEach(m => {
        const card = document.createElement("div");
        card.className = "thumb" + (state.motif.id === m.id ? " active" : "");
        const img = document.createElement("img");
        img.src = m.src;
        img.alt = m.name;
        card.appendChild(img);
        card.addEventListener("click", () => {
            state.motif = m;
            if (tattooImg) tattooImg.src = m.src;
            renderGallery();
            updatePrice();
        });
        gallery.appendChild(card);
    });
}

document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
        document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        state.style = tab.dataset.style || "all";
        renderGallery();
    });
});

document.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
        document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        const p = chip.dataset.preset;
        if (p === "fresh") { state.blend = "multiply"; state.opacity = 0.85; state.blur = 0.6; state.contrast = 140; state.brightness = 100; }
        else if (p === "noWhite") { state.blend = "multiply"; state.opacity = 0.92; state.blur = 0.6; state.contrast = 210; state.brightness = 96; }
        else if (p === "healed") { state.blend = "multiply"; state.opacity = 0.68; state.blur = 1.2; state.contrast = 115; state.brightness = 105; }
        else if (p === "soft") { state.blend = "multiply"; state.opacity = 0.55; state.blur = 2.0; state.contrast = 100; state.brightness = 106; }
        else if (p === "bold") { state.blend = "color-burn"; state.opacity = 0.92; state.blur = 0.4; state.contrast = 175; state.brightness = 94; }

        const bs = document.getElementById("blendSelect");
        if (bs) bs.value = state.blend;
        const setInp = (id, v) => { const n = document.getElementById(id); if (n) n.value = v; };
        setInp("opRange", Math.round(state.opacity * 100));
        setInp("blurRange", state.blur);
        setInp("conRange", state.contrast);
        setInp("briRange", state.brightness);
        applyView();
    });
});

const bindInp = (id, fn) => {
    const n = document.getElementById(id);
    if (n) n.addEventListener(n.tagName === "SELECT" ? "change" : "input", () => fn(n.value));
};
bindInp("blendSelect", v => { state.blend = v; applyView(); });
bindInp("skinFilterSelect", v => { state.skinFilter = v; applyView(); });
bindInp("sizeRange", v => { state.sizeCm = Number(v); applyView(); });
bindInp("rotRange", v => { state.rotation = Number(v); applyView(); });
bindInp("opRange", v => { state.opacity = Number(v) / 100; applyView(); });
bindInp("blurRange", v => { state.blur = Number(v); applyView(); });
bindInp("conRange", v => { state.contrast = Number(v); applyView(); });
bindInp("briRange", v => { state.brightness = Number(v); applyView(); });

if (tattooLayer) {
    let drag = null;
    tattooLayer.addEventListener("pointerdown", e => {
        e.preventDefault();
        tattooLayer.setPointerCapture(e.pointerId);
        drag = { x: e.clientX - state.x, y: e.clientY - state.y };
    });
    tattooLayer.addEventListener("pointermove", e => {
        if (!drag) return;
        state.x = Math.round(e.clientX - drag.x);
        state.y = Math.round(e.clientY - drag.y);
        applyView();
    });
    tattooLayer.addEventListener("pointerup", () => { drag = null; });
    tattooLayer.addEventListener("pointercancel", () => { drag = null; });
}

const saveBtn = document.getElementById("saveBtn");
if (saveBtn) {
    saveBtn.addEventListener("click", () => {
        const stage = document.getElementById("stage") || document.getElementById("canvasWrapper");
        if (!stage) return;
        const rect = stage.getBoundingClientRect();
        const out = document.createElement("canvas");
        out.width = Math.round(rect.width * 2);
        out.height = Math.round(rect.height * 2);
        const ctx = out.getContext("2d");
        ctx.scale(2, 2);
        ctx.filter = state.skinFilter || "none";
        if (bodyImg && bodyImg.complete && bodyImg.naturalWidth) {
            ctx.drawImage(bodyImg, 0, 0, rect.width, rect.height);
        }
        if (tattooImg && tattooImg.complete && tattooImg.naturalWidth) {
            ctx.save();
            const cx = rect.width / 2 + state.x;
            const cy = rect.height / 2 + state.y;
            const w = tattooImg.getBoundingClientRect().width;
            const ratio = tattooImg.naturalWidth ? tattooImg.naturalHeight / tattooImg.naturalWidth : 1;
            const h = w * ratio;
            ctx.translate(cx, cy);
            ctx.rotate((state.rotation * Math.PI) / 180);
            ctx.globalCompositeOperation = state.blend === "normal" ? "source-over" : state.blend;
            ctx.globalAlpha = state.opacity;
            ctx.filter = `blur(${state.blur}px) contrast(${state.contrast}%) brightness(${state.brightness}%)`;
            ctx.drawImage(tattooImg, -w / 2, -h / 2, w, h);
            ctx.restore();
        }
        const a = document.createElement("a");
        a.download = "inkpreview.png";
        a.href = out.toDataURL("image/png");
        a.click();
    });
}

if (bodyImg && !bodyImg.getAttribute("src")) {
    bodyImg.src = makeDefaultHand();
}
if (tattooImg) {
    tattooImg.src = state.motif.src;
}
renderGallery();
applyView();
