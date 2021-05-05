const discord = require("discord.js-light");
const roblox = require("noblox.js");
/**
 *
 *
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {String[]} args
 */
module.exports.run = async (bot, message, args) => {
  let username = args[0]
  if (username) {
    roblox.getIdFromUsername(username).then(id => {
      if (id) {
        roblox.getPlayerInfo(parseInt(id)).then(function (info) {
          let embed = new discord.MessageEmbed()

            .setTimestamp()
            .setAuthor(`ข้อมูลผู้เล่น Player เบื้องต้น`, `https://cdn.discordapp.com/attachments/734360066202796104/734390659842310154/unnamed.png`)
            .setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`)
            .setDescription(`🌸 **ชื่อผู้ใช้**
╰\`${info.username || 'ผิดพลาด'}\`
🌸 **เลขไอดี**
╰\`${id || 'ผิดพลาด'}\`
🌸 **อายุการใช้งาน**
╰\`${info.age +" วัน"||'ผิดพลาด'}\`
🌸 **ไอดีของผู้เล่น**
╰[\`${username}\`](https://roblox.com/users/${id}/profile)`)
.setFooter(`ขอบคุณข้อมูลจาก Noblox.js`)

            .setColor(config.color)
          message.channel.send({
            embed
          })
        })
      }

    }).catch(function (err) {
      message.channel.send("⚠️ | ไม่พบผู้เล่นค่ะกรุณาสะกดให้ถูกด้วยนะคะ")
    });
  } else {
    message.channel.send(":x: | กรุณาใส่ชื่อในเกมส์ด้วยค่ะ")
  }
}

exports.conf = {
  aliases: []
};