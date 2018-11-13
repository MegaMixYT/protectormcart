const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
            let tomute = message.guild.member(message.mentions.members.first() || message.guild.members.get(args[0]));
            if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Вы не администратор!");
            if(!tomute) return message.reply("Пользователь не найден!");
            if(tomute.hasPermission("ADMINISTRATOR")) return message.reply("Администраторов нельзя мутить!");
            let muterole = message.guild.roles.find(`name`, "muted");
            if(!muterole){
                try{
                    muterole = message.guild.createRole({
                        name: "muted",
                        color: "#000000",
                        permissions: []
                    })
                    message.guild.channels.forEach(async (channel, id) => {
                      await channel.overwritePermissions(muterole, {
                          SEND_MESSAGES: false,
                          ADD_REACTIONS: false
                      });
                    });
    
        }catch(e){
            console.log(e.stack);
        }
        }
    
        tomute.addRole(muterole.id);
        message.reply(`<@${tomute.id}> замучен!`);
       
 
}

module.exports.help = {
    name: "mute"
}