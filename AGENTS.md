# BrewLab

Carnet de brassage personnel, en français (Québec). Site statique Astro, publié sur GitHub Pages (`base: /brewlab`).

## Ajouter du contenu

- **Nouveau brassin** : `src/content/batches/NNN-nom-court.md` (numéro sur 3 chiffres). Copier le frontmatter de `001-cours.md`. `recette` = nom du fichier de la recette sans `.md`. Photos dans `src/assets/photos/<nom-du-brassin>/` en JPEG (convertir les HEIC d'iPhone), sans visages : le site est public.
- **Nouvelle recette** : `src/content/recettes/nom-court.md`. Le schéma est dans `src/content.config.ts`. Les étapes du jour de brassage sont générées automatiquement à partir des malts, paliers et houblons (`src/lib/etapes.ts`).
- **Nouvelle notion** : `src/content/notions/NN-sujet.md`. Structure : `## L'essentiel` puis `## Pour aller plus loin`.
- Une valeur incertaine ou à vérifier : `aConfirmer: true` (affiche un badge « à confirmer »).

## Vérifier

`npm run build` (inclut `astro check`). `npm run dev` pour voir le site sur http://localhost:4321/brewlab/.
