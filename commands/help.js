const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    var answers = [
        "#ff0000",
        "#ff7700",
        "#eeff00",
        "#00ff08",
        "#00ffe5",
        "#1900ff",
        "#8c00ff"
      ] 
      var randomAnswer = answers[Math.floor(Math.random() * answers.length)];
      message.reply("Отправил в лс!");
      let hEmbed = new Discord.RichEmbed()
      .setThumbnail(message.author.displayAvatarURL)
       .setColor(randomAnswer)
       .setTitle('Список команд:')
       .addField('db!help - список команд', 'Пример: db!help', false)
       .addField('db!chelp - список команд в чат (Только для администраторов)', 'Пример: db!chelp', false)
       .addField('db!invite - ссылка на приглашение бота, и на оффициальный сервер', 'Пример: db!invite', false)
       .addField('db!ping - показывает ваш пинг', 'Пример: db!ping', false)
       .addField('db!qrgen - Генерирует Qr-code', 'Пример: db!qrcode Привет!', false)
       .addField('db!a-qrgen - Генерирует Qr-code с удалением вашего сообщения', 'Пример: db!a-qrcode Привет!', false)
       .addField('db!developer - имя разработчика!', 'Пример: db!developer', false)
       .addField('db!level - показывает ваш уровень и опыт', 'Пример: db!level', false)
       .addField('db!randomcolor - генерирует случайный цвет', 'Пример: db!randomcolor', false)
       .addField('db!info - информация обо мне!', 'Пример: db!info', false)
       .addField('db!hi - сказать всем привет!', 'Пример: db!hi', false)
       .addField('db!kick - кикнуть пользователя!', 'Пример: db!kick @MCArTyR#1143', false)
       .addField('db!ban - забанить пользователя!', 'Пример: db!ban @MCArTyR#1143', false)
       .addField('Разбанивать через Настройки сервера, Баны!', '!!!', false)
       .addField('db!avatar - показать увеличенный аватар пользователя!', 'Пример: db!avatar @MCArTyR#1143', false)
       .addField('db!clear - почистить сообщения! Внимание! Не больше 100 сообщений за раз!', 'Пример: db!clear 50', false)
       .addField('db!say - отправить сообщение от имени бота!', 'Пример: db!say Привет!', false)
       .addField('db!dm - отправить сообщениев лс от имени бота!', 'Пример: db!dm @MCArTyR#1143 Привет!', false)
       .addField('db!fp - за фейспалмить человека!', 'Пример: db!fp @MCArTyR#1143', false)
       .addField('db!mute - замутить пользователя! Обязательно во всех каналах запретите роли "muted" отправлять сообщения!', 'Пример: db!mute @MCArTyR#1143', false)
       .addField('db!unmute - размутить замученного человека', 'Пример: db!unmute @MCArTyR#1143', false)
       .addField('db!warn - выдаёт игроку предупреждение', 'Пример: db!warn @MCArTyR#1143')
       .setFooter(`DydleBoat by MCArTyR`, message.author.displayAvatarURL);
      message.author.send(hEmbed);
}



module.exports.help ={
    name: "help"
}
