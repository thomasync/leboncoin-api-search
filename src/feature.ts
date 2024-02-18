import { FEATURES, FIELDS } from './constants';
import { Feature } from './types';

export function getFeatures() {
	const features = Object.entries(FEATURES).map(([_, feature]) => _formatFeature(feature));
	return features;
}

export function getFeaturesFromCategory(category: keyof typeof FIELDS.categoryFields.offer) {
	const fields = getFieldsFromCategory(category);
	const features = fields.map((field: string) => {
		const feature = FEATURES[field as keyof typeof FEATURES] ?? {};
		return _formatFeature(feature);
	});

	return features;
}

export function getFieldsFromCategory(category: keyof typeof FIELDS.categoryFields.offer) {
	if (category in FIELDS.categoryFields.offer) {
		return (
			FIELDS.categoryFields.offer[category].flatMap((field) => {
				return field.type === 'feature' ? field.name : [];
			}) ?? []
		);
	}

	return [];
}

export function _formatFeature(feature: Feature) {
	return feature.param && feature.label && feature.apiType
		? {
				param: feature.param,
				label: feature.label,
				type: feature.apiType,
				values:
					feature.values.type !== '' && 'simpleData' in feature.values
						? feature.values.simpleData
						: undefined,
			}
		: {};
}
