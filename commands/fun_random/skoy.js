const discord = require(`discord.js-light`)
const Skoy = require("skoy");
exports.run = (bot, message, args) => {
  let words = args.join(" ")
  if(!words) return message.channel.send(`:x: | กรุณาใส่คำที่ต้องการแปลด้วยนะคะ...//ก้ม~`)
  let secc = Skoy.convert(words)
  return message.channel.send(new discord.MessageEmbed().setAuthor(`ระบบแปลภาษาสก๊อย`, `https://cdn.discordapp.com/attachments/734360066202796104/778354322172805120/18_google_translate_text_language_translation-512.png`)
  .setDescription(`\`\`\`${words}\`\`\` แปลได้ว่า \`\`\`${secc}\`\`\``).setColor(config.color))
};
exports.conf = { aliases: [] };