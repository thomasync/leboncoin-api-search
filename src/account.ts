import { HEADERS } from './constants';
import { AccountLoginResultError } from './types';

/**
 * @todo Not implemented yet
 */
export class Account {
	async login(email: string, password: string) {
		const login = await fetch('https://auth.leboncoin.fr/api/authenticator/v2/users/login', {
			method: 'POST',
			headers: {
				...HEADERS,
				Host: 'auth.leboncoin.fr',
			},
			body: JSON.stringify({
				email: email,
				client_id: 'lbc-front-ios',
				password: password,
				redirect_uri: 'polaris.connect:/',
			}),
		});

		const json = await login.json();

		if ('login_status' in json && json.login_status === 'OK') {
			const headers = login.headers;
			return headers;
		}

		return json as AccountLoginResultError;
	}
}
