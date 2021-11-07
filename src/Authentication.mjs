import { URL } from 'url';
import { OSU_AUTH_URL, OSU_TOKEN_URL, objectExtend, req }  from './Utils.mjs';
import { AuthScopes } from './Types.mjs';

export default class Authentication {

	#client_id;
	#client_secret;

	constructor($client_id, $client_secret) {
		this.#client_id = $client_id;
		this.#client_secret = $client_secret;
	};

	#requestToken($p) {
		return new Promise((resolve, reject) => {
			req(OSU_TOKEN_URL, 'POST', $p).then(result => {
				if(!result.access_token || !result.token_type || !result.expires_in)
					return reject({ error : 'Request token failed', response : result});
				return resolve(result);
			}).catch(e => {
				reject(e);
			});
		});
	};

	client($params = {}) {
		$params = objectExtend({
			'client_id' : this.#client_id,
			'client_secret' : this.#client_secret,
			'grant_type' : 'client_credentials',
			'scope' : 'public'
		}, $params);
		return this.#requestToken($params);
	};

	authorization($params = {}) {
		$params = objectExtend({
			'client_id' : this.#client_id,
			'client_secret' : this.#client_secret,
			'code' : '',
			'grant_type' : 'authorization_code',
			'redirect_uri' : 'code'
		}, $params);
		return this.#requestToken($params);
	};

	url($searchParams = {}) {
		$searchParams = objectExtend({
			'client_id' : this.#client_id,
			'redirect_uri' : '',
			'response_type' : 'code',
			'scope' : 'identify public',
		}, $searchParams);
		const url = new URL(OSU_AUTH_URL);
		const scopes = $qp.scope.split(' ');

		for(const s of scopes) {
			if(!AuthScopes.has(s)) {
				throw Error('Invalid scope found!');
				return;
			}
		}

		for(const [k, v] of Object.entries($searchParams)) {
			url.searchParams.append(k, v);
		}
		return url.toString();
	};
};