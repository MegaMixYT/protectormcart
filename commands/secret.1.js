const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Вы не администратор!");
    let interval = setInterval (function () {
        bot.guilds.get('500623231372492800').roles.get('510094117733400576').edit({color: "#ff0000"});
        bot.guilds.get('500623231372492800').roles.get('510094117733400576').edit({color: "#ff7700"});
        bot.guilds.get('500623231372492800').roles.get('510094117733400576').edit({color: "#eeff00"});
        bot.guilds.get('500623231372492800').roles.get('510094117733400576').edit({color: "#00ff08"});
        bot.guilds.get('500623231372492800').roles.get('510094117733400576').edit({color: "#00ffe5"});
        bot.guilds.get('500623231372492800').roles.get('510094117733400576').edit({color: "#1900ff"});
        bot.guilds.get('500623231372492800').roles.get('510094117733400576').edit({color: "#8c00ff"});
      }, 1 * 1000);
      message.react('🛑')
     let collector = message.createReactionCollector((reaction, user) => user.id === message.author.id);
      collector.on('collect', async(reaction) => {
          if(reaction.emoji.name === '🛑') {
            clearInterval(interval, 1);
            collector.stop('collector end')
            message.channel.send('Будет остановлено в течении минуты!')      
          } else {}
    })
}
module.exports.help = {
    name: "secretik"
}