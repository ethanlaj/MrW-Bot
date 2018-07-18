const { RichEmbed } = require("discord.js");
const weather = require("weather-js");

module.exports = {
	help: {
		name: "weather",
		description: "Displays the weather in the area given",
		aliases: ["w"],
		category: "Information"
	},
	run: async (_1, message, _2, _3, content) => {
		var area = content;
		if (area) {
			weather.find({ search: area, degreeType: "F" }, (err, result) => {
				if (err) console.warn(err.stack);
				result = result[0];
				if (result) {
					var weatherEmbed = new RichEmbed()
						.setTitle(`Weather in ${result.location.name}`)
						.addField("Temperature", `${result.current.temperature} °F.`, true)
						.addField("Feels Like", `${result.current.feelslike} °F.`, true)
						.addField("Humidity", `${result.current.humidity}%`, true)
						.addField("Sky", `${result.current.skytext}.`, true)
						.addField("Last Updated", result.current.observationtime, true)
						.addField("Windspeed", `${result.current.windspeed}.`, true)
						.setColor(0x00AE86)
					message.channel.send({ embed: weatherEmbed });
				} else message.channel.send("Could not find the area given.");
			});
		} else message.reply("Please specify an area to view the weather in.");
	}
};
