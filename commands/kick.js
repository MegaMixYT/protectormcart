const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.channel.send("Пользователь не найден!")
        let kReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Вы не администратор!");
        if(kUser.hasPermission("ADMINISTRATOR")) return message.reply("Администраторов нельзя кикать!");
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

        let kickEmbed = new Discord.RichEmbed()
        .setColor(randomAnswer)
        .addField("Кикнутый пользователь", `${kUser}`)
        .addField("Кикнут администратором", `${message.author}`)
        .addField("Кикнут в", message.createdAt)
        .addField("Причина кика", `${kReason}.`);
       
        message.guild.member(kUser).kick(kReason);
        message.channel.send(kickEmbed);

        return;
}

module.exports.help = {
    name: "kick"
}