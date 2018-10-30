var app = require("../utility/databaseFunctions.js");
module.exports.run = async (bot, message) => {
	if (message.author.id !== "245877990938902529") return;
	message.reply(await app.getNews(bot.client, "hellow world of today"));
};
module.exports.help = {
	name: "dbtest",
	description: "tbh",
	type: "Restricted"
};
