const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {
var text = args.join(" ");
var uri = `https://api.qrserver.com/v1/create-qr-code/?size=900x900&data=${text}`.replace(/ /g,"%20");
var imgg = encodeURIComponent(uri);
let emb = new Discord.RichEmbed()
.setColor('00ff54')
.setTitle('Ваш QR-code')
.setImage(imgg);
message.channel.send(emb)
}

module.exports.help = {
    name: "qrgen"
}
