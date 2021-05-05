/**
 *
 *
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {String[]} args
 */
exports.run = async(bot, message, args) => {
    if(!args.length) return message.channel.send(`:x: | นายท่านกรุณาใส่ชื่อเล่นเช่น ${prefix}name (ชื่อเล่น)`);
    let update = await bot.db.prepare(`UPDATE users SET name = :name WHERE id = :id`).run({
        name : args.join(" "),
        id: message.author.id
    })
    return message.channel.send(`<a:checkmark:803108274538020904> | ตั้งชื่อเล่นของ ${message.author} เป็น \`${args.join(" ")}\` แล้ว`)
}
exports.conf = {
    aliases: ["setname"]
};