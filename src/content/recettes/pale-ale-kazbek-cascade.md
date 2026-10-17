---
titre: Pale Ale Kazbek & Cascade
style: Pale Ale
resume: La recette brassée au cours. Base de malt pâle et Munich, houblons Kazbek (épicé, citronné) et Cascade (agrumes, floral).
volumeLitres: 20
ebullitionMinutes: 60
eau:
  litresDepart: 25
  litresAvantEbullition: 23
malts:
  - nom: Malt pâle (Pale)
    grammes: 3500
  - nom: Munich
    grammes: 500
houblons:
  - nom: Kazbek
    grammes: 25
    usage: ebullition
    temps: 60
    alpha: 5
  - nom: Kazbek
    grammes: 25
    usage: ebullition
    temps: 15
    alpha: 5
  - nom: Cascade
    grammes: 25
    usage: whirlpool
    temps: 0
    temperature: 70
    alpha: 7
  - nom: Kazbek
    grammes: 25
    usage: whirlpool
    temps: 0
    temperature: 70
    alpha: 5
autres:
  - nom: Whirlfloc
    quantite: ½ comprimé
    minutesAvantFin: 15
    role: clarifie la bière
paliers:
  - nom: Palier protéique
    temperature: 53
    minutes: 15
  - nom: Saccharification (bêta-amylase)
    temperature: 64
    minutes: 30
  - nom: Saccharification (alpha-amylase)
    temperature: 68
    minutes: 30
  - nom: Mash-out
    temperature: 75
    minutes: 15
levure:
  nom: Levure ale (souche à confirmer)
  quantite: 1 paquet
  temperature: 16 °C et plus
  aConfirmer: true
calendrier:
  primaireJours: 7
  secondaireJours: 7
cibles:
  densiteInitiale: 1.043
---

Recette du cours du 17 octobre 2026, notée sur le papier brun et dans les notes de cours.

## Pourquoi ces ingrédients

- **Malt pâle** : la base. Il fournit presque tout le sucre, donc l'alcool, et un goût de pain léger.
- **Munich** : un autre malt de base, un peu plus grillé, qui ajoute du corps et une note de croûte de pain, de miel.
- **Kazbek au début** : bouilli 60 min, il donne surtout l'**amertume**.
- **Kazbek à 15 min** : le « kick » de **saveur**, avec un peu d'amertume.
- **Cascade + Kazbek à 70 °C** : ajoutés pendant le refroidissement (whirlpool), ils donnent l'**arôme** (agrumes, pamplemousse, épices) sans amertume.
- **Whirlfloc** : un comprimé d'algues (mousse d'Irlande) qui aide les protéines à tomber au fond, pour une bière plus claire.

## Le calcul d'amertume du cours

> 5 % d'acides alpha × 30 % d'utilisation × 25 g × 1000 ÷ 19 L ≈ **20 IBU** pour l'ajout de 60 min
>
> L'exemple du cours, avec un houblon à 8 % : 8 % × 30 % × 25 g × 1000 ÷ 19 L ≈ **31 IBU**

Le 30 % d'« utilisation » varie : il est plus élevé si le houblon bout longtemps, et plus bas si la densité est forte.

## Les volumes

- 25 L d'eau au départ.
- On égoutte et on presse le panier jusqu'à **23 L** avant l'ébullition.
- Environ 20 L au fermenteur, après l'évaporation et le dépôt laissé dans la cuve.

## À confirmer

- La souche de levure utilisée au cours (1 paquet).
- Le % d'acides alpha du Cascade (7 % est une moyenne typique).
