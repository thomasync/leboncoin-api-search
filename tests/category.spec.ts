import { getCategories, getCategoriesWithSubcategories, getCategoryById, getCategoryByName } from '../src/category';

describe('Category', () => {
	describe('getCategories', () => {
		it('should return all categories without subcategories', () => {
			const categories = getCategories();
			expect(categories.length).toEqual(117);
		});

		it('should return all categories ordered by id', () => {
			const categories = getCategories();
			expect(categories.at(0)?.id).toEqual('0');
			expect(categories.at(-1)?.id).toEqual('1017');
		});

		it('should return all categories with name', () => {
			const categories = getCategories();
			const testCategory = categories.at(1);
			expect(testCategory?.name).toEqual('Véhicules');
		});

		it('should return all categories with parent', () => {
			const categories = getCategories();
			const testCategory = categories.at(1);
			expect(testCategory?.parent).toBeNull();

			const testSubcategory = categories.at(2);
			expect(testSubcategory?.parent?.id).toEqual('1');
			expect(testSubcategory?.parent?.name).toEqual('Véhicules');
		});
	});

	describe('getCategoriesWithSubcategories', () => {
		it('should return all categories with subcategories', () => {
			const categories = getCategoriesWithSubcategories();
			expect(categories.length).toEqual(15);

			const testCategory = categories.at(1);
			expect(testCategory?.subcategories?.length).toEqual(13);
		});

		it('should return all categories with subcategories ordered by id', () => {
			const categories = getCategoriesWithSubcategories();
			expect(categories.at(0)?.id).toEqual('0');
			expect(categories.at(-1)?.id).toEqual('1000');

			const testCategory = categories.at(1);
			expect(testCategory?.subcategories?.at(0)?.id).toEqual('2');
			expect(testCategory?.subcategories?.at(-1)?.id).toEqual('1004');
		});
	});

	describe('getCategoryById', () => {
		it('should return category by id', () => {
			const category = getCategoryById('1');
			expect(category?.id).toEqual('1');
			expect(category?.name).toEqual('Véhicules');
		});

		it('should return category by id from subcategories', () => {
			const category = getCategoryById('1004');
			expect(category?.id).toEqual('1004');
			expect(category?.name).toEqual('Services de réparations mécaniques');
		});

		it('should return undefined if category not found', () => {
			const category = getCategoryById('10000');
			expect(category).toBeUndefined();
		});
	});

	describe('getCategoryByName', () => {
		it('should return category by name', () => {
			const category = getCategoryByName('Véhicules');
			expect(category?.id).toEqual('1');
			expect(category?.name).toEqual('Véhicules');
		});

		it('should return category by name from subcategories', () => {
			const category = getCategoryByName('Baby-Sitting');
			expect(category?.id).toEqual('100');
			expect(category?.name).toEqual('Baby-Sitting');
		});

		it('should return category by name if similar name', () => {
			const category = getCategoryByName('Baby sitting');
			expect(category?.id).toEqual('100');
			expect(category?.name).toEqual('Baby-Sitting');
		});

		it('should return undefined if category not found', () => {
			const category = getCategoryByName('test');
			expect(category).toBeUndefined();
		});
	});
});
