const Discord = require('discord.js-light')
/**
 *
 *
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {String[]} args
 */
exports.run = async (bot, message, args) => {
    if (message.author.id !== `617402044659269655`) return message.channel.send(`:x: | คำสั่งนี้ใช้ได้เฉพาะกับผู้พัฒนาบอทเท่านั้น`)
    let target = message.mentions.users.first();
    if (!target) return message.channel.send(`:x: | กรุณาระบบผู้รับด้วยค่ะ`);
    if (target && !args[1]) return message.channel.send(`:x: | กรุณาใส่จำนวนเงินด้วยนะคะ`);
    if (!parseInt(args[1]) || parseInt(args[1]) <= 0) return message.channel.send(":x: | ตัวเลขไม่ถูกต้องค่ะ");
    let amount = parseInt(args[1]);
    bot.db.getuser(target.id).then((user) => {
        bot.db.setpoint(target.id, amount, true).then(() => {
            message.channel.send(new Discord.MessageEmbed().setAuthor(`ตั้งค่าเงินของ ${target.tag} เป็น ${amount} แล้วค่ะ`, 'https://cdn.discordapp.com/attachments/700682902459121695/710127424943423529/text-plus-icon.png').setColor(config.colorsuccess))
        })
    })

}