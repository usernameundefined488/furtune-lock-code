const Discord = require("discord.js-light");
exports.run = (bot, message, args) => {
  let embed = new Discord.MessageEmbed()
    .setAuthor(`คำณวนความหล่อ`, message.member.user.displayAvatarURL())
    .setDescription(`╰ ความหล่อของคุณคือ \`${Math.floor(Math.random()*100)}%\` 💞`)
    .setColor(config.color);
  message.channel.send(embed);
};
exports.conf = { aliases: [`hs`] };