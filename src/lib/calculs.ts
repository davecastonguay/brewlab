/** Formules de brassage courantes. Densités en notation 1.xxx, volumes en litres. */

export function abv(densiteInitiale: number, densiteFinale: number): number {
  return (densiteInitiale - densiteFinale) * 131.25;
}

export function attenuation(densiteInitiale: number, densiteFinale: number): number {
  return ((densiteInitiale - densiteFinale) / (densiteInitiale - 1)) * 100;
}

export function brixVersDensite(brix: number): number {
  return 1 + brix / (258.6 - (brix / 258.2) * 227.1);
}

/** Corrige une lecture de densimètre calibré à `calibrationC` prise à `temperatureC`. */
export function correctionTemperature(lecture: number, temperatureC: number, calibrationC = 20): number {
  const f = (c: number) => c * 1.8 + 32;
  const poly = (t: number) =>
    1.00130346 - 0.000134722124 * t + 0.00000204052596 * t ** 2 - 0.00000000232820948 * t ** 3;
  return lecture * (poly(f(temperatureC)) / poly(f(calibrationC)));
}

/** IBU selon Tinseth pour un ajout pendant l'ébullition. */
export function ibuTinseth(
  grammes: number,
  alphaPourcent: number,
  minutes: number,
  volumeLitres: number,
  densite: number,
): number {
  const facteurDensite = 1.65 * 0.000125 ** (densite - 1);
  const facteurTemps = (1 - Math.exp(-0.04 * minutes)) / 4.15;
  const mgParLitre = ((alphaPourcent / 100) * grammes * 1000) / volumeLitres;
  return facteurDensite * facteurTemps * mgParLitre;
}

/** CO₂ (volumes) déjà dissous selon la température maximale de fermentation. */
export function co2Residuel(temperatureC: number): number {
  const f = temperatureC * 1.8 + 32;
  return 3.0378 - 0.050062 * f + 0.00026555 * f ** 2;
}

/** Grammes de sucre de maïs (dextrose) pour atteindre `volumesCible` de CO₂. */
export function sucreAmorcage(volumeLitres: number, volumesCible: number, temperatureC: number): number {
  return Math.max(0, (volumesCible - co2Residuel(temperatureC)) * volumeLitres * 4.014);
}
