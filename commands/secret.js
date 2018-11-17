const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Вы не администратор!");
    let rol = args[0];
    let guildss = message.guild.id;
    let interval = setInterval (function () {
        bot.guilds.get(guildss).roles.get(rol).edit({color: "#ff0000"});
        bot.guilds.get(guildss).roles.get(rol).edit({color: "#ff7700"});
        bot.guilds.get(guildss).roles.get(rol).edit({color: "#eeff00"});
        bot.guilds.get(guildss).roles.get(rol).edit({color: "#00ff08"});
        bot.guilds.get(guildss).roles.get(rol).edit({color: "#00ffe5"});
        bot.guilds.get(guildss).roles.get(rol).edit({color: "#1900ff"});
        bot.guilds.get(guildss).roles.get(rol).edit({color: "#8c00ff"});
      }, 1 * 1000).catch(err);
    if(err) return message.channel.send('Указывайте id роли а не пинг!')
      message.channel.send('Скажите `стоп` чтобы остановить')
      let collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id);
      collector.on('collect', message => {
          if(message.content === 'стоп') {
            clearInterval(interval, 1);
            collector.stop('collector end')
            message.channel.send('Будет остановлено в течении минуты!')      
          } else if(message.content === 'Стоп') {
            clearInterval(interval, 1);
            collector.stop('collector end')
            message.channel.send('Будет остановлено в течении минуты!') 
      }
    })
}
module.exports.help = {
    name: "secret"
}
