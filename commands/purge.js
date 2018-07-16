const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
	if (message.member.hasPermission("MANAGE_MESSAGES")) {
		let num = parseInt(args[0]);
		if (!num) return message.reply("You must provide the number of messages to delete!");
		if (num > 100) return message.reply("You can only purge 100 messages at a time!");
		message.channel.bulkDelete(num).then((messages) => {
			message.reply(`Deleted ${messages.size} messages that were not over two weeks old!`).then((msg) => {
				msg.delete(5000);
			});
			message.delete();
		});
		var logsDatabase = bot.channels.find("id", "443931379907166210");
		logsDatabase.fetchMessages({ limit: 100 }).then((logmessages) => {
			for (let msg of logmessages.array()) {
				var logChannel = bot.channels.get(msg.content.split(" ")[1]);
				if (logChannel == undefined) return msg.delete();
				var logGuild = logChannel.guild;
				if (logGuild == undefined) return msg.delete();
				if (`${logGuild.id}` === `${message.guild.id}`) {
					const purgeEmbed = new Discord.RichEmbed()
						.setTitle("Message Purge")
						.setColor("RED")
						.addField("Purge Information", `Messages Purged: \`${num}\`\nChannel Purged: ${message.channel}\nModerator: ${message.author}\nPurged At: \`${new Date(Date.now())}\``);
					logChannel.send({ embed: purgeEmbed }).catch(function() {});
				}
			}
		}).catch(function () { });
	} else return message.reply("You do not have permission to purge messages!");
};
module.exports.help = {
	name: "purge",
	description: "Deletes a specified amount of messages",
	type: "Moderation"
};
