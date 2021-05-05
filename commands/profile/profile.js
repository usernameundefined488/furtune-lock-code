const Discord = require('discord.js-light');
const moment = require('moment');
/**
 *
 *
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {String[]} args
 */

exports.run = async (bot, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let userdata = await bot.db.getuser(member.id)
    let exptop = bot.db.prepare(`SELECT * FROM users ORDER BY totalsexp DESC`).all();
    let cointop = bot.db.prepare(`SELECT * FROM users ORDER BY point DESC`).all();
    exptop = (await exptop).findIndex((u)=>u.id==member.id)+1;
    cointop = (await cointop).findIndex((u)=>u.id==member.id)+1;
    let nxtlvlexp = userdata.level * config.expperlvl;

    const embed = new Discord.MessageEmbed()
    .setAuthor(`📚 โปรไฟล์ ${member.user.username}`)
    .setThumbnail(member.user.displayAvatarURL())
    .setDescription(`🌸 __**อันดับต่างๆ**__
┊ อันดับค่าประสบการณ์ : ${exptop}
╰ อันดับการเก็บเงิน : ${cointop}

📋 __**ข้อมูล**__ ↷
\`\`\`
ชื่อเล่น : ${userdata.name||"ไม่พบ"}
เพศ : ${userdata.gender||"ไม่พบ"}
คลาส : ${userdata.class||"ไม่พบ"}
อาชีพ : ${userdata.job||"ไม่พบ"}
ฉายา : ${userdata.title||"ไม่พบ"}
คำคม : ${userdata.quotes||"ไม่พบ"}
สถานะ : ${userdata.status||"ไม่พบ"}
วันเกิด : ${userdata.birthday?moment(userdata.birthday).format("ll"):"ไม่พบ"}
\`\`\``)
    .setFooter(`🔮 เลเวล: ${userdata.level} ค่าประสบการณ์: ${Math.floor(userdata.exp/nxtlvlexp*100)}% เงินที่มี: ${userdata.point}`)
    .setColor(config.color);

    message.channel.send(embed)
}
exports.conf = {
    aliases: [],
    delay: 3000
};