module.exports.run = async (bot, message) => {
	message.reply("**Invite me here!:** <https://discordapp.com/oauth2/authorize?client_id=419881218784493588&permissions=347201&scope=bot>");
};
module.exports.help = {
	name: "invite",
	description: "Sends the link to invite me",
	type: "Information"
};
