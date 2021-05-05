const {
    MessageEmbed
} = require("discord.js-light");
/**
 *
 *
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {String[]} args
 */
exports.run = async (bot, message, args) => {
    message.delete()
    message.channel.send(`:x: | คำสั่งถูกปิดใช้งานชั่วคราวนะคะ`)
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        message.channel.send(`${message.author} นายท่านไม่มีสิทธิ์ใช้คำสั่งนะคะ!...//ขำเบาๆ~`)
    } else {
        switch (args[0]) {

            case "เปิด":
            case "open":
            case "on":
                await bot.db.prepare(`UPDATE guilds SET joinid = :joinid WHERE id = :id`).run({
                    joinid: message.channel.id,
                    id: message.guild.id
                })
                message.channel.send(`<a:692267344042655786:792426931856998442> หนูตั้งการส่งแจ้งเตือนคน \`เข้า-ออก\` เป็นห้องนี้แล้ว`)
                break;
            case "ปิด":
            case "close":
            case "off":
                await bot.db.prepare(`UPDATE guilds SET joinid = :joinid WHERE id = :id`).run({
                    joinid: null,
                    id: message.guild.id
                })
                message.channel.send(`<a:checkmark:803108274538020904> หนูปิดการส่งแจ้งเตือนการ \`เข้า-ออก\` แล้ว`)
                break;
            default:
                message.channel.send(new MessageEmbed().setAuthor("🌸 Welcome Message")
                    .setColor(config.color)
                    .setImage(`https://cdn.discordapp.com/attachments/619019220965130241/734338581409038437/welcome.png`)
                    .setDescription(`✨・**คำสั่งสำหรับระบบต้อนรับ**
┊\`${prefix}wc on\` ตั้งค่าให้ยินดีต้อนรับห้องนั้นๆ
╰\`${prefix}wc off\` ปิดการใช้งานข้อความต้อนรับ`))
                break;
        }
    }
}

exports.conf = {
    aliases: ["wc"]
};