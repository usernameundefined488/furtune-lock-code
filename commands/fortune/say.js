const Discord = require('discord.js-light')
/**
 *
 *
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {String[]} args
 */
module.exports.run = async (bot, message, args) => {
  message.delete()
    let reason = args.join(' ');
    if (!reason) {
      message.channel.send(`:x: | กรุณาใส่คำที่จะให้พิมพ์ด้วยนะคะ`).then((msg) => {
        return msg.delete({timeout: 5000});
      });
    }
    if (reason) {
      message.channel.send(reason)
    }
  }

exports.conf = {
  aliases: ["say","sa"],
  price: 500
};