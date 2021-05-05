
/**
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {String[]} args
 */

module.exports.run = async (bot, message, args) => {
    if(message.channel.name === `ticket` + `-` + message.author.id.slice(0, 5)) {
        message.channel.delete();
    }else
    {   
        message.channel.send(`:x: | ไม่สามารถลบห้องอื่นๆได้นอกจากห้องของตัวเอง!`)
      }
}
exports.conf = { aliases: [] };