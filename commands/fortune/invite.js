const Discord = require('discord.js-light')
/**
 *
 *
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {String[]} args
 */
exports.run = (bot, message, args) => {
    let embed = new Discord.MessageEmbed()
        .setAuthor(`ลิ้งเชิญบอท Fortune`, `https://cdn.discordapp.com/attachments/734360066202796104/778353021394223104/746355527600177237.png`)
        .setDescription(`เชิญบอท [คลิกที่นี่](https://discord.com/api/oauth2/authorize?client_id=618441438564188196&permissions=8&scope=bot%20applications.commands)`)
        .setColor(config.color)
    message.channel.send(embed)
};
exports.conf = {
    aliases: ['inv','link']
};