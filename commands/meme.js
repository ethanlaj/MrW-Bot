const getMemeUrls = require('get-meme-urls');
const Discord = require("discord.js");
module.exports.run = async (bot, message, args, prefix, content) => {
let sq = content
if(!sq) return message.reply("You must provide something to search with!")
let ind = Math.floor(Math.random() * 250);
let ps = 25
let inde = Math.floor(Math.random() * 5);


getMemeUrls(sq, {pageSize: 25, pageIndex: ind}).then(result => {
  if(result[0]) {
    var meme = result[Math.floor(Math.random() * result.length)];
	return message.reply(meme)
  }
  }).catch(err => {
console.log(err)
 });
	
	
	
	getMemeUrls(sq, {pageSize: 25, pageIndex: inde}).then(resulto => {
  if(!resulto[0]) {
	 	  return message.reply("Couldn't find memes with this name!")
 }
		var memeo = resulto[Math.floor(Math.random() * resulto.length)];
	message.reply(memeo)
	}).catch(err => {
console.log(err)
  }).catch(err => {
console.log(err)
 });
		
		
		

}
module.exports.help = {
	name: "meme"
}
