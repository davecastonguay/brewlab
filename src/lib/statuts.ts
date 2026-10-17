import type { CollectionEntry } from "astro:content";

type Statut = CollectionEntry<"batches">["data"]["statut"];

export const STATUTS: Record<Statut, { label: string; classe: string }> = {
  planifie: { label: "Planifié", classe: "" },
  fermentation: { label: "En fermentation", classe: "" },
  embouteille: { label: "Embouteillé", classe: "" },
  termine: { label: "Terminé", classe: "vert" },
};
