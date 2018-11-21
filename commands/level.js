const Discord = require("discord.js");
let xp = require('../xp.json');

module.exports.run = async (bot, message, args) => {
if(!xp[message.author.id]){
    xp[message.author.id] = {
xp: 0,
level: 1
    };
}
let curxp = xp[message.author.id].xp;
let curlvl = xp[message.author.id].level;
let nxtLvlXp = curlvl * 700;
let difference = nxtLvlXp - curxp;

let lvlEmbed = new Discord.RichEmbed()
.setTitle(`${message.author.username} ваш уровень:`)
.addField("Уровень", curlvl, true)
.addField("Опыт", curxp, true)
.setThumbnail(message.author.displayAvatarURL)
.setColor('00ff54')
.setFooter(`До следующего опыта ${difference} опыта`, message.author.disaplyAvatarURL);
message.channel.send(lvlEmbed)
}

module.exports.help = {
    name: "level"
}