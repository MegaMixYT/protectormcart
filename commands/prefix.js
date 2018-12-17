const Discord = require("discord.js");

module.exports.run = async (bot, message, args, con) => {
let curpref = con.query(`SELECT prefix FROM xp WHERE id = '${message.guild.id}'`);
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Вы не Администратор!');
let prefixss = args[0];
    if(!prefixss) return message.channel.send(`Префикс на этом сервере **${curpref}**`);
con.query(`UPDATE xp SET prefix = prefixss WHERE id = '${message.guild.id}'`);

let prEmbed = new Discord.RichEmbed()
.setColor('00ff54')
.setTitle('Префикс успешно установлен')
.addField('Ваш префикс', prefixss, false);
message.channel.send(prEmbed)
}

module.exports.help = {
    name: "prefix"
}
