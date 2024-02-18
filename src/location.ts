import { HEADERS, REGIONS } from './constants';
import { Location } from './types';
import { levenshteinDistance, simpleText } from './utils';

export function getLocations() {
	return REGIONS;
}

export function getLocationByCode(code: number | string): Location {
	code = code.toString();
	const foundRegion = REGIONS.find((region) => region.rId === code);
	if (foundRegion) {
		return {
			region_id: code,
			locationType: 'region',
			label: foundRegion.rName,
		};
	}

	const foundDepartment = REGIONS.flatMap((region) => region.departments).find(
		(department) => department?.dId === code,
	);
	if (foundDepartment) {
		return {
			department_id: code,
			locationType: 'department',
			label: foundDepartment.name,
		};
	}

	return {
		zipcode: code,
		locationType: 'city',
	};
}

export function getLocationByName(name: string): Location {
	const foundDepartment = _getDepartmentByName(name);
	const foundRegion = _getRegionByName(name);

	if (foundDepartment.distance < foundRegion.distance) {
		return foundDepartment.department as Location;
	} else {
		return foundRegion.region as Location;
	}
}

export async function searchLocation(location: string): Promise<Location[]> {
	const search = await fetch('https://api.leboncoin.fr/api/parrot-location/v1/complete/location', {
		method: 'POST',
		headers: HEADERS,
		body: JSON.stringify({
			context: [],
			text: location,
		}),
	});

	const json = (await search.json()) as Location[];
	return json;
}

export function _getDepartmentByName(name: string): { department: Location | undefined; distance: number } {
	const foundDepartment = REGIONS.reduce(
		(acc, region) => {
			const found = region.departments?.find((department) => {
				const distance = levenshteinDistance(simpleText(name), simpleText(department.name));
				return distance < acc.distance;
			});
			if (found) {
				acc.distance = levenshteinDistance(simpleText(name), simpleText(found.name));
				acc.department = {
					department_id: found.dId,
					locationType: 'department',
					label: found.name,
				};
			}
			return acc;
		},
		{ distance: Infinity, department: undefined as Location | undefined },
	);

	return foundDepartment;
}

export function _getRegionByName(name: string): { region: Location | undefined; distance: number } {
	const foundRegion = REGIONS.reduce(
		(acc, region) => {
			const distance = levenshteinDistance(simpleText(name), simpleText(region.rName));
			if (distance < acc.distance) {
				acc.distance = distance;
				acc.region = {
					region_id: region.rId,
					locationType: 'region',
					label: region.rName,
				};
			}
			return acc;
		},
		{ distance: Infinity, region: undefined as Location | undefined },
	);

	return foundRegion;
}
