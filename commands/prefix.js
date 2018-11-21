const Discord = require("discord.js");
let prefixs = require('../prefix.json');

module.exports.run = async (bot, message, args) => {
let prefixss = args[0];
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