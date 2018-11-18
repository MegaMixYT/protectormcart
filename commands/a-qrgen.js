const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {
message.delete();
var text = args.join(" ");
var uri = `https://qr-generator.qrcode.studio/qr/custom?download=false&file=png&data=${encodeURIComponent(text)}&size=1000&config=%7B%22body%22%3A%22leaf%22%2C%22eye%22%3A%22frame12%22%2C%22eyeBall%22%3A%22ball15%22%2C%22erf1%22%3A%5B%5D%2C%22erf2%22%3A%5B%5D%2C%22erf3%22%3A%5B%5D%2C%22brf1%22%3A%5B%5D%2C%22brf2%22%3A%5B%5D%2C%22brf3%22%3A%5B%5D%2C%22bodyColor%22%3A%22%2300FFE1%22%2C%22bgColor%22%3A%22%23000000%22%2C%22eye1Color%22%3A%22%2300FFE1%22%2C%22eye2Color%22%3A%22%2300FFE1%22%2C%22eye3Color%22%3A%22%2300FFE1%22%2C%22eyeBall1Color%22%3A%22%2300FFE1%22%2C%22eyeBall2Color%22%3A%22%2300FFE1%22%2C%22eyeBall3Color%22%3A%22%2300FFE1%22%2C%22gradientColor1%22%3A%22%22%2C%22gradientColor2%22%3A%22%22%2C%22gradientType%22%3A%22linear%22%2C%22gradientOnEyes%22%3A%22true%22%2C%22logo%22%3A%https%3A%2F%2Fi.imgur.com%2FzmVIcFV.png%22%2C%22logoMode%22%3A%22default%22%7D`;
let emb = new Discord.RichEmbed()
.setColor('00ff54')
.setTitle('Ваш QR-code')
.setImage(uri);
message.channel.send(emb)
}

module.exports.help = {
    name: "a-qrgen"
}
