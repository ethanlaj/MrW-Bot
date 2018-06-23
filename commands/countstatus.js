module.exports.run = async (bot, message, args, prefix, content, permissionLevel) => {
	if (permissionLevel === 8) {
		if (bot.counter === false) {
			bot.user.setActivity(`${bot.guilds.size} servers`, {
				type: "WATCHING"
			});
			message.react("\u2705");
			bot.counter = true;
		} else if (bot.counter === true) {
			bot.user.setActivity("Games", {
				type: "PLAYING"
			});
			message.react("\u2705");
			bot.counter = false;
		}
	}
};
module.exports.help = {
	name: "countstatus",
	description: "Sets the bot's server count to the number of servers",
	type: "Restricted"
};
