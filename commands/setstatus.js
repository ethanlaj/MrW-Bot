module.exports.run = async (bot, message, args, prefix, content, permissionLevel) => {
	if (permissionLevel === 8) {
		let tbh = args.join(" ");
		bot.user.setActivity(`${tbh}`, {
			type: bot.user.presence.game.type
		});
		message.react("\u2705");
	}
};
module.exports.help = {
	name: "setstatus",
	description: "Set's the bot's status",
	type: "Restricted"
};
