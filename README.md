# Informations

Ce projet est une API non officielle pour le site [leboncoin.fr](https://www.leboncoin.fr/). Elle permet de faire des recherches avec une complexité moyenne, je ne garantis pas que toutes les fonctionnalités du site soient disponibles.

C'est une librarie pour un projet personnel, il n'est pas sûr que je la maintienne à jour.

Je ne suis pas responsable de l'utilisation que vous en faites, je vous invite à lire les [conditions d'utilisation](https://www.leboncoin.fr/conditions-generales-d-utilisation/) du site.

-   [x] Recherche simple
-   [x] Recherche avancée
-   [ ] Recherche complexe
-   [ ] Connexion au compte (pas prévu)
-   [ ] Gestion du compte (pas prévu)
-   [ ] Messagerie (pas prévu)

# Installation

```bash
npm install leboncoin-api
```

OU

```bash
git clone https://github.com/thomasync/leboncoin-api.git
cd leboncoin-api
bun install
```

# Utilisation

```javascript
import { search, getCategories, getFeaturesFromCategory } from 'leboncoin-api';

// Récuperer toutes les catégories
const categories = getCategories();

// Faire une recherche
const results = search({});

// Récupérer toutes les features (filtres) possible pour une catégorie
const features = getFeaturesFromCategory(CATEGORY.CONSOLES);
```

# Exemples

### 1. Recherche d'appartements à Paris entre 50 000 et 100 000 euros

```javascript
import { CATEGORY, SORT_BY, SORT_ORDER, getFeaturesFromCategory, search } from 'leboncoin-api';

const typeVente = 'Appartement';
const featureVente = getFeaturesFromCategory(CATEGORY.VENTES_IMMOBILIERES).find(
	(feature) => feature.label === 'Type de bien'
);

const paramTypeVente = featureVente?.param as string;
const valueTypeVente = featureVente?.values.find((value) => value.label === typeVente)?.value;

const results = await search({
	category: CATEGORY.VENTES_IMMOBILIERES,
	sort_by: SORT_BY.PRICE,
	sort_order: SORT_ORDER.ASC,
	enums: {
		[paramTypeVente]: [valueTypeVente],
	},
	locations: ['Paris'],
	price_min: 50000,
	price_max: 100000,
});
```

### 2. Recherche de consoles Atari neuve entre 30 et 60 euros

```javascript
import { CATEGORY, SORT_BY, SORT_ORDER, search } from 'leboncoin-api';

const results = await search({
	keywords: 'Atari',
	only_title: true,
	category: CATEGORY.CONSOLES,
	sort_by: SORT_BY.TIME,
	sort_order: SORT_ORDER.DESC,
	enums: {
		item_condition: ['1'],
	},
	price_min: 30,
	price_max: 60,
});
```

# Avancé

1. Pleins d'informations sur les filtres, catégories, recherches, etc. sont disponibles dans le fichier [src/constants.ts](src/constants.ts).
2. Les test E2E sont ne sont pas exécutés avec Jest car ça déclenchait un CAPTCHA sur le site. Ils sont donc exécutés manuellement.
