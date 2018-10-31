var app = require("../utility/databaseFunctions.js");
module.exports.run = async (bot, message, args, prefix, content) => {
	if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply("You don't have permission to use this command!");
	if (!args[0]) return await message.reply(`You did not supply the correct parameters! \n\n\`${prefix}announcer toggle\n${prefix}announcer channel (#channel)\n${prefix}announcer avatar\n${prefix}announcer footer\n${prefix}announcer joinmessage (message)\n${prefix}announcer leavemessage (message)\n${prefix}announcer reset\``);
	var settings = await app.getAnnounce(bot.client, message.guild.id);
	if (settings.toggle) {
		//guildid | toggle | channel | avatar | footer | hellomsg | goodbyemsg
		let togglesetting = settings.toggle;
		let channelsetting = settings.channelid;
		let avatarsetting = settings.avatars;
		let footersetting = settings.footer;
		let hellomsg = settings.hellomsg;
		let byemsg = settings.byemsg;
		//execute if msg
		if (args[0].toLowerCase() === "toggle") {
			if (togglesetting === true) {
				await app.updateAnnouncer(bot.client, message.guild.id, false, channelsetting, avatarsetting, footersetting, hellomsg, byemsg);
				return await message.reply("I have `disabled` join/leave messages!");
			} else if (togglesetting === false) {
				await app.updateAnnouncer(bot.client, message.guild.id, true, channelsetting, avatarsetting, footersetting, hellomsg, byemsg);
				return await message.reply("I have `enabled` join/leave messages!");
			}
		} else if (args[0].toLowerCase() === "channel") {
			if (message.mentions.channels.first().id) {
				await app.updateAnnouncer(bot.client, message.guild.id, togglesetting, message.mentions.channels.first().id, avatarsetting, footersetting, hellomsg, byemsg);
				return message.reply(`Set join/leave messages to <#${message.mentions.channels.first().id}>!`);
			} else {
				return message.reply("Please **mention** a valid channel!");
			}
		} else if (args[0].toLowerCase() === "avatar") {
			if (avatarsetting === true) {
				await app.updateAnnouncer(bot.client, message.guild.id, togglesetting, channelsetting, false, footersetting, hellomsg, byemsg);
				return await message.reply("I have `disabled` avatars on join/leave messages!");
			} else if (avatarsetting === false) {
				await app.updateAnnouncer(bot.client, message.guild.id, togglesetting, channelsetting, true, footersetting, hellomsg, byemsg);
				return await message.reply("I have `enabled` avatars on join/leave messages!");
			}
		} else if (args[0].toLowerCase() === "footer") {
			if (footersetting === true) {
				await app.updateAnnouncer(bot.client, message.guild.id, togglesetting, channelsetting, avatarsetting, false, hellomsg, byemsg);
				return await message.reply("I have `disabled` footers on join/leave messages!");
			} else if (footersetting === false) {
				await app.updateAnnouncer(bot.client, message.guild.id, togglesetting, channelsetting, avatarsetting, true, hellomsg, byemsg);
				return await message.reply("I have `enabled` footers on join/leave messages!");
			}
		} else if (args[0].toLowerCase() === "joinmessage") {
			if (content.slice(args[0].length).length <= 300) {
				await app.updateAnnouncer(bot.client, message.guild.id, togglesetting, channelsetting, avatarsetting, footersetting, content.slice(args[0].length), byemsg);
				return await message.reply("Join message was edited!");
			} else {
				message.reply("Your join message cannot be more than 300 characters!");
			}
		} else if (args[0].toLowerCase() === "leavemessage") {
			if (content.slice(args[0].length)
				.length <= 300) {
				await app.updateAnnouncer(bot.client, message.guild.id, togglesetting, channelsetting, avatarsetting, footersetting, hellomsg, content.slice(args[0].length));
				return await message.reply("Leave message was edited!");
			} else {
				return await message.reply("Your leave message cannot be more than 300 characters!");
			}
		} else if (args[0].toLowerCase() === "reset") {
			await app.updateAnnouncer(bot.client, message.guild.id, false);
			return await message.reply("Erased your join/leave message settings!");
		} else if (args[0].toLowerCase() === "view") {
			return await message.reply(`Announcer messages is \`${togglesetting}\`\nChannel: <#${channelsetting}>\nAvatars: \`${avatarsetting}\`\nFooter: \`${footersetting}\`\nJoin message: \`${hellomsg}\`\nLeave message: \`${byemsg}\``).catch(function() {});
		} else {
			return await message.reply(`You did not supply the correct parameters! \n\n\`${prefix}announcer toggle\n${prefix}announcer channel (#channel)\n${prefix}announcer avatar\n${prefix}announcer footer\n${prefix}announcer joinmessage (message)\n${prefix}announcer leavemessage (message)\n${prefix}announcer reset\``);
		}
		//execute if no msg
	} else {
		let togglesetting = false;
		let channelsetting = 0;
		let avatarsetting = false;
		let footersetting = false;
		let hellomsg = "none";
		let byemsg = "none";
		if (args[0].toLowerCase() === "toggle") {
			await app.updateAnnouncer(bot.client, message.guild.id, true, channelsetting, avatarsetting, footersetting, hellomsg, byemsg);
			return await message.reply("I have `enabled` join/leave messages!");
		} else if (args[0].toLowerCase() === "channel") {
			if (message.mentions.channels.first()
				.id) {
				await app.updateAnnouncer(bot.client, message.guild.id, togglesetting, message.mentions.channels.first().id, avatarsetting, footersetting, hellomsg, byemsg);
				return message.reply(`Set join/leave messages to <#${message.mentions.channels.first().id}>!`);
			} else {
				return message.reply("Please **mention** a valid channel!");
			}
		} else if (args[0].toLowerCase() === "avatar") {
			await app.updateAnnouncer(bot.client, message.guild.id, togglesetting, channelsetting, true, footersetting, hellomsg, byemsg);
			return await message.reply("I have `enabled` avatars on join/leave messages!");
		} else if (args[0].toLowerCase() === "footer") {
			await app.updateAnnouncer(bot.client, message.guild.id, togglesetting, channelsetting, avatarsetting, true, hellomsg, byemsg);
			return await message.reply("I have `enabled` footers on join/leave messages!");
		} else if (args[0].toLowerCase() === "joinmessage") {
			if (content.slice(args[0].length)
				.length <= 300) {
				await app.updateAnnouncer(bot.client, message.guild.id, togglesetting, channelsetting, avatarsetting, footersetting, content.slice(args[0].length), byemsg);
				return await message.reply("Join message was edited!");
			} else {
				message.reply("Your join message cannot be more than 300 characters!");
			}
		} else if (args[0].toLowerCase() === "leavemessage") {
			if (content.slice(args[0].length)
				.length <= 300) {
				await app.updateAnnouncer(bot.client, message.guild.id, togglesetting, channelsetting, avatarsetting, footersetting, hellomsg, content.slice(args[0].length));
				return await message.reply("Leave message was edited!");
			} else {
				await message.reply("Your leave message cannot be more than 300 characters!");
			}
		} else if (args[0].toLowerCase() === "reset") {
			return await message.reply("Erased your join/leave message settings!");
		}
	}
};
module.exports.help = {
	name: "announcer",
	description: "Sets up join/leave messages",
	type: "Miscellaneous"
};