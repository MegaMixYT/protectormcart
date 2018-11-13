const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    var answers = [
        "#ff0000",
        "#ff7700",
        "#eeff00",
        "#00ff08",
        "#00ffe5",
        "#1900ff",
        "#8c00ff"
      ] 
      var randomAnswer = answers[Math.floor(Math.random() * answers.length)];
        let aurl = message.mentions.users.first() || message.author;
        let avEMB = new Discord.RichEmbed()
        .setColor(randomAnswer)
        .setTitle(`Аватар пользователя ${aurl.username}`)
        .setImage(aurl.displayAvatarURL);
     message.channel.send(avEMB)
}

module.exports.help = {
    name: "avatar"
}