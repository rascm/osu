export const AuthScopes = new Set([
	'public',
	'identify',
	'friends.read',
	'chat.write',
	'forum.write',
	'delegate'
]);

export const GameModes = new Set([
	'fruits',
	'mania',
	'osu',
	'taiko'
]);

export const ScoreTypes = new Set(['best', 'firsts', 'recent']);

export const SearchGameModes = new Map([
	['standard', 0],
	['taiko', 1],
	['fruits', 2],
	['mania', 3]
]);

export const SearchCategory = new Set([
	'ranked',
	'any',
	'qualified',
	'loved',
	'pending',
	'graveyard'
]);

export const SearchGenres = new Map([
	['unspecified', 1],
	['videogame', 2],
	['anime', 3],
	['rock', 4],
	['pop', 5],
	['other', 6],
	['novelty', 7],
	['hiphop', 9],
	['electronic', 10],
	['metal', 11],
	['classical', 12],
	['folk', 13],
	['jazz', 14]
]);

export const SearchLanguages = new Map([
	['english', 2],
	['chinese', 4],
	['french', 7],
	['german', 8],
	['italian', 11],
	['japanese', 3],
	['korean', 6],
	['spanish', 10],
	['swedish', 9],
	['russian', 12],
	['polish', 13],
	['instrumental', 5],
	['unspecified', 1],
	['other', 14]
]);

export const UserBeatmapTypes = new Set([
	'favourite',
	'graveyard',
	'loved',
	'most_played',
	'pending',
	'ranked'
]);

export const BeatmapRankStatus = new Set([
	'graveyard',
	'wip',
	'pending',
	'ranked',
	'approved',
	'qualified',
	'loved'
]);

export const BeatmapEventTypes = new Set([
	'nominate',
	'qualify',
	'rank',
	'love',
	'nomination_reset',
	'nomination_reset_received',
	'disqualify',
	'remove_from_loved',
	'kudosu_gain',
	'kudosu_lost',
	'genre_edit',
	'language_edit',
	'nsfw_toggle',
	'issue_resolve',
	'issue_reopen',
	'beatmap_owner_change',
	'kudosu_allow',
	'kudosu_deny',
	'approve',
	'kudosu_recalculate',
	'discussion_delete',
	'discussion_restore',
	'discussion_post_delete',
	'discussion_post_restore'
]);