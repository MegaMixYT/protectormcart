const Discord = require("discord.js");
const request = require("request");

module.exports.run = async (bot, message, args) => {
let lng = args[0];
if(lng != ["aa","ab","af","am","an","ar","as","ay","az","ba","be","bg","bh","bi","bn","bo","br","ca","co","cs","cy","da","de","dz","el","en","eo","es","et","eu","fa","fi","fj","fo","fr","fy","ga","gd","gl","gn","gu","gv","ha","he","iw","hi","hr","ht","hu","hy","ia","id","in","ie","ii","ik","io","is","it","iu","ja","jv","ka","kk","kl","km","kn","ko","ks","ku","ky","la","li","ln","lo","lt","lv","mg","mi","mk","ml","mn","mo","mr","ms","mt","my","na","ne","nl","no","oc","om","or","pa","pl","ps","pt","qu","rm","rn","ro","ru","rw","sa","sd","sg","sh","si","sk","sl","sm","sn","so","sq","sr","ss","st","su","sv","sw","ta","te","tg","th","ti","tk","tl","tn","to","tr","ts","tt","tw","ug","uk","ur","uz","vi","vo","wa","wo","xh","yi","ji","yo","zh","zh","zu"]) return [message.reply("Используйте ISO коды языка с этой ссылки! https://snipp.ru/view/137"), message.reply("Use ISO language codes from this link! https://snipp.ru/view/137")];
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
