const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
        message.channel.send(`${message.member}, ваш пинг! ${m.createdTimestamp - message.createdTimestamp}мс`)
}
module.exports.help = {
    name: "ping"
}
