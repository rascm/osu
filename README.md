![](https://github.com/rascm/osu/blob/main/assets/logo.png)

Module is promise based, and uses osu!api v2. To use api you need to register your app [here](https://osu.ppy.sh/home/account/edit), just scroll down to set up oAuth applications. You will need the client id and secret code. Only the most frequently used, stable APIs are available!

## Usage

Current stable release (`1.x`) requires at least Node.js 15.0.0.

Install with npm

```bash
$ npm i @rascm/osu
```

Load module, and request token in ESM:

```javascript
import osu from '@rasm/osu';
const auth = new osu.Authentication(Your client id here, Your secret key here);
const token = await auth.forClient(); // Return {"access_token" : "your access token here", "token_type" : "Bearer", "expires_in" : 86400} or {"error" : "reason here", "response" : "returned object from api"}
```

Load module, and request token in Common JS:

```javascript
const osu = require('@rascm/osu');
const auth = new osu.Authentication(Your client id here, Your secret key here);
const token = auth.forClient();
token.then(access_token => {
	// access_token = {"access_token" : "your access token here", "token_type" : "Bearer", "expires_in" : 86400}  or {"error" : "reason here", "response" : "returned object from api"}
});
token.catch(error => {
    // error = Reject reason
});
```

## Available APIs

**Beatmapsets:**

Beatmap and beatmapset listing, filtering, search, beatmapset events, and get information about beatmaps.

**Scores:**

Retrieve player results, view map rankings, retrieve matches, information about scores.

**Users:**

Detailed profiles of players, kudosu informations, player history...

## Detailed informations of functions

### class Authentication

Generate access tokens, make authorization url.

| Parameter      |  type   | required |
| -------------- | :-----: | :------: |
| $client_id     | integer |   yes    |
| $client_secret | string  |   yes    |

------

#### Functions:

------

***client($params):*** return *Promise*

Client authentication provides an access token for developers that does not involve a user.

| Parameter |  type  | required |
| --------- | :----: | :------: |
| $params   | object |    no    |

*Default value:*

| object key    |  type   | required | default value             |
| ------------- | :-----: | :------: | ------------------------- |
| client_id     | integer |    no    | $client_id from class     |
| client_secret | string  |    no    | $client_secret from class |
| grant_type    | string  |    no    | client_credentials        |
| scope         | string  |    no    | public                    |

------

***authorization($params):*** return *Promise*

Generate token for user.

| Parameter |  type  | required |
| --------- | :----: | :------: |
| $params   | object |   yes    |

*Default value:*

| object key    |  type   | required | default value             |
| ------------- | :-----: | :------: | ------------------------- |
| client_id     | integer |    no    | $client_id from class     |
| client_secret | string  |    no    | $client_secret from class |
| grant_type    | string  |    no    | authorization_code        |
| redirect_uri  | string  |   yes    |                           |
| code          | string  |   yes    |                           |

------

***url($searchParams):*** *return String*

Generate a url address for the user, where they can request a temporary code to generate a token for themselves.

| Parameter |  type  | required |
| --------- | :----: | :------: |
| $params   | object |   yes    |

*Default value:*

| object key    |  type   | required | default value         |
| ------------- | :-----: | :------: | --------------------- |
| client_id     | integer |    no    | $client_id from class |
| response_type | string  |    no    | code                  |
| scope         | string  |    no    | identify public       |
| redirect_uri  | string  |   yes    |                       |
| code          | string  |   yes    |                       |

------

### class Beatmapsets extends ParseToken

Information about beatmaps, beatmapsets.

| Parameter     |  type  | required |
| ------------- | :----: | :------: |
| $access_token | object |   yes    |

*Default value:*

| object key   |  type   | required | default value |
| ------------ | :-----: | :------: | ------------- |
| token_type   | string  |   yes    |               |
| access_token | string  |   yes    |               |
| expires_in   | integer |   yes    |               |

------

#### Functions:

------

***events($searchParams):*** return *Promise*

Get recent beatmapset events.

| Parameter     | type   | required |
| ------------- | ------ | -------- |
| $searchParams | object | no       |

*Default value:*

| object key |  type  | required | default value                                                |
| ---------- | :----: | :------: | ------------------------------------------------------------ |
| user       | string |    no    |                                                              |
| types      | array  |    no    | ['qualify', 'rank', 'nominate', 'disqualify', 'nomination_reset', 'remove_from_loved', 'approve'] |
| min_date   | string |    no    |                                                              |
| max_date   | string |    no    |                                                              |

* **user**: user whose events you want to view.
* **types**: List only the specified events. Each event must be entered in an array. *Accepted values*: nominate, qualify, rank, love, nomination_reset, nomination_reset_received, disqualify, remove_from_loved, kudosu_gain, kudosu_lost, genre_edit, language_edit, nsfw_toggle, issue_resolve, issue_reopen, beatmap_owner_change, kudosu_allow, kudosu_deny, approve, kudosu_recalculate, discussion_delete, discussion_restore, discussion_post_delete, discussion_post_restore
* **min_date**: Start date, which cannot be greater than or equal to end date. Only accepted YYYY-MM-dd format.
* **max_date**: End date, which cannot be less than or equal to start date. Only accepted YYYY-MM-dd format.

------

***getBeatmap($beatmap_id):*** return *Promise*

Get information about beatmap with id.

| Parameter   | type    | required |
| ----------- | ------- | -------- |
| $beatmap_id | integer | yes      |

------

***getBeatmapset($beatmapset_id):*** return *Promise*

Get information about beatmapset with id.

| Parameter      | type    | required |
| -------------- | ------- | -------- |
| $beatmapset_id | integer | yes      |

------

***lookupBeatmap($searchParams):*** return *Promise*

Get beatmap information with id, filename, or checksum.

| Parameter     | type   | required |
| ------------- | ------ | -------- |
| $searchParams | object | yes      |

*filters:*

At least one filter must be used

* checksum
* filename
* id

------

***search($searchParams):*** return *Promise*

Search and filter beatmap by criteria.

| Parameter     | type   | required |
| ------------- | ------ | -------- |
| $searchParams | object | yes      |

*filters:*

At least one filter must be used

| object key     | type    | default value |
| -------------- | ------- | ------------- |
| visual         | string  |               |
| featuredArtist | boolean |               |
| genre          | string  |               |
| language       | string  |               |
| mode           | string  |               |
| nsfw           | boolean |               |
| query          | string  |               |
| type           | string  | any           |

* **visual**: Should it include a video or a storyboard, or both? Accepted values: storyboard, video, both.
* **featuredArtist**: Search only the featured artists
* **genre:**  Search only beatmaps in this genre. *Accepted values:* videogame, anime, rock, pop, other, novelty, hiphop, electronic, metal, classical, folk, jazz or unspecified.
* **language**: Search only beatmaps in this language. *Accepted values*: english, chinese, french, german, italian, japanese, korean, spanish, swedish, russian, polish, instrumental, unspecified or other.
* **mode**: Search in specified game mode. *Accepted values*: standard, taiko, fruits or mania
* **nsfw**: Display adult content.
* **query**: You can enter the search terms.
* **type**: Which maps should you search? *Accepted values:* ranked, loved, qualified, pending, graveyard or any

------

### class Scores extends ParseToken

Information about beatmap scores and matches

| Parameter     |  type  | required |
| ------------- | :----: | :------: |
| $access_token | object |   yes    |

*Default value:*

| object key   |  type   | required | default value |
| ------------ | :-----: | :------: | ------------- |
| token_type   | string  |   yes    |               |
| access_token | string  |   yes    |               |
| expires_in   | integer |   yes    |               |

------

#### Functions:

------

***getBeatmapScore($beatmap_id, $user_id, $searchParams):*** return *Promise*

Get beatmap information with id, filename, or checksum.

| Parameter     | type    | required |
| ------------- | ------- | -------- |
| $beatmap_id   | integer | yes      |
| $user_id      | integer | yes      |
| $searchParams | object  | no       |

*$searchParams object:*

* **mode**: Get score from specified game mode. *Accepted values*: fruits, mania, osu or taiko.

------

***getInfo($score_id, $user_id, $mode):*** return *Promise*

Get information about score by id and mode.

| Parameter | type    | required |
| --------- | ------- | -------- |
| $score_id | integer | yes      |
| $mode     | string  | yes      |

* **$mode**: The mode associated with the score. *Accepted values*: standard, taiko, fruits, mania

------

***getMatch($match_id):*** return *Promise*

Get information about match.

| Parameter | type    | required |
| --------- | ------- | -------- |
| $match_id | integer | yes      |

* **$match_id**: Unique identifier of the match

------

***getMatches($searchParams):*** return *Promise*

List matches.

| Parameter     | type   | required |
| ------------- | ------ | -------- |
| $searchParams | object | no       |

*$searchParams object:*

* **limit:** Number of matches per page Default: 20
* **offset:** Result offset for pagination. Default: 0

------

***getUserScores($user_id, $type, $searchParams):*** return *Promise*

List matches.

| Parameter     | type    | required |
| ------------- | ------- | -------- |
| $user_id      | integer | yes      |
| $type         | string  | no       |
| $searchParams | object  | no       |

***$type*:** Types of results achieved. *Accepted values*: best, firsts or recent. Default: best

*$searchParams object:*

* **limit:** Number of scores per page Default: 20
* **offset:** Result offset for pagination. Default: 0

------

### class Users extends ParseToken

Information about users.

| Parameter     |  type  | required |
| ------------- | :----: | :------: |
| $access_token | object |   yes    |

*Default value:*

| object key   |  type   | required | default value |
| ------------ | :-----: | :------: | ------------- |
| token_type   | string  |   yes    |               |
| access_token | string  |   yes    |               |
| expires_in   | integer |   yes    |               |

------

#### Functions:

------

***getBeatmaps($user_id, $type, $searchParams):*** return *Promise*

Get user beatmaps.

| Parameter     |  type   | required |
| ------------- | :-----: | :------: |
| $user_id      | integer |   yes    |
| $type         | string  |    no    |
| $searchParams | object  |    no    |

**$type**: Beatmap types. *Accepted values*: favourite, most_played, pending, ranked, graveyard or loved

*$searchParams object:*

* **limit:** Number of beatmapsets per page Default: 20
* **offset:** Result offset for pagination. Default: 0

------

***getKudosu($user_id, $searchParams):*** return *Promise*

Get user kudosu informations.

| Parameter     | type    | required |
| ------------- | ------- | -------- |
| $user_id      | integer | yes      |
| $searchParams | object  | no       |

*$searchParams object:*

* **limit:** Number of beatmapsets per page Default: 20
* **offset:** Result offset for pagination. Default: 0

------

***getMe($mode):*** return *Promise* **Requires user authentication!**

Get current authenticated user information.

| Parameter | type   | required |
| --------- | ------ | -------- |
| $mode     | string | no       |

**$mode**: User default mode will be used if not specified. *Accepted values*: standard, taiko, fruits or mania

------

***getUser($user_id, $mode, $by):*** return *Promise*

Get specified user profile.

| Parameter | type                                     | required |
| --------- | ---------------------------------------- | -------- |
| $user_id  | integer or string (depends on $by value) | yes      |
| $mode     | string                                   | no       |
| $by       | string                                   | no       |

**$mode**: User default mode will be used if not specified. *Accepted values*: standard, taiko, fruits or mania

**$by**: If you want to search by username, change it to 'name'. *Default value*: id

------

***recentActivity($user_id, $searchParams):*** return *Promise*

Get user recent activities.

| Parameter     | type    | required |
| ------------- | ------- | -------- |
| $user_id      | integer | yes      |
| $searchParams | object  | no       |

*$searchParams object:*

* **limit:** Number of beatmapsets per page Default: 20
* **offset:** Result offset for pagination. Default: 0

------

