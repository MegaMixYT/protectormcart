const { Client, Util } = require('discord.js');
const Discord = require('discord.js');
const fs = require("fs");
const ms = require("ms");
const xp = require("./xp.json");
const prefixs = require("./prefix.json");
const YouTube = require('simple-youtube-api');
const opus = require('node-opus');
const ytdl = require('ytdl-core');
const youtube = new YouTube(process.env.GOOGLE_API_KEY);
const queue = new Map();
const mysql = require('mysql');
const DBL = require("dblapi.js");

//MySQL Connect
const dbl = new DBL(process.env.BOT_KEY)
const con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password:  process.env.PASS,
  database:  process.env.DATABASE
});
//MySQL Connect Message
con.connect(err => {
	if (err) throw err;
  console.log("Сonnected to database")
})
//MySQL END
const bot = new Client();

var answers = [
    `VasBoat | db!help`,
    `VasBoat | bit.ly/protectori`
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



//New server
bot.on('guildCreate', async guild => {
guild.createRole({name:'announcements'});
let g = guild.channels.find(v => v.name === "vasboat-announcements");
if(!g){
guild.createChannel({name:'vasboat-announcements'});
}
let gg = guild.channels.find(v => v.name === "vasboat-announcements");
guild.channels.get(gg.id).send('@everyone если вы хотите получать уведомления о боте VasBoat напишите `db!новости`');
})
//New server


bot.on('message', async message => {
    if(message.author.bot) return;
    let prefix = 'db!';
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
let prefix = 'db!';
let xpAdd = Math.floor(Math.random() * 7) + 8;
let curxp = con.query(`SELECT * FROM xp WHERE id = '${message.author.id}'`, (err, rows) => {
     if(!rows[0]) return curxp = '0' ;
    curxp = rows[0].xp;
})
let curlvl = con.query(`SELECT * FROM xp WHERE id = '${message.author.id}'`, (err, rows) => {
     if(!rows[0]) return curlvl = '0' ;
    curlvl = rows[0].curlvl;
})
	let = curlvll = curlvl + 1;
	let nexXP = curxp + xpAdd;
	let nxtLvl = curlvl * 700;
con.query(`UPDATE xp SET xp = '${nexXP}' WHERE id = '${message.author.id}'`);
if(nxtLvl <= curxp){
con.query(`UPDATE xp SET level = '${curlvll}' WHERE id = '${message.author.id}'`);
    let lvlup = new Discord.RichEmbed()
    .setTitle(`${message.author.username} у вас новый уровень!`)
    .setThumbnail(message.author.displayAvatarURL)
    .addField(`Ваш уровень`, curlvl + 1)
    .setColor('00ff54');
    message.channel.send(lvlup);
};
if(message.content == `${prefix}level`){
let nxtLvlXp = curlvl * 700;
	let difference = nxtLvlXp - curxp;
let lvlEmbed = new Discord.RichEmbed()
.setTitle(`${message.author.username} ваш уровень:`)
.setThumbnail(message.author.displayAvatarURL)
.setColor('00ff54')
.addField("Опыт", curxp, true)
.addField("Уровень", curlvl, true)
.setFooter(`До следующего уровня осталось ${difference}`, message.author.disaplyAvatarURL);
message.channel.send(lvlEmbed);
	curxp.forEach(o =>{
console.log(o)
})
}
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
bot.on('messageUpdate', async (oldMessage, newMessage) => {
	let message = newMessage;
  if(message.author.bot) return;
    let prefix = 'db!';
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
if(message.content.startsWith(prefix)){
let commandfile = bot.commands.get(cmd.slice(prefix.length));
if(commandfile) commandfile.run(bot,message,args);
}else{}
  });
 //MUSIC
  bot.on('message', async msg => { // eslint-disable-line
    let PREFIX = 'db!';
    if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(PREFIX)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(PREFIX.length)

	if (command === 'play') {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send('Вы должны быть в голосовом канале чтобы играть музыку!');
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.send('Я не могу подключится к вашему каналу, нет прав!');
		}
		if (!permissions.has('SPEAK')) {
			return msg.channel.send('Я не могу говорить, нет прав!');
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return msg.channel.send(`✅ Плейлист: **${playlist.title}** добавлен в очередь!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					msg.channel.send(`
__**Выбор песни:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Укажите значение для выбора одного из результатов поиска в диапазоне от 1 до 10.
					`);
					// eslint-disable-next-line max-depth
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send('Нет или введено недопустимое значение, отмена выбора видео.');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send('🆘 Я не смог получить результаты поиска.');
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === 'skip') {
		if (!msg.member.voiceChannel) return msg.channel.send('Вы не в голосовом канале!');
		if (!serverQueue) return msg.channel.send('Нет ничего, что я мог бы пропустить для тебя.');
		serverQueue.connection.dispatcher.end('Skip комманда была использована!');
		return msg.channel.send('Пропущено');
	} else if (command === 'stop') {
		if (!msg.member.voiceChannel) return msg.channel.send('Вы не в голосовом канале!');
		if (!serverQueue) return msg.channel.send('Нет ничего, что я мог бы остановить для тебя.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop комманда была использована!');
		return msg.channel.send('Остановлено');
	} else if (command === 'volume') {
		if (!msg.member.voiceChannel) return msg.channel.send('Вы не в голосовом канале!');
		if (!serverQueue) return msg.channel.send('Ничего не играет.');
		if(args[1] != 0 && args[1] != 1 && args[1] != 2 && args[1] != 3 && args[1] != 4 && args[1] != 5 && args[1] != 6 && args[1] != 7 && args[1] != 8 && args[1] != 9 && args[1] != 10) return msg.channel.send('Не больше 10!');
		if (!args[1]) return msg.channel.send(`The current volume is: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.send(`Я установил громкость на: **${args[1]}**`);
	} else if (command === 'np') {
		if (!serverQueue) return msg.channel.send('Ничего не играет.');
		return msg.channel.send(`🎶 Сейчас играет: **${serverQueue.songs[0].title}**`);
	} else if (command === 'queue') {
		if (!serverQueue) return msg.channel.send('Ничего не играет.');
		return msg.channel.send(`
__**Очередь песен:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Сейчас играет:** ${serverQueue.songs[0].title}
		`);
	} else if (command === 'pause') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('⏸ Пауза!');
		}
		return msg.channel.send('Ничего не играет.');
	} else if (command === 'resume') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send('▶ Возобновление!');
		}
		return msg.channel.send('Ничего не играет.');
	}

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`Не удалось подключиться к голосовому каналу: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`Не удалось подключиться к голосовому каналу: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`✅ **${song.title}** добавлена в очередь!`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
}
//MUSIC END
