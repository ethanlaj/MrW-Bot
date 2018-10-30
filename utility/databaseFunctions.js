var botconfig = require("../botconfig.js");
module.exports = {
	getCoins: async function(client, id) {
		let data = await client.query(`SELECT coins FROM coins
		WHERE userid=$1;`, [id]);
		return (data.rows[0]) ? Number(data.rows[0].coins) : 0;
	},
	changeCoins: async function(client, id, amount) {
		let data = await client.query(`SELECT coins FROM coins
		WHERE userid=$1;`, [id]);
		if (!data.rows[0]) {
			await client.query(`INSERT INTO coins
			VALUES ($1, $2)`, [id, amount]);
		} else {
			let coins = Number(data.rows[0].coins) + amount;
			await client.query(`UPDATE coins
			SET coins = $2
			WHERE userid = $1;`, [id, coins]);
		}
	},
	isBlacklisted: async function(client, id) {
		let data = await client.query(`SELECT userid FROM blacklistedusers
		WHERE userid=$1;`, [id]);
		return (data.rows[0]) ? true : false;
	},
	blacklist: async function(client, id) {
		let data = await client.query(`SELECT userid FROM blacklistedusers
		WHERE userid=$1;`, [id]);
		if (data.rows[0]) {
			await client.query(`DELETE FROM blacklistedusers
			WHERE userid=$1`, [id]);
			return false;
		} else {
			await client.query(`INSERT INTO blacklistedusers
			VALUES ($1)`, [id]);
			return true;
		}
	},
	getPrefix: async function(client, id) {
		let data = await client.query(`SELECT prefix FROM prefix
		WHERE guildid=$1;`, [id]);
		return (data.rows[0]) ? data.rows[0].prefix : botconfig.prefix;
	},
	setPrefix: async function(client, id, value) {
		let data = await client.query(`SELECT prefix FROM prefix
		WHERE guildid=$1;`, [id]);
		if (!data.rows[0]) {
			if (!value) return botconfig.prefix;
			await client.query(`INSERT INTO prefix
			VALUES ($1, $2)`, [id, value]);
			return value;
		} else {
			if (value) {
				await client.query(`UPDATE prefix
				SET prefix = $2
				WHERE guildid = $1;`, [id, value]);
				return value;
			} else {
				await client.query(`DELETE FROM prefix
				WHERE guildid = $1`, [id]);
				return botconfig.prefix;
			}
		}
	},
	getRisk: async function(client, id) {
		let data = await client.query(`SELECT guildid FROM risk
		WHERE guildid=$1;`, [id]);
		return (data.rows[0]) ? true : false;
	},
	risk: async function(client, id) {
		let data = await client.query(`SELECT guildid FROM risk
		WHERE guildid=$1;`, [id]);
		if (data.rows[0]) {
			await client.query(`DELETE FROM risk
			WHERE guildid=$1`, [id]);
			return false;
		} else {
			await client.query(`INSERT INTO risk
			VALUES ($1)`, [id]);
			return true;
		}
	},
};