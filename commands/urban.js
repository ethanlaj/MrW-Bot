var ud = require("urban-dictionary");
var Discord = require("discord.js");
function createEmbed(result) {
	var urbanEmbed = new Discord.RichEmbed()
		.setTitle(result.word)
		.setColor("#4682B4")
		.setDescription(`:thumbsup: ${result.thumbs_up} | :thumbsdown: ${result.thumbs_down}`)
		.setURL(result.permalink)
		.addField("Definition", result.definition.replace(/\[|\]/g, ""))
		.addField("Example", result.example.replace(/\[|\]/g, ""));
	return urbanEmbed;
}
module.exports.run = async (bot, message, args) => {
	if (!message.channel.nsfw && !bot.databases.risk.find((m) => m.guild === message.guild.id)) return message.reply("You can only use this command in channels marked as NSFW! You can enable these types of commands with the `..allowrisk` command.");
	if (args[0]) {
		ud.term(args.join(" ")).then((results) => {
			var result = results.entries[0];
			message.channel.send(createEmbed(result).setFooter(`Ran by ${message.author.tag}`)).catch(() => {
				message.author.send(`You attempted to use the \`urban\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
			});
		}).catch(() => {
			message.reply("Couldn't find anything with this search!");
		});
	} else {
		ud.random().then((result) => {
			message.channel.send(createEmbed(result).setFooter(`Ran by ${message.author.tag}`)).catch(() => {
				message.author.send(`You attempted to use the \`urban\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
			});
		});
	}
};
module.exports.help = {
	name: "urban",
	description: "Searches up something on the urban dictionary",
	type: "Fun"
};
