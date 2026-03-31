let subjects = [];
let materialsModal = null;

const subjectsContainer = document.getElementById("subjectsContainer");
const resultCount = document.getElementById("resultCount");
const searchInput = document.getElementById("searchInput");
const materialsModalEl = document.getElementById("materialsModal");
const materialsModalLabel = document.getElementById("materialsModalLabel");
const materialsModalSubtitle = document.getElementById("materialsModalSubtitle");
const materialsModalBody = document.getElementById("materialsModalBody");
const presentationToggleHome = document.getElementById("presentationToggleHome");
const fullscreenToggleHome = document.getElementById("fullscreenToggleHome");
const presentationStateHome = document.getElementById("presentationStateHome");

// Inicialització segura del modal
function initModal() {
  if (materialsModalEl && typeof bootstrap !== "undefined") {
    materialsModal = new bootstrap.Modal(materialsModalEl);
  }
}

const materialsPageContainer = document.getElementById("materialsPageContainer");
const subjectIndexContainer = document.getElementById("subjectIndexContainer");
const themeIndexContainer = document.getElementById("themeIndexContainer");
const breadcrumbContainer = document.getElementById("breadcrumbContainer");

function renderBreadcrumbs(subject, theme) {
  if (!breadcrumbContainer) return;

  const isTheme = Boolean(theme);
  const isSubject = Boolean(subject) && !isTheme;

  // Determinem el path base (quants ../ ens calen per anar a l'inici)
  // Si estem en un tema, l'inici està a ../../
  // Si estem en una assignatura, l'inici està a ../
  const depth = theme ? "../../" : (subject && !materialsModalEl?.closest('body') ? "../" : "");
  
  // Correcció depth per a index.html principal
  const isMainIndex = !materialsPageContainer && !subjectIndexContainer && !themeIndexContainer;
  const baseDepth = isMainIndex ? "" : depth;

  let html = `<li class="breadcrumb-item"><a href="${baseDepth}index.html">Inici</a></li>`;

  if (subject) {
    if (isTheme) {
      html += `<li class="breadcrumb-item"><a href="../index.html">${subject.name}</a></li>`;
      html += `<li class="breadcrumb-item active" aria-current="page">${theme.title}</li>`;
    } else {
      html += `<li class="breadcrumb-item active" aria-current="page">${subject.name}</li>`;
    }
  }

  breadcrumbContainer.innerHTML = html;
}

async function loadSubjects() {
  const pathsToTry = ["subjects.json", "../subjects.json", "../../subjects.json"];
  let dataFound = false;

  for (const path of pathsToTry) {
    try {
      const response = await fetch(path);
      if (response.ok) {
        subjects = await response.json();
        dataFound = true;
        console.log(`Dades carregades correctament des de: ${path}`);
        break;
      }
    } catch (e) {
      console.warn(`No s'ha pogut carregar ${path}:`, e);
    }
  }

  if (dataFound) {
    initModal();
    init();
  } else {
    console.error("No s'ha trobat el fitxer subjects.json a cap de les rutes provades.");
    if (subjectsContainer) {
      subjectsContainer.innerHTML = `<div class="col-12"><div class="alert alert-warning border-0 shadow-sm glass-card">No s'han pogut carregar les dades (subjects.json no trobat).</div></div>`;
    }
  }
}

function buildMaterialsHtml(subject, subtitleText) {
  if (!subject || !Array.isArray(subject.materials) || subject.materials.length === 0) return { subtitleText: "", html: "" };

  const html = subject.materials
    .map((section) => {
      const items = (section.items || [])
        .map((it) => {
          return `
        <li class="list-group-item d-flex align-items-start gap-3">
          <div class="fs-5" aria-hidden="true">${it.icon}</div>
          <div class="flex-grow-1">
            <div class="d-flex flex-wrap align-items-center gap-2">
              <span class="badge rounded-pill text-bg-light border">${it.label}</span>
              <span class="fw-semibold">${it.title}</span>
            </div>
          </div>
        </li>
      `;
        })
        .join("");

      return `
      <div class="mb-4">
        <h3 class="h6 text-uppercase text-muted mb-2">${section.title}</h3>
        <ul class="list-group list-group-flush glass-list">
          ${items}
        </ul>
      </div>
    `;
    })
    .join("");

  return { subtitleText: subtitleText || "", html };
}

function renderSubjects(list) {
  if (!subjectsContainer || !resultCount) return;
  subjectsContainer.innerHTML = "";

  if (list.length === 0) {
    subjectsContainer.innerHTML = `<div class="col-12 text-center py-5"><p class="text-muted">No s'han trobat assignatures.</p></div>`;
    resultCount.textContent = "0 assignatures";
    return;
  }

  list.forEach((subject) => {
    const topicsHtml = subject.topics.map((topic) => `<span class="chip">${topic}</span>`).join("");
    const hasMaterials = Array.isArray(subject.materials) && subject.materials.length > 0;
    const col = document.createElement("div");
    const subjectPage = subject.path;
    const footerHtml = subjectPage && hasMaterials
      ? `<a href="${subjectPage}" class="btn btn-primary btn-sm w-100 btn-modern">Veure materials</a>`
      : `<button type="button" class="btn ${hasMaterials ? "btn-primary" : "btn-outline-primary"} btn-sm w-100 btn-modern js-open-materials" ${
          hasMaterials ? "" : "disabled"
        } data-subject="${encodeURIComponent(subject.name)}">
          ${hasMaterials ? "Veure materials" : "Materials pròximament"}
        </button>`;

    col.className = "col-md-6 col-xl-4 mb-4";
    col.innerHTML = `
      <article class="card h-100 border-0 shadow-sm subject-card">
        <div class="card-body p-4">
          <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
            <h3 class="h5 mb-0">${subject.icon ? `<span class="me-2" aria-hidden="true">${subject.icon}</span>` : ""}${subject.name}</h3>
            <span class="badge text-bg-primary">${subject.level}</span>
          </div>
          <p class="text-muted small">${subject.description}</p>
          <div>${topicsHtml}</div>
        </div>
        <div class="card-footer bg-transparent border-0 p-4 pt-0">
          ${footerHtml}
        </div>
      </article>
    `;
    subjectsContainer.appendChild(col);
  });

  resultCount.textContent = `${list.length} assignatura/es`;
}

function renderSubjectIndex(subject) {
  if (!subjectIndexContainer) return;
  if (!subject || !Array.isArray(subject.materials) || subject.materials.length === 0) {
    subjectIndexContainer.innerHTML = '<div class="text-muted">No hi ha materials.</div>';
    return;
  }

  function themeMatches(section, query, filterTag) {
    const q = query.trim().toLowerCase();
    const titleMatch = section.title.toLowerCase().includes(q);
    const itemsText = (section.items || []).map((it) => `${it.label || ""} ${it.title || ""}`).join(" ").toLowerCase();
    const itemsMatch = itemsText.includes(q);
    const queryOk = !q || titleMatch || itemsMatch;

    if (!filterTag) return queryOk;
    return queryOk && section.title.toLowerCase().includes(filterTag.toLowerCase());
  }

  function sortThemes(themes, sortMode) {
    const arr = [...themes];
    if (sortMode === "az") {
      arr.sort((a, b) => a.title.localeCompare(b.title, "ca"));
    } else if (sortMode === "za") {
      arr.sort((a, b) => b.title.localeCompare(a.title, "ca"));
    } else if (sortMode === "items-desc") {
      arr.sort((a, b) => (b.items?.length || 0) - (a.items?.length || 0));
    } else if (sortMode === "items-asc") {
      arr.sort((a, b) => (a.items?.length || 0) - (b.items?.length || 0));
    }
    return arr;
  }

  function renderSubjectThemes(query = "", filterTag = "", sortMode = "", viewMode = "detailed") {
    const filtered = sortThemes(
      subject.materials.filter((section) => themeMatches(section, query, filterTag)),
      sortMode
    );

    const cards = filtered
      .map((section) => {
        const isCompact = viewMode === "compact";
        const colClass = isCompact ? "col-12" : "col-md-6 col-xl-4";
        const bodyPaddingClass = isCompact ? "p-3" : "p-4";
        const footerPaddingClass = isCompact ? "p-3 pt-0" : "p-4 pt-0";
        const titleClass = isCompact ? "h6" : "h5";
        const buttonClass = isCompact ? "btn btn-outline-primary btn-sm w-100 btn-modern" : "btn btn-primary btn-sm w-100 btn-modern";
        const slug = section.slug || "";
        const href = section.directHref || (slug ? `./${slug}/index.html` : "#");
        return `
          <div class="${colClass}">
            <article class="card h-100 border-0 shadow-sm subject-card theme-card ${isCompact ? "theme-card-compact" : ""}">
              <div class="card-body ${bodyPaddingClass}">
                <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
                  <h2 class="${titleClass} mb-0">${section.title}</h2>
                  <span class="badge text-bg-primary">${section.items ? section.items.length : 0} ítem/s</span>
                </div>
                <p class="text-muted mb-2 small">Tecnologies:</p>
                <div class="d-flex flex-wrap gap-1">
                  ${section.technologies ? section.technologies.map(tech => `<span class="badge rounded-pill text-bg-info">${tech}</span>`).join('') : '<span class="badge rounded-pill text-bg-secondary">Info disponible</span>'}
                </div>
              </div>
              <div class="card-footer bg-transparent border-0 ${footerPaddingClass}">
                <a class="${buttonClass}" href="${href}">Veure tema</a>
              </div>
            </article>
          </div>
        `;
      })
      .join("");

    const emptyState = `
      <div class="col-12 text-center py-4">
        <div class="empty-state glass-card p-4">
          <div class="fs-4 mb-2">🔎</div>
          <p class="mb-0 text-muted">No s'ha trobat cap tema amb aquests filtres.</p>
        </div>
      </div>
    `;

    const grid = subjectIndexContainer.querySelector("#subjectThemeGrid");
    const count = subjectIndexContainer.querySelector("#subjectThemeCount");
    if (grid) grid.innerHTML = filtered.length ? cards : emptyState;
    if (count) count.textContent = `${filtered.length} tema/es`;
  }

  const topicFilters = (subject.topics || [])
    .map((topic) => `<button type="button" class="btn btn-outline-primary btn-sm btn-modern js-theme-filter" data-filter="${topic}">${topic}</button>`)
    .join("");

  subjectIndexContainer.innerHTML = `
    <div class="subject-index-tools glass-card p-3 mb-3">
      <div class="d-flex flex-wrap align-items-center gap-2 mb-2">
        <label for="subjectThemeSearch" class="small text-muted mb-0">Cerca tema:</label>
        <input id="subjectThemeSearch" type="text" class="form-control form-control-sm" placeholder="Ex: Linux, Python, Arduino..." style="max-width: 320px;">
        <label for="subjectThemeSort" class="small text-muted mb-0">Ordena:</label>
        <select id="subjectThemeSort" class="form-select form-select-sm" style="max-width: 180px;">
          <option value="">Rellevància</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
          <option value="items-desc">Més ítems</option>
          <option value="items-asc">Menys ítems</option>
        </select>
        <div class="btn-group btn-group-sm subject-view-toggle" role="group" aria-label="Canviar vista de temes">
          <button type="button" class="btn btn-primary btn-modern js-theme-view" data-view="detailed">Detallada</button>
          <button type="button" class="btn btn-outline-primary btn-modern js-theme-view" data-view="compact">Compacta</button>
        </div>
        <span id="subjectThemeCount" class="badge text-bg-light ms-auto">${subject.materials.length} tema/es</span>
      </div>
      <div class="d-flex flex-wrap gap-2">
        <button type="button" class="btn btn-primary btn-sm btn-modern js-theme-filter active" data-filter="">Tots</button>
        ${topicFilters}
      </div>
    </div>
    <div id="subjectThemeGrid" class="row g-4 mt-1"></div>
  `;

  const searchEl = subjectIndexContainer.querySelector("#subjectThemeSearch");
  const sortEl = subjectIndexContainer.querySelector("#subjectThemeSort");
  const filterButtons = subjectIndexContainer.querySelectorAll(".js-theme-filter");
  const viewButtons = subjectIndexContainer.querySelectorAll(".js-theme-view");
  let currentFilter = "";
  let currentSort = "";
  let currentView = "detailed";

  function setActiveFilterButton() {
    filterButtons.forEach((btn) => {
      const isActive = (btn.getAttribute("data-filter") || "") === currentFilter;
      btn.classList.toggle("btn-primary", isActive);
      btn.classList.toggle("btn-outline-primary", !isActive);
      btn.classList.toggle("active", isActive);
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentFilter = btn.getAttribute("data-filter") || "";
      setActiveFilterButton();
      renderSubjectThemes(searchEl ? searchEl.value : "", currentFilter, currentSort, currentView);
    });
  });

  if (searchEl) {
    searchEl.addEventListener("input", () => {
      renderSubjectThemes(searchEl.value, currentFilter, currentSort, currentView);
    });
  }

  if (sortEl) {
    sortEl.addEventListener("change", () => {
      currentSort = sortEl.value || "";
      renderSubjectThemes(searchEl ? searchEl.value : "", currentFilter, currentSort, currentView);
    });
  }

  if (viewButtons.length) {
    viewButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        currentView = btn.getAttribute("data-view") || "detailed";
        viewButtons.forEach((b) => {
          const active = (b.getAttribute("data-view") || "") === currentView;
          b.classList.toggle("btn-primary", active);
          b.classList.toggle("btn-outline-primary", !active);
        });
        renderSubjectThemes(searchEl ? searchEl.value : "", currentFilter, currentSort, currentView);
      });
    });
  }

  renderSubjectThemes("", "", "", "detailed");
}

function renderThemeIndex(subject, themeSlug) {
  if (!themeIndexContainer) return;
  const section = subject?.materials?.find((s) => s.slug === themeSlug);
  if (!section) {
    themeIndexContainer.innerHTML = '<div class="text-muted">Tema no trobat.</div>';
    return;
  }

  const itemsHtml = (section.items || [])
    .map((it) => {
      const safeHref = it.href || "";
      const hasLink = Boolean(safeHref);
      return `
        <li class="list-group-item d-flex align-items-start gap-3 glass-list-item p-3">
          <div class="fs-5">${it.icon || "📄"}</div>
          <div class="flex-grow-1">
            <div class="d-flex flex-wrap align-items-center gap-2">
              <span class="badge rounded-pill text-bg-light border small">${it.label || "Recurs"}</span>
              <span class="fw-semibold">${it.title}</span>
            </div>
            ${hasLink ? `<div class="mt-2"><a class="btn btn-outline-primary btn-sm btn-modern" href="${safeHref}">Obrir fitxer</a></div>` : `<div class="mt-2 text-muted small">Pendent d'afegir.</div>`}
          </div>
        </li>
      `;
    })
    .join("");

  themeIndexContainer.innerHTML = `
    <div class="mb-4">
      <div class="small text-muted mb-1">${subject.name}</div>
      <h1 class="h3 mb-0">${section.title}</h1>
    </div>
    <ul class="list-group list-group-flush glass-list shadow-sm">${itemsHtml}</ul>
  `;
}

function openMaterials(subjectName) {
  if (!materialsModal) return;
  const subject = subjects.find((s) => s.name === subjectName);
  if (!subject) return;

  materialsModalLabel.textContent = subject.name;
  materialsModalSubtitle.textContent = "Materials i recursos";
  materialsModalBody.innerHTML = buildMaterialsHtml(subject).html;
  materialsModal.show();
}

function filterSubjects() {
  if (!searchInput) return;
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    renderSubjects(subjects);
    return;
  }

  const filteredSubjects = [];
  const matchedItems = [];

  subjects.forEach((subject) => {
    const subjectMatches = `${subject.name} ${subject.description} ${subject.topics.join(" ")}`.toLowerCase().includes(query);
    let materialMatches = false;

    if (subject.materials) {
      subject.materials.forEach((section) => {
        if (section.title.toLowerCase().includes(query)) {
          const subjectPage = subject.path;
          const href = section.directHref || (section.slug ? (subjectPage ? `${subjectPage.replace("index.html", "")}${section.slug}/index.html` : `#`) : "#");
          matchedItems.push({ type: "Tema", title: section.title, subject: subject.name, href: href, icon: "📂" });
          materialMatches = true;
        }
        if (section.items) {
          section.items.forEach((item) => {
            if (item.title.toLowerCase().includes(query)) {
              matchedItems.push({ type: item.label || "Material", title: item.title, subject: subject.name, href: item.href || "#", icon: item.icon || "📄" });
              materialMatches = true;
            }
          });
        }
      });
    }
    if (subjectMatches || materialMatches) filteredSubjects.push(subject);
  });

  renderSearchResults(filteredSubjects, matchedItems, query);
}

function renderSearchResults(subjectsList, itemsList, query) {
  if (!subjectsContainer || !resultCount) return;
  subjectsContainer.innerHTML = "";

  if (subjectsList.length === 0 && itemsList.length === 0) {
    subjectsContainer.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="empty-state glass-card p-5">
          <div class="fs-1 mb-3">🔍</div>
          <h3 class="h4">Cap resultat per "${query}"</h3>
          <p class="text-muted">Prova amb paraules més genèriques o revisa l'ortografia.</p>
          <div class="mt-4">
            <p class="small fw-bold text-uppercase text-muted">Suggeriments:</p>
            <div class="d-flex flex-wrap justify-content-center gap-2">
              <button class="btn btn-outline-primary btn-sm btn-modern js-suggestion">Python</button>
              <button class="btn btn-outline-primary btn-sm btn-modern js-suggestion">Linux</button>
              <button class="btn btn-outline-primary btn-sm btn-modern js-suggestion">Arduino</button>
              <button class="btn btn-outline-primary btn-sm btn-modern js-suggestion">Web</button>
            </div>
          </div>
        </div>
      </div>`;
    resultCount.textContent = "0 resultats";
    return;
  }

  if (subjectsList.length > 0) {
    const h = document.createElement("div"); h.className = "col-12 mb-3"; h.innerHTML = `<h3 class="h6 text-uppercase text-muted">Assignatures</h3>`;
    subjectsContainer.appendChild(h);
    renderCards(subjectsList);
  }

  if (itemsList.length > 0) {
    const h = document.createElement("div"); h.className = "col-12 mt-4 mb-3"; h.innerHTML = `<h3 class="h6 text-uppercase text-muted">Temes i materials</h3>`;
    subjectsContainer.appendChild(h);
    const listGroup = document.createElement("div");
    listGroup.className = "list-group glass-list shadow-sm mb-4";
    itemsList.forEach(item => {
      listGroup.innerHTML += `
        <a href="${item.href}" class="list-group-item list-group-item-action d-flex align-items-center gap-3 p-3">
          <div class="fs-4">${item.icon}</div>
          <div class="flex-grow-1">
            <div class="small badge text-bg-light border mb-1">${item.type}</div>
            <div class="fw-semibold">${item.title}</div>
            <div class="small text-muted">${item.subject}</div>
          </div>
          <div class="text-primary">➔</div>
        </a>`;
    });
    const col = document.createElement("div"); col.className = "col-12"; col.appendChild(listGroup);
    subjectsContainer.appendChild(col);
  }
  resultCount.textContent = `${subjectsList.length + itemsList.length} resultats`;
}

function renderCards(list) {
  list.forEach((subject) => {
    const topicsHtml = subject.topics.map((topic) => `<span class="chip">${topic}</span>`).join("");
    const hasMaterials = Array.isArray(subject.materials) && subject.materials.length > 0;
    const col = document.createElement("div");
    const subjectPage = subject.path;
    const footerHtml = subjectPage && hasMaterials
      ? `<a href="${subjectPage}" class="btn btn-primary btn-sm w-100 btn-modern">Veure materials</a>`
      : `<button type="button" class="btn ${hasMaterials ? "btn-primary" : "btn-outline-primary"} btn-sm w-100 btn-modern js-open-materials" ${hasMaterials ? "" : "disabled"} data-subject="${encodeURIComponent(subject.name)}">${hasMaterials ? "Veure materials" : "Properament"}</button>`;

    col.className = "col-md-6 col-xl-4 mb-4";
    col.innerHTML = `
      <article class="card h-100 border-0 shadow-sm subject-card">
        <div class="card-body p-4">
          <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
            <h3 class="h5 mb-0">${subject.icon ? `<span class="me-2" aria-hidden="true">${subject.icon}</span>` : ""}${subject.name}</h3>
            <span class="badge text-bg-primary">${subject.level}</span>
          </div>
          <p class="text-muted small">${subject.description}</p>
          <div>${topicsHtml}</div>
        </div>
        <div class="card-footer bg-transparent border-0 p-4 pt-0">${footerHtml}</div>
      </article>`;
    subjectsContainer.appendChild(col);
  });
}

function initCopyButtons() {
  const codeBlocks = document.querySelectorAll("pre");
  codeBlocks.forEach((block) => {
    if (block.querySelector(".copy-btn")) return;

    const button = document.createElement("button");
    button.className = "copy-btn";
    button.type = "button";
    button.innerText = "Copiar";

    button.addEventListener("click", async () => {
      const code = block.querySelector("code") ? block.querySelector("code").innerText : block.innerText;
      try {
        await navigator.clipboard.writeText(code);
        button.innerText = "Copiat!";
        button.classList.add("copied");
        setTimeout(() => {
          button.innerText = "Copiar";
          button.classList.remove("copied");
        }, 2000);
      } catch (err) {
        console.error("Error al copiar:", err);
        button.innerText = "Error";
      }
    });

    block.appendChild(button);
  });
}

function initFaviconAndMeta() {
  if (!document.querySelector('link[rel="icon"]')) {
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>\uD83C\uDF93</text></svg>";
    document.head.appendChild(link);
  }
  if (!document.querySelector('meta[name="theme-color"]')) {
    const meta = document.createElement("meta");
    meta.name = "theme-color";
    meta.content = "#3b82f6";
    document.head.appendChild(meta);
  }
}

function initDarkMode() {
  if (localStorage.getItem("darkMode") === "on") {
    document.body.classList.add("dark-mode");
  }
  const navContainer = document.querySelector(".navbar .container");
  if (navContainer) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "dark-mode-toggle ms-2";
    btn.setAttribute("aria-label", "Canviar mode fosc/clar");
    btn.title = "Mode fosc / clar";
    btn.innerHTML = document.body.classList.contains("dark-mode") ? "\u2600\uFE0F" : "\uD83C\uDF19";
    btn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("darkMode", isDark ? "on" : "off");
      btn.innerHTML = isDark ? "\u2600\uFE0F" : "\uD83C\uDF19";
    });
    navContainer.appendChild(btn);
  }
}

function initBackToTop() {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.id = "backToTopBtn";
  btn.setAttribute("aria-label", "Tornar a dalt");
  btn.title = "Tornar a dalt";
  btn.innerHTML = "\u2191";
  document.body.appendChild(btn);
  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 300);
  });
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initPresentationModeHome() {
  if (presentationToggleHome) {
    presentationToggleHome.addEventListener("click", () => {
      const html = document.documentElement;
      html.classList.toggle("presentation-mode");
      const active = html.classList.contains("presentation-mode");
      presentationToggleHome.textContent = active ? "Sortir mode aula" : "Mode pantalla aula";
      if (presentationStateHome) {
        presentationStateHome.hidden = !active;
      }
    });
  }

  if (fullscreenToggleHome) {
    fullscreenToggleHome.addEventListener("click", async () => {
      try {
        if (!document.fullscreenElement) {
          await document.documentElement.requestFullscreen();
        } else {
          await document.exitFullscreen();
        }
      } catch (err) {
        console.warn("No s'ha pogut canviar la pantalla completa:", err);
      }
    });
  }

  document.addEventListener("fullscreenchange", () => {
    if (!fullscreenToggleHome) return;
    fullscreenToggleHome.textContent = document.fullscreenElement ? "Sortir pantalla completa" : "Pantalla completa";
  });
}

function init() {
  if (themeIndexContainer) {
    const subjectName = themeIndexContainer.dataset.subject || "";
    const themeSlug = themeIndexContainer.dataset.themeSlug || "";
    const subject = subjects.find((s) => s.name === subjectName);
    const theme = subject?.materials?.find((s) => s.slug === themeSlug);
    renderBreadcrumbs(subject, theme);
    renderThemeIndex(subject, themeSlug);
  } else if (subjectIndexContainer) {
    const subjectName = subjectIndexContainer.dataset.subject || "";
    const subject = subjects.find((s) => s.name === subjectName);
    renderBreadcrumbs(subject);
    renderSubjectIndex(subject);
  } else if (materialsPageContainer) {
    const subjectName = materialsPageContainer.dataset.subject || "";
    const subject = subjects.find((s) => s.name === subjectName);
    renderBreadcrumbs(subject);
    materialsPageContainer.innerHTML = buildMaterialsHtml(subject).html;
  } else {
    renderBreadcrumbs();
    renderSubjects(subjects);
  }
  
  // Inicialitzem els botons de copiar després de renderitzar
  initCopyButtons();
}

if (searchInput) searchInput.addEventListener("input", filterSubjects);
document.addEventListener("click", e => {
  const btn = e.target.closest(".js-open-materials");
  if (btn) openMaterials(decodeURIComponent(btn.getAttribute("data-subject") || ""));

  const suggestionBtn = e.target.closest(".js-suggestion");
  if (suggestionBtn && searchInput) {
    searchInput.value = suggestionBtn.innerText;
    filterSubjects();
  }
});

// Execució inicial
document.addEventListener("DOMContentLoaded", () => {
  initCopyButtons();
  initFaviconAndMeta();
  initDarkMode();
  initBackToTop();
  initPresentationModeHome();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
    e.preventDefault();
    if (searchInput) {
      searchInput.focus();
      searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      const subjectThemeSearch = document.getElementById("subjectThemeSearch");
      if (subjectThemeSearch) {
        subjectThemeSearch.focus();
        subjectThemeSearch.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }
});

if (subjectsContainer || materialsPageContainer || subjectIndexContainer || themeIndexContainer) {
  loadSubjects();
}
