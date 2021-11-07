import fetch  from 'node-fetch';
import { URL } from 'url';

/* Állandó URL címek */
export const OSU_AUTH_URL = 'https://osu.ppy.sh/oauth/authorize';
export const OSU_TOKEN_URL = 'https://osu.ppy.sh/oauth/token';
export const OSU_TOKENS_URL = 'https://osu.ppy.sh/oauth/tokens';
export const OSU_API_URL = 'https://osu.ppy.sh/api/v2';

export function isInteger($value) {
	return Number.isInteger(Number($value));
};

export function isPlainObject($obj) {
	if(typeof $obj == 'object' && $obj !== null) {
		if(typeof Object.getPrototypeOf == 'function') {
			const proto = Object.getPrototypeOf($obj);
			return proto === Object.prototype || proto === null;
		}
		return Object.prototype.toString.call($obj) == '[object Object]';
	}
	return false;
};

export function isEmpty($str) {
	$str = new String($str).toString().trim();
    return (!$str || $str.length === 0 || $str === ' ');
};

export function objectExtend() {
	for (let i = 1; i < arguments.length; i++)
		for (const key in arguments[i])
			if (arguments[i].hasOwnProperty(key))
				arguments[0][key] = arguments[i][key];
	return arguments[0];
};

export function isToken($var) {
	if(!isPlainObject($var))
		return false;

	if(!$var.access_token || !$var.token_type || !$var.expires_in)
		return false;

	return true;
};

export function req($url, $method = 'POST', $data = null, $search_params = null, $headers = {}) {
	return new Promise((resolve, reject) => {
		const url = new URL($url);

		if($search_params || $search_params !== null || isPlainObject($search_params)) {
			// URL keresési paraméterek
			const entries = Object.entries($search_params);
			if(entries.length > 0) {
				for(const [key, val] of entries) {
					if(Array.isArray(val) && val.length > 0) {
						val.forEach(v => {
							url.searchParams.append(key + '[]', v);
						});
					} else {
						url.searchParams.append(key, val);
					}
				}
			}
		}

		const fetchOptions = {
			method : $method,
			headers : {
				'Content-Type' : 'application/json',
				'Accept' : 'application/json'
			}
		};
		if($headers || $headers !== null)
			fetchOptions.headers = Object.assign(fetchOptions.headers, $headers);

		if($data || $data !== null)
			fetchOptions.body = JSON.stringify($data);

		fetch(url, fetchOptions).then(response => {
			return response.json();
		}).then(result => {
			return resolve(result);
		}).catch(e => {
			return reject(e);
		});
	});
};
