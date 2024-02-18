import { getFeatures, getFeaturesFromCategory, getFieldsFromCategory } from '../src/feature';
import { CATEGORY } from '../src/types';

describe('Feature', () => {
	describe('getFeatures', () => {
		it('should return all features', () => {
			const features = getFeatures();
			expect(features.length).toEqual(632);

			const testFeature = Object.keys(features[0]);
			expect(testFeature).toEqual(['param', 'label', 'type', 'values']);
		});
	});

	describe('getFeaturesFromCategory', () => {
		it('should return all features from category', () => {
			const features = getFeaturesFromCategory(CATEGORY.VOITURES);
			expect(features.length).toEqual(15);
			expect(features[0]).toEqual({
				param: 'price',
				label: 'Prix',
				type: 'range',
				values: undefined,
			});
		});
	});

	describe('getFieldsFromCategory', () => {
		it('should return all fields from category', () => {
			const fields = getFieldsFromCategory(CATEGORY.VOITURES);
			expect(fields.length).toEqual(15);
			expect(fields[0]).toEqual('price');
		});
	});
});
