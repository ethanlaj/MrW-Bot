module.exports.run = async (bot, message, args, prefix, content, permissionLevel) => {
	if (permissionLevel === 8) {
		let tbh = args.join(" ")
			.toUpperCase();
		bot.user.setActivity(`${bot.user.presence.game.name}`, {
			type: `${tbh}`
		});
		message.react("\u2705");
	}
};
module.exports.help = {
	name: "setactivity",
	description: "Sets the activity for the bot",
	type: "Restricted"
};
