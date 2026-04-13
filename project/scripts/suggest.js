// ── DOM References ───────────────────────────────────────────
const form = document.querySelector("#suggest-form");
const successMsg = document.querySelector("#success-msg");
const successBody = document.querySelector("#success-body");
const recentSection = document.querySelector("#recent-section");
const recentList = document.querySelector("#recent-list");
const suggestionCount = document.querySelector("#suggestion-count");
const charCount = document.querySelector("#char-count");
const descField = document.querySelector("#tool-desc");
const resetBtn = document.querySelector("#reset-btn");
const clearBtn = document.querySelector("#clear-btn");
const navToggle = document.querySelector("#nav-toggle");
const mainNav = document.querySelector("#main-nav");

// ── Nav Toggle ───────────────────────────────────────────────
navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.textContent = isOpen ? "✕" : "☰";
});

// ── LocalStorage Keys ─────────────────────────────────────────
const STORAGE_COUNT = "ai-tools-suggestion-count";
const STORAGE_RECENT = "ai-tools-recent-suggestions";

// ── Load & Display Count ──────────────────────────────────────
function loadCount() {
    const stored = localStorage.getItem(STORAGE_COUNT);
    return stored ? parseInt(stored) : 0;
}

function incrementCount() {
    const count = loadCount() + 1;
    localStorage.setItem(STORAGE_COUNT, count);
    suggestionCount.textContent = count;
    return count;
}

function loadRecent() {
    const stored = localStorage.getItem(STORAGE_RECENT);
    return stored ? JSON.parse(stored) : [];
}

function saveRecent(suggestions) {
    localStorage.setItem(STORAGE_RECENT, JSON.stringify(suggestions));
}

// ── Render Recent Suggestions ─────────────────────────────────
function renderRecent() {
    const recent = loadRecent();

    if (recent.length === 0) {
        recentSection.hidden = true;
        return;
    }

    recentSection.hidden = false;
    recentList.innerHTML = "";

    recent.forEach(item => {
        const li = document.createElement("li");
        li.className = "recent-item";
        li.innerHTML = `
            <span class="recent-name">${item.name}</span>
            <span class="recent-category ${item.category}">${item.category}</span>
            <span class="recent-date">${item.date}</span>
        `;
        recentList.appendChild(li);
    });
}

// ── Validation ────────────────────────────────────────────────
function showError(fieldId, errorId) {
    const field = document.querySelector(`#${fieldId}`);
    const error = document.querySelector(`#${errorId}`);
    field.classList.add("invalid");
    error.hidden = false;
}

function clearError(fieldId, errorId) {
    const field = document.querySelector(`#${fieldId}`);
    const error = document.querySelector(`#${errorId}`);
    field.classList.remove("invalid");
    error.hidden = true;
}

function validateForm() {
    let valid = true;

    const name = document.querySelector("#tool-name").value.trim();
    const url = document.querySelector("#tool-url").value.trim();
    const category = document.querySelector("#tool-category").value;
    const free = document.querySelector("#tool-free").value;
    const desc = descField.value.trim();

    if (!name) {
        showError("tool-name", "error-tool-name"); valid = false;
    } else {
        clearError("tool-name", "error-tool-name");
    }

    const urlPattern = /^https?:\/\/.+\..+/;
    if (!url || !urlPattern.test(url)) {
        showError("tool-url", "error-tool-url"); valid = false;
    } else {
        clearError("tool-url", "error-tool-url");
    }

    if (!category) {
        showError("tool-category", "error-tool-category"); valid = false;
    } else {
        clearError("tool-category", "error-tool-category");
    }

    if (!free) {
        showError("tool-free", "error-tool-free"); valid = false;
    } else {
        clearError("tool-free", "error-tool-free");
    }

    if (!desc || desc.length < 20) {
        showError("tool-desc", "error-tool-desc"); valid = false;
    } else {
        clearError("tool-desc", "error-tool-desc");
    }

    return valid;
}

// ── Character Counter ─────────────────────────────────────────
descField.addEventListener("input", () => {
    const len = descField.value.length;
    charCount.textContent = `${len} / 300 characters`;

    if (len > 300) {
        charCount.classList.add("over-limit");
    } else {
        charCount.classList.remove("over-limit");
    }
});

// ── Form Submit ───────────────────────────────────────────────
form.addEventListener("submit", e => {
    e.preventDefault();

    if (!validateForm()) return;

    const name = document.querySelector("#tool-name").value.trim();
    const category = document.querySelector("#tool-category").value;
    const submitterName = document.querySelector("#submitter-name").value.trim();

    const count = incrementCount();

    const recent = loadRecent();
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

    recent.unshift({ name, category, date: dateStr });
    if (recent.length > 5) recent.pop();
    saveRecent(recent);

    const greeting = submitterName ? `Thanks, ${submitterName}!` : "Thanks for contributing!";
    successBody.textContent = `${greeting} "${name}" has been submitted for review. You've submitted ${count} suggestion${count !== 1 ? "s" : ""} total.`;

    form.hidden = true;
    successMsg.hidden = false;
    renderRecent();
});

// ── Reset Form ────────────────────────────────────────────────
resetBtn.addEventListener("click", () => {
    form.reset();
    charCount.textContent = "0 / 300 characters";

    const fields = ["tool-name", "tool-url", "tool-category", "tool-free", "tool-desc"];
    const errors = ["error-tool-name", "error-tool-url", "error-tool-category", "error-tool-free", "error-tool-desc"];

    fields.forEach((fieldId, i) => clearError(fieldId, errors[i]));
});

// ── Clear History ─────────────────────────────────────────────
clearBtn.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_RECENT);
    renderRecent();
});

// ── Footer ────────────────────────────────────────────────────
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

// ── Init ──────────────────────────────────────────────────────
suggestionCount.textContent = loadCount();
renderRecent();
