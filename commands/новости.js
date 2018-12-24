const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
let g = message.guild.roles.find(v => v.name === 'announcements');
if(!g){
message.guild.createRole({name:"announcements"});
}
let gg = message.guild.roles.find(v => v.name === 'announcements');
message.member.addRole(gg.id);
}

module.exports.help = {
    name: "новости"
}
