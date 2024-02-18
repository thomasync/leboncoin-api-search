import {
	_getDepartmentByName,
	_getRegionByName,
	getLocationByCode,
	getLocationByName,
	getLocations,
} from '../src/location';

describe('Location', () => {
	describe('getLocations', () => {
		it('should return all locations', () => {
			const locations = getLocations();
			expect(locations.length).toEqual(34);
		});
	});

	describe('getLocationByCode', () => {
		it('should return zipcode if is not a region or department', () => {
			const location = getLocationByCode('34000');
			expect(location).toEqual({ zipcode: '34000', locationType: 'city' });
		});

		it('should return region if code is a region', () => {
			const location = getLocationByCode('1');
			expect(location).toEqual({ region_id: '1', label: 'Alsace', locationType: 'region' });
		});

		it('should return department if code is a department', () => {
			const location = getLocationByCode('75');
			expect(location).toEqual({ department_id: '75', label: 'Paris', locationType: 'department' });
		});
	});

	describe('getLocationByName', () => {
		it('should return region if name is a region', () => {
			const location = getLocationByName('Alsace');
			expect(location).toEqual({ region_id: '1', label: 'Alsace', locationType: 'region' });
		});

		it('should return department if name is a department', () => {
			const location = getLocationByName('Paris');
			expect(location).toEqual({ department_id: '75', label: 'Paris', locationType: 'department' });
		});
	});

	describe('_getDepartmentByName', () => {
		it('should return Paris', () => {
			const location = _getDepartmentByName('Paris29323LK23');
			expect(location.department).toEqual({ department_id: '75', label: 'Paris', locationType: 'department' });
		});

		it('should return Pyrénées-Orientales', () => {
			const location = _getDepartmentByName('Pyrénees Orientales');
			expect(location.department).toEqual({
				department_id: '66',
				label: 'Pyrénées-Orientales',
				locationType: 'department',
			});
		});

		it("should return Côte-d'Or", () => {
			const location = _getDepartmentByName("Cote d'or");
			expect(location.department).toEqual({
				department_id: '21',
				label: "Côte-d'Or",
				locationType: 'department',
			});
		});
	});

	describe('_getRegionByName', () => {
		it('should return Languedoc-Roussillon', () => {
			const location = _getRegionByName('Languedoc Roussillon');
			expect(location.region).toEqual({ region_id: '13', label: 'Languedoc-Roussillon', locationType: 'region' });
		});

		it('should return Île-de-France', () => {
			const location = _getRegionByName('Ile de France');
			expect(location.region).toEqual({ region_id: '12', label: 'Ile-de-France', locationType: 'region' });
		});
	});
});
