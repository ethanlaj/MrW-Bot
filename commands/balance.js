var app = require("../utility/databaseFunctions.js");
module.exports.run = async (bot, message) => {
	var coins;
	if (message.mentions.members.first()) {
		coins = await app.getCoins(bot.client, message.mentions.members.first().id);
		message.reply(`${message.mentions.members.first().user.tag} has \`${coins}\` w coins.`).catch(() => {
			message.author.send(`You attempted to use the \`balance\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
		});
	} else {
		coins = await app.getCoins(bot.client, message.author.id);
		message.reply(`You have \`${coins}\` w coins.`).catch(() => {
			message.author.send(`You attempted to use the \`balance\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
		});
	}
};
module.exports.help = {
	name: "balance",
	description: "Shows the number of w coins you have",
	type: "Currency",
	aliases: ["bal"]
};
