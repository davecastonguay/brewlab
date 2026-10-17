import type { CollectionEntry } from "astro:content";

export type Phase = "preparation" | "empatage" | "ebullition" | "refroidissement" | "plus-tard";

export const PHASES: Record<Phase, string> = {
  preparation: "Préparation",
  empatage: "Empâtage",
  ebullition: "Ébullition et houblons",
  refroidissement: "Refroidissement et levure",
  "plus-tard": "Les jours suivants",
};

export interface Alerte {
  /** Minutes restantes au minuteur quand l'alerte doit sonner. */
  aRestant: number;
  message: string;
}

export interface Etape {
  id: string;
  phase: Phase;
  titre: string;
  details: string[];
  minutes?: number;
  alertes?: Alerte[];
  aConfirmer?: boolean;
  important?: boolean;
}

type Recette = CollectionEntry<"recettes">["data"];
type Houblon = Recette["houblons"][number];

const kg = (g: number) => (g >= 1000 ? `${(g / 1000).toLocaleString("fr-CA")} kg` : `${g} g`);

function momentCourt(h: Houblon): string {
  switch (h.usage) {
    case "ebullition":
      return `ébullition, ${h.temps} min`;
    case "whirlpool":
      return `whirlpool ${h.temperature ?? 80} °C`;
    case "dryhop":
      return `dry hop, ${h.temps} jours`;
    default: {
      const jamais: never = h.usage;
      return jamais;
    }
  }
}

function rolePalier(temperature: number): string {
  if (temperature < 58) return "Repos protéique : améliore la mousse et la clarté.";
  if (temperature < 66) return "La bêta-amylase fait des sucres très fermentables → bière plus sèche.";
  if (temperature < 72) return "L'alpha-amylase fait des sucres plus longs → plus de corps.";
  return "Arrête les enzymes et rend le moût plus liquide pour l'égouttage.";
}

export function etapesPourRecette(r: Recette): Etape[] {
  const grainTotal = r.malts.reduce((s, m) => s + m.grammes, 0);
  const premierPalier = r.paliers[0];
  const ebullition = r.houblons.filter((h) => h.usage === "ebullition").sort((a, b) => b.temps - a.temps);
  const whirlpool = r.houblons.filter((h) => h.usage === "whirlpool");
  const dryhop = r.houblons.filter((h) => h.usage === "dryhop");
  const ajoutsEnCours = [
    ...ebullition
      .filter((h) => h.temps < r.ebullitionMinutes)
      .map((h) => ({ aRestant: h.temps, texte: `${h.grammes} g de ${h.nom}` })),
    ...r.autres.map((a) => ({ aRestant: a.minutesAvantFin, texte: `${a.quantite} de ${a.nom} (${a.role})` })),
  ];
  const programme = [
    ...r.paliers.map((p) => `${p.temperature} °C / ${p.minutes} min`),
    `ébullition ${r.ebullitionMinutes} min`,
  ].join(" → ");

  const etapes: Etape[] = [
    {
      id: "eau-veille",
      phase: "preparation",
      titre: `Préparer ${r.eau?.litresDepart ?? 25} L d'eau, idéalement 24 h d'avance`,
      details: ["Laisser l'eau reposer à découvert : le chlore s'évapore."],
    },
    {
      id: "desinfectant",
      phase: "preparation",
      titre: "Préparer le désinfectant Bioxy en vaporisateur",
      details: ["Ratio 2 ml par litre : 1 ml de Bioxy dans 500 ml d'eau.", "Temps de contact : environ 5 min."],
    },
    {
      id: "peser",
      phase: "preparation",
      titre: "Peser les ingrédients",
      details: [
        ...r.malts.map((m) => `${kg(m.grammes)} — ${m.nom}`),
        ...r.houblons.map((h) => `${h.grammes} g — houblon ${h.nom} (${momentCourt(h)})`),
        ...r.autres.map((a) => `${a.quantite} — ${a.nom}`),
        `${r.levure.quantite} — ${r.levure.nom}`,
        "Laisser les houblons au congélateur jusqu'au moment de les utiliser.",
      ],
    },
    {
      id: "concasser",
      phase: "preparation",
      titre: `Concasser le grain (${kg(grainTotal)})`,
      details: ["Casser le grain sans le réduire en farine : l'écorce sert de filtre."],
    },
    {
      id: "programmer",
      phase: "empatage",
      titre: "Programmer le Vevor",
      details: [programme],
    },
    {
      id: "installer",
      phase: "empatage",
      titre: "Installer le tuyau au fond, puis le filtre et le panier",
      details: [
        "Mettre le tuyau (pipe) au fond de la cuve.",
        "Ne pas mettre le petit filtre « bazooka » : seulement pour du houblon en fleurs (cônes entiers).",
        `Remplir avec ${r.eau?.litresDepart ?? 25} L d'eau.`,
      ],
      important: true,
    },
    {
      id: "chauffer",
      phase: "empatage",
      titre: `Chauffer à ${premierPalier?.temperature ?? 66} °C (premier palier)`,
      details: ["Lancer le programme ; il chauffe tout seul."],
    },
    {
      id: "ajouter-grain",
      phase: "empatage",
      titre: "Ajouter le malt et brasser doucement",
      details: ["Verser le grain lentement en brassant pour éviter les grumeaux."],
    },
    ...r.paliers.map(
      (p, i): Etape => ({
        id: `palier-${i}`,
        phase: "empatage",
        titre: `${p.nom} : ${p.temperature} °C pendant ${p.minutes} min`,
        details: [
          rolePalier(p.temperature),
          ...(i > 0 && i < r.paliers.length - 1 ? ["Brasser encore doucement de temps en temps."] : []),
          ...(i === r.paliers.length - 2
            ? ["À la fin : test d'iode. S'il vire au noir, il reste de l'amidon → prolonger un peu."]
            : []),
        ],
        minutes: p.minutes,
        aConfirmer: p.aConfirmer,
      }),
    ),
    {
      id: "egoutter",
      phase: "empatage",
      titre: `Arrêter la pompe, monter le panier, égoutter${
        r.eau?.litresAvantEbullition ? ` jusqu'à ${r.eau.litresAvantEbullition} L` : ""
      }`,
      details: [
        "Lever le panier sur son support et le laisser s'égoutter.",
        "Presser le grain doucement pour récupérer le moût.",
        "Rincer avec un peu d'eau chaude (sparge) si on manque de volume.",
      ],
    },
    {
      id: "ebullition",
      phase: "ebullition",
      titre: `Ébullition : ${r.ebullitionMinutes} min, pompe arrêtée`,
      details: [
        "Monter à 100 °C. Partir le minuteur quand ça bout vraiment.",
        "Quand ça bout : réduire la puissance à 1300 W pour bouillir moins fort.",
        "Double-clic sur « auto » pour continuer l'ébullition. Quand l'indicateur de température clignote → « next ».",
        ...ebullition
          .filter((h) => h.temps >= r.ebullitionMinutes)
          .map((h) => `Au début : ${h.grammes} g de ${h.nom} (amertume)`),
        ...ajoutsEnCours
          .sort((a, b) => b.aRestant - a.aRestant)
          .map((a) => `À ${a.aRestant} min de la fin : ${a.texte}`),
      ],
      minutes: r.ebullitionMinutes,
      alertes: [
        ...[...new Set(ajoutsEnCours.map((a) => a.aRestant))].map((min) => ({
          aRestant: min,
          message: `Ajouter ${ajoutsEnCours
            .filter((a) => a.aRestant === min)
            .map((a) => a.texte)
            .join(" + ")}`,
        })),
        {
          aRestant: 15,
          message: "Vaporiser le refroidisseur et le fermenteur au Bioxy, assembler le refroidisseur",
        },
        { aRestant: 5, message: "Mettre le refroidisseur dans le Vevor (il se désinfecte dans le moût bouillant)" },
      ],
      important: true,
    },
    {
      id: "refroidir",
      phase: "refroidissement",
      titre: "Couper le chauffage et partir l'eau froide dans le refroidisseur",
      details: ["Brasser de temps en temps pour refroidir plus vite."],
    },
  ];

  if (whirlpool.length > 0) {
    const temp = whirlpool[0].temperature ?? 80;
    const repos = Math.max(...whirlpool.map((h) => h.temps));
    etapes.push({
      id: "whirlpool",
      phase: "refroidissement",
      titre: `Whirlpool à ${temp}-${temp + 5} °C`,
      details: [
        ...whirlpool.map((h) => `${h.grammes} g de ${h.nom}`),
        "Brasser en rond. C'est là que l'arôme se fait, sans amertume.",
        repos > 0 ? `Laisser reposer ${repos} min avant de continuer à refroidir.` : "Continuer à refroidir.",
      ],
      minutes: repos > 0 ? repos : undefined,
    });
  }

  etapes.push(
    {
      id: "refroidir-fin",
      phase: "refroidissement",
      titre: "Refroidir jusqu'à environ 25 °C",
      details: ["Le plus vite possible : moins de risque de contamination."],
    },
    {
      id: "retirer-refroidisseur",
      phase: "refroidissement",
      titre: "Retirer et laver le refroidisseur",
      details: ["Enlever le tuyau d'entrée d'eau, sortir le refroidisseur, le laver tout de suite."],
    },
    {
      id: "transvider",
      phase: "refroidissement",
      titre: "Désinfecter le robinet du Vevor et transvider dans le fermenteur",
      details: [
        "Vaporiser le robinet (nozzle) au Bioxy.",
        "Transvider tout le moût. Quand le filtre est plein de dépôt, le vider dans le compost.",
        `Volume visé : ~${r.volumeLitres} L.`,
      ],
    },
    {
      id: "densite-initiale",
      phase: "refroidissement",
      titre: "Mesurer la densité initiale (DI)",
      details: [
        r.cibles.densiteInitiale
          ? `Visée : ${r.cibles.densiteInitiale.toFixed(3).replace(".", ",")}`
          : "Noter la valeur.",
        "La noter dans le journal du brassin !",
      ],
    },
    {
      id: "levure",
      phase: "refroidissement",
      titre: `Ajouter la levure (${r.levure.quantite})`,
      details: [r.levure.nom, "Seulement quand le moût est sous 25 °C."],
      aConfirmer: r.levure.aConfirmer,
    },
    {
      id: "fermer",
      phase: "refroidissement",
      titre: "Couvercle et barboteur",
      details: ["Fermer le couvercle. Préparer la soupape de fermentation (barboteur) avec un peu de Bioxy et l'installer."],
    },
    {
      id: "nettoyer-fin",
      phase: "refroidissement",
      titre: "Laver le Vevor tout de suite",
      details: [
        "Savon à vaisselle, comme un chaudron : cuve, pompe, tuyau et valve.",
        "Bien rincer. PBW pour les dépôts tenaces.",
      ],
    },
    {
      id: "fermentation",
      phase: "plus-tard",
      titre: `Fermenteur : ${r.calendrier.primaireJours} jours à partir du lendemain`,
      details: [
        `Température : ${r.levure.temperature}.`,
        "Jours 1-3 : ça bulle beaucoup. Garder à l'abri de la lumière.",
      ],
    },
  );

  if (r.calendrier.secondaireJours > 0) {
    etapes.push({
      id: "tourie",
      phase: "plus-tard",
      titre: `Siphonner dans la tourie : ${r.calendrier.secondaireJours} jours à partir du lendemain`,
      details: [
        "Tourie, siphon et tuyau désinfectés. Laisser le dépôt de levure au fond du fermenteur.",
        "Plus flexible : on peut attendre jusqu'à 2-3 semaines.",
      ],
    });
  }

  if (dryhop.length > 0) {
    etapes.push({
      id: "dryhop",
      phase: "plus-tard",
      titre: "Dry hop",
      details: dryhop.map((h) => `${h.grammes} g de ${h.nom}, ${h.temps} jours avant l'embouteillage`),
    });
  }

  etapes.push({
    id: "embouteiller",
    phase: "plus-tard",
    titre: "Embouteiller",
    details: [
      "Mesurer la densité finale (DF) et la noter.",
      "Laver les bouteilles et les désinfecter (bain d'eau javellisée, bien rincer).",
      "2 ml de sucre de maïs par bouteille (ou voir le calculateur dans Outils), puis capsuler.",
      "2 semaines à la température de la pièce, puis au frigo. Santé !",
    ],
  });

  return etapes;
}
