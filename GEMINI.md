# Aula Digital · IES Ramon Llull

Aquest projecte és una plataforma web per gestionar i visualitzar materials didàctics, apunts i tasques de diverses assignatures de l'IES Ramon Llull.

## Arquitectura del Projecte

- **Frontend:** HTML5, CSS3 (Bootstrap 5) i JavaScript (Vanilla).
- **Dades:** Les assignatures i els seus materials es gestionen mitjançant un fitxer centralitzat `subjects.json`.
- **Estil:** Disseny modern "Light Mode" basat en *glassmorphism* (efecte vidre) i gradients suaus.
- **Navegació:** SPA-like parcial amb suport per a subcarpetes profundes i sistema de **Breadcrumbs** (Fil d'Ariadna) dinàmic.

## Millores Realitzades (Març 2026)

- **Interfície Clara:** Transformació completa del disseny de mode fosc a mode clar per a una millor llegibilitat.
- **Cercador Global Intel·ligent:** El cercador troba no només assignatures, sinó també temes i materials concrets dins del JSON.
- **Millora de l'Empty State:** Afegit un sistema de suggeriments (Python, Linux, etc.) quan no es troben resultats de cerca.
- **Sistema de Breadcrumbs:** Navegació jeràrquica automàtica (`Inici > Assignatura > Tema`) per facilitar el retorn.
- **Botó de Copiar Codi:** Implementada la funcionalitat de "copiar al portapapers" per als blocs de codi (`<pre>`).
- **Optimització de JSON:** Eliminades les rutes fixes al JavaScript; ara tot el contingut i navegació es genera dinàmicament des de `subjects.json`.
- **Reorganització de Materials:** Teoria de la IA i Python integrada dins les carpetes d'assignatures corresponents per mantenir una estructura neta.

## Estratègia de Continguts i UX (Nivell Pedagògic)

### 1. Estàndard de Disseny de Teoria
L'estil de referència per a totes les pàgines de teoria és **`virtualitzacio_teoria.html`**. Aquest disseny prioritza:
- **Navegació lateral (Sidebar):** Menú fix a l'esquerra per saltar ràpidament entre apartats.
- **Lectura Vertical:** Flux continu de contingut amb suport per a *scroll* suau.
- **Codificació de Colors (Info Boxes):** Ús consistent de caixes per a definicions (blau), avisos (taronja) i conclusions (lila).
- **Targetes de Teoria:** Agrupació de conceptes en blocs visuals independents per evitar la fatiga de lectura.

### 2. Enriquiment de Materials
- **Metadades d'Aprenentatge:** Incloure al JSON camps per a `"temps_estimat"` i `"dificultat"`.
- **Saber-ne més:** Secció final de recursos externs curats (vídeos, articles, docs oficials).
- **Autoavaluació:** Inclusió de "Quick Checks" (petits qüestionaris) al final de cada unitat didàctica.

## Convencions i Estàndards d'Organització

- **Idioma:** La interfície i el contingut han d'estar en català.
- **Nomenclatura de Fitxers:** Ús estricte de minúscules i guions (ex: `teoria-ia.html` en lloc de `IA Teoria (1).html`).
- **Estructura de Carpetes:**
    - Cada assignatura té la seva pròpia carpeta.
    - Els materials de teoria han de residir dins la carpeta de la seva assignatura.
    - Proposta futura: Crear una carpeta `/assets` unificada per a imatges i recursos multimèdia.
- **Rúbriques:** Les tasques al JSON han de tendir a incloure o enllaçar els criteris d'avaluació (rúbriques) per donar autonomia a l'alumne.

## Full de Ruta (Properes Millores)

1.  **Template Mestre de Teoria:** Crear un fitxer base `teoria-template.html` extret de `virtualitzacio_teoria.html` per unificar IA, Python i Linux.
2.  **Checklist d'Estudiant:** Sistema de marcat de tasques completades amb `localStorage`.
3.  **Suport Offline (PWA):** Facilitar la consulta de materials a l'aula sense dependre de la connexió a internet.
4.  **Glossari Unificat:** Centralitzar els termes tècnics transversals a totes les assignatures.
