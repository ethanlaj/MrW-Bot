var app = require("../utility/databaseFunctions.js");
module.exports.run = async (bot, message) => {
	if (message.author.id !== message.guild.ownerID) return message.reply("This command is restricted to `Server Owner`.");
	var risk = await app.getRisk(bot.client, message.guild.id);
	console.log(risk);
	if (risk) {
		app.risk(bot.client, message.guild.id).then(() => {
			message.reply("Successfully disabled risky commands in all channels on your server. These now only work in NSFW marked channels.");
		});
	} else {
		app.risk(bot.client, message.guild.id).then(() => {
			message.reply("Successfully enabled risky commands in all channels on your server. You are now responsible for anyone who uses these commands inappropriately.");
		});
	}
};
module.exports.help = {
	name: "allowrisk",
	description: "Allows risky commands to be used in all channels in your server",
	type: "Miscellaneous"
};
