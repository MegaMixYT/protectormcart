const Discord = require("discord.js");
let prefixs = require('../prefix.json');
let fs = require('fs');

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Вы не Администратор!');
let prefixss = args[0];
    if(!prefixss) return message.channel.send(`Префикс на этом сервере **${prefixs[message.guild.id].prefix}**`);
if(!prefixs[message.guild.id]){
    prefixs[message.guild.id] = {
prefix: prefixss
    };
}
prefixs[message.guild.id].prefix = prefixss;
fs.writeFile("../prefix.json", JSON.stringify(prefixss), (err) => {
    if(err) return console.log(err)
});
let prEmbed = new Discord.RichEmbed()
.setColor('00ff54')
.setTitle('Префикс успешно установлен')
.addField('Ваш префикс', prefixss, false);
message.channel.send(prEmbed)
}

module.exports.help = {
    name: "prefix"
}
