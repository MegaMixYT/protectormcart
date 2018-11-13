const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.channel.send(`${message.author}, ваш пинг** ${message.author.ping** мс`);
}
module.exports.help = {
    name: "ping"
}
