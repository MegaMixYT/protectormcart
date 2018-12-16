const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
let mem = message.mentions.users.first() || message.author;
let sts;
  //FUNCTION
Date.prototype.customFormat = function(formatString){
  var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
  YY = ((YYYY=this.getFullYear())+"").slice(-2);
  MM = (M=this.getMonth()+1)<10?('0'+M):M;
  MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
  DD = (D=this.getDate())<10?('0'+D):D;
  DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][this.getDay()]).substring(0,3);
  th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
  formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);
  h=(hhh=this.getHours());
  if (h==0) h=24;
  if (h>12) h-=12;
  hh = h<10?('0'+h):h;
  hhhh = hhh<10?('0'+hhh):hhh;
  AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
  mm=(m=this.getMinutes())<10?('0'+m):m;
  ss=(s=this.getSeconds())<10?('0'+s):s;
  return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
};
//FUNCTION
var crtAt = new Date(mem.createdAt);
let day = 1000 * 60 * 60 * 24
let date1 = new Date(message.createdTimestamp)
let date2 = new Date(mem.createdTimestamp)
let date3 = new Date(message.guild.members.get(mem.id).joinedTimestamp)
let diff1 = Math.round(Math.abs((date1.getTime() - date2.getTime()) / day))
let diff2 = Math.round(Math.abs((date1.getTime() - date3.getTime()) / day))
if(mem.presence.status == 'online')
{ let sts = 'В сети'}else if(mem.presence.status == 'idle')
{ let sts = 'Не активен'}else if(mem.presence.status == 'dnd')
{ let sts = 'Не беспокоить'}else if(mem.presence.status == 'offline')
{ let sts = 'Не в сети'}else{}
let r = new Discord.RichEmbed()
.setTitle(`${mem.tag} | ${sts} ${mem.presence.game}`)
.addField(`Дата регистрации`, `${crtAt.customFormat("#DD#.#MM#.#YYYY# в #hh#:#mm#:#ss#")}\n(${diff1} дн. назад)`, true)
.addField(`Дата Вступления`, `${date3.customFormat("#DD#.#MM#.#YYYY# в #hh#:#mm#:#ss#")}\n(${diff2} дн. назад)`, true)
.addField('Роли', message.guild.members.get(mem.id).roles.map(role => role.name).join(', ').replace(/@everyone, /, /\g/) || `Нет ролей`)
.setColor(message.guild.members.get(mem.id).displayHexColor)
.setTimestamp()
.setThumbnail(mem.displayAvatarURL)
.setFooter(`ID: ${mem.id}`);
message.channel.send(r);
}

module.exports.help ={
    name: "user-info"
}
