# Aula Digital · IES Ramon Llull

Aquest projecte és una plataforma web per gestionar i visualitzar materials didàctics, apunts i tasques de diverses assignatures de l'IES Ramon Llull.

## Arquitectura del Projecte

- **Frontend:** HTML5, CSS3 (Bootstrap 5) i JavaScript (Vanilla).
- **Dades:** Les assignatures i els seus materials es gestionen mitjançant un fitxer centralitzat `subjects.json`.
- **Estil:** Disseny modern "Light Mode" basat en *glassmorphism* (efecte vidre) i gradients suaus.
- **Navegació:** SPA-like parcial amb suport per a subcarpetes profundes i sistema de **Breadcrumbs** (Fil d'Ariadna) dinàmic.

## Millores Realitzades (Març 2026)

- **Interfície Clara:** Transformació completa del disseny de mode fosc a mode clar per a una millor llegibilitat.
- **Cercador Global Intel·ligent:** Ara el cercador troba no només assignatures, sinó també temes i materials concrets dins del JSON.
- **Sistema de Breadcrumbs:** Navegació jeràrquica automàtica (`Inici > Assignatura > Tema`) per facilitar el retorn.
- **Robustesa de Càrrega:** El JavaScript ara detecta automàticament la ruta del `subjects.json` des de qualsevol subcarpeta.

## Convencions i Estàndards

- **Idioma:** La interfície i el contingut han d'estar en català.
- **Responsivitat:** Ús de classes de Bootstrap 5.
- **Dades:** Totes les actualitzacions de contingut s'han de fer al fitxer `subjects.json`. Els nous fitxers HTML han d'incloure el contenidor `<ul id="breadcrumbContainer" class="app-breadcrumb"></ul>`.

## Full de Ruta (Properes Millores)

1.  **Botó de Copiar Codi:** Afegir funcionalitat de "copiar al portapapers" per als blocs de codi (`<pre><code>`).
2.  **Checklist d'Estudiant:** Permetre marcar tasques com a completades (usant `localStorage`).
3.  **Optimització de JSON:** Eliminar les rutes fixes (`subjectMaterialsPages`) al JavaScript i fer que tot depengui del JSON.
4.  **Millora de l'Empty State:** Afegir suggeriments de cerca quan no es troben resultats.
