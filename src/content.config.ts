import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const notions = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/notions" }),
  schema: z.object({
    titre: z.string(),
    resume: z.string(),
    ordre: z.number(),
  }),
});

const malt = z.object({
  nom: z.string(),
  grammes: z.number(),
  aConfirmer: z.boolean().default(false),
});

const houblon = z.object({
  nom: z.string(),
  grammes: z.number(),
  usage: z.enum(["ebullition", "whirlpool", "dryhop"]),
  /**
   * Ébullition : minutes avant la fin. Whirlpool : minutes de repos (0 = ajouté pendant le refroidissement).
   * Dry hop : jours avant l'embouteillage.
   */
  temps: z.number(),
  temperature: z.number().optional(),
  alpha: z.number().optional(),
});

const palier = z.object({
  nom: z.string(),
  temperature: z.number(),
  minutes: z.number(),
  aConfirmer: z.boolean().default(false),
});

const recettes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/recettes" }),
  schema: z.object({
    titre: z.string(),
    style: z.string(),
    resume: z.string(),
    volumeLitres: z.number(),
    ebullitionMinutes: z.number().default(60),
    malts: z.array(malt),
    houblons: z.array(houblon),
    /** Ajouts pendant l'ébullition autres que le houblon (clarifiant, épices…). */
    autres: z
      .array(z.object({ nom: z.string(), quantite: z.string(), minutesAvantFin: z.number(), role: z.string() }))
      .default([]),
    paliers: z.array(palier),
    eau: z
      .object({
        litresDepart: z.number(),
        litresAvantEbullition: z.number().optional(),
      })
      .optional(),
    levure: z.object({
      nom: z.string(),
      quantite: z.string().default("1 paquet"),
      temperature: z.string(),
      aConfirmer: z.boolean().default(false),
    }),
    /** Jours en fermenteur primaire, puis en tourie (secondaire), avant l'embouteillage. */
    calendrier: z
      .object({ primaireJours: z.number(), secondaireJours: z.number().default(0) })
      .default({ primaireJours: 14, secondaireJours: 0 }),
    cibles: z
      .object({
        densiteInitiale: z.number().optional(),
        densiteFinale: z.number().optional(),
        ibu: z.number().optional(),
      })
      .default({}),
  }),
});

const batches = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/batches" }),
  schema: ({ image }) =>
    z.object({
      numero: z.number(),
      titre: z.string(),
      date: z.coerce.date(),
      recette: z.string(),
      lieu: z.string().optional(),
      brasseurs: z.array(z.string()).default([]),
      statut: z.enum(["planifie", "fermentation", "embouteille", "termine"]),
      prochaineEtape: z.object({ date: z.coerce.date(), texte: z.string() }).optional(),
      mesures: z
        .object({
          densiteInitiale: z.number().optional(),
          densiteFinale: z.number().optional(),
          volumeLitres: z.number().optional(),
        })
        .default({}),
      photos: z.array(z.object({ src: image(), legende: z.string() })).default([]),
    }),
});

export const collections = { notions, recettes, batches };
