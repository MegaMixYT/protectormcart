const Discord = require('discord.js');

module.exports.run = async (bot,message,args) => {
let g = args[0];
if(!g) return message.channel.send('Укажите кол-во дней!')
message.guild.pruneMembers('${g}', true, `For ${g}days of inactivity`);
}

module.exports.help = {
name: 'prunememb'
}
