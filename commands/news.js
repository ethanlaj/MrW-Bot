const Discord = require("discord.js");
var app = require("../utility/databaseFunctions.js");
module.exports.run = async (bot, message) => {
	let editor = await app.getNews(bot.client);
	let thing = new Discord.RichEmbed()
		.setTitle("News")
		.setDescription(editor)
		.setFooter(`Requested by ${message.author.tag}`);
	await message.channel.send({ embed: thing });
};
module.exports.help = {
	name: "news",
	description: "Gives you updated news on me",
	type: "Information"
};
