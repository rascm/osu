const
	{ GameModes, SearchGameModes, ScoreTypes } = require('./Types.js'),
	ParseToken = require('./ParseToken.js'),
	{ OSU_API_URL, req, isInteger, isPlainObject, isEmpty, objectExtend } = require('./Utils.js');

module.exports = class Scores extends ParseToken {

	#auth_data;
	constructor(token) {
		super(token);
		this.#auth_data = {'Authorization' : this.token.token_type + ' ' + this.token.access_token};
	};

	getBeatmapScore($beatmap_id, $user_id, $searchParams = {}) {
		return new Promise((resolve, reject) => {

			if(!$beatmap_id || !isInteger($beatmap_id) || isEmpty($beatmap_id))
				return reject('Invalid, empty or $beatmap_id parameter is not integer!');

			if(!$user_id || !isInteger($user_id) || isEmpty($user_id))
				return reject('Invalid, empty, or $user_id parameter is not integer!');

			if($searchParams !== null && !isPlainObject($searchParams))
				return reject('$searchParams parameter is not plain object!');

			$searchParams = objectExtend({
				'mode' : 'osu'
				//'mods' : ['HD'] // Coming soon...
			}, $searchParams || {});

			if(!GameModes.has($searchParams.mode))
				reject('Invalid game mode!');

			req(OSU_API_URL + '/beatmaps/'+ $beatmap_id +'/scores/users/' + $user_id, 'GET', null, null, this.#auth_data).then(response => {
				return resolve(response);
			}).catch(e => {
				return reject(e);
			});
			
		});
	};

	getInfo($score_id, $mode) {
		return new Promise((resolve, reject) => {
			if(!$score_id || !isInteger($score_id) || isEmpty($score_id))
				return reject('Invalid, empty, or $score_id parameter is not integer!');

			if(!SearchGameModes.has($mode))
				reject('Invalid $mode parameter!');

			req(OSU_API_URL + '/scores/' + $mode + '/' + $score_id, 'GET', null, null, this.#auth_data).then(response => {
				return resolve(response);
			}).catch(e => {
				return reject(e);
			});
		});
	};

	getMatch($match_id) {
		return new Promise((resolve, reject) => {
			if(!$match_id || !isInteger($match_id) || isEmpty($match_id))
				return reject('Invalid, empty, or $match_id parameter is not integer!');

			req(OSU_API_URL + '/matches/' + $match_id, 'GET', null, null, this.#auth_data).then(response => {
				return resolve(response);
			}).catch(e => {
				return reject(e);
			});
		});
	};

	getUserScores($user_id, $type = 'best', $searchParams = {}) {
		return new Promise((resolve, reject) => {
			if(!$user_id || !isInteger($user_id) || isEmpty($user_id))
				return reject('Invalid, empty, or $user_id parameter is not integer!');

			if(!ScoreTypes.has($type))
				reject('Invalid $type parameter!');

			if($searchParams !== null && !isPlainObject($searchParams))
				return reject('$searchParams parameter is not plain object!');

			$searchParams = objectExtend({
				'limit' : 20,
				'offset' : 0
			}, $searchParams || {});

			if($searchParams.mode && !ScoreModes.has($searchParams.mode))
				return reject('Invalid game mode in search parameter!');

			req(OSU_API_URL + '/users/' + $user_id +'/scores/' + $type, 'GET', null, $searchParams, this.#auth_data).then(response => {
				return resolve(response);
			}).catch(e => {
				return reject(e);
			});
		});
	};

	getMatches($searchParams = {}) {
		return new Promise((resolve, reject) => {
			if($searchParams !== null && !isPlainObject($searchParams))
				return reject('$searchParams parameter is not plain object!');

			$searchParams = objectExtend({
				'limit' : 20,
				'offset' : 0
			}, $searchParams || {});

			req( OSU_API_URL + '/matches', 'GET', null, $searchParams, this.#auth_data).then(response => {
				return resolve(response);
			}).catch(e => {
				return reject(e);
			});
		});
	};
};