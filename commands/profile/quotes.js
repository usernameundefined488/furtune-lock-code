/**
 *
 *
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {String[]} args
 */
exports.run = async(bot, message, args) => {
    if(!args.length) return message.channel.send(`:x: | นายท่านกรุณาใส่คำคมเช่น ${prefix}quotes (คำคม)`);
    let update = await bot.db.prepare(`UPDATE users SET quotes = :quotes WHERE id = :id`).run({
        quotes : args.join(" "),
        id: message.author.id
    })
    return message.channel.send(`<a:checkmark:803108274538020904> | ตั้งคำคมของ ${message.author} เป็น \`${args.join(" ")}\` แล้ว`)
}
exports.conf = {
    aliases: ["setquotes"]
};