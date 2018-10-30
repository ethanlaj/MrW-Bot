var app = require("../utility/databaseFunctions.js");
module.exports.run = async (bot, message, args) => {
	if (bot.rateLimits.gamble.includes(message.author.id)) return message.reply("You can only gamble with w coins every 2 minutes!").catch(() => {
		message.author.send(`You attempted to use the \`gamble\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
	});
	if (!args[0]) return message.reply("You must provide a number of w coins to gamble!").catch(() => {
		message.author.send(`You attempted to use the \`gamble\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
	});
	var gambleAmount = Number(args[0]);
	if (!gambleAmount) return message.reply("Gamble amount must be a number!").catch(() => {
		message.author.send(`You attempted to use the \`gamble\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
	});
	if (gambleAmount <= 10) return message.reply("Gamble amount must be greater than 10!").catch(() => {
		message.author.send(`You attempted to use the \`gamble\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
	});
	var currentCoins = await app.getCoins(bot.client, message.author.id);
	if (gambleAmount > currentCoins) return message.reply("You don't have enough coins to do this!").catch(() => {
		message.author.send(`You attempted to use the \`gamble\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
	});
	if (((Math.random() * 10) < 4)) {
		app.changeCoins(bot.client, message.author.id, gambleAmount).then(() => {
			bot.rateLimits.gamble.push(message.author.id);
			message.reply(`You gained ${gambleAmount} w coins!`).catch(() => {
				message.author.send(`You attempted to use the \`gamble\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
			});
			bot.setTimeout(() => {
				bot.rateLimits.gamble.splice(bot.rateLimits.gamble.indexOf(message.author.id), 1);
			}, 120000);
		}).catch(() => {
			message.reply("Couldn't change amount of w coins").catch(() => {
				message.author.send(`You attempted to use the \`gamble\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
			});
		});
	} else {
		app.changeCoins(bot.client, message.author.id, -gambleAmount).then(() => {
			bot.rateLimits.gamble.push(message.author.id);
			message.reply(`You lost ${gambleAmount} w coins!`).catch(() => {
				message.author.send(`You attempted to use the \`gamble\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
			});
			bot.setTimeout(() => {
				bot.rateLimits.gamble.splice(bot.rateLimits.gamble.indexOf(message.author.id), 1);
			}, 120000);
		}).catch(() => {
			message.reply("Couldn't change amount of w coins").catch(() => {
				message.author.send(`You attempted to use the \`gamble\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
			});
		});
	}
};
module.exports.help = {
	name: "gamble",
	description: "Gamble with your w coins",
	type: "Currency"
};
