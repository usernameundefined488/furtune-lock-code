const Discord = require('discord.js-light');
const client = require('nekos.life');
const neko = new client();
exports.run = async (bot, message, args) => {
  
  let user = message.mentions.users.first();
  if(!user) return message.channel.send(`:x: | กรุณาแท็กผู้ใช้ด้วยนะคะ!`)

  let body = await neko.sfw.pat();
  let Embed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username} pathead ${user.username}`, bot.user.displayAvatarURL())
    .setColor(config.color)
    .setImage(body.url)
  message.channel.send(Embed);

};
exports.conf = { aliases: [] };