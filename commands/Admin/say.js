const Discord = require('discord.js-light')
/**
 *
 *
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {String[]} args
 */
module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`❌ | นายท่านไม่มีสิทธิ์ใช้คำสั่งนะคะ!...//ขำเบาๆ~`)
    if(!args[0]) return message.channel.send(`:x: | กรุณาใส่คำที่ต้องการจะพิมพ์ค่ะ`)
    message.delete()
    message.channel.send(args.join(" "))
}