module.exports.run = async (bot, message) => {
	var dataChannel = bot.channels.get("482694064165355520");
	if (message.author.id !== message.guild.ownerID) return message.reply("This command is restricted to `Server Owner`.");
	if (!bot.databases.risk.find((m) => m.guild === message.guild.id)) {
		dataChannel.send(message.guild.id).then((newMessage) => {
			message.reply("Successfully enabled risky commands in all channels on your server. You are now responsible for anyone who uses these commands inappropriately.").then(() => {
				bot.databases.risk.push({ msg: newMessage, guild: message.guild.id });
			});
		});
	} else {
		bot.databases.risk.find((m) => m.guild === message.guild.id).msg.delete().then(() => {
			message.reply("Successfully disabled risky commands in all channels on your server. These now only work in NSFW marked channels.").then(() => {
				bot.databases.risk.splice(bot.databases.risk.indexOf(bot.databases.risk.find((m) => m.guild === message.guild.id)), 1);
			});
		});
	}
};
module.exports.help = {
	name: "allowrisk",
	description: "Allows risky commands to be used in all channels in your server",
	type: "Miscellaneous"
};
