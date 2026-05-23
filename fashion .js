const body = document.body;
const themeToggle = document.getElementById("theme-toggle");
const scrollTopButton = document.getElementById("scroll-top");
const yearNode = document.getElementById("year");

const STORAGE_KEY = "havenaTheme";

const STYLE_FILES = [
    "1097f888e6e790aaeb56696b172b958b.jpg",
    "1833bc7f6a92e7264f46443f9979e53c.jpg",
    "2582bf5d33b0186239c4552f4adb066f.jpg",
    "2be6c44e4594207ad19db9a3afe54598.jpg",
    "2c400393985b16349a5159a7c0c50fdc.jpg",
    "35371a84a595642f7b92e85df8b98fd2.jpg",
    "39217f496ede321a543ef14278be0abe.jpg",
    "3a5f8368633f92d706d464dc56386dbf.jpg",
    "3c4af0239dc6c088c667cdfd90d3ef12.jpg",
    "433afe40d15e3a2406dfc048aa897689.jpg",
    "45450916a03d713d7815e7bba510b716.jpg",
    "487ff672a128269498a41f377d960232.jpg",
    "4e1ce23d3f639306a1cfcdd9f626d81c.jpg",
    "515e588a76352e1ce29ff157f57475b9.jpg",
    "51b8e31a23152374c09b80fa7ab1779f.jpg",
    "530393321789ba3f41d429d30e8c03e6.jpg",
    "56c2f0dc3e00a1ba5a127e4c07eac5f2.jpg",
    "58aef97673df6fa076d6dbd4b4e4ced2.jpg",
    "614a227200a5d63c2739ea846b103b2b.jpg",
    "6e4ba2266c58bcbc7836a5e1c9111776.jpg",
    "84a9ebd9c7bfbebc62245b83c2138707.jpg",
    "88cf636b0b48e443a358117f250ff15e.jpg",
    "89550e9a072a5d824a90c1f8ee1e58a1.jpg",
    "8cf473d38417c58c4ec6406872ddcc28.jpg",
    "956e15338b315c7afda128023bc2f9f5.jpg",
    "97b95449f330600ceed95a182df1a2b2.jpg",
    "9a367e09286971138e7db5d6d4d62e79.jpg",
    "9a50e2da8ad6b3342b174b25df1f315b.jpg",
    "9b8ba22ffb154ac1ff4b1b0afc0bb35f.jpg",
    "9fba4c51e72522e482f0448f435d8b7d.jpg",
    "a.jpg",
    "b.png",
    "bfe880bb29b839df231688b05fb5e67b.jpg",
    "cc9f7be9e5dcf6f14dd36e4c7f657ead.jpg",
    "cffe8f243b04579cb139cfd135ae2a0f.jpg",
    "d.jpg",
    "d62b1e534e2a5470124706343812cb77.jpg",
    "d647def32fcb0c75d9272f3073b808bf.jpg",
    "download (1).png",
    "download (2).png",
    "download (3).png",
    "download (4).png",
    "download.png",
    "e.jpg",
    "e2b6ec3e63e15c5671715f2b075cbd4e.jpg",
    "f.png",
    "f035b08f41b81c70dbce388bb5dce948.jpg",
    "f43ddfd5cf680c5f2fcd0faacff6f4e7.jpg",
    "f8fcd5b4f6849428e2c35491e64a3f78.jpg",
    "fc5c32ca702a1a4352f2096a05cb1eba.jpg",
    "ffcf673901ac2d6e814c9bf82f07302f.jpg",
    "h.jpg"
];

const STYLE_NAMES = [
    "Velvet Dawn", "Ivory Motion", "Muted Geometry", "City Poise", "Cocoa Silhouette", "Quiet Structure", "Stone Accent", "Paris Street Light",
    "Noon Balance", "Soft Edge", "Afterglow Line", "Linen Pulse", "Contour Drift", "Amber Layer", "Urban Pearl", "Rosy Contrast",
    "Morning Outline", "Cloud Tailoring", "Cedar Chic", "Citrine Calm", "Monochrome Bloom", "Sandstorm Luxe", "Olive Whisper", "Slate Harmony",
    "Riverline Edit", "Satin Air", "Dusty Rose Shift", "Neutral Frame", "Mocha Minimal", "Silk Transit", "Warm Alloy", "Runway Quiet",
    "Gallery Tone", "Shoreline Set", "Caramel Light", "Tailored Haze", "Minimal Orbit", "Autumn Studio", "Metro Blend", "Layered Muse",
    "Golden Transit", "Biscuit Focus", "Softcore Form", "Serene Avenue", "Editorial Cloud", "Bronze Thread", "Creamline Story", "Urban Blush",
    "Weekend Poetry", "Stone Garden", "Soft Noir", "Finale Glow"
];

const STYLE_MOODS = [
    "soft tailoring",
    "neutral layering",
    "clean structure",
    "relaxed sophistication",
    "modern contrast",
    "editorial balance",
    "urban elegance",
    "minimal confidence"
];

const STYLE_FOCUS = [
    "designed for all-day styling",
    "with a calm runway finish",
    "for effortless day-to-night wear",
    "with refined texture play",
    "focused on silhouette clarity",
    "for confident city movement",
    "built around timeless tones",
    "for a polished seasonal look"
];

const STYLE_REGISTRY = Object.fromEntries(
    STYLE_FILES.map((file, index) => {
        const name = STYLE_NAMES[index];
        const description = `${name} blends ${STYLE_MOODS[index % STYLE_MOODS.length]} ${STYLE_FOCUS[index % STYLE_FOCUS.length]}.`;
        return [file.toLowerCase(), { name, description }];
    })
);

function getFileName(srcValue) {
    const withoutQuery = srcValue.split("?")[0].split("#")[0];
    return decodeURIComponent(withoutQuery.split("/").pop()).toLowerCase();
}

function applyTheme(theme) {
    const isDark = theme === "dark";
    body.classList.toggle("dark-mode", isDark);

    if (themeToggle) {
        themeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";
        themeToggle.setAttribute("aria-pressed", String(isDark));
    }
}

function setupThemeToggle() {
    const savedTheme = localStorage.getItem(STORAGE_KEY) || "light";
    applyTheme(savedTheme);

    if (!themeToggle) {
        return;
    }

    themeToggle.addEventListener("click", () => {
        const nextTheme = body.classList.contains("dark-mode") ? "light" : "dark";
        applyTheme(nextTheme);
        localStorage.setItem(STORAGE_KEY, nextTheme);
    });
}

function setupScrollTopButton() {
    if (!scrollTopButton) {
        return;
    }

    const syncState = () => {
        body.classList.toggle("scrolled", window.scrollY > 320);
    };

    window.addEventListener("scroll", syncState, { passive: true });

    scrollTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    syncState();
}

function setupRevealOnScroll() {
    const revealItems = document.querySelectorAll(".reveal");
    if (revealItems.length === 0) {
        return;
    }

    if (!("IntersectionObserver" in window)) {
        revealItems.forEach((item) => item.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.18 }
    );

    revealItems.forEach((item) => observer.observe(item));
}

function setFooterYear() {
    if (yearNode) {
        yearNode.textContent = String(new Date().getFullYear());
    }
}

function ensureArchiveDescription(card, description) {
    const meta = card.querySelector(".archive-meta");
    if (!meta) {
        return;
    }

    let desc = meta.querySelector(".style-note");
    if (!desc) {
        desc = document.createElement("p");
        desc.className = "style-note";
        meta.appendChild(desc);
    }
    desc.textContent = description;
}

function ensureCollectionTag(card, styleName) {
    const meta = card.querySelector(".collection-meta");
    if (!meta) {
        return;
    }

    let tag = meta.querySelector(".style-tag");
    if (!tag) {
        tag = document.createElement("p");
        tag.className = "style-tag";
        meta.appendChild(tag);
    }
    tag.textContent = `Featured style: ${styleName}`;
}

function applyStyleNamesToCards() {
    const images = document.querySelectorAll("img[src]");

    images.forEach((img) => {
        const fileName = getFileName(img.getAttribute("src") || "");
        const style = STYLE_REGISTRY[fileName];
        if (!style) {
            return;
        }

        img.dataset.styleName = style.name;
        img.dataset.styleDescription = style.description;
        img.classList.add("style-image");
        img.alt = `${style.name} style`;

        const card = img.closest(".look-card, .feature-card, .archive-card, .collection-card");
        if (!card) {
            return;
        }

        if (card.classList.contains("collection-card")) {
            ensureCollectionTag(card, style.name);
            return;
        }

        if (card.classList.contains("archive-card")) {
            const nameNode = card.querySelector(".archive-meta p");
            if (nameNode) {
                nameNode.textContent = style.name;
            }
            ensureArchiveDescription(card, style.description);
            return;
        }

        const heading = card.querySelector("h3");
        const paragraph = card.querySelector("p");
        if (heading) {
            heading.textContent = style.name;
        }
        if (paragraph) {
            paragraph.textContent = style.description;
        }
    });
}

function createStyleModal() {
    const modal = document.createElement("div");
    modal.className = "style-modal";
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
        <div class="style-modal-backdrop" data-close-modal></div>
        <div class="style-modal-panel" role="dialog" aria-modal="true" aria-label="Style preview">
            <button class="style-modal-close" type="button" data-close-modal aria-label="Close preview">Close</button>
            <img class="style-modal-image" alt="" />
            <h3 class="style-modal-title"></h3>
            <p class="style-modal-desc"></p>
        </div>
    `;

    document.body.appendChild(modal);
    return modal;
}

function setupStyleModal() {
    const modal = createStyleModal();
    const modalImage = modal.querySelector(".style-modal-image");
    const modalTitle = modal.querySelector(".style-modal-title");
    const modalDesc = modal.querySelector(".style-modal-desc");

    const closeModal = () => {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
    };

    const openModal = (img) => {
        modalImage.src = img.currentSrc || img.getAttribute("src") || "";
        modalImage.alt = img.dataset.styleName || "Style image";
        modalTitle.textContent = img.dataset.styleName || "Style";
        modalDesc.textContent = img.dataset.styleDescription || "";
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
    };

    modal.addEventListener("click", (event) => {
        const target = event.target;
        if (target instanceof HTMLElement && target.hasAttribute("data-close-modal")) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    });

    const images = document.querySelectorAll("img.style-image");
    images.forEach((img) => {
        img.setAttribute("tabindex", "0");
        img.setAttribute("role", "button");
        img.setAttribute("aria-label", `Open preview for ${img.dataset.styleName || "style"}`);

        img.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            openModal(img);
        });

        img.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openModal(img);
            }
        });
    });
}

setupThemeToggle();
applyStyleNamesToCards();
setupStyleModal();
setupScrollTopButton();
setupRevealOnScroll();
setFooterYear();
