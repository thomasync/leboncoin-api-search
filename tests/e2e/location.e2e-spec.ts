import { searchLocation } from '../../src/location';

export async function test_location_1() {
	const resultats = await searchLocation('Paris');
	if (resultats.length > 0) {
		if (resultats[0].region_id === '12' && resultats[0].label === 'Paris (toute la ville)') {
			return true;
		}
		throw new Error('Invalid result');
	}

	throw new Error('No results');
}
