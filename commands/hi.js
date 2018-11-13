const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.delete();
    message.channel.send(`@everyone, ${message.author} Сказал всем привет!`);
}




module.exports.help = {
    name: "hi"
}