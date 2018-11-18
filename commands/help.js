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
       .addField('pr!help - список команд', 'Пример: pr!help', false)
       .addField('pr!chelp - список команд в чат (Только для администраторов)', 'Пример: pr!chelp', false)
       .addField('pr!ping - показывает ваш пинг', 'Пример: pr!ping', false)
       .addField('pr!qrgen - Генерирует Qr-code', 'Пример: pr!qrcode Привет!', false)
       .addField('pr!a-qrgen - Генерирует Qr-code с удалением вашего сообщения', 'Пример: pr!a-qrcode Привет!', false)
       .addField('pr!developer - имя разработчика!', 'Пример: pr!developer', false)
       .addField('pr!randomcolor - генерирует случайный цвет', 'Пример: pr!randomcolor', false)
       .addField('pr!info - информация обо мне!', 'Пример: pr!info', false)
       .addField('pr!hi - сказать всем привет!', 'Пример: pr!hi', false)
       .addField('pr!kick - кикнуть пользователя!', 'Пример: pr!kick @MCArTyR#1143', false)
       .addField('pr!ban - забанить пользователя!', 'Пример: pr!ban @MCArTyR#1143', false)
       .addField('Разбанивать через Настройки сервера, Баны!', '!!!', false)
       .addField('pr!avatar - показать увеличенный аватар пользователя!', 'Пример: pr!avatar @MCArTyR#1143', false)
       .addField('pr!clear - почистить сообщения! Внимание! Не больше 100 сообщений за раз!', 'Пример: pr!clear 50', false)
       .addField('pr!say - отправить сообщение от имени бота!', 'Пример: pr!say Привет!', false)
       .addField('pr!dm - отправить сообщениев лс от имени бота!', 'Пример: pr!dm @MCArTyR#1143 Привет!', false)
       .addField('pr!fp - за фейспалмить человека!', 'Пример: pr!fp @MCArTyR#1143', false)
       .addField('pr!mute - замутить пользователя! Обязательно во всех каналах запретите роли "muted" отправлять сообщения!', 'Пример: pr!mute @MCArTyR#1143', false)
       .addField('pr!unmute - размутить замученного человека', 'Пример: pr!unmute @MCArTyR#1143', false)
       .setFooter(`DydleBoat by MCArTyR`, message.author.displayAvatarURL);
      message.author.send(hEmbed);
}



module.exports.help ={
    name: "help"
}
