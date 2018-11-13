const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const m = await message.channel.send("Измерение Ждите :satellite_orbital: ");
    m.edit(`${message.author}, ваш пинг** ${m.createdTimestamp - message.createdTimestamp}** мс   Пинг**${Math.round(client.ping)}**мс`);
}
module.exports.help = {
    name: "ping"
}
