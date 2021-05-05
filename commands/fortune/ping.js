const Discord = require('discord.js-light');
/**
 *
 *
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {String[]} args
 */
exports.run = async (bot, message, args) => {
    let start = Date.now();
    let API = Date.now() - message.createdTimestamp
    message.channel.send(new Discord.MessageEmbed().setAuthor('กำลังโหลดข้อมูล... ').setColor(config.color)).then(msg => {
        let diff = (Date.now() - start);
        let serverembed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setAuthor(`Fortune#3986`, bot.user.displayAvatarURL())
            .setDescription(`🔮 ค่าความหน่วง
┊ \`${diff}ms\` ความหน่วง **Server**
╰ \`${API}ms\` ความหน่วง **APIThirdParty**`)
        msg.edit(serverembed);
    })
}
exports.conf = {
    aliases: ["ping"],
    delay: 5000
};