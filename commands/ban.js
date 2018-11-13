const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.channel.send("Пользователь не найден!")
        let bReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Вы не администратор!");
        if(bUser.hasPermission("ADMINISTRATOR")) return message.reply("Администраторов нельзя банить!");
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
        let banEmbed = new Discord.RichEmbed()
        .setColor(randomAnswer)
        .addField("Забаненный пользователь", `${bUser}`)
        .addField("Забанен администратором", `${message.author}`)
        .addField("Забанен в", message.createdAt)
        .addField("Причина бана", `${bReason}.`);
       
        message.guild.member(bUser).ban(bReason);
       message.channel.send(banEmbed);

        return;
}

module.exports.help = {
    name: "ban"
}