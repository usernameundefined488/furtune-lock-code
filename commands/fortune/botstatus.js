const Discord = require('discord.js-light');
let days = 0;
let week = 0;
/**
 *
 *
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {String[]} args
 */
exports.run = async (bot, message, args) => {
    let uptime = ``;
    let totalSeconds = (bot.uptime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    if (hours > 23) {
        days = days + 1;
        hours = 0;
    }

    if (days == 7) {
        days = 0;
        week = week + 1;
    }

    if (week > 0) {
        uptime += `${week} สัปดาห์, `;
    }

    if (minutes > 60) {
        minutes = 0;
    }

    uptime += `${days} วัน, ${hours} ชั่วโมง, ${minutes} นาที, ${seconds} วินาที`;

    let serverembed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setAuthor(`Fortune#3986`, bot.user.displayAvatarURL())
        .setThumbnail(`https://cdn.discordapp.com/attachments/619019220965130241/628613987453632563/wallpaper.png`)
        .setDescription(`✨ **ผู้สร้าง**
╰ \`leaked AkenoSann#0001\`

🔮 **__ข้อมูล__**
┊ \`เวอร์ชั่น\` ${config.version}
┊ \`ไอดีบอท\` ${bot.user.id}
┊ \`โมดูลหลัก\` discord.js-light
┊ \`เอพีไอ\` Google API, ItemCore API
╰ \`เซิร์ฟเวอร์ที่เชื่อมต่อ\` ${await guilds.cache.size||`ไม่สามารถดึงข้อมูลได้`}`)
    .setFooter(`🕚 ทำงานมาเป็นเวลา: ${uptime} ที่แล้ว`);
    message.channel.send(serverembed);
}
exports.conf = {
    aliases: ["botinfo"],
    delay: 5000
};