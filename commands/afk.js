module.exports.run = async (bot, message, args, prefix, content) => {
	let afkmsg = content;
	if (!afkmsg) afkmsg = "No reason provided.";
	setTimeout(function() {
		bot.rateLimits.afk.push({ user: message.author.id, reason: afkmsg });
	}, 500);
	message.reply(`You are now AFK!!!: \`${afkmsg}\`\nTo become un-AFK, just talk again.`).then((msg) => msg.delete(5000)).catch(function() {});
	message.delete().catch(function() {});
};
module.exports.help = {
	name: "afk",
	description: "Sets a message to be sent whenever you are pinged",
	type: "Miscellaneous"
};
