const Discord = require("discord.js");
const request = require("request");

module.exports.run = async (bot, message, args) => {
    if(message.author.id !== "355384371362136075") return;
    function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
        if(evaled === "Promise { <pending> }") return;
        
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    
  }
}
module.exports.help = {
    name: "eval"
}
