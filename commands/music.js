const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
let c = new Discord.RichEmbed()
.setColor('00ff54')
.setTitle('Музыкальная помощь:')
.addField('db!music - Музыкальная помощь', 'Например: db!music', true)
.addField('d!play - Играть музыку', 'Например: db!play Omar Varela', true)
.addField('d!skip - Пропустить музыку', 'Например: db!skip', true)
.addField('d!stop - Остановить музыку', 'Например: db!stop', true)
.addField('d!volume - Изменить громкость', 'Например: db!volume 5', true)
.addField('d!np - Узнать что играет', 'Например: db!np', true)
.addField('d!pause - Пауза', 'Например: db!pause', true)
.addField('d!resume - Воспроизведение после паузы', 'Например: db!resume', true);
message.channel.send(c);
}

module.exports.help ={
    name: "music"
}
