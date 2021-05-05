const Discord = require("discord.js-light")
/**
 *
 *
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {String[]} args
 */
exports.run = async(bot, message, args) => {
    let user = message.mentions.users.first()||message.author
    let userdata = await bot.db.getuser(user.id)
    message.channel.send(`${user} | มี ${config.econame} จำนวน \`${userdata.point}\` ${config.econame} <:coin:803105205113323521>`)
}
exports.conf = {
    aliases: ["coin"]
};