/**
 *
 *
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {String[]} args
 */
exports.run = async(bot, message, args) => {
    if(!args.length) return message.channel.send(`:x: | นายท่านกรุณาใส่อาชีพเช่น ${prefix}job (อาชีพ)`);
    let update = await bot.db.prepare(`UPDATE users SET job = :job WHERE id = :id`).run({
        job : args.join(" "),
        id: message.author.id
    })
    return message.channel.send(`<a:checkmark:803108274538020904> | ตั้งอาชีพของ ${message.author} เป็น \`${args.join(" ")}\` แล้ว`)
}
exports.conf = {
    aliases: ["setjob"]
};