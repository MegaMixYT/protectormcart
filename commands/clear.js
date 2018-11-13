const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Вы не администратор!");
        if(!args[0]) return message.channel.send("Укажите число сообщений для удаления!");
        if(args[0] >= 100) return message.channel.send("Не больше чем 100 сообщений за раз!");
        message.channel.bulkDelete(args[0]).catch(err => { 
          message.channel.send("Из-за ограничений дискорда я не могу удалять сообщения, отправленные раньше чем 14 дней назад");
          message.channel.send("Не"); 
}).then(() => {
            message.channel.send(`очищено ${args[0]} сообщений!`);
        });
}

module.exports.help = {
    name: "clear"
}