const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
let curxp = xp[message.author.id].xp;
let curlvl = con.query(`SELECT level FROM xp WHERE id = '${message.author.id}'`);
let nxtLvlXp = curlvl * 700;
let difference = nxtLvlXp - curxp;

let lvlEmbed = new Discord.RichEmbed()
.setTitle(`${message.author.username} ваш уровень:`)
.addField("Уровень", curlvl, true)
.addField("Опыт", curxp, true)
.setThumbnail(message.author.displayAvatarURL)
.setColor('00ff54')
.setFooter(`До следующего уровня ${difference} опыта`, message.author.disaplyAvatarURL);
message.channel.send(lvlEmbed)
}

module.exports.help = {
    name: "level"
}
