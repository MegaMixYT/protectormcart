        const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
        try {
            let evaled = vm.runInContext(args.join(" "), codeContext);
            message.channel.send(evaled, {code:"js",split:"\n"});
        } catch(e) {
            message.channel.send(e, {code:"js",split:"\n"});
        }
        }
        module.exports.help = {
    name: "beval"
}
