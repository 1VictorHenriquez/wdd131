// ── Data ────────────────────────────────────────────────────
const tools = [
    {
        id: "midjourney",
        name: "Midjourney",
        category: "image",
        icon: "🎨",
        description: "Generate stunning, photorealistic and artistic images from text prompts. Widely used by designers for UI mockups, hero images, and concept art.",
        url: "https://midjourney.com",
        free: false
    },
    {
        id: "github-copilot",
        name: "GitHub Copilot",
        category: "coding",
        icon: "🤖",
        description: "AI pair programmer that suggests code completions, functions, and entire blocks in real time. Supports HTML, CSS, JavaScript, and dozens more languages.",
        url: "https://github.com/features/copilot",
        free: false
    },
    {
        id: "claude",
        name: "Claude",
        category: "copywriting",
        icon: "✍️",
        description: "Versatile AI assistant by Anthropic. Excellent for writing landing page copy, blog posts, UX microcopy, and reviewing code or content drafts.",
        url: "https://claude.ai",
        free: true
    },
    {
        id: "framer-ai",
        name: "Framer AI",
        category: "design",
        icon: "⚡",
        description: "Generate full website layouts and components from a text description. Integrates directly into the Framer design and publishing workflow.",
        url: "https://framer.com",
        free: true
    },
    {
        id: "semrush-ai",
        name: "Semrush AI",
        category: "seo",
        icon: "📈",
        description: "AI-powered SEO toolkit for keyword research, content optimization, and competitor analysis. Helps web creators rank higher in search results.",
        url: "https://semrush.com",
        free: false
    },
    {
        id: "dalle",
        name: "DALL-E 3",
        category: "image",
        icon: "🖼️",
        description: "OpenAI image generator integrated into ChatGPT. Ideal for quickly producing illustrations, icons, and web graphics from natural language prompts.",
        url: "https://openai.com/dall-e-3",
        free: false
    },
    {
        id: "v0",
        name: "v0 by Vercel",
        category: "coding",
        icon: "🧩",
        description: "Generate React and Tailwind UI components from a text or image prompt. Instantly produces production-ready frontend code for web projects.",
        url: "https://v0.dev",
        free: true
    },
    {
        id: "jasper",
        name: "Jasper",
        category: "copywriting",
        icon: "📝",
        description: "AI content platform for marketing teams. Creates SEO-optimized blog posts, ads, emails, and product descriptions at scale.",
        url: "https://jasper.ai",
        free: false
    },
    {
        id: "uizard",
        name: "Uizard",
        category: "design",
        icon: "🖌️",
        description: "Turn hand-drawn sketches or text descriptions into interactive UI mockups. Great for rapid prototyping without advanced design skills.",
        url: "https://uizard.io",
        free: true
    },
    {
        id: "surfer-seo",
        name: "Surfer SEO",
        category: "seo",
        icon: "🔍",
        description: "Analyzes top-ranking pages and provides AI-driven content briefs and optimization scores to help your pages rank on Google.",
        url: "https://surferseo.com",
        free: false
    },
    {
        id: "gemini",
        name: "Gemini",
        category: "copywriting",
        icon: "💬",
        description: "Google's multimodal AI. Useful for web content research, summarizing documentation, generating structured data, and writing assistance.",
        url: "https://gemini.google.com",
        free: true
    },
    {
        id: "cursor",
        name: "Cursor",
        category: "coding",
        icon: "💻",
        description: "AI-powered code editor built on VS Code. Chat with your codebase, generate entire files, and debug with natural language instructions.",
        url: "https://cursor.so",
        free: true
    },
    {
        id: "ideogram",
        name: "Ideogram",
        category: "image",
        icon: "🎭",
        description: "AI image generator that excels at rendering accurate text inside images — logos, posters, and typographic web graphics.",
        url: "https://ideogram.ai",
        free: true
    },
    {
        id: "relume",
        name: "Relume",
        category: "design",
        icon: "📐",
        description: "Generate complete website sitemaps and wireframes from a prompt. Exports to Figma or Webflow, saving hours of information architecture work.",
        url: "https://relume.io",
        free: false
    },
    {
        id: "alli-ai",
        name: "Alli AI",
        category: "seo",
        icon: "🚀",
        description: "Automates on-page SEO optimizations across entire websites. Makes bulk changes to meta tags, schema, and content without manual editing.",
        url: "https://alliai.com",
        free: false
    }
];

// ── State ────────────────────────────────────────────────────
let currentFilter = "all";
let favorites = loadFavorites();

// ── DOM References ───────────────────────────────────────────
const grid = document.querySelector("#tools-grid");
const emptyMsg = document.querySelector("#empty-msg");
const resultsCount = document.querySelector("#results-count");
const filterRow = document.querySelector("#filter-row");
const navToggle = document.querySelector("#nav-toggle");
const mainNav = document.querySelector("#main-nav");

// Mobile-specific optimizations
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

// ── Nav Toggle ───────────────────────────────────────────────
navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.textContent = isOpen ? "✕" : "☰";
}, { passive: true });

// ── Filter Logic ─────────────────────────────────────────────
function getFilteredTools(filter) {
    let filtered;
    if (filter === "all") {
        filtered = tools;
    } else if (filter === "favorites") {
        filtered = tools.filter(tool => favorites.includes(tool.id));
    } else {
        filtered = tools.filter(tool => tool.category === filter);
    }
    // Sort by id for consistent rendering order
    return filtered.sort((a, b) => a.id.localeCompare(b.id));
}

// Mobile performance: debounce filter clicks
let filterTimeout;
function debounceFilter(filter, delay = 50) {
    clearTimeout(filterTimeout);
    filterTimeout = setTimeout(() => {
        renderCards(filter);
    }, delay);
}

// ── Render Cards ─────────────────────────────────────────────
function renderCards(filter) {
    const filtered = getFilteredTools(filter);

    if (filtered.length === 0) {
        emptyMsg.hidden = false;
        resultsCount.textContent = "";
        grid.textContent = ""; // More efficient than innerHTML
        return;
    }

    emptyMsg.hidden = true;
    resultsCount.textContent = `${filtered.length} tool${filtered.length !== 1 ? "s" : ""} found`;

    // Batch DOM operations for better performance
    const fragment = document.createDocumentFragment();

    filtered.forEach(tool => {
        const isSaved = favorites.includes(tool.id);
        const card = document.createElement("article");
        card.className = "tool-card";
        card.setAttribute("data-id", tool.id);

        // Create elements directly instead of using innerHTML for better performance
        const cardTop = document.createElement("div");
        cardTop.className = "card-top";

        const cardIcon = document.createElement("div");
        cardIcon.className = `card-icon ${tool.category}`;
        cardIcon.textContent = tool.icon;
        cardTop.appendChild(cardIcon);

        const favBtn = document.createElement("button");
        favBtn.className = `fav-btn ${isSaved ? "saved" : ""}`;
        favBtn.setAttribute("data-id", tool.id);
        favBtn.setAttribute("aria-label", isSaved ? "Remove from favorites" : "Save to favorites");
        favBtn.textContent = isSaved ? "★" : "☆";
        cardTop.appendChild(favBtn);

        card.appendChild(cardTop);

        const cardContent = document.createElement("div");

        const cardName = document.createElement("h2");
        cardName.className = "card-name";
        cardName.textContent = tool.name;
        cardContent.appendChild(cardName);

        const cardCategory = document.createElement("span");
        cardCategory.className = `card-category ${tool.category}`;
        cardCategory.textContent = tool.category;
        cardContent.appendChild(cardCategory);

        card.appendChild(cardContent);

        const cardDesc = document.createElement("p");
        cardDesc.className = "card-desc";
        cardDesc.textContent = tool.description;
        card.appendChild(cardDesc);

        const cardFooter = document.createElement("div");
        cardFooter.className = "card-footer";

        const cardLink = document.createElement("a");
        cardLink.className = "card-link";
        cardLink.href = tool.url;
        cardLink.target = "_blank";
        cardLink.rel = "noopener";
        cardLink.textContent = "Visit site →";
        cardFooter.appendChild(cardLink);

        const cardFree = document.createElement("span");
        cardFree.className = `card-free ${tool.free ? "yes" : ""}`;
        cardFree.textContent = tool.free ? "Free tier" : "Paid";
        cardFooter.appendChild(cardFree);

        card.appendChild(cardFooter);

        fragment.appendChild(card);
    });

    // Single DOM operation
    grid.textContent = "";
    grid.appendChild(fragment);

    // Add loaded class for smooth transition
    setTimeout(() => grid.classList.add('loaded'), 50);
}

// ── Favorites ─────────────────────────────────────────────────
function loadFavorites() {
    const stored = localStorage.getItem("ai-tools-favorites");
    return stored ? JSON.parse(stored) : [];
}

function saveFavorites() {
    localStorage.setItem("ai-tools-favorites", JSON.stringify(favorites));
}

function toggleFavorite(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(favId => favId !== id);
    } else {
        favorites.push(id);
    }
    saveFavorites();
    renderCards(currentFilter);
}

// Use event delegation for better performance
grid.addEventListener("click", (e) => {
    if (e.target.classList.contains("fav-btn")) {
        e.preventDefault();
        toggleFavorite(e.target.dataset.id);
    }
});

// No need for attachFavListeners anymore since we use event delegation

// ── Filter Buttons ────────────────────────────────────────────
filterRow.addEventListener("click", e => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;

    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    currentFilter = btn.dataset.filter;

    // Use debounce on mobile for better performance
    if ('ontouchstart' in window) {
        debounceFilter(currentFilter);
    } else {
        renderCards(currentFilter);
    }
}, { passive: true });

// ── Footer ────────────────────────────────────────────────────
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

// ── Init ──────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    // Direct render for better performance - defer non-critical work
    renderCards("all");
});
