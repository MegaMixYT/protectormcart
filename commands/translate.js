const Discord = require("discord.js");
const request = require("request");

module.exports.run = async (bot, message, args) => {
let lng = args[0];
let txt = args.join(" ").replace(`${lng}`, "");
request(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20181202T195027Z.a57565d4a85d089a.c0204f150bbaf72674ee2dbdd5d2faa8114b5c47&text=${encodeURIComponent(txt)}&lang=${lng}`, (err, res, body) => {
let arr = JSON.parse((body));
let trEmb = new Discord.RichEmbed()
.setTitle(`Переводчик ${arr.lang}`)
.addField("До перевода", txt)
.addField("После перевода", arr.text);
message.channel.send(trEmb);
})

}



module.exports.help ={
    name: "translate"
}
