const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
	let name = args[0];
	let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	var marray;
	if (!user) {
		marray = message.guild.members.filter((m) => RegExp(name, "gi").test(m.displayName));
		user = marray.first();
	}
	if (!user) return message.channel.send("Couldn't find this user.");
	let usericon = user.user.avatarURL;
	let ab = new Discord.RichEmbed()
		.setTitle("User Information")
		.setColor("#000080")
		.setThumbnail(usericon)
		.addField("Username", user.user.username)
		.addField("Discriminator", user.user.discriminator)
		.addField("User ID", user.user.id)
		.addField("Joined At", user.joinedAt)
		.addField("Registered At", user.user.createdAt);
	return message.channel.send({ embed: ab });
};
module.exports.help = {
	name: "about",
	description: "Gets information about a server member",
	type: "Information"
};
