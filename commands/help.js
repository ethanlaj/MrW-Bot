const Discord = require("discord.js");
module.exports.run = async (bot, message, args, prefix) => {
	var commandsEmbed = new Discord.RichEmbed()
		.setTitle("Commands")
		.setDescription("`Default Bot Prefix:` !!");
	const TYPES = ["Fun", "Information", "Roles", "Moderation", "Miscellaneous", "Restricted"],
		MAP = (command) => `\`${prefix}${command.help.name}\` - ${command.help.description}`;
	for (let i= 0, len = TYPES.length; i < len; i++) {
		const type = TYPES[i];
		commandsEmbed.addField(type, bot.allcommands.filter((command) => command.help.type === type).map(MAP));
	}
	message.author.send({ embed: commandsEmbed }).then(() => {
		message.react("✅").catch(function () { });
	}).catch(() => {
		message.reply("I could not DM you the list of commands! Please check your privacy commands and try again!").catch(function () { });
	});
};
module.exports.help = {
	name: "help",
	description: "Sends you this prompt",
	type: "Information"
};
