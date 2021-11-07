const { isToken } = require('./Utils.js');

module.exports = class ParseToken {

	constructor($access_token = {}) {
		if(!isToken($access_token))
			throw new Error('Invalid access token!');

		this.token = $access_token;
	}
};