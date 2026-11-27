function makeHandPng() {
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

function makeMotifPng(type) {
    const c = document.createElement("canvas");
    c.width = 300;
    c.height = 300;
    const ctx = c.getContext("2d");
    ctx.clearRect(0, 0, 300, 300);
    ctx.save();
    ctx.translate(150, 150);
    ctx.strokeStyle = "#141414";
    ctx.fillStyle = "#2b2b2b";
    ctx.lineWidth = 4;

    if (type === "rose") {
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
    } else if (type === "geo") {
        ctx.beginPath();
        ctx.arc(0, 0, 95, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, -90);
        ctx.lineTo(78, 48);
        ctx.lineTo(-78, 48);
        ctx.closePath();
        ctx.stroke();
    } else if (type === "line") {
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

function stripWhiteBackground(rawSrc, threshold) {
    return new Promise((resolve) => {
        if (!threshold || threshold <= 0) {
            resolve(rawSrc);
            return;
        }
        const img = new Image();
        img.onload = () => {
            const c = document.createElement("canvas");
            c.width = img.naturalWidth || 300;
            c.height = img.naturalHeight || 300;
            const ctx = c.getContext("2d");
            ctx.drawImage(img, 0, 0, c.width, c.height);
            try {
                const frame = ctx.getImageData(0, 0, c.width, c.height);
                const d = frame.data;
                for (let i = 0; i < d.length; i += 4) {
                    const r = d[i];
                    const g = d[i + 1];
                    const b = d[i + 2];
                    const a = d[i + 3];
                    if (a > 0) {
                        const minCh = Math.min(r, g, b);
                        const avgCh = (r + g + b) / 3;
                        if (avgCh >= threshold && minCh >= threshold - 25) {
                            d[i + 3] = 0;
                        }
                    }
                }
                ctx.putImageData(frame, 0, 0);
                resolve(c.toDataURL("image/png"));
            } catch (_) {
                resolve(rawSrc);
            }
        };
        img.onerror = () => resolve(rawSrc);
        img.src = rawSrc;
    });
}

function initApp() {
    const MOTIFS = [
        { id: 1, name: "Ruza", style: "realism", complexity: 1.35, rawSrc: makeMotifPng("rose"), src: makeMotifPng("rose") },
        { id: 2, name: "Geo", style: "blackwork", complexity: 1.4, rawSrc: makeMotifPng("geo"), src: makeMotifPng("geo") },
        { id: 3, name: "Line", style: "fineline", complexity: 1.1, rawSrc: makeMotifPng("line"), src: makeMotifPng("line") },
        { id: 4, name: "Vlna", style: "japanese", complexity: 1.45, rawSrc: makeMotifPng("wave"), src: makeMotifPng("wave") }
    ];

    const state = {
        style: "all",
        motif: MOTIFS[0],
        x: 0,
        y: 0,
        sizeCm: 15,
        rotation: 0,
        opacity: 0.9,
        blur: 0.5,
        contrast: 165,
        brightness: 98,
        whiteCutoff: 215,
        blend: "multiply",
        skinFilter: "none",
        stream: null
    };

    const statusBox = document.getElementById("statusBox");
    const stage = document.getElementById("stage");
    const bodyImg = document.getElementById("bodyImg");
    const cameraVideo = document.getElementById("cameraVideo");
    const tattooLayer = document.getElementById("tattooLayer");
    const tattooImg = document.getElementById("tattooImg");
    const gallery = document.getElementById("gallery");
    const priceDisplay = document.getElementById("priceDisplay");
    const cameraBtn = document.getElementById("cameraBtn");
    const snapBtn = document.getElementById("snapBtn");
    const closeCamBtn = document.getElementById("closeCamBtn");
    const bodyFileInput = document.getElementById("bodyFileInput");
    const tattooFileInput = document.getElementById("tattooFileInput");
    const saveBtn = document.getElementById("saveBtn");

    if (bodyImg) bodyImg.src = makeHandPng();
    if (tattooImg) tattooImg.src = state.motif.src;

    function showStatus(msg) {
        if (!statusBox) return;
        statusBox.textContent = msg;
        statusBox.style.display = msg ? "block" : "none";
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
        if (bodyImg) bodyImg.style.filter = state.skinFilter;
        if (cameraVideo) cameraVideo.style.filter = state.skinFilter;

        const labels = {
            sizeVal: `${state.sizeCm} cm`,
            rotVal: `${state.rotation}°`,
            opVal: `${Math.round(state.opacity * 100)}%`,
            blurVal: `${state.blur}px`,
            conVal: `${state.contrast}%`,
            briVal: `${state.brightness}%`,
            cutVal: `${state.whiteCutoff}`
        };
        Object.keys(labels).forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = labels[id];
        });
        updatePrice();
    }

    async function refreshMotifWhiteCut() {
        const processed = await stripWhiteBackground(state.motif.rawSrc, state.whiteCutoff);
        state.motif.src = processed;
        if (tattooImg) tattooImg.src = processed;
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
            card.addEventListener("click", async () => {
                state.motif = m;
                await refreshMotifWhiteCut();
                renderGallery();
                updatePrice();
            });
            gallery.appendChild(card);
        });
    }

    function stopCamera() {
        if (state.stream) {
            state.stream.getTracks().forEach(t => t.stop());
            state.stream = null;
        }
        if (stage) stage.classList.remove("camera-on");
    }

    if (cameraBtn) {
        cameraBtn.addEventListener("click", async () => {
            showStatus("");
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                showStatus("Živá kamera tu nie je podporovaná. Použi tlačidlo Nahrať fotku.");
                return;
            }
            try {
                stopCamera();
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "environment" },
                    audio: false
                });
                state.stream = stream;
                if (cameraVideo) {
                    cameraVideo.srcObject = stream;
                    await cameraVideo.play();
                }
                if (stage) stage.classList.add("camera-on");
            } catch (err) {
                showStatus("Kamera nešla spustiť: " + (err && err.message ? err.message : "skontroluj povolenie kamery v prehliadači."));
            }
        });
    }

    if (closeCamBtn) {
        closeCamBtn.addEventListener("click", () => {
            stopCamera();
            showStatus("");
        });
    }

    if (snapBtn) {
        snapBtn.addEventListener("click", () => {
            const w = (cameraVideo && cameraVideo.videoWidth) || 600;
            const h = (cameraVideo && cameraVideo.videoHeight) || 750;
            const c = document.createElement("canvas");
            c.width = w;
            c.height = h;
            if (cameraVideo) c.getContext("2d").drawImage(cameraVideo, 0, 0, w, h);
            if (bodyImg) bodyImg.src = c.toDataURL("image/jpeg", 0.92);
            stopCamera();
        });
    }

    if (bodyFileInput) {
        bodyFileInput.addEventListener("change", e => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;
            stopCamera();
            showStatus("");
            const reader = new FileReader();
            reader.onload = () => {
                if (bodyImg) bodyImg.src = reader.result;
            };
            reader.readAsDataURL(file);
            e.target.value = "";
        });
    }

    if (tattooFileInput) {
        tattooFileInput.addEventListener("change", e => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;
            showStatus("");
            const reader = new FileReader();
            reader.onload = async () => {
                const raw = reader.result;
                const cleaned = await stripWhiteBackground(raw, state.whiteCutoff);
                const custom = { id: Date.now(), name: file.name, style: "all", complexity: 1.25, rawSrc: raw, src: cleaned };
                MOTIFS.unshift(custom);
                state.motif = custom;
                if (tattooImg) tattooImg.src = cleaned;
                renderGallery();
                updatePrice();
            };
            reader.readAsDataURL(file);
            e.target.value = "";
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
        chip.addEventListener("click", async () => {
            document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
            chip.classList.add("active");
            const p = chip.dataset.preset;
            if (p === "noWhite") { state.blend = "multiply"; state.opacity = 0.92; state.blur = 0.5; state.contrast = 175; state.brightness = 96; state.whiteCutoff = 215; }
            else if (p === "fresh") { state.blend = "multiply"; state.opacity = 0.88; state.blur = 0.6; state.contrast = 155; state.brightness = 98; state.whiteCutoff = 225; }
            else if (p === "healed") { state.blend = "multiply"; state.opacity = 0.7; state.blur = 1.2; state.contrast = 135; state.brightness = 102; state.whiteCutoff = 230; }
            else if (p === "vintage") { state.blend = "multiply"; state.opacity = 0.62; state.blur = 1.0; state.contrast = 125; state.brightness = 104; state.whiteCutoff = 235; }
            else if (p === "soft") { state.blend = "multiply"; state.opacity = 0.58; state.blur = 1.8; state.contrast = 120; state.brightness = 104; state.whiteCutoff = 230; }
            else if (p === "bold") { state.blend = "color-burn"; state.opacity = 0.94; state.blur = 0.4; state.contrast = 200; state.brightness = 94; state.whiteCutoff = 210; }
            else if (p === "faded") { state.blend = "multiply"; state.opacity = 0.45; state.blur = 1.5; state.contrast = 110; state.brightness = 108; state.whiteCutoff = 235; }
            else if (p === "sharp") { state.blend = "multiply"; state.opacity = 0.92; state.blur = 0.0; state.contrast = 190; state.brightness = 96; state.whiteCutoff = 210; }

            const bs = document.getElementById("blendSelect");
            if (bs) bs.value = state.blend;
            const setVal = (id, v) => { const n = document.getElementById(id); if (n) n.value = v; };
            setVal("opRange", Math.round(state.opacity * 100));
            setVal("blurRange", state.blur);
            setVal("conRange", state.contrast);
            setVal("briRange", state.brightness);
            setVal("cutRange", state.whiteCutoff);
            await refreshMotifWhiteCut();
            renderGallery();
            applyView();
        });
    });

    const bind = (id, fn) => {
        const n = document.getElementById(id);
        if (n) n.addEventListener(n.tagName === "SELECT" ? "change" : "input", () => fn(n.value));
    };
    bind("blendSelect", v => { state.blend = v; applyView(); });
    bind("skinFilterSelect", v => { state.skinFilter = v; applyView(); });
    bind("sizeRange", v => { state.sizeCm = Number(v); applyView(); });
    bind("rotRange", v => { state.rotation = Number(v); applyView(); });
    bind("opRange", v => { state.opacity = Number(v) / 100; applyView(); });
    bind("blurRange", v => { state.blur = Number(v); applyView(); });
    bind("conRange", v => { state.contrast = Number(v); applyView(); });
    bind("briRange", v => { state.brightness = Number(v); applyView(); });
    bind("cutRange", async v => {
        state.whiteCutoff = Number(v);
        applyView();
        await refreshMotifWhiteCut();
        renderGallery();
    });

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

    if (saveBtn && stage) {
        saveBtn.addEventListener("click", () => {
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

    renderGallery();
    applyView();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}
