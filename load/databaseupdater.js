module.exports.run = async (bot) => {
	var channels;
	channels = bot.guilds.get("443929284411654144").channels.filter((m) => RegExp("wbotprefixes-database", "gi").test(m.name));
	var nestedMessages = await Promise.all(channels.map((ch) => ch.fetchMessages({ limit: 100 })));
	var flatMessages = nestedMessages.reduce((a, b) => a.concat(b));
	for (let msg of flatMessages) {
		var guild = msg.content.split(" ")[0];
		var prefix = msg.content.split(" ")[1];
		bot.databases.prefixes.push({ guild: guild, prefix: prefix });
	}
	channels = bot.guilds.get("443929284411654144").channels.filter((m) => RegExp("wbotdisable-database", "gi").test(m.name));
	nestedMessages = await Promise.all(channels.map((ch) => ch.fetchMessages({ limit: 100 })));
	flatMessages = nestedMessages.reduce((a, b) => a.concat(b));
	for (let msg of flatMessages) {
		var commands = msg.content.split(" ");
		guild = commands.shift();
		bot.databases.disabled.push({ guild: guild, commands: commands });
	}
};
