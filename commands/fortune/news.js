const Discord = require('discord.js-light')
/**
 *
 *
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {String[]} args
 */
module.exports.run = async (bot, message, args) => {
  message.delete()
    let reason = args.join(' ');
    if (!reason) {
      message.channel.send(`:x: | กรุณาใส่คำที่จะประกาศด้วยนะคะ`);
    }
    if (reason) {
      let embed = new Discord.MessageEmbed()
        .setAuthor(`ประกาศจาก ${Discord.Util.escapeMarkdown(message.author.username)}`,message.author.displayAvatarURL())
        .setDescription(`${reason}`)
        .setFooter(`🔔 ประกาศเวลา`)
        .setColor(config.color)
        .setTimestamp()
      message.channel.send(embed)
    }
  }

exports.conf = {
  aliases: ["bc","broadcast"],
  price: 1000
};