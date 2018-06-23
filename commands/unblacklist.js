module.exports.run = async (bot, message, args, prefix, content, permissionLevel) => {
	if (permissionLevel >= 3) {
		let channel = bot.channels.get("443931370968973312");
		let pingeduser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		let userid = args[0];
		let messages = await channel.fetchMessages({
			limit: 100
		});
		if (!pingeduser) {
			let barray = messages.filter((m) => RegExp(userid, "gi")
				.test(m.content));
			let auser = barray.first();
			if (auser) {
				auser.delete();
				message.react("\u2705");
			} else return message.reply("This user is not blacklisted!");
		} else {
			let darray = messages.filter((m) => RegExp(pingeduser.id, "gi")
				.test(m.content));
			let buser = darray.first();
			if (buser) {
				buser.delete();
				message.react("\u2705");
			} else return message.reply("This user is not blacklisted!");
		}
	}
};
module.exports.help = {
	name: "unblacklist",
	description: "Unblacklists a user from the report command",
	type: "Restricted"
};
