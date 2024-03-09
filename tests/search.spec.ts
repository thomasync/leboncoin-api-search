import { _makeFilters, _makeFiltersEnums, _makeFiltersLocations, _makeFiltersRanges } from '../src/search';
import { OWNER_TYPE, SORT_BY, SORT_ORDER } from '../src/types';

describe('search', () => {
	describe('_makeFilters', () => {
		it('should return object with default values if no input', () => {
			const filters = _makeFilters({});
			expect(filters).toEqual({
				filters: {
					category: undefined,
					enums: { ad_type: ['offer'] },
					keywords: undefined,
					ranges: {},
					location: { locations: [], shippable: true },
				},
				limit: 30,
				offset: undefined,
				pivot: undefined,
				owner_type: 'all',
				sort_by: 'date',
				sort_order: 'desc',
			});
		});

		it('should return object with limit if limit is defined', () => {
			const filters = _makeFilters({ limit: 100 });
			expect(filters.limit).toEqual(100);
		});

		it('should return object with owner_type if owner_type is defined', () => {
			const filters = _makeFilters({ owner_type: OWNER_TYPE.PRO });
			expect(filters.owner_type).toEqual(OWNER_TYPE.PRO);
		});

		it('should return object with sort_by if sort_by is defined', () => {
			const filters = _makeFilters({ sort_by: SORT_BY.PRICE });
			expect(filters.sort_by).toEqual(SORT_BY.PRICE);
		});

		it('should return object with sort_order if sort_order is defined', () => {
			const filters = _makeFilters({ sort_order: SORT_ORDER.ASC });
			expect(filters.sort_order).toEqual(SORT_ORDER.ASC);
		});

		it('should define keywords.type to subject if only_title is true', () => {
			const filters = _makeFilters({ keywords: 'test', only_title: true });
			expect(filters.filters.keywords).toEqual({ text: 'test', type: 'subject' });
		});

		it('should define keywords.type to all if only_title is false', () => {
			const filters = _makeFilters({ keywords: 'test', only_title: false });
			expect(filters.filters.keywords).toEqual({ text: 'test', type: 'all' });
		});

		it('should define keywords.type to all if only_title is not defined', () => {
			const filters = _makeFilters({ keywords: 'test' });
			expect(filters.filters.keywords).toEqual({ text: 'test', type: 'all' });
		});

		it('should return object with location.shippable true if shippable is defined and true', () => {
			const filters = _makeFilters({ shippable: true });
			expect(filters.filters.location?.shippable).toEqual(true);
		});

		it('should return object with location.shippable false if shippable is defined and false', () => {
			const filters = _makeFilters({ shippable: false });
			expect(filters.filters.location?.shippable).toEqual(false);
		});

		it('should return object with location.shippable false if shippable is not defined and location is defined', () => {
			const filters = _makeFilters({
				locations: [93000],
			});
			expect(filters.filters.location?.shippable).toEqual(false);
		});

		it('should return object with location.shippable false if shippable is not defined and location is not defined', () => {
			const filters = _makeFilters({});
			expect(filters.filters.location?.shippable).toEqual(true);
		});
	});
	describe('_makeFiltersEnums', () => {
		it('should return object with ad_types: offer if no enums', () => {
			const enums = _makeFiltersEnums({});
			expect(enums).toEqual({
				ad_type: ['offer'],
			});
		});

		it('should return object with ad_types: offer if ad_types is undefined', () => {
			const enums = _makeFiltersEnums({ enums: { p2p: true } });
			expect(enums).toEqual({
				ad_type: ['offer'],
				p2p: true,
			});
		});

		it('should return object with ad_types: gives if ad_types is specified', () => {
			const enums = _makeFiltersEnums({ enums: { ad_type: ['gives'] } });
			expect(enums).toEqual({
				ad_type: ['gives'],
			});
		});
	});
	describe('_makeFiltersRanges', () => {
		it('should return emty object if no price_min and price_max', () => {
			const ranges = _makeFiltersRanges({});
			expect(ranges).toEqual({});
		});

		it('should return min price if price_min is defined', () => {
			const ranges = _makeFiltersRanges({ price_min: 100 });
			expect(ranges).toEqual({ price: { min: 100 } });
		});

		it('should return max price if price_max is defined', () => {
			const ranges = _makeFiltersRanges({ price_max: 100 });
			expect(ranges).toEqual({ price: { max: 100 } });
		});

		it('should return min and max price if price_min and price_max are defined', () => {
			const ranges = _makeFiltersRanges({ price_min: 100, price_max: 200 });
			expect(ranges).toEqual({ price: { min: 100, max: 200 } });
		});

		it('should return ranges if ranges is defined', () => {
			const ranges = _makeFiltersRanges({
				ranges: {
					price: { min: 0 },
					square: {
						min: 0,
						max: 100,
					},
				},
			});
			expect(ranges).toEqual({ price: { min: 0 }, square: { min: 0, max: 100 } });
		});

		it('should return ranges if price_min and price_max are defined and ranges is defined', () => {
			const ranges = _makeFiltersRanges({
				price_min: 100,
				price_max: 200,
				ranges: {
					price: { min: 0 },
					square: {
						min: 0,
						max: 100,
					},
				},
			});
			expect(ranges).toEqual({ price: { min: 100, max: 200 }, square: { min: 0, max: 100 } });
		});
	});

	describe('_makeFiltersLocations', () => {
		it('should return empty array if no locations', () => {
			const locations = _makeFiltersLocations({});
			expect(locations).toEqual([]);
		});

		it('should return array of locations if locations are defined', () => {
			const locations = _makeFiltersLocations({ locations: [93000] });
			expect(locations).toEqual([
				{
					locationType: 'city',
					zipcode: '93000',
				},
			]);
		});

		it('should return multiple locations', () => {
			const locations = _makeFiltersLocations({ locations: ['93000', '0', 'Hérault', 'Paris', '92'] });
			expect(locations).toEqual([
				{
					locationType: 'city',
					zipcode: '93000',
				},
				{
					locationType: 'city',
					zipcode: '0',
				},
				{
					locationType: 'department',
					label: 'Hérault',
					department_id: '34',
				},
				{
					locationType: 'department',
					label: 'Paris',
					department_id: '75',
				},
				{
					locationType: 'department',
					department_id: '92',
					label: 'Hauts-de-Seine',
				},
			]);
		});
	});
});
