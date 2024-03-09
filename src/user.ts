import { HEADERS } from './constants';
import { Presence, User } from './types';

export async function getUser(uuid: string): Promise<User> {
	const infos = await fetch(`https://api.leboncoin.fr/api/user-card/v1/${uuid}/infos`, {
		method: 'GET',
		headers: HEADERS,
	});

	const json = (await infos.json()) as User;
	const presence = await _getPresence(uuid);

	if (presence) {
		json.presence = presence.presence;
		json.feedback = presence.reputation.feedback;
	}

	return json;
}

export async function _getPresence(uuid: string): Promise<Presence> {
	const infos = await fetch(
		`https://profile-api-lbc.trust-pro.mpi-internal.com/profile/sdrn:leboncoin:user:${uuid}`,
		{
			method: 'GET',
			headers: {
				...HEADERS,
				Host: 'profile-api-lbc.trust-pro.mpi-internal.com',
				'Content-Type': 'application/hal+json',
				Accept: 'application/hal+json',
			},
		},
	);

	const json = (await infos.json()) as Presence;
	return json;
}
