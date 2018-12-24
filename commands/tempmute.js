const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

//!tempmute @user 1s/m/h/d

let tomute = message.mentions.members.first() || message.guild.members.get(args[0]);
if(!tomute) return message.reply("Пользователь не найден!");
if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Я не могу замутить этого пользователя!");
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("У вас нет права `MANAGE_MESSAGES`!");
let muterole = message.guild.roles.find(`name`, "muted");
//start of create role
if(!muterole){
    try{
        muterole = await message.guild.createRole({
            name:"muted",
            color: "#ff0000",
            permissions:[]
        })
    message.guild.channels.forEach(channel => {
            channel.overwritePermissions(muterole.id, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
            }catch(e){
                console.log(e.stack)
            }
}
//end of create role
let mutetime = args[1];
if(!mutetime) return message.reply("Укажите время!");

await tomute.addRole(muterole.id);
message.reply(`<@${tomute.id}> замучен на ${ms(ms(mutetime))}`);

setTimeout(function(){
tomute.removeRole(muterole.id);
message.channel.send(`<@${tomute.id}> размучен!`);
}, ms(mutetime));


//end of module
}

module.exports.help = {
    name: "tempmute"
}