const Discord = require('discord.js-light');
const client = require('nekos.life');
const neko = new client();
exports.run = async (bot, message, args) => {
  if (!args[0]) return message.reply("กรุณาใส่คำที่ต้องการค้นหาด้วยค่ะ");

  let body;
  if (args[0] === `smug`) body = await neko.sfw.smug();
  if (args[0] === `baka`) body = await neko.sfw.baka();
  if (args[0] === `neko`) body = await neko.sfw.neko();
  if (args[0] === `nekogif`) body = await neko.sfw.nekoGif();
  if (args[0] === `lizard`) body = await neko.sfw.lizard();
  if (args[0] === `foxgirl`) body = await neko.sfw.foxGirl();
  if (args[0] === `kemonomimi`) body = await neko.sfw.kemonomimi();
  if (args[0] === `holo`) body = await neko.sfw.holo();
  if (args[0] === `woof`) body = await neko.sfw.woof();
  if (args[0] === `wallpaper`) body = await neko.sfw.wallpaper();
  if (args[0] === `goose`) body = await neko.sfw.goose();
  if (args[0] === `avatar`) body = await neko.sfw.avatar();
  if (args[0] === `waifu`) body = await neko.sfw.waifu();
  
  if (!body) return message.channel.send(new Discord.MessageEmbed()
  .setDescription(`❌ ไม่สามารถค้นหา: \`${args[0]}\``)
  .setColor(config.colorfail))

  let Embed = new Discord.MessageEmbed()
    .setAuthor(`ค้นหา: ${args[0]}`, bot.user.displayAvatarURL())
    .setColor(config.color)
    .setImage(body.url)
    .setFooter("ร้องขอโดย " + message.author.username)
  message.channel.send(Embed);

};
exports.conf = {
  aliases: []
};