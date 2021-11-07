import { BeatmapEventTypes, SearchGenres, SearchLanguages, SearchGameModes, SearchCategory } from './Types.js';
import ParseToken from './ParseToken.js';
import { OSU_API_URL, req, isInteger, isPlainObject, isEmpty, objectExtend } from './Utils.js';

export default class Beatmapsets extends ParseToken {

	#auth_data;
	constructor(token) {
		super(token);
		this.#auth_data = {'Authorization' : this.token.token_type + ' ' + this.token.access_token};
	};

	events($searchParams = {}) {
		return new Promise((resolve, reject) => {

			if(!$searchParams || !isPlainObject($searchParams))
				return reject('Invalid $searchParams parameter! Maybe not plain object?');

			$searchParams = objectExtend({
				'user' : '',
				'types' : ['qualify', 'rank', 'nominate', 'disqualify', 'nomination_reset', 'remove_from_loved', 'approve']
			}, $searchParams);

			$searchParams.user = $searchParams.user.trim();

			// Típusok érvényesítése
			for(const type of $searchParams.types) {
				if(!BeatmapEventTypes.has(type))
					return reject('Invalid event type in search params! ' + type);
			}

			req(OSU_API_URL + '/beatmapsets/events', 'GET', null, $searchParams, this.#auth_data).then(response => {
				return resolve(response);
			}).catch(e => {
				return reject(e);
			});
		});
	};

	getBeatmap($beatmap_id) {
		return new Promise((resolve, reject) => {

			if(!$beatmap_id || !isInteger($beatmap_id))
				return reject('Invalid, empty or $beatmap_id parameter is not a valid integer!');

			req(OSU_API_URL + '/beatmaps/' + $beatmap_id, 'GET', null, null, this.#auth_data).then(response => {
				return resolve(response);
			}).catch(e => {
				return reject(e);
			});
		});
	};

	getBeatmapset($beatmapset_id) {
		return new Promise((resolve, reject) => {

			if(!$beatmapset_id || !isInteger($beatmapset_id))
				return reject('Invalid, empty or $beatmapset_id parameter is not a valid integer!');

			req(OSU_API_URL + '/beatmapsets/' + $beatmapset_id, 'GET', null, null, this.#auth_data).then(response => {
				return resolve(response);
			}).catch(e => {
				return reject(e);
			});
		});
	};

	lookupBeatmap($searchParams = {}) {
		return new Promise((resolve, reject) => {

			if(!$searchParams || !isPlainObject($searchParams))
				return reject('$searchParams parameter is not plain object!');

			$searchParams = objectExtend({
				'checksum' : '',
				'filename' : '',
				'id' : ''
			}, $searchParams);

			req(OSU_API_URL + '/beatmaps/lookup', 'GET', null, $searchParams, this.#auth_data).then(response => {
				return resolve(response);
			}).catch(e => {
				return reject(e);
			});
		});
	};

	search($searchParams = {}) {
		return new Promise((resolve, reject) => {
			const buildParams = {};

			// Tartalmaz-e?
			if($searchParams.visual) {
				if($searchParams.visual === 'both')
					buildParams.e = 'storyboard.video';
				else if($searchParams.visual === 'storyboard') {
					buildParams.e = 'storyboard';
				} else if($searchParams.visual === 'video')
					buildParams.e = 'video';
				
			}

			// Kiemelt előadó ?
			if($searchParams.featuredArtists)
				buildParams.c = 'featured_artists';

			// Műfaj
			if($searchParams.genre) {
				if(SearchGenres.has($searchParams.genre))
					buildParams.g = SearchGenres.get($searchParams.genre);
			}

			// Nyelv
			if($searchParams.language) {
				if(SearchLanguages.has($searchParams.language))
					buildParams.l = SearchLanguages.get($searchParams.language);
			}

			// Mód
			if($searchParams.mode) {
				if(SearchGameModes.has($searchParams.mode))
					buildParams.m = SearchGameModes.get($searchParams.mode);
			}

			if($searchParams.nsfw)
				buildParams.nsfw = 1; 
			else
				buildParams.nsfw = 0; 

			// Keresési kifejezés
			if($searchParams.query && !isEmpty($searchParams.query)) {
				buildParams.q = $searchParams.query.trim();
			}

			// Típus
			if($searchParams.type) {
				if(SearchCategory.has($searchParams.type))
					buildParams.s = SearchCategory.get($searchParams.type);
			}

			req(OSU_API_URL + '/beatmapsets/search', 'GET', null, buildParams, this.#auth_data).then(response => {
				return resolve(response);
			}).catch(e => {
				return reject(e);
			});
		});
	};

};