import { search, searchMultiples } from '../../src/search';
import { getFeaturesFromCategory } from '../../src/feature';
import { CATEGORY, SORT_BY, SORT_ORDER } from '../../src/types';
import { getLocationByName } from '../../src/location';

export async function test_search_1() {
	const typeVente = 'Appartement';
	const featureVente = getFeaturesFromCategory(CATEGORY.VENTES_IMMOBILIERES).find(
		(feature) => feature.label === 'Type de bien',
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

	if (results.total > 0) {
		results.ads.forEach((ad) => {
			if (ad.price[0] < 50000 || ad.price[0] > 100000) {
				throw new Error(`Invalid price: ${ad.price[0]}`);
			}

			if (ad.location.city !== 'Paris') {
				throw new Error(`Invalid location: ${ad.location.city}`);
			}
		});
		return true;
	}

	throw new Error('No results');
}

export async function test_search_2() {
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

	if (results.total > 0) {
		if (results.ads[0].subject.includes('Atari')) {
			return true;
		}
		throw new Error('Invalid result');
	}

	throw new Error('No results');
}

export async function test_search_with_offset() {
	const results_1 = await search({
		keywords: 'Chat',
		category: CATEGORY.ANIMAUX,
		sort_by: SORT_BY.TIME,
		sort_order: SORT_ORDER.DESC,
		limit: 10,
	});

	const results_2 = await search({
		keywords: 'Chat',
		category: CATEGORY.ANIMAUX,
		sort_by: SORT_BY.TIME,
		sort_order: SORT_ORDER.DESC,
		limit: 10,
		offset: 10,
	});

	const list_ids = new Set([...results_1.ads, ...results_2.ads].map((ad) => ad.list_id));
	if (list_ids.size === 20) {
		return true;
	}

	throw new Error('Invalid results');
}

export async function test_search_multiples() {
	const results = await searchMultiples(
		{
			keywords: 'Chat',
			category: CATEGORY.ANIMAUX,
			sort_by: SORT_BY.TIME,
			sort_order: SORT_ORDER.DESC,
		},
		3,
	);

	const list_ids = results.ads.map((ad) => ad.list_id);
	const hasDuplicates = new Set(list_ids).size !== list_ids.length;

	if (!hasDuplicates) {
		return true;
	}

	throw new Error('Has duplicates');
}
