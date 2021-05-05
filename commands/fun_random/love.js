const Discord = require("discord.js-light");
exports.run = (bot, message, args) => {
  message.channel.send(`ปิดปรับปรุง`)
  /*var user = message.guild.members.cache.get(Math.round(Math.Random(message.guild.members.cache.size())));
  let embed = new Discord.MessageEmbed()

    .setAuthor(`❤️ คู่รักของคุณคือ`)
    .setDescription(`${message.author} 💞 ${user.user}`)
    .setColor(config.color);
  message.channel.send(embed);*/
};
exports.conf = { aliases: [] };