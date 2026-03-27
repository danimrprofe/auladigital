const subjects = [
  {
    name: "Recursos Digitals II",
    level: "2n curs",
    description: "Creació de continguts digitals, gestió d'eines col·laboratives i publicació de projectes.",
    topics: ["Canva i disseny", "Eines col·laboratives", "Presentacions", "Publicació web"]
  },
  {
    name: "Entorns Digitals",
    level: "1r-2n curs",
    description: "Ús responsable dels entorns virtuals de treball, identitat digital i organització personal.",
    topics: [
      "Funcionalitats comunes",
      "Processadors de text",
      "Presentacions diapositives",
      "Presentacions en línia",
      "Fulls de càlcul"
    ],
    materials: [
      {
        title: "Funcionalitats i utilitats comunes a diverses aplicacions",
        slug: "tema-funcionalitats-comunes",
        items: [
          { icon: "⌨️", label: "Teclat", title: "Teclat QWERTY i posició correcta dels dits" },
          { icon: "🎹", label: "Tecles", title: "Grups de tecles i utilitats (escriptura, desplaçament, funcions...)" },
          { icon: "⚡", label: "Dreceres", title: "Combinacions de tecles per evitar l’ús del ratolí" },
          { icon: "🧰", label: "Eines", title: "Copiar, enganxar, clonar format, cercar i reemplaçar, barres d’eines" }
        ]
      },
      {
        title: "Processadors de text",
        slug: "tema-processadors-text",
        items: [
          { icon: "📄", label: "Format", title: "Format de pàgina (mida, orientació, marges, columnes)" },
          { icon: "✒️", label: "Caràcter", title: "Format de caràcter: mida, font i efectes" },
          { icon: "¶", label: "Paràgraf", title: "Format de paràgraf: sagnat, espaiat, interlineat, alineació, vores" },
          { icon: "🔢", label: "Llistes", title: "Pics i numeració" },
          { icon: "🧾", label: "Estils", title: "Estils de paràgraf i índexs automàtics" },
          { icon: "📊", label: "Taules", title: "Taules, unió de cel·les i llegendes" },
          { icon: "🖼️", label: "Imatges", title: "Propietats d’imatges: alineació, ajustament, vores, llegendes" },
          { icon: "🔤", label: "Revisió", title: "Revisió ortogràfica i gramatical, diccionaris" },
          { icon: "📑", label: "TOC", title: "Taules de continguts i d’imatges" },
          { icon: "🖨️", label: "Impressió", title: "Configuració d’impressió i impressores virtuals" }
        ]
      },
      {
        title: "Presentacions multimèdia basades en diapositives",
        slug: "tema-presentacions-diapositives",
        items: [
          { icon: "🎤", label: "Ús", title: "Presentacions com a suport en exposicions" },
          { icon: "🎨", label: "Disseny", title: "Plantilles, fons i teoria del color" },
          { icon: "📐", label: "Diapositiva", title: "Mida, orientació i diapositiva mestra" },
          { icon: "📋", label: "Contingut", title: "Duplicació, organització i racionalització del contingut" },
          { icon: "🎞️", label: "Transició", title: "Transicions i interaccions d’elements" },
          { icon: "⏱️", label: "Assaig", title: "Paràmetres de presentació i eina d’assaig" }
        ]
      },
      {
        title: "Presentacions multimèdia en línia",
        slug: "tema-presentacions-en-linia",
        items: [
          { icon: "🌐", label: "Diapositives", title: "Eines en línia basades en diapositives (exploració)" },
          { icon: "🌀", label: "Dinàmiques", title: "Eines en línia no basades en diapositives (Prezi, etc.)" },
          { icon: "📤", label: "Compartició", title: "Plataformes de compartició de presentacions" }
        ]
      },
      {
        title: "Fulls de càlcul",
        slug: "tema-fulls-de-calcul",
        items: [
          { icon: "📊", label: "Estructura", title: "Fileres, columnes, inserció i congelació" },
          { icon: "🎨", label: "Format", title: "Format de cel·les: alineació, vores, fons i números" },
          { icon: "➗", label: "Operacions", title: "Suma, resta, multiplicació, divisió i referències de cel·les" },
          { icon: "🧠", label: "Funcions", title: "Funcions lògiques, matemàtiques, estadístiques i de text" },
          { icon: "📌", label: "Fixació", title: "Còpia de fórmules i fixació de cel·les" },
          { icon: "🔍", label: "Dades", title: "Ordenació, filtres i format condicional" },
          { icon: "📈", label: "Gràfics", title: "Diagrames de columna, barra i sectors" }
        ]
      }
    ]
  },
  {
    name: "Programació i Tractament de Dades I",
    level: "1r curs",
    description: "Introducció a la programació i manipulació de dades amb activitats guiades.",
    topics: ["Thunkable", "LibreOffice Base", "mBot/mBuild", "Arduino", "Python", "Virtualització", "Linux"],
    materials: [
      {
        title: "TEMA 2: Joc d'endevinar (Thunkable)",
        slug: "tema-2-joc-dendevinar-thunkable",
        items: [
          { icon: "📄", label: "Lliçó", title: "Introducció a Thunkable" },
          { icon: "📄", label: "Lliçó", title: "Ús de Temporitzadors (Timers)" },
          { icon: "🔨", label: "Pràctica", title: "Joc d'endevinar" },
          { icon: "📄", label: "Lliçó", title: "Principis d'Usabilitat (UX/UI)" },
          { icon: "💡", label: "Entrega", title: "Pràctica Joc Endevinador" }
        ]
      },
      {
        title: "TEMA 2: Joc Matabitxos (Thunkable)",
        slug: "tema-2-joc-matabitxos-thunkable",
        items: [
          { icon: "🔨", label: "Pràctica", title: "Joc Matabitxos" },
          { icon: "📋", label: "Rúbrica", title: "Puntuació Joc Matabitxos" },
          { icon: "💡", label: "Entrega", title: "Joc MATABITXOS" }
        ]
      },
      {
        title: "TEMA 3: Bases de Dades amb LibreOffice Base: Disseny i Gestió Pràctica",
        slug: "tema-3-libreoffice-base",
        items: [
          { icon: "📊", label: "Pràctica", title: "Pel·lícules" },
          { icon: "💾", label: "Presentació", title: "BD individual" }
        ]
      },
      {
        title: "TEMA 4: Makeblock mBot & mBuild",
        slug: "tema-4-makeblock-mbot-mbuild",
        items: [
          { icon: "📒", label: "Recurs", title: "Vídeo 'Primeres Passes amb mBot2'" },
          { icon: "🤖", label: "Pràctica", title: "Primeres pràctiques amb mBot (mBlock)" },
          { icon: "🤖", label: "Pràctica", title: "mBuild" }
        ]
      },
      {
        title: "TEMA 4: Arduino",
        slug: "tema-4-arduino",
        items: [
          { icon: "🤖", label: "Pràctica", title: "Arduino" }
        ]
      },
      {
        title: "TEMA 5: Programació Estructurada i Algorítmica amb Python",
        slug: "tema-5-programacio-python",
        items: [
          { icon: "🐍", label: "Recurs", title: "Web repàs Python" },
          { icon: "🐍", label: "Teoria", title: "Teoria Python" },
          { icon: "📝", label: "Exam", title: "Python exam", href: "../../python_exam%20(1).html" }
        ]
      },
      {
        title: "TEMA 6: Virtualització i Instal·lació de Sistemes Operatius",
        slug: "tema-6-virtualitzacio",
        items: [
          { icon: "💻", label: "Recurs", title: "ISOs Windows" },
          { icon: "💻", label: "Recurs", title: "Drivers targeta de xarxa" },
          { icon: "💻", label: "Recurs", title: "Controlador de domini" },
          { icon: "📄", label: "Teoria", title: "Virtualització teoria", href: "../../virtualitzacio_teoria.html" }
        ]
      },
      {
        title: "TEMA 7: Introducció i Administració de Sistemes Linux",
        slug: "tema-7-linux",
        items: [
          { icon: "🐧", label: "Recurs", title: "Material Linux" },
          { icon: "📄", label: "Teoria", title: "Linux teoria", href: "./linux_teoria.html" }
        ]
      }
    ]
  },
  {
    name: "Programació i Tractament de Dades II",
    level: "2n curs",
    description: "Consolidació de programació aplicada a projectes i anàlisi de dades.",
    topics: ["mBot/mBuild", "Criptografia", "Bases de dades", "Unity", "POO", "Web avançat", "Blender", "IA"],
    materials: [
      {
        title: "Programació i Robòtica amb Makeblock (mBot / mBuild)",
        slug: "tema-programacio-robotica-makeblock",
        items: [
          { icon: "🤖", label: "Robòtica", title: "Programació i Robòtica amb Makeblock (mBot / mBuild)" },
          { icon: "🤖", label: "mòdul", title: "mBuild" },
          { icon: "🤖", label: "dispositiu", title: "mBOT" },
          { icon: "📒", label: "Recurs", title: "Video 'Primeres Passes amb mBot2'" },
          { icon: "🔨", label: "Pràctiques", title: "PRÀCTICAS PYTHON" },
          { icon: "🔨", label: "Pràctica", title: "Ús de Mòduls mBuild (Llum, So, etc.)" }
        ]
      },
      {
        title: "Criptografia: Fonaments, Algorismes i Aplicacions Pràctiques",
        slug: "tema-criptografia",
        items: [
          { icon: "📒", label: "Material", title: "Teoria criptografia" }
        ]
      },
      {
        title: "Bases de Dades Relacionals",
        slug: "tema-bases-de-dades-relacionals",
        items: [
          { icon: "🎮", label: "Pràctica", title: "Juego adivinador con JSON" },
          { icon: "🗄️", label: "Eina", title: "Descarga SQLite DB Browser" },
          { icon: "📄", label: "Apunts", title: "Apuntes bases de datos relacionales" }
        ]
      },
      {
        title: "Desenvolupament de Videojocs amb Unity",
        slug: "tema-unity-videojocs",
        items: [
          { icon: "📘", label: "Introducció", title: "Introducció al tema" },
          { icon: "🎯", label: "Recopilació", title: "Recopilación jocs plataforma" },
          { icon: "🎬", label: "Vídeos", title: "Videos plataformas con Unity" },
          { icon: "🕹️", label: "Vídeos", title: "Vídeos Pong con Unity" }
        ]
      },
      {
        title: "Programació orientada a objectes",
        slug: "tema-poo",
        items: [
          { icon: "🐍", label: "Repàs", title: "Cuestionario repaso Python" },
          { icon: "🧩", label: "Unitat", title: "Programació orientada a objectes" },
          { icon: "🐍", label: "Activitat", title: "Repàs Python i bots" },
          { icon: "📊", label: "Unitat", title: "Ciència de dades" },
          { icon: "🧾", label: "Entrega", title: "Estadistica entrega" },
          { icon: "🧩", label: "Unitat", title: "POO" }
        ]
      },
      {
        title: "Desenvolupament web avançat",
        slug: "tema-web-avancat",
        items: [
          { icon: "📄", label: "Apunts", title: "Apuntes HTML" },
          { icon: "🧾", label: "Cheatsheet", title: "Cheatsheet HTML" },
          { icon: "📄", label: "Apunts", title: "Apuntes CSS" },
          { icon: "🧾", label: "Cheatsheet", title: "Cheatsheet CSS" },
          { icon: "📄", label: "Apunts", title: "Apuntes Javascript" },
          { icon: "✅", label: "Rúbrica", title: "Rúbrica bootstrap" },
          { icon: "📄", label: "Apunts", title: "Apuntes Bootstrap" },
          { icon: "🗂️", label: "Esquema", title: "Esquema página web película" },
          { icon: "🌐", label: "Tutorial", title: "W3C Tutorial Bootstrap 5" },
          { icon: "🌐", label: "Recurs", title: "Web oficial de Bootstrap" },
          { icon: "🔧", label: "Guia", title: "Instrucciones git y github" },
          { icon: "📦", label: "Entrega", title: "Entrega web bootstrap" }
        ]
      },
      {
        title: "Disseny i Animació 3D amb Blender",
        slug: "tema-blender-3d",
        items: [
          { icon: "🧊", label: "Projecte", title: "Disseny i Animació 3D amb Blender" },
          { icon: "📒", label: "Material", title: "Pràctiques Blender" },
          { icon: "📋", label: "Rúbrica", title: "RÚBRICA: projecte nadalenc" },
          { icon: "📄", label: "Instruccions", title: "Instruccions: exportar projecte nadalenc" },
          { icon: "💡", label: "Entrega", title: "Projecte nadalenc" }
        ]
      },
      {
        title: "IA: teoria",
        slug: "tema-ia",
        directHref: "/ia_teoria.html",
        items: [
          { icon: "🤖", label: "Teoria", title: "IA i Programació", href: "../../ia_teoria.html" }
        ]
      }
    ]
  },
  {
    name: "Digitalització",
    level: "ESO/FP",
    description: "Competència digital, ciutadania digital i resolució de problemes amb tecnologia.",
    topics: ["Benestar digital", "Ciutadania digital", "Seguretat", "Privacitat", "Competència digital"],
    materials: [
      {
        title: "Benestar digital",
        slug: "tema-benestar-digital",
        items: [
          { icon: "🔐", label: "Teoria", title: "Seguretat teoria", href: "../seguretat_teoria.html" }
        ]
      },
      {
        title: "Ciutadania digital",
        slug: "tema-ciutadania-digital",
        items: [
          { icon: "🧑‍🤝‍🧑", label: "Teoria", title: "Ciutadania digital", href: "./ciutadania_digital.html" }
        ]
      }
    ]
  }
];

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
const subjectMaterialsPages = {
  "Entorns Digitals": "entorns-digitals/index.html",
  "Programació i Tractament de Dades I": "programacio-i-tractament-de-dades-i/index.html",
  "Programació i Tractament de Dades II": "programacio-i-tractament-de-dades-ii/index.html",
  "Digitalització": "digitalizacio/index.html"
};

function buildMaterialsHtml(subject, subtitleText) {
  if (!subject || !Array.isArray(subject.materials) || subject.materials.length === 0) return { subtitleText: "", html: "" };

  const html = subject.materials
    .map((section) => {
      const items = section.items
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

    col.className = "col-md-6 col-xl-4";
    col.innerHTML = `
      <article class="card h-100 border-0 shadow-sm subject-card">
        <div class="card-body p-4">
          <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
            <h3 class="h5 mb-0">${subject.name}</h3>
            <span class="badge text-bg-primary">${subject.level}</span>
          </div>
          <p class="text-muted">${subject.description}</p>
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
              <p class="text-muted mb-0">Toca per veure tasques i teoria del tema.</p>
            </div>
            <div class="card-footer bg-transparent border-0 p-4 pt-0">
              <a class="btn btn-primary btn-sm w-100 btn-modern" href="${href}">Veure tema</a>
            </div>
          </article>
        </div>
      `;
    })
    .join("");

  subjectIndexContainer.innerHTML = `
    <div class="row g-4 mt-1">${cards}</div>
  `;
}

function renderThemeIndex(subject, themeSlug) {
  if (!themeIndexContainer) return;
  if (!subject || !Array.isArray(subject.materials) || subject.materials.length === 0) return;

  const section = subject.materials.find((s) => s.slug === themeSlug);
  if (!section) {
    themeIndexContainer.innerHTML = '<div class="text-muted">Tema no trobat.</div>';
    return;
  }

  const itemsHtml = (section.items || [])
    .map((it) => {
      const safeHref = it.href || "";
      const hasLink = Boolean(safeHref);
      return `
        <li class="list-group-item d-flex align-items-start gap-3 glass-list-item">
          <div class="fs-5" aria-hidden="true">${it.icon || ""}</div>
          <div class="flex-grow-1">
            <div class="d-flex flex-wrap align-items-center gap-2">
              <span class="badge rounded-pill text-bg-light border">${it.label || ""}</span>
              <span class="fw-semibold">${it.title}</span>
            </div>
            ${
              hasLink
                ? `
                  <div class="mt-2 d-flex flex-wrap gap-2">
                    <a class="btn btn-outline-light btn-sm btn-modern" href="${safeHref}">Obrir fitxer</a>
                  </div>
                `
                : `<div class="mt-2 text-muted small">Pendent d'afegir fitxer/enllaç.</div>`
            }
          </div>
        </li>
      `;
    })
    .join("");

  themeIndexContainer.innerHTML = `
    <div class="mb-3">
      <div class="small text-muted mb-1">${subject.name}</div>
      <h1 class="h3 mb-0">${section.title}</h1>
      <p class="text-muted mt-2 mb-0">Continguts del tema (tasques i/o teoria).</p>
    </div>
    <ul class="list-group list-group-flush glass-list">${itemsHtml}</ul>
  `;
}

function openMaterials(subjectName) {
  if (!materialsModal || !materialsModalLabel || !materialsModalSubtitle || !materialsModalBody) return;
  const subject = subjects.find((s) => s.name === subjectName);
  if (!subject || !Array.isArray(subject.materials) || subject.materials.length === 0) return;

  materialsModalLabel.textContent = subject.name;
  materialsModalSubtitle.textContent = "1r de batxillerat · Teoria, pràctiques i entregues (sense dates)";
  const { html } = buildMaterialsHtml(subject);
  materialsModalBody.innerHTML = html;
  materialsModal.show();
}

function filterSubjects() {
  if (!searchInput) return;
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    renderSubjects(subjects);
    return;
  }

  const filtered = subjects.filter((subject) => {
    const text = `${subject.name} ${subject.description} ${subject.topics.join(" ")}`.toLowerCase();
    return text.includes(query);
  });

  renderSubjects(filtered);
}

if (searchInput) {
  searchInput.addEventListener("input", filterSubjects);
}
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".js-open-materials");
  if (!btn) return;
  const name = decodeURIComponent(btn.getAttribute("data-subject") || "");
  openMaterials(name);
});

if (themeIndexContainer) {
  const subjectName = themeIndexContainer.dataset.subject || "";
  const themeSlug = themeIndexContainer.dataset.themeSlug || "";
  const subject = subjects.find((s) => s.name === subjectName);
  renderThemeIndex(subject, themeSlug);
} else if (subjectIndexContainer) {
  const subjectName = subjectIndexContainer.dataset.subject || "";
  const subject = subjects.find((s) => s.name === subjectName);
  renderSubjectIndex(subject);
} else if (materialsPageContainer) {
  const subjectName = materialsPageContainer.dataset.subject || "";
  const subject = subjects.find((s) => s.name === subjectName);
  materialsPageContainer.innerHTML = buildMaterialsHtml(
    subject,
    "2n curs · Materials (sense dates)"
  ).html;
} else {
  renderSubjects(subjects);
}
