const { RichEmbed } = require("discord.js");
function clean(text, token) {
	if (typeof (text) === "string") {
		return text.replace(/`/g, "`" + String.fromCharCode(8203))
			.replace(/@/g, "@" + String.fromCharCode(8203))
			.replace(new RegExp(token, "gi"), "[ HIDDEN ]");
	} else {
		return text;
	}
}

var allowed = ["399975738008141824"];
module.exports.run = async (bot, message, args) => {
	console.log('fuc')
	if (allowed.includes(message.author.id)) {
		try {
			var code = args.join(" ");
			var currentTime = Date.now();
			var evaled = await eval(code);
			if (typeof evaled !== "string")
				evaled = require("util").inspect(evaled);
			message.channel.send({
				embed: new RichEmbed()
					.setTitle("Evaled")
					.setDescription(`\`\`\`js\n${clean(evaled, bot.token).substring(0, 500)}\`\`\``)
					.setFooter(`Took ${Date.now() - currentTime} milliseconds.`)
					.setColor("GREEN")
			});
		} catch (err) {
			message.channel.send({
				embed: new RichEmbed()
					.setTitle("Error")
					.setDescription(`\`\`\`x1\n${clean(err, bot.token)}\`\`\``)
					.setFooter(`Took ${Date.now() - currentTime} milliseconds.`)
					.setColor("RED")
			});
		}
	} else {
		message.channel.send({
			embed: new RichEmbed()
				.setTitle("Access Denied")
				.setDescription("```x1\nYou don't have permission to use this command.```")
				.setColor("RED")
		});
	}
};
module.exports.help = {
	name: "eval"
};
