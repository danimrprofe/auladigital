# Aula Digital · IES Ramon Llull

Aquest projecte és una plataforma web per gestionar i visualitzar materials didàctics, apunts i tasques de diverses assignatures de l'IES Ramon Llull.

## Arquitectura del Projecte

- **Frontend:** HTML5, CSS3 (Bootstrap 5) i JavaScript (Vanilla).
- **Dades:** Les assignatures i els seus materials es gestionen mitjançant un fitxer centralitzat `subjects.json`.
- **Estil:** Disseny modern "Light Mode" basat en _glassmorphism_ (efecte vidre) i gradients suaus.
- **Navegació:** SPA-like parcial amb suport per a subcarpetes profundes i sistema de **Breadcrumbs** (Fil d'Ariadna) dinàmic.

## Millores Realitzades (Març 2026)

- **Interfície Clara:** Transformació completa del disseny de mode fosc a mode clar per a una millor llegibilitat.
- **Cercador Global Intel·ligent:** El cercador troba no només assignatures, sinó també temes i materials concrets dins del JSON.
- **Millora de l'Empty State:** Afegit un sistema de suggeriments (Python, Linux, etc.) quan no es troben resultats de cerca.
- **Sistema de Breadcrumbs:** Navegació jeràrquica automàtica (`Inici > Assignatura > Tema`) per facilitar el retorn.
- **Botó de Copiar Codi:** Implementada la funcionalitat de "copiar al portapapers" per als blocs de codi (`<pre>`).
- **Optimització de JSON:** Eliminades les rutes fixes al JavaScript; ara tot el contingut i navegació es genera dinàmicament des de `subjects.json`.
- **Reorganització de Materials:** Teoria de la IA i Python integrada dins les carpetes d'assignatures corresponents per mantenir una estructura neta.

### Sessió 31/03/2026 — Eines de Projecció a l'Aula i Neteja de la Portada

- **Neteja de `index.html`:** Eliminats els blocs _Cercador de continguts_, _Calendari i avisos_ i _Contacte i tutories_ de la pàgina principal. Es van eliminar també les corresponents entrades al navbar i les regles CSS del grid associades.
- **Mode Pantalla Aula a `styles.css`:** Corregit un conflicte de CSS que activava el disseny d'una sola pantalla de forma permanent a escriptori. Ara la vista normal és el comportament per defecte i el mode comprimit s'activa **únicament** quan s'afegeix la classe `presentation-mode` al `<html>`.
- **Eines de Projecció a `virtualitzacio_teoria.html`:** Aplicat el mateix patró de barra d'eines de projecció que ja tenia `ia_teoria_v2.html`. Inclou: cercador intern, mode focus, mode pantalla aula, pantalla completa i indicador d'estat d'etapa.

## Estratègia de Continguts i UX (Nivell Pedagògic)

### 1. Estàndard de Disseny de Teoria

L'estil de referència per a totes les pàgines de teoria és **`ia_teoria_v2.html`** (IA) i **`virtualitzacio_teoria.html`** (Virtualització). Ambdues incorporen el patró complet d'eines de projecció. Aquest disseny prioritza:

- **Navegació lateral (Sidebar):** Menú fix a l'esquerra per saltar ràpidament entre apartats.
- **Lectura Vertical:** Flux continu de contingut amb suport per a _scroll_ suau.
- **Codificació de Colors (Info Boxes):** Ús consistent de caixes per a definicions (blau), avisos (taronja) i conclusions (lila).
- **Targetes de Teoria:** Agrupació de conceptes en blocs visuals independents per evitar la fatiga de lectura.

### 2. Enriquiment de Materials

- **Metadades d'Aprenentatge:** Incloure al JSON camps per a `"temps_estimat"` i `"dificultat"`.
- **Saber-ne més:** Secció final de recursos externs curats (vídeos, articles, docs oficials).
- **Autoavaluació:** Inclusió de "Quick Checks" (petits qüestionaris) al final de cada unitat didàctica.

## Patró d'Eines de Projecció a l'Aula

Totes les pàgines de teoria han d'incorporar aquest patró. Els fitxers de referència ja implementats són `ia_teoria_v2.html` i `virtualitzacio_teoria.html`.

### HTML (inserir després del div de pestanyes de navegació)

```html
<div class="page-tools">
  <div class="tools-row">
    <input
      id="topicSearch"
      class="topic-search"
      type="search"
      placeholder="Cerca dins la pàgina…"
    />
    <button id="focusToggle" class="tool-btn">Mode focus</button>
    <button id="presentationToggle" class="tool-btn">Mode pantalla aula</button>
    <button id="fullscreenToggle" class="tool-btn">Pantalla completa</button>
    <button id="clearSearch" class="tool-btn">Netejar cerca</button>
    <span id="stageStatus" class="tool-status">Tema 1 de N</span>
    <span id="presentationState" class="present-pill" hidden
      >Presentació activa</span
    >
  </div>
</div>
```

### CSS clau

- `.page-tools` / `.tools-row`: barra horitzontal d'eines.
- `.tool-btn`: botó estilitzat de la barra.
- `.topic-search`: camp de cerca inline.
- `.present-pill`: badge verd visible quan `presentation-mode` és actiu.
- `.focus-mode .theory-card:not(.focused)`: opacitat reduïda per a les targetes no focades.
- `.presentation-mode` + regles `clamp()`: escalen tipografia i comprimeixen el layout per a projectors.

### JS clau

- `applySearchFilter()`: filtra `.theory-card` comparant el text de cerca amb `textContent`.
- `switchTopic(i)`: canvia de pestanya, actualitza `stageStatus` i crida `applySearchFilter()`.
- `navigate(dir)`: navega ±1 entre pestanyes.
- Botons: `focusToggle` → `focus-mode` al `<html>`; `presentationToggle` → `presentation-mode` al `<html>`; `fullscreenToggle` → `requestFullscreen()`; `clearSearch` → buida el camp i re-filtra.
- **Activació de `presentation-mode`**: `document.documentElement.classList.toggle("presentation-mode")` — sempre a `<html>`, no a `<body>`.

## Convencions i Estàndards d'Organització

- **Idioma:** La interfície i el contingut han d'estar en català.
- **Nomenclatura de Fitxers:** Ús estricte de minúscules i guions (ex: `teoria-ia.html` en lloc de `IA Teoria (1).html`).
- **Estructura de Carpetes:**
  - Cada assignatura té la seva pròpia carpeta.
  - Els materials de teoria han de residir dins la carpeta de la seva assignatura.
  - Proposta futura: Crear una carpeta `/assets` unificada per a imatges i recursos multimèdia.
- **Rúbriques:** Les tasques al JSON han de tendir a incloure o enllaçar els criteris d'avaluació (rúbriques) per donar autonomia a l'alumne.

## Full de Ruta (Properes Millores)

1.  **Template Mestre de Teoria:** Crear un fitxer base `teoria-template.html` extret de `virtualitzacio_teoria.html` / `ia_teoria_v2.html` per unificar Python, Linux i la resta de pàgines de teoria pendents.
2.  **Eines de Projecció a altres pàgines:** Aplicar el patró documentat a `python_teoria.html`, `linux_teoria.html`, `criptografia_teoria.html`, etc.
3.  **Checklist d'Estudiant:** Sistema de marcat de tasques completades amb `localStorage`.
4.  **Suport Offline (PWA):** Facilitar la consulta de materials a l'aula sense dependre de la connexió a internet.
5.  **Glossari Unificat:** Centralitzar els termes tècnics transversals a totes les assignatures.
