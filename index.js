const botconfig = require("./botconfig.js");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({ disableEveryone: true, fetchAllMembers: true });
bot.counter = false;
bot.commands = { enabledCommands: new Discord.Collection(), disabledCommands: [] };
bot.allcommands = new Discord.Collection();
bot.rateLimits = { poll: [], report: [], afk: [] };
bot.databases = { disabled: [], prefixes: [] };
bot.loaders = { enabledLoaders: [], disabledLoaders: [] };
fs.readdirSync(__dirname + "/load").forEach(file => {
	try {
		let loader = require("./load/" + file);
		bot.loaders.enabledLoaders.push(loader);
	} catch (err) {
		bot.loaders.disabledLoaders.push(file);
		console.log(`\nThe ${file} load module failed to load:`);
		console.log(err);
	}
});
function checkCommand(command, name) {
	var resultOfCheck = [true, null];
	if (!command.run) resultOfCheck[0] = false; resultOfCheck[1] = `Missing Function: "module.run" of ${name}.`;
	if (!command.help) resultOfCheck[0] = false; resultOfCheck[1] = `Missing Object: "module.help" of ${name}.`;
	if (command.help && !command.help.name) resultOfCheck[0] = false; resultOfCheck[1] = `Missing String: "module.help.name" of ${name}.`;
	return resultOfCheck;
}
fs.readdir("./commands/", (err, files) => {
	if (err) console.log(err);
	var jsfiles = files.filter(f => f.split(".").pop() === "js");
	if (jsfiles.length <= 0) return console.log("Couldn't find commands.");
	jsfiles.forEach((f) => {
		try {
			var props = require(`./commands/${f}`);
			bot.allcommands.set(props.help.name, props);
			if (checkCommand(props, f)[0]) {
				bot.commands.enabledCommands.set(props.help.name, props);
			} else {
				throw checkCommand(props, f)[1];
			}
		} catch (err) {
			bot.commands.disabledCommands.push(f);
			console.log(`\nThe ${f} command failed to load:`);
			console.log(err);
		}
	});
});
bot.on("ready", async () => {
	console.log(`${bot.user.tag} is online. ` +
		`${bot.commands.enabledCommands.size}/${bot.commands.enabledCommands.size + bot.commands.disabledCommands.length}` +
		" commands loaded successfully.");
	bot.loaders.enabledLoaders.forEach(loader => {
		if (loader.run != null) loader.run(bot);
	});
});
bot.on("message", (message) => {
	if (message.channel.type !== "dm" && !message.author.bot) {
		var cmd = message.content.split(" ")[0].toLowerCase();
		if (cmd != null) {
			var args = message.content.split(" ").slice(1),
				content = args.join(" ");
			var prefix = bot.databases.prefixes.find(value => value.guild === message.guild.id);
			prefix = (prefix != null) ? prefix.prefix : botconfig.prefix;
			cmd = cmd.slice(prefix.length);
			var permissionLevel = bot.getPermissionLevel(message.author);
			if (message.content.startsWith(prefix)) {
				let commandFile = bot.commands.enabledCommands.find(command => command.help.name === cmd || (command.help.aliases || []).includes(cmd));
				if (commandFile != null) {
					const disabled = bot.databases.disabled.find(value => value.guild === message.guild.id);
					let disableCheck = (disabled == null) ? false : true;
					if (disableCheck) disableCheck = (disabled.commands.includes(cmd)) ? true : false;
					if (!disableCheck) {
						commandFile.run(bot, message, args, prefix, content, permissionLevel);
					} else message.reply("This command is disabled by an admin in this server!");
				}
			} else if (message.content.startsWith(`<@!${bot.user.id}>`) || message.content.startsWith(`<@${bot.user.id}>`)) {
				if (message.content.startsWith(`<@${bot.user.id}>`)) {
					message.content = message.content.replace(`<@${bot.user.id}> `, `${prefix}`);
				} else if (message.content.startsWith(`<@!${bot.user.id}>`)) {
					message.content = message.content.replace(`<@!${bot.user.id}> `, `${prefix}`);
				}
				var messageArray = message.content.split(" ");
				args = messageArray.slice(1);
				cmd = message.content.split(" ")[0].toLowerCase();
				cmd = cmd.slice(prefix.length);
				let commandFile = bot.commands.enabledCommands.find(command => command.help.name === cmd || (command.help.aliases || []).includes(cmd));
				if (commandFile != null) {
					const disabled = bot.databases.disabled.find(value => value.guild === message.guild.id);
					let disableCheck = (disabled == null) ? false : true;
					if (disableCheck) disableCheck = (disabled.commands.includes(cmd)) ? true : false;
					if (!disableCheck) {
						commandFile.run(bot, message, args, prefix, content, permissionLevel);
					} else message.reply("This command is disabled by an admin in this server.");
				}
			}
		}
	}
});
bot.login(botconfig.token);
