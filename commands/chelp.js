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
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Вы не администратор!");
      let hEmbed = new Discord.RichEmbed()
      .setThumbnail(message.author.displayAvatarURL)
      .setColor(randomAnswer)
       .setTitle('Список команд в чат:')
       .addField('${prefix}prefix - смена префикса на сервере!', 'Пример: ${prefix}prefix db!', false)
       .addField('${prefix}help - список команд', 'Пример: ${prefix}help', false)
       .addField('${prefix}chelp - список команд в чат (Только для администраторов)', 'Пример: ${prefix}chelp', false)
       .addField('${prefix}invite - ссылка на приглашение бота, и на оффициальный сервер', 'Пример: ${prefix}invite', false)
       .addField('${prefix}ping - показывает ваш пинг', 'Пример: ${prefix}ping', false)
       .addField('${prefix}qrgen - Генерирует Qr-code', 'Пример: ${prefix}qrcode Привет!', false)
       .addField('${prefix}a-qrgen - Генерирует Qr-code с удалением вашего сообщения', 'Пример: ${prefix}a-qrcode Привет!', false)
       .addField('${prefix}developer - имя разработчика!', 'Пример: ${prefix}developer', false)
       .addField('${prefix}level - показывает ваш уровень и опыт', 'Пример: ${prefix}level', false)
       .addField('${prefix}randomcolor - генерирует случайный цвет', 'Пример: ${prefix}randomcolor', false)
       .addField('${prefix}info - информация обо мне!', 'Пример: ${prefix}info', false)
       .addField('${prefix}hi - сказать всем привет!', 'Пример: ${prefix}hi', false)
       .addField('${prefix}kick - кикнуть пользователя!', 'Пример: ${prefix}kick @MCArTyR#1143', false)
       .addField('${prefix}ban - забанить пользователя!', 'Пример: ${prefix}!ban @MCArTyR#1143', false)
       .addField('Разбанивать через Настройки сервера, Баны!', '!!!', false)
       .addField('${prefix}avatar - показать увеличенный аватар пользователя!', 'Пример: ${prefix}avatar @MCArTyR#1143', false)
       .addField('${prefix}clear - почистить сообщения! Внимание! Не больше 100 сообщений за раз!', 'Пример: ${prefix}clear 50', false)
       .addField('${prefix}say - отправить сообщение от имени бота!', 'Пример: ${prefix}say Привет!', false)
       .addField('${prefix}dm - отправить сообщениев лс от имени бота!', 'Пример: ${prefix}dm @MCArTyR#1143 Привет!', false)
       .addField('${prefix}fp - за фейспалмить человека!', 'Пример: ${prefix}fp @MCArTyR#1143', false)
       .addField('${prefix}mute - замутить пользователя! Обязательно во всех каналах запретите роли "muted" отправлять сообщения!', 'Пример: ${prefix}mute @MCArTyR#1143', false)
       .addField('${prefix}unmute - размутить замученного человека', 'Пример: ${prefix}unmute @MCArTyR#1143', false)
       .addField('${prefix}warn - выдаёт игроку предупреждение', 'Пример: ${prefix}warn @MCArTyR#1143')
       .setFooter(`DydleBoat by MCArTyR`, message.author.displayAvatarURL);
      message.channel.send(hEmbed);
}



module.exports.help ={
    name: "chelp"
}
