module.exports.run = async (bot) => {
	var channels = bot.guilds.get("443929284411654144").channels.filter((m) => RegExp("wbotdisable-database", "gi").test(m.name));
	var nestedMessages = await Promise.all(channels.map((ch) => ch.fetchMessages({ limit: 100 })));
	var flatMessages = nestedMessages.reduce((a, b) => a.concat(b));
	for (let msg of flatMessages.array()) {
		var commands = msg.content.split(" ");
		var guild = commands.shift();
		bot.databases.disabled.push({ guild: guild, commands: commands });
	}
};
