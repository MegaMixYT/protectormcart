const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(message.author.id !== "355384371362136075") return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
}
module.exports.help = {
    name: "eval"
}