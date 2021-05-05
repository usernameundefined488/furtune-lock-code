const Discord = require('discord.js-light');
const config = require('../../config/config');
/**
 *
 *
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {String[]} args
 */
exports.run = async (bot, message, args) => {
    if (args[0]){
        if(args[0] === `add`){
            if (message.author.id !== `617402044659269655`) return message.channel.send(`:x: | คำสั่งนี้ใช้ได้เฉพาะกับผู้พัฒนาบอทเท่านั้น`)
            if (!args[1]) return message.channel.send(`:x: | กรุณาใส่ user`)
        target = args[1].replace(/<@!|>/g,``)
        if (!target) return message.channel.send(`:x: | ไม่พบ user <@${target}>`)
        await bot.db.prepare(`UPDATE users SET premium = 1 WHERE id = :id`).run({
            id: parseInt(target)
        })
        message.channel.send(`<a:checkmark:803108274538020904> | หนูเพิ่ม premium ให้ <@${target}> แล้ว`)
        }else if(args[0] === `remove`){
            if (message.author.id !== `617402044659269655`) return message.channel.send(`:x: | คำสั่งนี้ใช้ได้เฉพาะกับผู้พัฒนาบอทเท่านั้น`)
            if (!args[1]) return message.channel.send(`:x: | กรุณาใส่ user`)
            target = args[1].replace(/<@!|>/g,``)
            if (!target) return message.channel.send(`:x: | ไม่พบ user ${target}`)
            await bot.db.prepare(`UPDATE users SET premium = 0 WHERE id = :id`).run({
                id: target.id
            })
            message.channel.send(`<a:checkmark:803108274538020904> | หนูลบ premium ของ ${target} แล้ว`)
        }else{
            let userdata = await bot.db.getuser(message.author)
            if (userdata.premium) message.channel.send(new Discord.MessageEmbed().setDescription(`<a:Weeee:803108417883340815> | คุณเป็น premium!`).setColor(config.color))
            else message.channel.send(new Discord.MessageEmbed().setDescription(`⚠️ | คุณไม่ได้เป็น Premium!`).setColor(config.colorfail))
        }
    }else return message.channel.send(`กรุณาเลือกหัวข้อหนึ่งอย่าง \`add , remove , check\``)

};
exports.conf = {
    aliases: []
};