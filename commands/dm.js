const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.delete();
let komu = args[0];
args.shift()
let mesg = args.join(" ");
let kto = message.member;
if(!komu) return message.reply('Пользователь не найден!');
if(!mesg) return message.reply('Вы должны указать текст сообщения!');
const gg = await message.reply('Успешно отправлено')
message.guild.members.get(komu);
message.mentions.members.first().send(`Пользователь ${kto} отправил вам сообщение с текстом '${mesg}'`);
setTimeout(() => {
    gg.delete();
  }, 4000);

}



module.exports.help ={
    name: "dm"
}