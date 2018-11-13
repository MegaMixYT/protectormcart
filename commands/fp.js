const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.delete();
    let fpm = message.guild.member(message.mentions.members.first());
    if(!fpm) return message.channel.send(` Хватит творить дичь!`);
    message.channel.send(`${fpm} Хватит творить дичь!`);
}



module.exports.help ={
    name: "fp"
}