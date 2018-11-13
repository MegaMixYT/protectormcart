const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Вы не администратор!");
        let words = args[0];
        if(!words) return message.reply("Вы должны указать текст!");
        let botmessage = args.join(" ");
        message.delete().catch();
        message.channel.send(botmessage);
}

module.exports.help = {
    name: "say"
}