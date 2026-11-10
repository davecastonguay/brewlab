/**
 * Idées pour les prochaines recettes : des bières commerciales très bien notées, par style,
 * et une piste pour en brasser une semblable. Ce ne sont pas des recettes : juste de quoi choisir.
 * Pour mettre à jour : modifier cette liste et la date `MIS_A_JOUR`. Les notes changent avec le temps.
 */

export const MIS_A_JOUR = "novembre 2026";

export interface Idee {
  style: string;
  biere: string;
  brasserie: string;
  lieu: string;
  /** % d'alcool, si connu. */
  abv?: number;
  pourquoi: string;
  /** Piste de recette : malts, houblons, levure, en une ou deux phrases. */
  piste: string;
  /** Lien vers la source qui appuie la note ou le classement. */
  source: string;
  coupDeCoeur?: boolean;
}

export const IDEES: Idee[] = [
  {
    style: "Pale ale",
    biere: "Edward",
    brasserie: "Hill Farmstead",
    lieu: "Vermont",
    abv: 5.2,
    pourquoi:
      "La pale ale américaine la mieux notée sur Untappd (n° 1 en 2022). Pas forte, mais pleine d'arômes : exactement le genre de bière visé.",
    piste:
      "Malt pâle avec un peu de Munich, DI ~1,050. Peu de houblon au début, beaucoup en whirlpool et en dry hop. Les clones amateurs utilisent Centennial, Chinook, Columbus et Simcoe. Levure ale américaine.",
    source: "https://untappd.com/blog/the-15-best-american-pale-ales-of-2022/1461",
    coupDeCoeur: true,
  },
  {
    style: "IPA",
    biere: "Moralité",
    brasserie: "Dieu du Ciel!",
    lieu: "Montréal",
    abv: 6.9,
    pourquoi: "Un classique québécois parmi les mieux notés de la province sur BeerAdvocate (~4,26/5). Amère, très houblonnée, mais bien équilibrée.",
    piste: "Malt pâle avec 5 % de Caramel 40, DI ~1,062, 50-60 IBU. Gros whirlpool et dry hop d'agrumes et de fruits tropicaux. Levure ale américaine.",
    source: "https://www.beeradvocate.com/beer/top-rated/ca/qc/",
  },
  {
    style: "Session IPA / table beer",
    biere: "Table Beer",
    brasserie: "The Kernel",
    lieu: "Londres",
    abv: 3,
    pourquoi: "Environ 3 %, mais pensée pour ne pas goûter l'eau : de l'avoine pour le corps, et beaucoup de houblon. Proche de All Day IPA de Founders (4,7 %).",
    piste: "DI ~1,035-1,040 avec 10-15 % de flocons d'avoine. Empâter haut (68-69 °C) pour garder du corps. Peu d'amertume, gros houblonnage tardif.",
    source: "https://store.thekernelbrewery.com/products/table-beer-330ml",
  },
  {
    style: "Pilsner",
    biere: "Diplom Pils",
    brasserie: "Waldhaus",
    lieu: "Allemagne",
    pourquoi: "Nommée meilleure pilsner au monde aux World Beer Awards (2009), puis meilleure pilsner classique en 2020 et 2025.",
    piste: "100 % malt pilsner, Hallertau ou Saaz, levure lager à 10-12 °C. Demande un frigo de fermentation et de la patience.",
    source: "https://www.waldhaus-bier.de/en/beer-specialties/diplom-pils/",
  },
  {
    style: "Saison",
    biere: "Saison Dupont",
    brasserie: "Brasserie Dupont",
    lieu: "Belgique",
    abv: 6.5,
    pourquoi: "La référence mondiale du style, souvent classée meilleure saison au monde. Sèche, poivrée, très pétillante.",
    piste: "Malt pilsner avec un peu de blé, Saaz ou East Kent Goldings, levure saison. Elle aime la chaleur : parfaite sans contrôle de température.",
    source: "https://vinepair.com/buy-this-booze/6-best-american-saisons-saison-dupont/",
  },
  {
    style: "Stout sec",
    biere: "Dry Stout",
    brasserie: "The Kernel",
    lieu: "Londres",
    pourquoi: "En 2026, les stouts secs de The Kernel occupent une grande partie du haut du classement Untappd du style, devant Guinness.",
    piste: "Malt pâle, 10 % d'orge torréfiée et des flocons d'avoine, DI ~1,042 (environ 4,2 %). East Kent Goldings, levure ale anglaise.",
    source: "https://www.thedrinksbusiness.com/2026/02/guinness-isnt-the-highest-rated-stout-anymore/",
  },
];
