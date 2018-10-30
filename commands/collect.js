var app = require("../utility/databaseFunctions.js");
module.exports.run = (bot, message) => {
	if (bot.rateLimits.collect.includes(message.author.id)) return message.reply("You can only collect w coins every 15 minutes!").catch(() => {
		message.author.send(`You attempted to use the \`collect\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
	});
	var collectAmount;
	collectAmount = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
	app.changeCoins(bot.client, message.author.id, collectAmount).then(() => {
		bot.rateLimits.collect.push(message.author.id);
		message.reply(`You looted ${collectAmount} w coins!`).catch(() => {
			message.author.send(`You attempted to use the \`collect\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
		});
		bot.setTimeout(() => {
			bot.rateLimits.collect.splice(bot.rateLimits.collect.indexOf(message.author.id), 1);
		}, 900000);
	}).catch(() => {
		message.reply("Couldn't change w coins.").catch(() => {
			message.author.send(`You attempted to use the \`collect\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
		});
	});
};
module.exports.help = {
	name: "collect",
	description: "Collect w coins every 15 minutes",
	type: "Currency"
};
