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
      let hEmbed = new Discord.RichEmbed()
      .setThumbnail(message.author.displayAvatarURL)
      .setColor(randomAnswer)
       .setTitle('Приглашения:')
       .addField('Пригласить бота', 'https://bit.ly/protectori', false)
       .addField('Оффициальный сервер', 'https://discord.gg/bk3stFj', false)
       .setFooter(`DydleBoat by MCArTyR`, message.author.displayAvatarURL);
      message.channel.send(hEmbed);
}



module.exports.help ={
    name: "invite"
}
