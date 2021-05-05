const moment = require('moment')
/**
 *
 *
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {String[]} args
 */
exports.run = async(bot, message, args) => {
    if(!args.length) return message.channel.send(`:x: | นายท่านกรุณาใส่วันเกิดเช่น \`${prefix}birthday 2015-10-8\``);
    let date;
    try {
        date = moment(new Date(args[0]));
        if(!date.isValid()) throw(new Error());
    } catch (error) {
        return message.channel.send(`:x: | นายท่านใส่วันเกิดไม่ถูกต้องตัวอย่าง \`${prefix}birthday 2015-10-8\``);
    }
    let update = await bot.db.prepare(`UPDATE users SET birthday = :date WHERE id = :id`).run({
        date : date.format(),
        id: message.author.id
    })
    return message.channel.send(`<a:checkmark:803108274538020904> | ตั้งวันเกิดของ ${message.author} เป็น \`${date.format('ll')}\` แล้ว`)
}
exports.conf = {
    aliases: ["setbirthday","setbd","bd"]
};