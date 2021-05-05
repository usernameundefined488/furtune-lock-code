const Discord = require("discord.js-light")
/**
 *
 *
 * @param {import("discord.js-light").Client} bot
 * @param {import("discord.js-light").Message} message
 * @param {String[]} args
 */
exports.run = async (bot, message, args) => {
   if (message.author.id!="617402044659269655") return message.channel.send(message.author + " คำสั่งนี้ใช้ได้เฉพาะกับผู้พัฒนาบอทเท่านั้น...แบร่!")
   args = args.join(" ").replace(/```(js|)/gi, "")
   console.log(args)
   message.channel.send(new Discord.MessageEmbed().setAuthor(`ทำการใช้คำสั่งพิเศษ`, `https://cdn.discordapp.com/attachments/734360082019516436/734487496129249460/732898134384050236.gif`).setDescription(`\`\`\`js\n${args}\`\`\``).setColor(config.colorsuccess))
   try {
      let result = await eval(args)
      message.channel.send(result)
   } catch (error) {
      message.channel.send(new Discord.MessageEmbed().setAuthor(`❌ เกิดข้อผิดพลาด`).setDescription(`\`\`\`js\n${error}\`\`\``).setColor(config.colorfail))
   }
}