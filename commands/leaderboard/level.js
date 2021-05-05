const Discord = require('discord.js-light') 
/**
*
*
* @param {import("discord.js-light").Client} bot
* @param {import("discord.js-light").Message} message
* @param {String[]} args
*/
module.exports.run = async(bot, message, args) => {
  let user = message.mentions.users.first()||message.author
  let userdata = await bot.db.getuser(user.id)
  userdata.exp = userdata.exp.toFixed(1)
  let nxtlvlexp = userdata.level * config.expperlvl;
  let want = (nxtlvlexp-userdata.exp).toFixed(1);
  let embed = new Discord.MessageEmbed()
          .setAuthor(`${user.username}`,user.avatarURL())
          .setThumbnail(user.avatarURL())
          .setDescription(`🌸 เลเวล: **${userdata.level}**
┊ ค่าประสบการณ์: \`${userdata.exp}\`/\`${nxtlvlexp}\`
╰ ต้องการอีก \`${want}\` ถึงจะอัพเลเวล`)
          .setFooter(`🕐เรียกข้อมูลโดย: ${user.username}`)
          .setColor(config.color)
  message.channel.send(embed)
 }

exports.conf = { aliases: [] };