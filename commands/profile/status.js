/**
 *
 *
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {String[]} args
 */
exports.run = async(bot, message, args) => {
    if(!args.length) return message.channel.send(`:x: | นายท่านกรุณาใส่สถานะเช่น ${prefix}status (สถานะ)`);
    let update = await bot.db.prepare(`UPDATE users SET status = :status WHERE id = :id`).run({
        status : args.join(" "),
        id: message.author.id
    })
    return message.channel.send(`<a:checkmark:803108274538020904> | ตั้งสถานะของ ${message.author} เป็น \`${args.join(" ")}\` แล้ว`)
}
exports.conf = {
    aliases: ["setstatus"]
};