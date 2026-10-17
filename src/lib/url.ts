const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export function url(chemin: string): string {
  return `${base}/${chemin.replace(/^\//, "")}`;
}

/** "01-processus" → "processus" */
export function slugNotion(id: string): string {
  return id.replace(/^\d+-/, "");
}

export function dateFr(date: Date): string {
  return date.toLocaleDateString("fr-CA", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
