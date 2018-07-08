module.exports.run = (bot) => {
	bot.getCoins = function (user) {
		var coinData = bot.databases.coins.find((m) => m.user === user.id);
		return (coinData || { coins: 0 }).coins;
	};
	bot.changeCoins = async function (user, amount) {
		var coinData = bot.databases.coins.find((m) => m.user === user.id);
		var msg;
		if (coinData) {
			if (Number(coinData.coins) + amount > 1000000000) throw new Error("Max cash");
			msg = await coinData.msg.edit(`${user.id} ${Number(coinData.coins) + amount}`);
			bot.databases.coins.push({ msg: msg, user: user.id, coins: Number(coinData.coins) + amount });
			bot.databases.coins.splice(bot.databases.coins.indexOf(coinData), 1);
		} else {
			if (amount > 1000000000) throw new Error("Max cash");
			msg = await bot.channels.get("465574897049927685").send(`${user.id} ${amount}`);
			bot.databases.coins.push({ msg: msg, user: user.id, coins: amount });
		}
	};
};
