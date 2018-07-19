const { RichEmbed } = require("discord.js");
const math = require("mathjs");

module.exports = {
	help: {
		name: "calculator",
		aliases: ["math", "calc", "c"],
		description: "Allows you to run math equations"
	},
	run: async (_1, message, _2, _3, content) => {
		var expression = content;
		var mathEmbed = new RichEmbed();
		if (expression) {
			try {
				var result = math.eval(expression);
				mathEmbed
					.setTitle("Success")
					.setDescription(`Result:\n\`\`\`js\n${result}${" ".repeat(3)}\`\`\``)
					.setColor("GREEN");
			} catch (exc) {
				mathEmbed
					.setTitle("Error")
					.setDescription(`Error while parsing expression supplied: \`${exc.message.replace(/`/g, "")}\`.`)
					.setColor("RED");
			}
			message.channel.send({ embed: mathEmbed });
		} else message.reply("You must supply an expression.");
	}
};
