import { HEADERS } from './constants';
import { getLocationByCode, getLocationByName } from './location';
import {
	OWNER_TYPE,
	Result,
	Location,
	SORT_BY,
	SORT_ORDER,
	Search,
	SearchFilters,
	SearchResult,
	SimilarResult,
	ResultMultiples,
} from './types';

export async function searchMultiples(
	search_filters_input: Omit<Search, 'offset'>,
	cycles = 1,
	delay = 0,
	callback?: (search_results: SearchResult) => void,
): Promise<ResultMultiples> {
	const ads: Result<undefined>[] = [];
	let last_pivot = '';

	for (let i = 0; i < cycles; i++) {
		const search_results = await search({
			...search_filters_input,
			pivot: last_pivot,
		});

		if (search_results.ads.length === 0 || !search_results.pivot || search_results.pivot === last_pivot) {
			break;
		}

		last_pivot = search_results.pivot;
		ads.push(...search_results.ads);

		if (callback) {
			callback(search_results);
		}

		if (delay > 0) {
			await new Promise((resolve) => setTimeout(resolve, delay));
		}
	}

	return {
		ads: ads,
		total: ads.length,
		pivot: last_pivot,
	};
}

export async function search(search_filters_input: Search): Promise<SearchResult> {
	const search = await fetch('https://api.leboncoin.fr/finder/search', {
		method: 'POST',
		headers: HEADERS,
		body: JSON.stringify(_makeFilters(search_filters_input)),
	});

	const json = (await search.json()) as SearchResult;
	return json;
}

export async function similar<T>(id: number, limit = 10): Promise<Result<T>[]> {
	const similar = await fetch(`https://api.leboncoin.fr/api/same/v4/search/${id}?size=${limit}`, {
		headers: HEADERS,
	});

	const json = (await similar.json()) as SimilarResult;
	return json.ads as Result<T>[];
}

export function _makeFilters(search_filters_input: Search): SearchFilters {
	const search_filters: SearchFilters = {
		filters: {
			category: undefined,
			enums: _makeFiltersEnums(search_filters_input),
			keywords: undefined,
			ranges: _makeFiltersRanges(search_filters_input),
			location: {
				locations: [],
				shippable: true,
			},
		},
		limit: search_filters_input.limit || 30,
		offset: search_filters_input.offset || undefined,
		pivot: search_filters_input.pivot || undefined,
		owner_type: search_filters_input.owner_type || OWNER_TYPE.ALL,
		sort_by: search_filters_input.sort_by || SORT_BY.TIME,
		sort_order: search_filters_input.sort_order || SORT_ORDER.DESC,
	};

	if (search_filters_input.keywords !== undefined) {
		search_filters.filters.keywords = {
			text: search_filters_input.keywords,
			type: search_filters_input?.only_title === true ? 'subject' : 'all',
		};
	}

	if (search_filters_input.category !== undefined) {
		search_filters.filters.category = { id: search_filters_input.category };
	}

	if (search_filters_input.locations !== undefined) {
		search_filters.filters.location.locations = _makeFiltersLocations(search_filters_input);
		search_filters.filters.location.shippable = search_filters_input.shippable ?? false;
	} else {
		search_filters.filters.location.shippable = search_filters_input.shippable ?? true;
	}

	return search_filters;
}

export function _makeFiltersEnums(search_filters_input: Search) {
	const enums = search_filters_input.enums || {};

	if (enums.ad_type === undefined) {
		enums.ad_type = ['offer'];
	}

	return enums;
}

export function _makeFiltersRanges(search_filters_input: Search) {
	const ranges = search_filters_input.ranges || {};

	if (search_filters_input.price_min !== undefined || search_filters_input.price_max !== undefined) {
		ranges.price = {};
		ranges.price.min = search_filters_input.price_min ? search_filters_input.price_min : undefined;
		ranges.price.max = search_filters_input.price_max ? search_filters_input.price_max : undefined;
	}

	return ranges;
}

export function _makeFiltersLocations(search_filters_input: Search) {
	const locations: Location[] = [];

	search_filters_input.locations?.forEach((location) => {
		if (typeof location === 'string' && location.match(/[a-z]/i)) {
			const locationInfo = getLocationByName(location);
			if (locationInfo) {
				locations.push(locationInfo);
			}
		} else {
			const locationInfo = getLocationByCode(location);
			if (locationInfo) {
				locations.push(locationInfo);
			}
		}
	});

	return locations;
}
