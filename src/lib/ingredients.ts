/**
 * Fiches d'ingrédients pour choisir une recette. Valeurs typiques : elles varient selon le malteur,
 * la récolte et le fabricant. Toujours vérifier l'étiquette du sac ou du paquet.
 */

export type TypeMalt = "base" | "caramel" | "special" | "torrefie" | "adjuvant";

export interface Malt {
  nom: string;
  type: TypeMalt;
  /** Couleur en degrés Lovibond (°L) : [min, max]. */
  lovibond: [number, number];
  /** % maximal conseillé dans la recette. */
  maxPourcent: number;
  saveurs: string;
  styles: string;
}

export const TYPES_MALT: Record<TypeMalt, string> = {
  base: "Malts de base",
  caramel: "Caramel / cristal",
  special: "Malts spéciaux (grillés, aromatiques)",
  torrefie: "Malts torréfiés",
  adjuvant: "Adjuvants (flocons, autres)",
};

export const MALTS: Malt[] = [
  { nom: "Pilsner", type: "base", lovibond: [1.5, 2], maxPourcent: 100, saveurs: "Céréale, pain blanc, miel léger", styles: "Pilsner, lager, blonde, belges" },
  { nom: "Malt pâle (2-row / Pale)", type: "base", lovibond: [2, 3.5], maxPourcent: 100, saveurs: "Pain, neutre, propre", styles: "Pale ale, IPA, presque tout" },
  { nom: "Maris Otter", type: "base", lovibond: [3, 4], maxPourcent: 100, saveurs: "Biscuit, noisette, plus riche que le pâle", styles: "Bitter, ESB, IPA anglaise" },
  { nom: "Vienna", type: "base", lovibond: [3, 4.5], maxPourcent: 100, saveurs: "Pain grillé, légèrement doré", styles: "Lager viennoise, Märzen, pale ale" },
  { nom: "Munich", type: "base", lovibond: [6, 10], maxPourcent: 100, saveurs: "Croûte de pain, miel, malté", styles: "Bock, Märzen, ambrée, ajout de corps" },
  { nom: "Malt de blé", type: "base", lovibond: [1.5, 2.5], maxPourcent: 70, saveurs: "Pain, mousse et corps", styles: "Weizen, witbier, NEIPA" },
  { nom: "Carapils / Carafoam", type: "caramel", lovibond: [1.5, 2.5], maxPourcent: 10, saveurs: "Presque aucun goût : plus de mousse et de corps", styles: "Blonde, pilsner, pale ale" },
  { nom: "Caramel 10-20", type: "caramel", lovibond: [10, 20], maxPourcent: 15, saveurs: "Miel, caramel doux", styles: "Blonde, pale ale" },
  { nom: "Caramel 40", type: "caramel", lovibond: [35, 45], maxPourcent: 15, saveurs: "Caramel, toffee", styles: "Pale ale, IPA, ambrée" },
  { nom: "Caramel 60", type: "caramel", lovibond: [55, 65], maxPourcent: 15, saveurs: "Caramel foncé, sucre brûlé léger", styles: "Rousse, ESB, IPA ambrée" },
  { nom: "Caramel 120", type: "caramel", lovibond: [110, 130], maxPourcent: 10, saveurs: "Raisin sec, prune, caramel brûlé", styles: "Porter, scotch ale, brune" },
  { nom: "Biscuit", type: "special", lovibond: [20, 28], maxPourcent: 10, saveurs: "Biscuit, craquelin, pain grillé", styles: "Bitter, brune, ambrée belge" },
  { nom: "Aromatique", type: "special", lovibond: [18, 26], maxPourcent: 10, saveurs: "Malté intense", styles: "Dubbel, bock, ambrée" },
  { nom: "Mélanoïdine", type: "special", lovibond: [23, 30], maxPourcent: 10, saveurs: "Croûte de pain, miel, rondeur", styles: "Rousse, bock, Märzen" },
  { nom: "Malt miel (Honey)", type: "special", lovibond: [18, 25], maxPourcent: 10, saveurs: "Miel, sucré", styles: "Blonde, brune, bière au miel" },
  { nom: "Chocolat", type: "torrefie", lovibond: [350, 450], maxPourcent: 10, saveurs: "Chocolat, café", styles: "Porter, stout, brune" },
  { nom: "Orge torréfiée (Roasted barley)", type: "torrefie", lovibond: [300, 500], maxPourcent: 10, saveurs: "Café, sec, torréfié", styles: "Stout irlandais, rousse (une pincée)" },
  { nom: "Malt noir (Black patent)", type: "torrefie", lovibond: [450, 550], maxPourcent: 3, saveurs: "Brûlé, âcre en grande quantité", styles: "Pour la couleur : porter, stout" },
  { nom: "Carafa Special II (sans écale)", type: "torrefie", lovibond: [400, 450], maxPourcent: 5, saveurs: "Couleur noire, peu d'amertume", styles: "Schwarzbier, black IPA" },
  { nom: "Flocons d'avoine", type: "adjuvant", lovibond: [1, 2], maxPourcent: 25, saveurs: "Soyeux, crémeux, corps", styles: "Stout à l'avoine, NEIPA" },
  { nom: "Flocons de blé", type: "adjuvant", lovibond: [1.5, 2], maxPourcent: 40, saveurs: "Trouble, mousse, légèrement acidulé", styles: "Witbier, NEIPA" },
  { nom: "Malt acidulé", type: "adjuvant", lovibond: [2, 3], maxPourcent: 5, saveurs: "Acidité légère (baisse le pH)", styles: "Pilsner, gose" },
];

export type UsageHoublon = "amerisant" | "aromatique" | "double";

export interface Houblon {
  nom: string;
  origine: string;
  /** % d'acides alpha : [min, max]. */
  alpha: [number, number];
  usage: UsageHoublon;
  aromes: string;
  styles: string;
  substituts: string;
}

export const USAGES_HOUBLON: Record<UsageHoublon, string> = {
  amerisant: "Amérisant",
  aromatique: "Aromatique",
  double: "Double usage",
};

export const HOUBLONS: Houblon[] = [
  { nom: "Cascade", origine: "États-Unis", alpha: [4.5, 8.9], usage: "double", aromes: "Pamplemousse, floral, agrumes", styles: "Pale ale américaine, IPA", substituts: "Centennial, Amarillo" },
  { nom: "Kazbek", origine: "Tchéquie", alpha: [5, 8], usage: "double", aromes: "Citron, épicé, terreux", styles: "Pale ale, lager", substituts: "Saaz, Sládek" },
  { nom: "Centennial", origine: "États-Unis", alpha: [9.5, 11.5], usage: "double", aromes: "Agrumes, floral (un « super Cascade »)", styles: "IPA, pale ale", substituts: "Cascade, Columbus" },
  { nom: "Chinook", origine: "États-Unis", alpha: [12, 14], usage: "double", aromes: "Pin, résine, pamplemousse", styles: "IPA West Coast", substituts: "Columbus, Simcoe" },
  { nom: "Citra", origine: "États-Unis", alpha: [11, 13], usage: "aromatique", aromes: "Fruits tropicaux, lime, litchi", styles: "IPA, NEIPA, pale ale", substituts: "Mosaic, Galaxy" },
  { nom: "Mosaic", origine: "États-Unis", alpha: [11.5, 13.5], usage: "aromatique", aromes: "Bleuet, mangue, pin", styles: "IPA, NEIPA", substituts: "Citra, Simcoe" },
  { nom: "Simcoe", origine: "États-Unis", alpha: [12, 14], usage: "double", aromes: "Pin, fruit de la passion, résine", styles: "IPA, double IPA", substituts: "Mosaic, Chinook" },
  { nom: "Amarillo", origine: "États-Unis", alpha: [8, 11], usage: "aromatique", aromes: "Orange, agrumes, floral", styles: "Pale ale, IPA", substituts: "Cascade, Centennial" },
  { nom: "Columbus (CTZ)", origine: "États-Unis", alpha: [14, 18], usage: "amerisant", aromes: "Résine, épices, terreux", styles: "Amertume d'IPA, stout", substituts: "Magnum, Chinook" },
  { nom: "Magnum", origine: "Allemagne", alpha: [12, 14], usage: "amerisant", aromes: "Neutre, amertume propre", styles: "Amertume de tout style", substituts: "Columbus, Northern Brewer" },
  { nom: "Galaxy", origine: "Australie", alpha: [13, 15], usage: "aromatique", aromes: "Fruit de la passion, pêche", styles: "NEIPA, pale ale", substituts: "Citra" },
  { nom: "Nelson Sauvin", origine: "Nouvelle-Zélande", alpha: [12, 13], usage: "double", aromes: "Raisin blanc, sauvignon blanc", styles: "Pale ale, IPA", substituts: "Motueka (à peu près)" },
  { nom: "Motueka", origine: "Nouvelle-Zélande", alpha: [6.5, 7.5], usage: "aromatique", aromes: "Lime, citron, tropical", styles: "Pilsner moderne, pale ale", substituts: "Saaz + Citra" },
  { nom: "Saaz", origine: "Tchéquie", alpha: [2.5, 4.5], usage: "aromatique", aromes: "Épicé, herbacé, délicat", styles: "Pilsner, lager, belges", substituts: "Sládek, Tettnang" },
  { nom: "Hallertau Mittelfrüh", origine: "Allemagne", alpha: [3, 5.5], usage: "aromatique", aromes: "Floral, épicé, doux", styles: "Lager, Weizen, Kölsch", substituts: "Tettnang, Liberty" },
  { nom: "East Kent Goldings", origine: "Angleterre", alpha: [4, 6.5], usage: "aromatique", aromes: "Miel, terreux, lavande", styles: "Bitter, ESB, porter", substituts: "Fuggle, Styrian Golding" },
  { nom: "Fuggle", origine: "Angleterre", alpha: [3.5, 5.5], usage: "aromatique", aromes: "Boisé, terreux, menthe", styles: "Bitter, porter, stout", substituts: "Willamette, EKG" },
  { nom: "Willamette", origine: "États-Unis", alpha: [4, 6], usage: "aromatique", aromes: "Fruité, floral, épicé doux", styles: "Porter, brune, pale ale", substituts: "Fuggle" },
  { nom: "Northern Brewer", origine: "Allemagne / R.-U.", alpha: [7, 10], usage: "double", aromes: "Menthe, pin, boisé", styles: "California common, porter", substituts: "Magnum, Perle" },
];

export interface Levure {
  nom: string;
  exemples: string;
  /** Atténuation apparente (%) : [min, max]. */
  attenuation: [number, number];
  /** Température de fermentation (°C) : [min, max]. */
  temperature: [number, number];
  floculation: "faible" | "moyenne" | "élevée";
  profil: string;
  styles: string;
}

export const LEVURES: Levure[] = [
  { nom: "Ale américaine (Chico)", exemples: "SafAle US-05, Escarpment Cali Ale", attenuation: [76, 82], temperature: [18, 22], floculation: "moyenne", profil: "Très propre, laisse parler le houblon", styles: "Pale ale, IPA, blonde, stout" },
  { nom: "Ale anglaise", exemples: "SafAle S-04, Lallemand Windsor", attenuation: [68, 76], temperature: [16, 21], floculation: "élevée", profil: "Fruité léger, bière claire rapidement, plus de corps", styles: "Bitter, ESB, porter, stout" },
  { nom: "Nottingham", exemples: "Lallemand Nottingham", attenuation: [75, 82], temperature: [14, 21], floculation: "élevée", profil: "Neutre, polyvalente, robuste", styles: "Pale ale, ambrée, stout" },
  { nom: "Ale « juicy » (Vermont)", exemples: "Lallemand Verdant IPA, Escarpment Vermont Ale", attenuation: [73, 80], temperature: [18, 22], floculation: "moyenne", profil: "Pêche, abricot, rondeur", styles: "NEIPA, pale ale moderne" },
  { nom: "Kveik", exemples: "Lallemand Voss, Escarpment Hornindal", attenuation: [75, 82], temperature: [25, 37], floculation: "élevée", profil: "Orange, fruits tropicaux ; propre même à chaud", styles: "IPA, pale ale, farmhouse. Parfaite sans contrôle de température" },
  { nom: "Lager", exemples: "SafLager W-34/70, Lallemand Diamond", attenuation: [80, 84], temperature: [10, 15], floculation: "élevée", profil: "Propre, croquant ; demande du froid et du temps", styles: "Pilsner, Helles, Märzen" },
  { nom: "Weizen (blé allemande)", exemples: "SafAle WB-06, Lallemand Munich Classic", attenuation: [76, 86], temperature: [17, 22], floculation: "faible", profil: "Banane, clou de girofle", styles: "Weizen, Dunkelweizen" },
  { nom: "Belge (abbaye)", exemples: "SafAle BE-256, Lallemand Abbaye", attenuation: [78, 86], temperature: [17, 24], floculation: "élevée", profil: "Fruits mûrs, épices", styles: "Dubbel, tripel, blonde belge" },
  { nom: "Saison", exemples: "Lallemand Belle Saison, SafAle BE-134", attenuation: [86, 94], temperature: [18, 30], floculation: "faible", profil: "Poivré, fruité, très sec", styles: "Saison, farmhouse" },
];

export interface Style {
  nom: string;
  di: [number, number];
  ibu: [number, number];
  /** Couleur en SRM : [min, max]. */
  srm: [number, number];
  abv: [number, number];
  malts: string;
  houblons: string;
  levure: string;
  difficulte: 1 | 2 | 3;
  note: string;
}

/** Repères inspirés des lignes directrices BJCP, arrondis. */
export const STYLES: Style[] = [
  { nom: "Blonde", di: [1.038, 1.054], ibu: [15, 28], srm: [3, 6], abv: [3.8, 5.5], malts: "Pâle ou pilsner, un peu de Carapils ou Caramel 10", houblons: "Cascade, Hallertau, Willamette", levure: "Ale américaine", difficulte: 1, note: "Simple et accessible ; les défauts paraissent plus." },
  { nom: "Pale ale américaine", di: [1.045, 1.06], ibu: [30, 50], srm: [5, 10], abv: [4.5, 6.2], malts: "Pâle, Munich, 5 % Caramel 40", houblons: "Cascade, Centennial, Amarillo", levure: "Ale américaine", difficulte: 1, note: "Le prochain pas logique après le brassin du cours." },
  { nom: "IPA américaine", di: [1.056, 1.07], ibu: [40, 70], srm: [6, 14], abv: [5.5, 7.5], malts: "Pâle, un peu de Munich ou Caramel 40", houblons: "Columbus, Simcoe, Citra, Chinook", levure: "Ale américaine", difficulte: 2, note: "Beaucoup de houblon, souvent un dry hop." },
  { nom: "NEIPA (IPA trouble)", di: [1.06, 1.085], ibu: [25, 60], srm: [3, 7], abv: [6, 9], malts: "Pâle, 10-20 % flocons d'avoine et de blé", houblons: "Citra, Mosaic, Galaxy (whirlpool + dry hop)", levure: "Vermont ou kveik", difficulte: 3, note: "Sensible à l'oxygène : transferts délicats." },
  { nom: "Bitter / ESB anglaise", di: [1.04, 1.06], ibu: [25, 50], srm: [8, 18], abv: [3.8, 6.2], malts: "Maris Otter, Caramel 60, Biscuit", houblons: "East Kent Goldings, Fuggle", levure: "Ale anglaise", difficulte: 1, note: "Malté et équilibré, se boit jeune." },
  { nom: "Rousse irlandaise", di: [1.036, 1.046], ibu: [18, 28], srm: [9, 14], abv: [3.8, 5], malts: "Pâle, Caramel 60, 2 % orge torréfiée", houblons: "East Kent Goldings, Fuggle", levure: "Ale anglaise ou américaine", difficulte: 1, note: "Facile ; la pincée d'orge torréfiée donne la couleur rouge." },
  { nom: "Porter", di: [1.048, 1.065], ibu: [25, 50], srm: [20, 30], abv: [4.8, 6.5], malts: "Maris Otter, Caramel 120, Chocolat", houblons: "Fuggle, Willamette, EKG", levure: "Ale anglaise", difficulte: 1, note: "Chocolat et caramel, pardonne bien." },
  { nom: "Stout sec irlandais", di: [1.036, 1.044], ibu: [25, 45], srm: [25, 40], abv: [4, 4.5], malts: "Pâle, 10 % orge torréfiée, flocons d'orge ou d'avoine", houblons: "East Kent Goldings, Magnum", levure: "Ale anglaise", difficulte: 1, note: "Léger en alcool, très torréfié." },
  { nom: "Weizen (blé allemande)", di: [1.044, 1.052], ibu: [8, 15], srm: [2, 6], abv: [4.3, 5.6], malts: "50-70 % malt de blé, pilsner", houblons: "Hallertau, Tettnang", levure: "Weizen", difficulte: 2, note: "La température de fermentation règle banane ou girofle." },
  { nom: "Saison", di: [1.048, 1.065], ibu: [20, 35], srm: [5, 14], abv: [5, 7], malts: "Pilsner, un peu de blé ou Munich", houblons: "Saaz, EKG, Styrian Golding", levure: "Saison", difficulte: 2, note: "Aime la chaleur : idéale l'été." },
  { nom: "Pilsner", di: [1.044, 1.05], ibu: [22, 40], srm: [2, 5], abv: [4.2, 5.4], malts: "100 % pilsner", houblons: "Saaz, Hallertau", levure: "Lager", difficulte: 3, note: "Demande 10-15 °C pendant des semaines (frigo de fermentation)." },
];

/** Lovibond → SRM (formule de Morey simplifiée pour un grain). */
export const lovibondVersSrm = (l: number) => Math.max(1, 1.3546 * l - 0.76);
/** SRM → EBC. */
export const srmVersEbc = (srm: number) => srm * 1.97;

/** Couleur approximative de la bière pour un SRM donné. */
export function couleurSrm(srm: number): string {
  const paliers: [number, string][] = [
    [1, "#FFE699"], [2, "#FFD878"], [3, "#FFCA5A"], [4, "#FFBF42"], [6, "#F8A600"], [8, "#EA8F00"],
    [10, "#DE7C00"], [13, "#CB6200"], [17, "#B54C00"], [20, "#9B3812"], [25, "#7A2A10"], [30, "#5D1A0C"],
    [35, "#3F1108"], [40, "#2B0A06"],
  ];
  for (const [max, hex] of paliers) if (srm <= max) return hex;
  return "#1A0604";
}

/** Plage de valeurs en notation française. */
export function plage([min, max]: [number, number], decimales = 0): string {
  const f = (n: number) => n.toLocaleString("fr-CA", { minimumFractionDigits: decimales, maximumFractionDigits: decimales });
  return min === max ? f(min) : `${f(min)}–${f(max)}`;
}
