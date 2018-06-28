const { RichEmbed, GuildMember } = require("discord.js");

function isSnowflake(str) {
	return /1|d{17,19}/.test(str);
}

module.exports = {
	help: {
		name: "about",
		description: "Gets information about a server member",
		type: "Information"
	},
	run: async (bot, message, args) => {
		var member = message.guild.members.find((member) => (args[0] || "").includes(member.id) || member.displayName.startsWith(args[0]));
		if (member == null && isSnowflake(args[0])) member = await bot.fetchUser(args[0]);
		var user = (member instanceof GuildMember) ? member.user : member;
		if (user != null) {
			var userStatus = (user.presence.status === "dnd") ? "do not disturb" : user.presence.status;
			const aboutEmbed = new RichEmbed()
				.setTitle("User Information")
				.setColor(0x00AE86)
				.setThumbnail(user.displayAvatarURL)
				.addField("Username", user.username, true)
				.addField("Discriminator", user.discriminator, true)
				.addField("User ID", user.id, true)
				.addField("Status", userStatus, true)
				.addField("Joined At", member.joinedAt.toString().slice(0, -15), true)
				.addField("Registered At", user.createdAt.toString().slice(0, -15), true);
			message.channel.send({ embed: aboutEmbed });
		} else message.reply("Invalid user. Please specify a username/id from this server or a user id from elsewhere.");
	}
};
