import { UserBeatmapTypes, SearchGameModes } from './Types.mjs';
import ParseToken from './ParseToken.mjs';
import { OSU_API_URL, req, isInteger, isPlainObject, isEmpty, objectExtend } from './Utils.mjs';

export default class Users extends ParseToken {

	#auth_data;
	constructor(token) {
		super(token);
		this.#auth_data = {'Authorization' : this.token.token_type + ' ' + this.token.access_token};
	};

	getBeatmaps($user_id, $type = 'ranked', $searchParams = {}) {
		return new Promise((resolve, reject) => {

			if(!$user_id || !isInteger($user_id) || isEmpty($user_id))
				return reject('Invalid, empty or $user_id parameter is not integer!');

			if(!UserBeatmapTypes.has($type))
				reject('Invalid user beatmap type!');

			if($searchParams !== null && !isPlainObject($searchParams))
				return reject('$searchParams parameter is not plain object!');

			$searchParams = objectExtend({
				'limit' : 20,
				'offset' : 0
			}, $searchParams || {});

			req(OSU_API_URL + '/users/' + $user_id +'/beatmapsets/' + $type, 'GET', null, $searchParams, this.#auth_data).then(response => {
				return resolve(response);
			}).catch(e => {
				return reject(e);
			});
		});
	};

	getKudosu($user_id, $searchParams = {}) {
		return new Promise((resolve, reject) => {
			if(!$user_id || !isInteger($user_id) || isEmpty($user_id))
				return reject('Invalid, empty or $user_id parameter is not integer!');

			if($searchParams !== null && !isPlainObject($searchParams))
				return reject('$searchParams parameter is not plain object!');

			$searchParams = objectExtend({
				'limit' : 20,
				'offset' : 0
			}, $searchParams || {});

			req(OSU_API_URL + '/users/' + $user_id +'/kudosu', 'GET', null, $searchParams, this.#auth_data).then(response => {
				return resolve(response);
			}).catch(e => {
				return reject(e);
			});
		});
	};

	getMe($mode = 'default') {
		return new Promise((resolve, reject) => {
			$mode = $mode.toLowerCase();

			if($mode !== 'default' && !SearchGameModes.has($mode))
				return reject('Invaid game mode!');

			req(OSU_API_URL + '/me' + ($mode !== 'default' ? '/' + $mode : ''), 'GET', null, $searchParams, this.#auth_data).then(response => {
				return resolve(response);
			}).catch(e => {
				return reject(e);
			});
		});
	};

	getUser($user_id, $mode = 'default', $by = 'id') {
		return new Promise((resolve, reject) => {
			if(!['username', 'id'].includes($by))
				return reject('Invalid $by parameter');

			if(!$user_id)
				return reject('$user_id parameter is required!');

			if($by === 'id' && (!isInteger($user_id) || isEmpty($user_id)) )
				return reject('$user_id is not a valid integer!');

			if($mode && $mode !== 'default' && !SearchGameModes.has($mode))
				return reject('Invalid game mode!');

			req(OSU_API_URL + '/users/' + $user + ($mode !== 'default' ? '/' + $mode : ''), 'GET', null, {key : $by}, this.#auth_data).then(response => {
				return resolve(response);
			}).catch(e => {
				return reject(e);
			});
		});
	};

	recentActivity($user_id, $searchParams = {}) {
		return new Promise((resolve, reject) => {
			if(!$user_id || !isInteger($user_id) || isEmpty($user_id))
				return reject('Invalid, empty or $user_id parameter is not integer!');

			if($searchParams !== null && !isPlainObject($searchParams))
				return reject('$searchParams parameter is not plain object!');

			$searchParams = objectExtend({
				'limit' : 20,
				'offset' : 0
			}, $searchParams);

			req(OSU_API_URL + '/users/' + $user_id + '/recent_activity', 'GET', null, $searchParams, this.#auth_data).then(response => {
				return resolve(response);
			}).catch(e => {
				return reject(e);
			});
		});
	};

	
};