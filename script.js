let subjects = [];

const subjectsContainer = document.getElementById("subjectsContainer");
const resultCount = document.getElementById("resultCount");
const searchInput = document.getElementById("searchInput");
const materialsModalEl = document.getElementById("materialsModal");
const materialsModalLabel = document.getElementById("materialsModalLabel");
const materialsModalSubtitle = document.getElementById("materialsModalSubtitle");
const materialsModalBody = document.getElementById("materialsModalBody");
const materialsModal = materialsModalEl ? new bootstrap.Modal(materialsModalEl) : null;
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
  const depth = theme ? "../../" : (subject && !materialsModal ? "../" : "");

  let html = `<li class="breadcrumb-item"><a href="${depth}index.html">Inici</a></li>`;

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

const subjectMaterialsPages = {
  "Entorns Digitals": "entorns-digitals/index.html",
  "Programació i Tractament de Dades I": "programacio-i-tractament-de-dades-i/index.html",
  "Programació i Tractament de Dades II": "programacio-i-tractament-de-dades-ii/index.html",
  "Digitalització": "digitalizacio/index.html"
};

async function loadSubjects() {
  const pathsToTry = ["subjects.json", "../subjects.json", "../../subjects.json"];
  let dataFound = false;

  for (const path of pathsToTry) {
    try {
      const response = await fetch(path);
      if (response.ok) {
        subjects = await response.json();
        dataFound = true;
        break;
      }
    } catch (e) {}
  }

  if (dataFound) {
    init();
  } else {
    if (subjectsContainer) {
      subjectsContainer.innerHTML = `<div class="col-12"><div class="alert alert-warning border-0 shadow-sm glass-card">No s'han pogut carregar les dades.</div></div>`;
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
    const subjectPage = subjectMaterialsPages[subject.name];
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
            <h3 class="h5 mb-0">${subject.name}</h3>
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

  const cards = subject.materials
    .map((section) => {
      const slug = section.slug || "";
      const href = section.directHref || (slug ? `./${slug}/index.html` : "#");
      return `
        <div class="col-md-6 col-xl-4">
          <article class="card h-100 border-0 shadow-sm subject-card">
            <div class="card-body p-4">
              <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
                <h2 class="h5 mb-0">${section.title}</h2>
                <span class="badge text-bg-primary">${section.items ? section.items.length : 0} ítem/s</span>
              </div>
              <p class="text-muted mb-0 small">Toca per veure tasques i teoria del tema.</p>
            </div>
            <div class="card-footer bg-transparent border-0 p-4 pt-0">
              <a class="btn btn-primary btn-sm w-100 btn-modern" href="${href}">Veure tema</a>
            </div>
          </article>
        </div>
      `;
    })
    .join("");

  subjectIndexContainer.innerHTML = `<div class="row g-4 mt-1">${cards}</div>`;
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
          const subjectPage = subjectMaterialsPages[subject.name];
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
    subjectsContainer.innerHTML = `<div class="col-12 text-center py-5"><h3>Cap resultat per "${query}"</h3></div>`;
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
    const subjectPage = subjectMaterialsPages[subject.name];
    const footerHtml = subjectPage && hasMaterials
      ? `<a href="${subjectPage}" class="btn btn-primary btn-sm w-100 btn-modern">Veure materials</a>`
      : `<button type="button" class="btn ${hasMaterials ? "btn-primary" : "btn-outline-primary"} btn-sm w-100 btn-modern js-open-materials" ${hasMaterials ? "" : "disabled"} data-subject="${encodeURIComponent(subject.name)}">${hasMaterials ? "Veure materials" : "Properament"}</button>`;

    col.className = "col-md-6 col-xl-4 mb-4";
    col.innerHTML = `
      <article class="card h-100 border-0 shadow-sm subject-card">
        <div class="card-body p-4">
          <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
            <h3 class="h5 mb-0">${subject.name}</h3>
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
}

if (searchInput) searchInput.addEventListener("input", filterSubjects);
document.addEventListener("click", e => {
  const btn = e.target.closest(".js-open-materials");
  if (btn) openMaterials(decodeURIComponent(btn.getAttribute("data-subject") || ""));
});
loadSubjects();
