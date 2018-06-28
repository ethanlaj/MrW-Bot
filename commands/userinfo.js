const { RichEmbed } = require("discord.js");

function userInfo(embed, user) {
	return embed
		.setTitle(user.tag)
		.setDescription("WIP : more coming soon.")
		.setThumbnail(user.displayAvatarURL);
}

module.exports = {
	help: {
		name: "userinfo",
		description: "Get information on users by supplying their userid.",
		type: "Information"
	},
	run: (client, message, args) => {
		var user = args[0] || "";
		if (client.users.has(val)) {
			var userObj = client.users.get(val);
			if (userObj != null) {
				message.channel.send({ embed: userInfo(new RichEmbed().setColor(0x00AE86), userObj) });
			}
		} else {
			
		}
	}
};
