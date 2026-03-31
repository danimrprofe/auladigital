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
- **Robustesa de Càrrega:** El JavaScript detecta automàticament la ruta del `subjects.json` i pot funcionar en pàgines independents (*standalone*).

## Convencions i Estàndards

- **Idioma:** La interfície i el contingut han d'estar en català.
- **Responsivitat:** Ús de classes de Bootstrap 5.
- **Dades:** Totes les actualitzacions de contingut s'han de fer al fitxer `subjects.json`. Els nous fitxers HTML han d'incloure el contenidor `<ul id="breadcrumbContainer" class="app-breadcrumb"></ul>`.
- **Estructura:** Els nous fitxers de teoria han d'anar dins la carpeta de la seva assignatura corresponent.

## Full de Ruta (Properes Millores)

1.  **Checklist d'Estudiant:** Permetre marcar tasques com a completades (usant `localStorage`).
2.  **Suport Offline (PWA):** Convertir la web en una Progressive Web App per a l'ús sense connexió.
3.  **Mode Fosc/Clar Dinàmic:** Afegir un botó per canviar manualment entre temes visuals.
4.  **Exportació a PDF:** Botó per generar versions impreses netes de la teoria.
