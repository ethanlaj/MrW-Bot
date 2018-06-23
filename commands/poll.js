const Discord = require("discord.js");
module.exports.run = async (bot, message, args, prefix, content) => {
	const checker = bot.rateLimits.poll.find((value) => value === message.author.id);
	if (checker) return message.reply("You can only use this command once every two minutes!").catch(function () { });
	bot.rateLimits.poll.push(message.author.id);
	setTimeout(function () {
		bot.rateLimits.poll.splice(bot.rateLimits.afk.indexOf(checker), 1);
	}, 120000);
	const pollTitle = content.split(":")[0];
	if (content.split(":")[1] !== undefined) {
		var pollOptions = content.split(":").slice(1).join(":").split("|");
		if (pollOptions[0] !== "") {
			if (pollOptions.length <= 9 && pollOptions.length >= 2) {
				const eA = ["1⃣", "2⃣", "3⃣", "4⃣", "5⃣", "6⃣", "7⃣", "8⃣", "9⃣"];
				pollOptions = pollOptions.map((pollOption, index) => {
					return `${eA[index]} ${pollOption}`;
				});
				const pollEmbed = new Discord.RichEmbed()
					.setTitle("**" + pollTitle + "**")
					.setDescription(pollOptions.join("\n"))
					.setColor(0x00AE86)
					.setFooter(`${bot.user.username} | Poll by ${message.author.tag}.`);
				message.channel.send({ embed: pollEmbed }).then(async function (poll) {
					var orderLoop = 0;
					while (orderLoop !== pollOptions.length) {
						await poll.react(eA[orderLoop]);
						orderLoop = orderLoop + 1;
					}
				}).catch(() => {
					message.reply("Something went wrong and I could not create the poll.").catch(() => {
						message.author.send(`You attempted to use the \`poll\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
					});
				});
			} else {
				message.reply("Please specify at least 2 and at most 9 poll options. Example: `!!poll title: option 1 | option 2 | option 3`.")
					.catch(() => {
						message.author.send(`You attempted to use the \`poll\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
					});
			}
		} else {
			message.reply("Please specify valid poll options. Example: `!!poll title: option 1 | option 2 | option 3`.").catch(() => {
				message.author.send(`You attempted to use the \`poll\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
			});
		}
	} else {
		message.reply("Please specify a valid poll title. Example: `!!poll title: option 1 | option 2 | option 3`.").catch(() => {
			message.author.send(`You attempted to use the \`poll\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
		});
	}
};
module.exports.help = {
	name: "poll",
	aliases: ["p"],
	description: "Creates a poll",
	type: "Miscellaneous"
};
