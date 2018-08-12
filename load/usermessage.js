const Discord = require("discord.js");
module.exports.run = async (bot) => {
	bot.on("guildMemberAdd", async (member) => {
		var dbguild = bot.guilds.get("443929284411654144");
		var dbchannels = dbguild.channels.filter((channel) => channel.name.includes("autoroles-database"));
		if (dbchannels != null) {
			for (let dbchannel of dbchannels.array()) {
				dbchannel.fetchMessages({ limit: 100 }).then((messages) => {
					for (let msg of messages.array()) {
						if (msg.content.startsWith(member.guild.id)) {
							var msgargs = msg.content.split(" ").slice(1);
							member.addRoles(msgargs.map((role) => member.guild.roles.get(role)));
						}
					}
				}).catch(function() {});
			}
		}
		var announcerchannel = bot.channels.get("443931378011078666");
		var announcermsgs = await announcerchannel.fetchMessages({ limit: 100 });
		var announcermsg = announcermsgs.find((m) => m.content.startsWith(member.guild.id));
		if (!announcermsg) return;
		//guildid | toggle | channel | avatar | footer | hellomsg | goodbyemsg
		var settings = announcermsg.content;
		var togglesetting = settings.split("|")[1].trim();
		var channelsetting = settings.split("|")[2].trim();
		var avatarsetting = settings.split("|")[3].trim();
		var footersetting = settings.split("|")[4].trim();
		var hellomsg = settings.split("|")[5].trim();
		if (togglesetting === "false") return;
		if (channelsetting === "none") return;
		var himessage;
		if (hellomsg !== "none") {
			himessage = hellomsg.replace(/{user((\.|-| )(mention))?}/gi, member.user.toString());
			himessage = himessage.replace(/{user(\.|-| )tag}/gi, member.user.tag);
			himessage = himessage.replace(/{user(\.|-| )discrim(inator)?}/gi, member.user.discriminator);
			himessage = himessage.replace(/{user(\.|-| )(user)?name}/gi, member.user.username);
			himessage = himessage.replace(/{user(\.|-| )nick(name)?}/gi, member.displayName);
			himessage = himessage.replace(/{user(\.|-| )id}/gi, member.user.id);
			himessage = himessage.replace(/{user(\.|-| )status}/gi, member.user.presence.status);
			himessage = himessage.replace(/{user(\.|-| )game}/gi, (member.user.presence.game || { name: "none" }).name);
			himessage = himessage.replace(/{guild(\.|-| )id}/gi, member.guild.id);
			himessage = himessage.replace(/{guild(\.|-| )name}/gi, member.guild.name);
			himessage = himessage.replace(/{guild(\.|-| )membercount}/gi, member.guild.memberCount.toString());
		} else {
			himessage = `Welcome to ${member.guild.name}, ${member.user.toString()}! Have a good time here!`;
		}
		var welcomeMessage = new Discord.RichEmbed()
			.setTitle("Welcome")
			.setColor("#ffa500")
			.setDescription(himessage);
		if (footersetting === "true") welcomeMessage.setFooter(`${member.guild.name} is now at ${member.guild.memberCount} members!`);
		if (avatarsetting === "true") welcomeMessage.setThumbnail(member.user.displayAvatarURL);
		var channeltosend = bot.channels.get(channelsetting);
		if (!channeltosend) return;
		channeltosend.send({
			embed: welcomeMessage
		})
			.catch(() => {
				welcomeMessage.setThumbnail(null);
				channeltosend.send({
					embed: welcomeMessage
				})
					.catch(function () { });
			});
	});
	bot.on("guildMemberRemove", async (member) => {
		var announcerchannel = bot.channels.get("443931378011078666");
		var announcermsgs = await announcerchannel.fetchMessages({
			limit: 100
		});
		var announcermsg = announcermsgs.find((m) => m.content.startsWith(member.guild.id));
		if (!announcermsg) return;
		//guildid | toggle | channel | avatar | footer | hellomsg | goodbyemsg
		var settings = announcermsg.content;
		var togglesetting = settings.split("|")[1].trim();
		var channelsetting = settings.split("|")[2].trim();
		var avatarsetting = settings.split("|")[3].trim();
		var footersetting = settings.split("|")[4].trim();
		var byemsg = settings.split("|")[6].trim();
		if (togglesetting === "false") return;
		if (channelsetting === "none") return;
		var byemessage;
		if (byemsg !== "none") {
			byemessage = byemsg.replace(/{user((\.|-| )(mention))?}/gi, member.user.toString());
			byemessage = byemessage.replace(/{user(\.|-| )tag}/gi, member.user.tag);
			byemessage = byemessage.replace(/{user(\.|-| )discrim(inator)?}/gi, member.user.discriminator);
			byemessage = byemessage.replace(/{user(\.|-| )(user)?name}/gi, member.user.username);
			byemessage = byemessage.replace(/{user(\.|-| )nick(name)?}/gi, member.displayName);
			byemessage = byemessage.replace(/{user(\.|-| )id}/gi, member.user.id);
			byemessage = byemessage.replace(/{user(\.|-| )status}/gi, member.user.presence.status);
			byemessage = byemessage.replace(/{user(\.|-| )game}/gi, ( member.user.presence.game || { name: "none" }).name);
			byemessage = byemessage.replace(/{guild(\.|-| )id}/gi, member.guild.id);
			byemessage = byemessage.replace(/{guild(\.|-| )name}/gi, member.guild.name);
			byemessage = byemessage.replace(/{guild(\.|-| )membercount}/gi, member.guild.memberCount.toString());
		} else {
			byemessage = `Sad to see you leave ${member.user.toString()}.`;
		}
		var goodbyeMessage = new Discord.RichEmbed()
			.setTitle("Goodbye")
			.setColor("#0000ff")
			.setDescription(byemessage);
		if (footersetting === "true") goodbyeMessage.setFooter(`${member.guild.name} is now at ${member.guild.memberCount} members!`);
		if (avatarsetting === "true") goodbyeMessage.setThumbnail(member.user.displayAvatarURL);
		var channeltosend = bot.channels.get(channelsetting);
		if (!channeltosend) return;
		channeltosend.send({ embed: goodbyeMessage }).catch(() => {
			goodbyeMessage.setThumbnail(null);
			channeltosend.send({ embed: goodbyeMessage }).catch(function () { });
		});
	});
	bot.on("guildCreate", async (guilda) => {
		let hello = new Discord.RichEmbed()
			.setTitle("Thanks For Adding Me To Your Server!!")
			.setColor("#0000ff")
			.setDescription("Thanks for adding Mr.W Bot to your server he is a very helpful bot! This bot is owned by Windows 10 > MacOS#0001 and was made by the epic @ethanlaj and @gt_c For all the cmds run !!help however if u need any help join our support server https://discord.gg/UC37qGN");
		let hichannels = guilda.channels.filter((c) => c.type === "text");
		let ahichannels = hichannels.filter((c) => c.permissionsFor(bot.user)
			.has("READ_MESSAGES"));
		let fhichannel = ahichannels.filter((c) => c.permissionsFor(bot.user)
			.has("SEND_MESSAGES"));
		let hichannel = fhichannel.first();
		if (hichannel) {
			await hichannel.send(hello);
		}
		if (bot.counter) await bot.user.setActivity(`${bot.guilds.size} servers`, { type: "WATCHING" });
	});
};
