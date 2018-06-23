module.exports.run = async (bot, message, args, prefix, content, permissionLevel) => {
	if (permissionLevel === 8) {
		let tbh = args.join(" ")
			.toLowerCase();
		await bot.user.setStatus(`${tbh}`);
		if ((tbh === "online") || (tbh === "idle") || (tbh === "invisible") || (tbh === "dnd")) {
			await message.react("\u2705");
		} else {
			message.reply("Not a valid option!\nOptions: \n**Online\nidle\ninvisible\ndnd**");
		}
	}
};
module.exports.help = {
	name: "setcolor",
	description: "Sets the bot's color",
	type: "Restricted"
};
