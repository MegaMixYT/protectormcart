const Discord = require("discord.js");
const QRCode = require("qrcode");

module.exports.run = async (bot, message, args) => {
var text = args.join(" ");
let emb = new Discord.RichEmbed()
.setColor('00ff54')
.setTitle('Ваш QR-code')
.setImage(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text}`);
message.channel.send(emb)
}

module.exports.help = {
    name: "qrgen"
}