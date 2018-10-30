var app = require("../utility/databaseFunctions.js");
module.exports.run = async (bot, message, args, oldprefix) => {
	if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply("You don't have permission to use this command!");
	if (!args[0]) return message.reply(`My prefix is \`${oldprefix}\``);
	let prefix = args[0];
	if (prefix.length > 5) return message.reply("The prefix cannot be more than 5 characters!");
	if (prefix === "reset") {
		await app.setPrefix(bot.client, message.guild.id);
		return message.reply("Successfully reset your prefix!");
	}
	await app.setPrefix(bot.client, message.guild.id, prefix);
	message.reply("Successfully changed your prefix!");
};
module.exports.help = {
	name: "setprefix",
	description: "Sets a new prefix for your server",
	type: "Miscellaneous"
};
