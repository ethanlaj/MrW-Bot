var app = require("../utility/databaseFunctions.js");
module.exports.run = async (bot, message, args, prefix, content, permissionLevel) => {
	if (permissionLevel >= 3) {
		let pingeduser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		let userid = args[0];
		if (pingeduser) userid = pingeduser.id;
		var blacklisted = await app.blacklist(bot.client, userid);
		if (blacklisted) return message.reply("This user is now blacklisted!");
		else return message.reply("This user is now unblacklisted!");
	}
};
module.exports.help = {
	name: "blacklist",
	description: "Blacklists/unblacklists a user from the report command",
	type: "Restricted"
};
