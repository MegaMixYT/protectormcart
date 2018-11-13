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
let und = new Discord.RichEmbed()
.setTitle('Информация обо мне:')
.addField(`Бот находиться на ${bot.guilds.size} серверах`, `---`)
.addField(`Бот используется ${bot.users.size} участниками со всех серверов`, `---`)
.setColor(randomAnswer);
message.channel.send(und)
}

module.exports.help = {
    name: "info"
}