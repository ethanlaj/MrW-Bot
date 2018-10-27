const botconfig = require("./botconfig.js");
const Discord = require("discord.js");
const fs = require("fs");
const util = require("util");
var cleverio = require("cleverbot.io"),
	cleverbot = new cleverio(process.env.CLEVER_USER, process.env.CLEVER_KEY);
const bot = new Discord.Client({ disableEveryone: true, fetchAllMembers: true });
bot.counter = false;
bot.commands = { enabledCommands: new Discord.Collection(), disabledCommands: [] };
bot.allcommands = new Discord.Collection();
bot.rateLimits = { poll: [], report: [], afk: [], collect: [], gamble: [] };
bot.databases = { disabled: [], prefixes: [], coins: [], risk: []};
bot.loaders = { enabledLoaders: [], disabledLoaders: [] };
bot.defaultPrefix = botconfig.prefix;
var loadFile = fs.readdirSync(__dirname + "/load");

cleverio.prototype.askAsync = util.promisify(cleverbot.ask);
cleverbot.setNick(process.env.CLEVER_SESSION);
for (let file of loadFile) {
	try {
		let loader = require("./load/" + file);
		bot.loaders.enabledLoaders.push(loader);
	} catch (err) {
		bot.loaders.disabledLoaders.push(file);
		console.log(`\nThe ${file} load module failed to load:`);
		console.log(err);
	}
}

function checkCommand(command, name) {
	var resultOfCheck = [true, null];
	if (!command.run) resultOfCheck[0] = false; resultOfCheck[1] = `Missing Function: "module.run" of ${name}.`;
	if (!command.help) resultOfCheck[0] = false; resultOfCheck[1] = `Missing Object: "module.help" of ${name}.`;
	if (command.help && !command.help.name) resultOfCheck[0] = false; resultOfCheck[1] = `Missing String: "module.help.name" of ${name}.`;
	return resultOfCheck;
}

fs.readdir("./commands/", (err, files) => {
	if (err) console.log(err);
	var jsfiles = files.filter((f) => f.split(".").pop() === "js");
	if (jsfiles.length <= 0) return console.log("Couldn't find commands.");
	for (let i= 0, len = jsfiles.length; i < len; i++) {
		const f = jsfiles[i];
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
	}
});

bot.on("ready", async () => {
	console.log(`${bot.user.tag} is online. ` +
		`${bot.commands.enabledCommands.size}/${bot.commands.enabledCommands.size + bot.commands.disabledCommands.length}` +
		" commands loaded successfully.");
	let loaders = bot.loaders.enabledLoaders;
	for (let loader of loaders) {
		if (loader.run != null) loader.run(bot);
	}
});

bot.on("message", async (message) => {
	var args;
	if (message.channel.type !== "dm" && !message.author.bot) {
		var rawPrefix = bot.databases.prefixes.find((value) => value.guild === message.guild.id);
		var prefix = (rawPrefix != undefined) ? rawPrefix.prefix : bot.defaultPrefix;
		var permissionLevel = bot.getPermissionLevel(message.author);
		if (message.content.startsWith(prefix)) {
			args = message.content.split(" ").slice(1);
			let content = args.join(" ");
			let cmd = message.content.split(" ")[0].toLowerCase().slice(prefix.length);
			var commandFile = bot.commands.enabledCommands.find((command) => command.help.name === cmd || (command.help.aliases || []).includes(cmd));
			if (commandFile != null) {
				const disabled = bot.databases.disabled.find((value) => value.guild === message.guild.id);
				var disableCheck = (disabled == null) ? false : true;
				if (disableCheck) disableCheck = (disabled.commands.includes(cmd)) ? true : false;
				if (!disableCheck) {
					commandFile.run(bot, message, args, prefix, content, permissionLevel);
				} else message.reply("This command is disabled by an admin in this server!");
			}
		}
	} else if (new RegExp(`^<@!?${bot.user.id}>`, "").test(message.content)) {
		args = message.content.split(" ");
		let mention = args[0];
		args.shift();
		if (!args[0]) return;
		let cmd = message.content.split(" ")[1].toLowerCase().slice(mention + 1);
		commandFile = bot.commands.enabledCommands.get(cmd);
		if (commandFile != null) {
			message.mentions.members.delete(bot.user.id);
			message.mentions.users.delete(bot.user.id);
			message.content = message.content.replace(`${mention} `, prefix);
			args.shift();
			let content = args.join(" ");
			commandFile = bot.commands.enabledCommands.find((command) => command.help.name === cmd || (command.help.aliases || []).includes(cmd));
			if (commandFile != null) {
				const disabled = bot.databases.disabled.find((value) => value.guild === message.guild.id);
				let disableCheck = (disabled == null) ? false : true;
				if (disableCheck) disableCheck = (disabled.commands.includes(cmd)) ? true : false;
				if (!disableCheck) {
					commandFile.run(bot, message, args, prefix, content, permissionLevel);
				} else message.reply("This command is disabled by an admin in this server!");
			}
		}
	} else if (!message.author.bot || message.channel.type !== "dm") {
		if (new RegExp(`^<@!?${bot.user.id}> prefix$`, "").test(message.content.toLowerCase())) {
			return message.reply(`My prefix is \`${prefix}\``).catch(() => {
				return message.author.send(`You attempted to use a command in ${message.channel}, but I can not chat there.`).catch(function() {});
			});
		} else if (new RegExp(`^<@!?${bot.user.id}> prefix reset$`, "").test(message.content.toLowerCase()) && (message.member.hasPermission("MANAGE_GUILD"))) {
			if (prefix !== botconfig.prefix) {
				bot.databases.prefixes.splice(bot.databases.prefixes.indexOf(bot.databases.prefixes.find((value) => value.guild === message.guild.id)), 1);
				if (rawPrefix) rawPrefix.msg.delete();
				return message.react("\u2705").catch(function() {});
			} else {
				return message.react("\u2705").catch(function() {});
			}
		}
	} else {
		let search = message.content.split(" ");
		search.shift();
		search = args.join(" ");
		message.channel.startTyping();
		cleverbot.askAsync(search).then((response) => {
			message.channel.stopTyping();
			message.reply(response);
		}).catch((e) => {
			message.channel.stopTyping();
			console.log(e);
		});
	}

});
bot.login(botconfig.token);
