module.exports.run = async (bot, message, args, prefix, content, permissionLevel) => {
	if (permissionLevel === 8) {
		let update = message.content.substr(prefix.length + 8);
		let channel = bot.channels.get("443931372508151820");
		let editor = await channel.fetchMessage("443935229548167174");
		await editor.edit(update);
		await message.react("\u2705");
	}
};
module.exports.help = {
	name: "setnews",
	description: "Sets the bot's news",
	type: "Restricted"
};
