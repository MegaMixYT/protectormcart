const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
            let unmute = message.guild.member(message.mentions.members.first() || message.guild.members.get(args[0]));
            if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Вы не администратор!");
            if(!unmute) return message.reply("Пользователь не найден!");
            if(unmute.hasPermission("ADMINISTRATOR")) return message.reply("Администраторов нельзя мутить!");
            let muterole = message.guild.roles.find(`name`, "muted");
            unmute.removeRole(muterole)

}

module.exports.help = {
    name: "unmute"
}