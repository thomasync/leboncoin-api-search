import { CATEGORIES } from './constants';
import { Category, FlatCategory } from './types';
import { levenshteinDistance, simpleText } from './utils';

export function getCategories(): FlatCategory[] {
	return CATEGORIES.reduce((acc, category) => {
		acc.push({
			id: category.catId,
			name: category.name,
			parent: null,
		});
		if (category.subcategories) {
			acc.push(
				...category.subcategories.map((subcategory) => ({
					id: subcategory.catId,
					name: subcategory.name,
					parent: acc.find((c) => c.id === category.catId) as FlatCategory,
				})),
			);
		}
		return acc;
	}, [] as FlatCategory[]).sort((a, b) => +a.id - +b.id);
}

export function getCategoriesWithSubcategories(): Category[] {
	return CATEGORIES.map((category) => ({
		id: category.catId,
		name: category.name,
		subcategories: category.subcategories
			?.map((subcategory) => ({
				id: subcategory.catId,
				name: subcategory.name,
			}))
			.sort((a, b) => +a.id - +b.id),
	})).sort((a, b) => +a.id - +b.id);
}

export function getCategoryById(id: string): Category | undefined {
	return getCategories().find((category) => category.id === id);
}

export function getCategoryByName(name: string): Category | undefined {
	const categoryFound = getCategories().reduce(
		(acc, c) => {
			const distance = levenshteinDistance(simpleText(name), simpleText(c.name));
			if (distance < acc.distance) {
				acc.distance = distance;
				acc.category = c;
			}
			return acc;
		},
		{ distance: Infinity, category: undefined } as { distance: number; category: FlatCategory | undefined },
	);

	if (categoryFound.distance > 3) return undefined;
	return getCategoryById(categoryFound.category?.id ?? '');
}
