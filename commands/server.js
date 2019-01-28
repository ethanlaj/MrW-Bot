module.exports.run = async (bot, message) => {
	message.reply(`**${bot.user.username}'s support guild:** https://discord.gg/UC37qGN`);
};
module.exports.help = {
	name: "server",
	description: "Sends the link to the support server",
	type: "Information"
};
