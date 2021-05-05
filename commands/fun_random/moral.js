const Discord = require("discord.js-light");
exports.run = (bot, message, args) => {

  let embed = new Discord.MessageEmbed()
    .setAuthor(`คำณวนความดีชั่ว`, message.member.user.displayAvatarURL())
    .setDescription(`✨ ความดี \`${Math.floor(Math.random()*200)}%\`
😥 ความชั่ว \`${Math.floor(Math.random()*200)}%\``)
    .setColor(config.color);
  message.channel.send(embed);
};
exports.conf = { aliases: [] };