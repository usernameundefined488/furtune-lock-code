const Discord = require("discord.js-light")
/**
 *
 *
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {String[]} args
 */
exports.run = async (bot, message, args) => {
    if(!args.length) return message.channel.send(`❌ | กรุณาระบุแท็คผู้ใช้ \`${prefix}shake @ชื่อ\``)
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let prevoice = member.voice.channel;
    let tochannel = [];
    message.channel.send(`<a:checkmark:803108274538020904> | เขย่า \`${member.displayName}\` สำเร็จแล้วค่ะ!`)
    message.guild.channels.cache.forEach((channel)=>{
        if(channel.permissionsFor(member).has("CONNECT")&&channel.type=="voice"&&channel!=prevoice) tochannel.push(channel)
    })
    if(!tochannel.length) return message.reply("❌ | ไม่พบห้องที่จะใช้ในการย้ายผู้ใช้ไปมา")
    tochannel.length = 3
    for (let i = 0; i < tochannel.length; i++) {
        await member.voice.setChannel(tochannel[i]);
    }
    member.voice.setChannel(prevoice)
}
exports.conf = {
    aliases: [],
    price: 1500
};