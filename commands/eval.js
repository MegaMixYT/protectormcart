const Discord = require("discord.js");
const inspect = require("inspect");

module.exports.run = async (bot, message, args) => {
    if(message.author.id !== "355384371362136075") return;
const code = args.join(" ").replace(process.env.TOKEN, 'huy tebe');
        const token = bot.token.split("").join("[^]{0,2}");
        const rev = bot.token.split("").reverse().join("[^]{0,2}");
        const filter = new RegExp(`${token}|${rev}`, "g");
        try {
            let output = eval(code);
            if (output instanceof Promise || (Boolean(output) && typeof output.then === "function" && typeof output.catch === "function")) output = await output;
            output = inspect(output, { depth: 0, maxArrayLength: null });
            output = output.replace(filter, "[TOKEN]");
            output = clean(output);
            if (output.length < 1950) {
                //Отправляет пользователю данные эмуляции.
                message.author.send(`\`\`\`js\n${output}\n\`\`\``);
                //Ставит реакцию (выполнено).
                message.react("✅")
            } else {
                message.author.send(`${output}`, {split:"\n", code:"js"});
            }
        } catch (error) {
            //Захватывает ошибку и говорит об этом.
            message.channel.send(`Error \`\`\`js\n${error}\`\`\``);
            //Ставит реакцию (Ошибка).
            message.react("❎")
        }

        function clean(text)  {
            return text
                .replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203));
        }
}
module.exports.help = {
    name: "eval"
}
