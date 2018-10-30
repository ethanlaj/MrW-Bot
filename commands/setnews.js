var app = require("../utility/databaseFunctions.js");
module.exports.run = async (bot, message, args, prefix, content, permissionLevel) => {
	if (permissionLevel === 8) {
		let update = message.content.substr(prefix.length + 8);
		await app.setNews(bot.client, update);
		await message.react("\u2705");
	}
};
module.exports.help = {
	name: "setnews",
	description: "Sets the bot's news",
	type: "Restricted"
};
