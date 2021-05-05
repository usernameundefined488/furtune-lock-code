const Discord = require("discord.js-light");
exports.run = (bot, message, args) => {

  if(!args[0]) return message.channel.send("กรุณาแท็กผู้ใช้ด้วยค่ะ")
  let user = message.mentions.users.first();

  let embed = new Discord.MessageEmbed()
    .setAuthor(`❤️ คำณวนนวนความเป็นไปได้`)
    .setDescription(`╰ ที่จะสมหวังกับ ${user} คือ \`${Math.floor(Math.random()*100)}%\``)
    .setColor(config.color);
  message.channel.send(embed);
};
exports.conf = { aliases: [] };