module.exports.run = (bot, message) => {
	if (message.mentions.members.first()) {
		message.reply(`${message.mentions.members.first().user.tag} has \`${bot.getCoins(message.mentions.members.first().user)}\` w coins.`).catch(() => {
			message.author.send(`You attempted to use the \`balance\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
		});
	} else {
		message.reply(`You have \`${bot.getCoins(message.author)}\` w coins.`).catch(() => {
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
