const botconfig = require("../botconfig.js");
module.exports.run = async (bot) => {
	bot.on("message", (message) => {
		if (!message.author.bot || message.channel.type !== "dm") {
			var rawPrefix = bot.databases.prefixes.find((value) => value.guild === message.guild.id);
			if (new RegExp(`^<@!?${bot.user.id}> prefix$`, "").test(message.content.toLowerCase())) {
				var prefix = (rawPrefix != null) ? rawPrefix.prefix : bot.defaultPrefix;
				return message.reply(`My prefix is \`${prefix}\``).catch(() => {
					return message.author.send(`You attempted to use a command in ${message.channel}, but I can not chat there.`).catch(function() {});
				});
			}
			if (new RegExp(`^<@!?${bot.user.id}> prefix reset$`, "").test(message.content.toLowerCase()) && (message.member.hasPermission("MANAGE_GUILD"))) {
				if (prefix !== botconfig.prefix) {
					bot.databases.prefixes.splice(bot.databases.prefixes.indexOf(bot.databases.prefixes.find((value) => value.guild === message.guild.id)), 1);
					if (rawPrefix) rawPrefix.msg.delete();
					return message.react("\u2705").catch(function() {});
				} else {
					return message.react("\u2705").catch(function() {});
				}
			}
		}
	});
};
