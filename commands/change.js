var app = require("../utility/databaseFunctions.js");
module.exports.run = (bot, message, args, prefix, content, permissionLevel) => {
	if (permissionLevel !== 8) return;
	if (!args[1]) return message.reply("Invalid usage: `!change @user 10`").catch(() => {
		message.author.send(`You attempted to use the \`change\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
	});
	if (!message.mentions.members.first()) return message.reply("Invalid usage: `!change @user 10`").catch(() => {
		message.author.send(`You attempted to use the \`change\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
	});
	var changeAmount = Number(args[1]);
	var changeFor = message.mentions.members.first().user;
	if (changeFor.bot) return message.reply("No bots!").catch(() => {
		message.author.send(`You attempted to use the \`change\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
	});
	if (!changeAmount) return message.reply("Change amount must be a number! `!change @user 10`").catch(() => {
		message.author.send(`You attempted to use the \`change\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
	});
	app.changeCoins(bot.client, changeFor.id, changeAmount).then(() => {
		message.reply(`Changed amount by ${changeAmount} w coins for ${changeFor.tag}`).catch(() => {
			message.author.send(`You attempted to use the \`change\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
		});
	}).catch(() => {
		message.reply("Couldn't change user's coins").catch(() => {
			message.author.send(`You attempted to use the \`change\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
		});
	});
};
module.exports.help = {
	name: "change",
	description: "Adds/remove currency to a mentioned user",
	type: "Restricted",
};
