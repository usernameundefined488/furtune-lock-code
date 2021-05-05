/**
 *
 *
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {String[]} args
 */
exports.run = async(bot, message, args) => {
    if(!args.length) return message.channel.send(`:x: | นายท่านกรุณาใส่ฉายาเช่น ${prefix}title (ฉายา)`);
    let update = await bot.db.prepare(`UPDATE users SET title = :title WHERE id = :id`).run({
        title : args.join(" "),
        id: message.author.id
    })
    return message.channel.send(`<a:checkmark:803108274538020904> | ตั้งฉายาของ ${message.author} เป็น \`${args.join(" ")}\` แล้ว`)
}
exports.conf = {
    aliases: ["settitle"]
};